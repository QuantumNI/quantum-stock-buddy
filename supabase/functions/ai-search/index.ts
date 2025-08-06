import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Product {
  id: string;
  name: string;
  code: string;
  brand: string;
  category: string;
  badge?: string;
  stockLevel: number;
  price: number;
  unit: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, products } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found');
    }

    console.log('Processing AI search query:', query);

    // Create a comprehensive product catalog summary for the AI
    const productCatalog = products.map((p: Product) => 
      `${p.name} (${p.code}) - ${p.brand} - ${p.category} - ${p.badge || ''} - £${p.price}`
    ).join('\n');

    const systemPrompt = `You are an AI assistant for Quantum Group NI, a professional tile and construction supply company. You help contractors find the right products from our catalog.

PRODUCT CATALOG:
${productCatalog}

Your job is to analyze search queries and return the most relevant product matches. Consider:

1. CONTRACTOR TERMINOLOGY: Understand how contractors actually speak
   - "waterproof" = waterproofing kits, sealants, matting
   - "cutting" = diamond blades, tile cutters, disc blades
   - "leveling/levelling" = levelling systems, clips, wedges
   - "spacers" = tile spacers, crosses, accessories
   - "adhesive/glue" = tile adhesives, grips, bonds
   - "silicone" = sealants, caulks
   - "tools" = trowels, floats, cutters, nippers
   - "clean" = cleaners, grout cleaners, maintenance

2. PRODUCT RELATIONSHIPS: Understand what works together
   - Tiles need: adhesive, spacers, grout, cleaning
   - Bathrooms need: waterproofing, sealants, anti-mould
   - Cutting needs: blades, safety equipment, cooling
   - Levelling needs: clips, wedges, systems

3. BRAND RECOGNITION: Major brands in catalog
   - ALPHACHEM (adhesives, sealants)
   - MONTOLIT (cutting tools, blades)
   - Raimondi (levelling systems)
   - UltraTile (adhesives, grouts)
   - LevTec (levelling systems)
   - Quantum (accessories, trims)

4. SIZE/SPECIFICATION MATCHING: Match dimensions, types
   - "3mm" = 3mm spacers, clips
   - "115mm" = 115mm diamond blades
   - "20kg" = 20kg adhesive bags

Return a JSON response with:
{
  "enhancedQuery": "improved search terms",
  "matchedProducts": ["product_id1", "product_id2", ...],
  "suggestions": ["suggestion1", "suggestion2", ...],
  "intent": "what the user is trying to accomplish",
  "category": "most relevant category filter"
}

Be intelligent about synonyms, spelling variations, and contractor slang.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Find products for: "${query}"` }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI Response:', aiResponse);

    try {
      const parsedResponse = JSON.parse(aiResponse);
      
      // Filter products based on AI matches
      const matchedProducts = products.filter((product: Product) => 
        parsedResponse.matchedProducts?.includes(product.id) ||
        parsedResponse.enhancedQuery?.toLowerCase().split(' ').some((term: string) =>
          product.name.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          product.code.toLowerCase().includes(term)
        )
      );

      return new Response(JSON.stringify({
        enhancedQuery: parsedResponse.enhancedQuery || query,
        matchedProducts: matchedProducts,
        suggestions: parsedResponse.suggestions || [],
        intent: parsedResponse.intent || '',
        category: parsedResponse.category || 'all',
        originalQuery: query
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (parseError) {
      console.error('Failed to parse AI response, falling back to simple search');
      
      // Fallback to enhanced keyword matching
      const keywords = query.toLowerCase().split(' ');
      const matchedProducts = products.filter((product: Product) =>
        keywords.some(keyword =>
          product.name.toLowerCase().includes(keyword) ||
          product.brand.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword)
        )
      );

      return new Response(JSON.stringify({
        enhancedQuery: query,
        matchedProducts: matchedProducts,
        suggestions: [],
        intent: 'Search for products',
        category: 'all',
        originalQuery: query
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in AI search function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      enhancedQuery: '',
      matchedProducts: [],
      suggestions: [],
      intent: '',
      category: 'all'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});