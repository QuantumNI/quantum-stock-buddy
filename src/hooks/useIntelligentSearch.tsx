import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';

interface Product {
  id: string;
  name: string;
  code: string;
  brand: string;
  stockLevel: number;
  stockStatus: "high" | "medium" | "low" | "out";
  price: number;
  unit: string;
  badge?: string;
  category: string;
}

// Synonym mapping for contractor-friendly search
const synonyms: Record<string, string[]> = {
  'waterproof': ['waterproofing', 'aqua', 'moisture', 'damp', 'seal'],
  'cutting': ['cut', 'blade', 'disc', 'saw', 'cutter', 'diamond'],
  'leveling': ['levelling', 'level', 'system', 'clips', 'wedges'],
  'spacer': ['spacing', 'cross', 'separator', 'gap'],
  'adhesive': ['glue', 'bond', 'stick', 'cement', 'grip'],
  'trowel': ['float', 'grouting', 'notched'],
  'clean': ['cleaner', 'cleaning', 'wash', 'remove'],
  'silicone': ['sealant', 'seal', 'caulk', 'joint'],
  'tool': ['equipment', 'instrument'],
  'mat': ['matting', 'membrane', 'sheet'],
  'tile': ['tiling', 'ceramic', 'porcelain'],
  'floor': ['flooring', 'underfloor'],
  'movement': ['expansion', 'joint'],
  'anti': ['antimould', 'mould', 'mold'],
};

// Common misspellings
const spellCorrections: Record<string, string> = {
  'leveling': 'levelling',
  'color': 'colour',
  'aluminum': 'aluminium',
  'center': 'centre',
  'montelite': 'montolit',
  'ramondi': 'raimondi',
  'alphachem': 'ALPHACHEM',
  'ultratile': 'UltraTile',
};

export const useIntelligentSearch = (products: Product[]) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Create enhanced searchable data
  const searchableProducts = useMemo(() => {
    return products.map(product => ({
      ...product,
      searchableText: [
        product.name,
        product.code,
        product.brand,
        product.category,
        product.badge || '',
        // Add category-based keywords
        product.category === 'adhesives' ? 'glue bond stick' : '',
        product.category === 'cutting' ? 'blade disc saw diamond' : '',
        product.category === 'waterproofing' ? 'waterproof moisture seal' : '',
        product.category === 'levelling' ? 'level system clips wedges' : '',
        product.category === 'spacers' ? 'gap separator cross' : '',
        product.category === 'cleaning' ? 'cleaner wash remove' : '',
        product.category === 'tools' ? 'equipment instrument' : '',
        product.category === 'installation' ? 'install fitting' : '',
        product.category === 'heating' ? 'underfloor heat warm' : '',
      ].join(' ').toLowerCase(),
    }));
  }, [products]);

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    const options = {
      keys: [
        { name: 'name', weight: 0.3 },
        { name: 'code', weight: 0.25 },
        { name: 'brand', weight: 0.2 },
        { name: 'searchableText', weight: 0.25 },
      ],
      threshold: 0.4, // Lower = more strict matching
      distance: 100,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
    };
    return new Fuse(searchableProducts, options);
  }, [searchableProducts]);

  const expandQuery = (query: string): string => {
    let expandedQuery = query.toLowerCase().trim();
    
    // Apply spell corrections
    Object.entries(spellCorrections).forEach(([wrong, correct]) => {
      expandedQuery = expandedQuery.replace(new RegExp(wrong, 'gi'), correct);
    });

    // Expand with synonyms
    Object.entries(synonyms).forEach(([key, values]) => {
      if (expandedQuery.includes(key)) {
        expandedQuery += ' ' + values.join(' ');
      }
      values.forEach(value => {
        if (expandedQuery.includes(value)) {
          expandedQuery += ' ' + key;
        }
      });
    });

    return expandedQuery;
  };

  const intelligentSearch = (query: string, category: string = 'all', brand: string = 'all') => {
    if (!query.trim()) {
      let filtered = products;
      
      if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
      }
      
      if (brand !== 'all') {
        filtered = filtered.filter(product => product.brand === brand);
      }
      
      return {
        results: filtered,
        didYouMean: null,
        resultCount: filtered.length,
        searchTerm: '',
      };
    }

    // Expand query with synonyms and corrections
    const expandedQuery = expandQuery(query);
    
    // Perform fuzzy search
    const searchResults = fuse.search(expandedQuery);
    
    // Filter by category and brand
    let filteredResults = searchResults.map(result => result.item);
    
    if (category !== 'all') {
      filteredResults = filteredResults.filter(product => product.category === category);
    }
    
    if (brand !== 'all') {
      filteredResults = filteredResults.filter(product => product.brand === brand);
    }

    // Check for spell corrections
    let didYouMean = null;
    const originalQuery = query.toLowerCase();
    const correctedQuery = expandQuery(originalQuery);
    if (originalQuery !== correctedQuery && filteredResults.length === 0) {
      // Try search with just the corrected terms
      const correctedResults = fuse.search(correctedQuery);
      if (correctedResults.length > 0) {
        didYouMean = Object.entries(spellCorrections).find(([wrong]) => 
          originalQuery.includes(wrong)
        )?.[1] || 'levelling';
      }
    }

    // Add to recent searches
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches(prev => [query.trim(), ...prev].slice(0, 5));
    }

    return {
      results: filteredResults,
      didYouMean,
      resultCount: filteredResults.length,
      searchTerm: query,
    };
  };

  const getAutoCompleteSuggestions = (query: string): string[] => {
    if (!query || query.length < 2) return [];

    const suggestions = new Set<string>();
    
    // Add product name suggestions
    products.forEach(product => {
      if (product.name.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(product.name);
      }
      if (product.brand.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(product.brand);
      }
      if (product.code.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(product.code);
      }
    });

    // Add common search terms
    const commonTerms = [
      'waterproof', 'cutting tools', 'levelling system', 'tile spacers',
      'diamond blade', 'adhesive', 'silicone sealant', 'grout cleaner',
      'trowel', 'matting', 'heating system'
    ];
    
    commonTerms.forEach(term => {
      if (term.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(term);
      }
    });

    return Array.from(suggestions).slice(0, 6);
  };

  const getBrandCounts = () => {
    const brandCounts: Record<string, number> = {};
    products.forEach(product => {
      brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
    });
    
    return Object.entries(brandCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 7); // Top 7 brands
  };

  return {
    intelligentSearch,
    getAutoCompleteSuggestions,
    getBrandCounts,
    recentSearches,
  };
};