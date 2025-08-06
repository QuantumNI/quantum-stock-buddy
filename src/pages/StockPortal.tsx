import React, { useState } from "react";
import StockHeader from "@/components/StockHeader";
import SearchAndFilter from "@/components/SearchAndFilter";
import ProductTable from "@/components/ProductTable";
import BulkCalculator from "@/components/BulkCalculator";
import ProfessionalNotices from "@/components/ProfessionalNotices";

// Import product images
import levellingSystemKit from "@/assets/levelling-system-kit.jpg";
import diamondBlade from "@/assets/diamond-blade.jpg";
import waterproofingKit from "@/assets/waterproofing-kit.jpg";
import tileAdhesive from "@/assets/tile-adhesive.jpg";

import { useIntelligentSearch } from "@/hooks/useIntelligentSearch";

const StockPortal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const products = [
    {
      id: "1",
      name: "LevTec Levelling System Starter Kit",
      code: "LT-KIT-576",
      brand: "LevTec",
      image: levellingSystemKit,
      stockLevel: 850,
      stockStatus: "high" as const,
      price: 24.99,
      unit: "kits",
      badge: "Professional Grade",
      category: "levelling"
    },
    {
      id: "2",
      name: "Y Spacers 3mm Cross",
      code: "TY-SPC-234",
      brand: "Tylix",
      image: "/api/placeholder/400/300",
      stockLevel: 33500,
      stockStatus: "high" as const,
      price: 0.04,
      unit: "pieces",
      badge: "High Volume",
      category: "spacers"
    },
    {
      id: "3",
      name: "ALPHACHEM Alpha Grip",
      code: "AC-ADH-567",
      brand: "ALPHACHEM",
      image: tileAdhesive,
      stockLevel: 450,
      stockStatus: "high" as const,
      price: 16.75,
      unit: "tubes",
      badge: "Premium Brand",
      category: "adhesives"
    },
    {
      id: "4",
      name: "AquaTank Waterproofing Kit Complete",
      code: "AQ-KIT-892",
      brand: "AquaTank",
      image: waterproofingKit,
      stockLevel: 370,
      stockStatus: "high" as const,
      price: 89.99,
      unit: "kits",
      badge: "Waterproof",
      category: "waterproofing"
    },
    {
      id: "5",
      name: "MONTOLIT Diamond Blade 115mm",
      code: "MT-BLD-445",
      brand: "MONTOLIT",
      image: diamondBlade,
      stockLevel: 125,
      stockStatus: "high" as const,
      price: 28.50,
      unit: "blades",
      badge: "Diamond Grade",
      category: "cutting"
    },
    {
      id: "6",
      name: "Raimondi Levelling Clips 2mm",
      code: "RM-CLP-678",
      brand: "Raimondi",
      image: levellingSystemKit,
      stockLevel: 15000,
      stockStatus: "high" as const,
      price: 0.08,
      unit: "clips",
      badge: "High Volume",
      category: "levelling"
    },
    {
      id: "7",
      name: "UltraTile ProFlex S2 Adhesive 20kg",
      code: "UT-ADH-234",
      brand: "UltraTile",
      image: tileAdhesive,
      stockLevel: 280,
      stockStatus: "high" as const,
      price: 32.45,
      unit: "bags",
      badge: "Flexible",
      category: "adhesives"
    },
    {
      id: "8",
      name: "Tylix Notched Trowel 10mm",
      code: "TY-TWL-567",
      brand: "Tylix",
      image: "/api/placeholder/400/300",
      stockLevel: 180,
      stockStatus: "high" as const,
      price: 18.99,
      unit: "trowels",
      badge: "Professional Tool",
      category: "tools"
    },
    {
      id: "9",
      name: "StructaMat Pro Movement Matting",
      code: "SM-MAT-445",
      brand: "StructaMat",
      image: "/api/placeholder/400/300",
      stockLevel: 95,
      stockStatus: "medium" as const,
      price: 45.75,
      unit: "rolls",
      badge: "Professional Grade",
      category: "waterproofing"
    },
    {
      id: "10",
      name: "Lithofin KF Grout Cleaner 1L",
      code: "LF-CLN-789",
      brand: "Lithofin",
      image: "/api/placeholder/400/300",
      stockLevel: 320,
      stockStatus: "high" as const,
      price: 19.25,
      unit: "bottles",
      badge: "Premium Brand",
      category: "cleaning"
    },
    {
      id: "11",
      name: "DART Diamond Disc Blade 115mm",
      code: "DT-BLD-234",
      brand: "DART",
      image: diamondBlade,
      stockLevel: 95,
      stockStatus: "medium" as const,
      price: 22.50,
      unit: "blades",
      badge: "Diamond Grade",
      category: "cutting"
    },
    {
      id: "12",
      name: "Aluminium Straight Edge Trim 2.5m",
      code: "QT-TRM-567",
      brand: "Quantum",
      image: "/api/placeholder/400/300",
      stockLevel: 850,
      stockStatus: "high" as const,
      price: 8.75,
      unit: "lengths",
      badge: "Professional Finish",
      category: "spacers"
    },
    {
      id: "13",
      name: "Raimondi Levelling System Wedges",
      code: "RM-WDG-445",
      brand: "Raimondi",
      image: levellingSystemKit,
      stockLevel: 25000,
      stockStatus: "high" as const,
      price: 0.05,
      unit: "wedges",
      badge: "High Volume",
      category: "levelling"
    },
    {
      id: "14",
      name: "MONTOLIT Flash Line Evo Cutter",
      code: "MT-SAW-789",
      brand: "MONTOLIT",
      image: "/api/placeholder/400/300",
      stockLevel: 45,
      stockStatus: "medium" as const,
      price: 485.00,
      unit: "cutters",
      badge: "Premium Brand",
      category: "cutting"
    },
    {
      id: "15",
      name: "Sigma 3B4 Tile Cutter",
      code: "SG-SAW-234",
      brand: "Sigma",
      image: "/api/placeholder/400/300",
      stockLevel: 35,
      stockStatus: "medium" as const,
      price: 295.50,
      unit: "cutters",
      badge: "Professional Tool",
      category: "cutting"
    },
    {
      id: "16",
      name: "LTP Grout Protector Spray 1L",
      code: "LP-SEL-567",
      brand: "LTP",
      image: "/api/placeholder/400/300",
      stockLevel: 180,
      stockStatus: "high" as const,
      price: 16.99,
      unit: "bottles",
      badge: "Professional Grade",
      category: "cleaning"
    },
    {
      id: "17",
      name: "Tylix Tile Spacers 3mm",
      code: "TY-SPC-445",
      brand: "Tylix",
      image: "/api/placeholder/400/300",
      stockLevel: 28000,
      stockStatus: "high" as const,
      price: 0.03,
      unit: "pieces",
      badge: "High Volume",
      category: "spacers"
    },
    {
      id: "18",
      name: "ALPHACHEM Sanitary Silicone 808",
      code: "AC-SEL-789",
      brand: "ALPHACHEM",
      image: "/api/placeholder/400/300",
      stockLevel: 520,
      stockStatus: "high" as const,
      price: 12.25,
      unit: "tubes",
      badge: "Premium Brand",
      category: "adhesives"
    },
    {
      id: "19",
      name: "Durabase CI++ Matting",
      code: "DB-MAT-234",
      brand: "Durabase",
      image: "/api/placeholder/400/300",
      stockLevel: 75,
      stockStatus: "medium" as const,
      price: 38.50,
      unit: "rolls",
      badge: "Professional Grade",
      category: "waterproofing"
    },
    {
      id: "20",
      name: "BASEBOARD Shower Tray",
      code: "BB-TRY-567",
      brand: "BASEBOARD",
      image: "/api/placeholder/400/300",
      stockLevel: 85,
      stockStatus: "medium" as const,
      price: 125.00,
      unit: "trays",
      badge: "Professional Grade",
      category: "installation"
    },
    {
      id: "21",
      name: "Marshalltown Grouting Float",
      code: "MW-FLT-445",
      brand: "Marshalltown",
      image: "/api/placeholder/400/300",
      stockLevel: 120,
      stockStatus: "high" as const,
      price: 22.75,
      unit: "floats",
      badge: "Professional Tool",
      category: "tools"
    },
    {
      id: "22",
      name: "ThermoSphere Underfloor Heating Mesh",
      code: "TS-HTG-789",
      brand: "ThermoSphere",
      image: "/api/placeholder/400/300",
      stockLevel: 65,
      stockStatus: "medium" as const,
      price: 89.99,
      unit: "rolls",
      badge: "Professional Grade",
      category: "heating"
    },
    {
      id: "23",
      name: "Confluo Standard Drain",
      code: "CF-DRN-234",
      brand: "Confluo",
      image: "/api/placeholder/400/300",
      stockLevel: 95,
      stockStatus: "medium" as const,
      price: 45.50,
      unit: "drains",
      badge: "Professional Grade",
      category: "installation"
    },
    {
      id: "24",
      name: "Flex High Speed Polisher",
      code: "FX-POL-567",
      brand: "Flex",
      image: "/api/placeholder/400/300",
      stockLevel: 25,
      stockStatus: "low" as const,
      price: 185.00,
      unit: "polishers",
      badge: "Professional Tool",
      category: "cutting"
    },
    {
      id: "25",
      name: "Everbuild Stixall Extreme Power",
      code: "EB-ADH-445",
      brand: "Everbuild",
      image: "/api/placeholder/400/300",
      stockLevel: 280,
      stockStatus: "high" as const,
      price: 14.75,
      unit: "tubes",
      badge: "Professional Grade",
      category: "adhesives"
    },
    {
      id: "26",
      name: "PVC Straight Edge Trim 2.5m",
      code: "QT-TRM-789",
      brand: "Quantum",
      image: "/api/placeholder/400/300",
      stockLevel: 1200,
      stockStatus: "high" as const,
      price: 6.25,
      unit: "lengths",
      badge: "High Volume",
      category: "spacers"
    },
    {
      id: "27",
      name: "MONTOLIT Mastertech Diamond Hand Pads",
      code: "MT-PAD-234",
      brand: "MONTOLIT",
      image: "/api/placeholder/400/300",
      stockLevel: 150,
      stockStatus: "high" as const,
      price: 8.50,
      unit: "pads",
      badge: "Diamond Grade",
      category: "cutting"
    },
    {
      id: "28",
      name: "UltraTile ProGrout Flexible",
      code: "UT-GRT-567",
      brand: "UltraTile",
      image: "/api/placeholder/400/300",
      stockLevel: 195,
      stockStatus: "high" as const,
      price: 28.99,
      unit: "bags",
      badge: "Flexible",
      category: "adhesives"
    },
    {
      id: "29",
      name: "Raimondi Plastic Tile Wedges",
      code: "RM-WDG-445",
      brand: "Raimondi",
      image: "/api/placeholder/400/300",
      stockLevel: 18500,
      stockStatus: "high" as const,
      price: 0.06,
      unit: "wedges",
      badge: "High Volume",
      category: "spacers"
    },
    {
      id: "30",
      name: "LevTec Levelling System Clips",
      code: "LT-CLP-789",
      brand: "LevTec",
      image: levellingSystemKit,
      stockLevel: 12000,
      stockStatus: "high" as const,
      price: 0.12,
      unit: "clips",
      badge: "High Volume",
      category: "levelling"
    },
    {
      id: "31",
      name: "Lithofin MN Power Clean 1L",
      code: "LF-CLN-234",
      brand: "Lithofin",
      image: "/api/placeholder/400/300",
      stockLevel: 145,
      stockStatus: "high" as const,
      price: 21.50,
      unit: "bottles",
      badge: "Premium Brand",
      category: "cleaning"
    },
    {
      id: "32",
      name: "Tylix Grouting Float",
      code: "TY-FLT-567",
      brand: "Tylix",
      image: "/api/placeholder/400/300",
      stockLevel: 220,
      stockStatus: "high" as const,
      price: 15.25,
      unit: "floats",
      badge: "Professional Tool",
      category: "tools"
    },
    {
      id: "33",
      name: "Chrome Straight Edge Trim 2.5m",
      code: "QT-TRM-445",
      brand: "Quantum",
      image: "/api/placeholder/400/300",
      stockLevel: 380,
      stockStatus: "high" as const,
      price: 12.75,
      unit: "lengths",
      badge: "Professional Finish",
      category: "spacers"
    },
    {
      id: "34",
      name: "DART Orange Latex Builders Glove",
      code: "DT-GLV-789",
      brand: "DART",
      image: "/api/placeholder/400/300",
      stockLevel: 2500,
      stockStatus: "high" as const,
      price: 3.25,
      unit: "pairs",
      badge: "High Volume",
      category: "installation"
    },
    {
      id: "35",
      name: "StructaMat XT Movement Matting",
      code: "SM-MAT-234",
      brand: "StructaMat",
      image: "/api/placeholder/400/300",
      stockLevel: 55,
      stockStatus: "medium" as const,
      price: 52.00,
      unit: "rolls",
      badge: "Professional Grade",
      category: "waterproofing"
    },
    {
      id: "36",
      name: "MONTOLIT Turmont Continuous Rim Blade",
      code: "MT-BLD-567",
      brand: "MONTOLIT",
      image: diamondBlade,
      stockLevel: 85,
      stockStatus: "medium" as const,
      price: 35.75,
      unit: "blades",
      badge: "Diamond Grade",
      category: "cutting"
    },
    {
      id: "37",
      name: "UltraTile ProLevel Rapid Leveller 20kg",
      code: "UT-LEV-445",
      brand: "UltraTile",
      image: "/api/placeholder/400/300",
      stockLevel: 165,
      stockStatus: "high" as const,
      price: 24.99,
      unit: "bags",
      badge: "Fast Setting",
      category: "installation"
    },
    {
      id: "38",
      name: "Raimondi Eco 92 Tile Cutter",
      code: "RM-SAW-789",
      brand: "Raimondi",
      image: "/api/placeholder/400/300",
      stockLevel: 28,
      stockStatus: "low" as const,
      price: 425.00,
      unit: "cutters",
      badge: "Premium Brand",
      category: "cutting"
    },
    {
      id: "39",
      name: "LTP Mattstone H2O Sealer 1L",
      code: "LP-SEL-234",
      brand: "LTP",
      image: "/api/placeholder/400/300",
      stockLevel: 95,
      stockStatus: "medium" as const,
      price: 18.75,
      unit: "bottles",
      badge: "Professional Grade",
      category: "cleaning"
    },
    {
      id: "40",
      name: "Tylix Heavy Duty Grout Rake",
      code: "TY-RAK-567",
      brand: "Tylix",
      image: "/api/placeholder/400/300",
      stockLevel: 140,
      stockStatus: "high" as const,
      price: 12.50,
      unit: "rakes",
      badge: "Professional Tool",
      category: "tools"
    },
    {
      id: "41",
      name: "ALPHACHEM Pure Anti-Mould Silicone",
      code: "AC-SEL-445",
      brand: "ALPHACHEM",
      image: "/api/placeholder/400/300",
      stockLevel: 385,
      stockStatus: "high" as const,
      price: 13.99,
      unit: "tubes",
      badge: "Premium Brand",
      category: "adhesives"
    },
    {
      id: "42",
      name: "Hexagonal Spacers 2mm",
      code: "QT-SPC-789",
      brand: "Quantum",
      image: "/api/placeholder/400/300",
      stockLevel: 22000,
      stockStatus: "high" as const,
      price: 0.02,
      unit: "pieces",
      badge: "High Volume",
      category: "spacers"
    },
    {
      id: "43",
      name: "MONTOLIT Wet Table Saw F1 Brooklyn",
      code: "MT-SAW-234",
      brand: "MONTOLIT",
      image: "/api/placeholder/400/300",
      stockLevel: 15,
      stockStatus: "low" as const,
      price: 1285.00,
      unit: "saws",
      badge: "Premium Brand",
      category: "cutting"
    },
    {
      id: "44",
      name: "Sigma Cooling Wax",
      code: "SG-WAX-567",
      brand: "Sigma",
      image: "/api/placeholder/400/300",
      stockLevel: 180,
      stockStatus: "high" as const,
      price: 8.25,
      unit: "containers",
      badge: "Professional Grade",
      category: "installation"
    },
    {
      id: "45",
      name: "UltraTile ProSealer Silicone Sealant",
      code: "UT-SEL-445",
      brand: "UltraTile",
      image: "/api/placeholder/400/300",
      stockLevel: 295,
      stockStatus: "high" as const,
      price: 11.50,
      unit: "tubes",
      badge: "Professional Grade",
      category: "adhesives"
    },
    {
      id: "46",
      name: "Raimondi Tall Levelling Clips 12-20mm",
      code: "RM-CLP-789",
      brand: "Raimondi",
      image: levellingSystemKit,
      stockLevel: 8500,
      stockStatus: "high" as const,
      price: 0.15,
      unit: "clips",
      badge: "High Volume",
      category: "levelling"
    },
    {
      id: "47",
      name: "Lithofin KF Tile Restorer 1L",
      code: "LF-RST-234",
      brand: "Lithofin",
      image: "/api/placeholder/400/300",
      stockLevel: 125,
      stockStatus: "high" as const,
      price: 23.75,
      unit: "bottles",
      badge: "Premium Brand",
      category: "cleaning"
    },
    {
      id: "48",
      name: "Tylix Tile Nippers",
      code: "TY-NIP-567",
      brand: "Tylix",
      image: "/api/placeholder/400/300",
      stockLevel: 95,
      stockStatus: "medium" as const,
      price: 16.99,
      unit: "nippers",
      badge: "Professional Tool",
      category: "tools"
    },
    {
      id: "49",
      name: "Metal Movement Joints 2.5m",
      code: "QT-JNT-445",
      brand: "Quantum",
      image: "/api/placeholder/400/300",
      stockLevel: 420,
      stockStatus: "high" as const,
      price: 9.75,
      unit: "lengths",
      badge: "Professional Finish",
      category: "spacers"
    },
    {
      id: "50",
      name: "DART Spear Shaped Drill Bits",
      code: "DT-DRL-789",
      brand: "DART",
      image: "/api/placeholder/400/300",
      stockLevel: 350,
      stockStatus: "high" as const,
      price: 7.25,
      unit: "bits",
      badge: "Professional Tool",
      category: "cutting"
    }
  ];

  const {
    intelligentSearch,
    getAutoCompleteSuggestions,
    getBrandCounts,
    recentSearches,
  } = useIntelligentSearch(products);

  const [searchResults, setSearchResults] = useState<{
    results: typeof products;
    didYouMean: string | null;
    resultCount: number;
    searchTerm: string;
    aiEnhanced: boolean;
    intent: string;
    suggestions: string[];
    enhancedQuery: string;
  }>({
    results: products,
    didYouMean: null,
    resultCount: products.length,
    searchTerm: '',
    aiEnhanced: false,
    intent: '',
    suggestions: [],
    enhancedQuery: ''
  });

  const handleSearch = async (query: string) => {
    const results = await intelligentSearch(query, selectedCategory, selectedBrand);
    setSearchResults({
      results: results.results,
      didYouMean: results.didYouMean,
      resultCount: results.resultCount,
      searchTerm: results.searchTerm,
      aiEnhanced: results.aiEnhanced || false,
      intent: results.intent || '',
      suggestions: results.suggestions || [],
      enhancedQuery: results.enhancedQuery || query
    });
  };

  // Handle search when query, category, or brand changes
  React.useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, selectedCategory, selectedBrand]);

  const suggestions = getAutoCompleteSuggestions(searchQuery);
  const brandCounts = getBrandCounts();

  return (
    <div className="min-h-screen bg-background">
      <StockHeader />
      
      <main className="container mx-auto px-4 py-8">
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          products={products}
          suggestions={suggestions}
          recentSearches={recentSearches}
          brandCounts={brandCounts}
          resultCount={searchResults.resultCount}
          didYouMean={searchResults.didYouMean}
          aiEnhanced={searchResults.aiEnhanced}
          intent={searchResults.intent}
          enhancedQuery={searchResults.enhancedQuery}
        />
        
        <div className="mb-6 bg-gradient-card p-4 rounded-lg shadow-card">
          <p className="text-center text-sm text-muted-foreground mb-2">
            ✓ Check stock availability 24/7 - even when our office is closed
          </p>
          <p className="text-center text-sm text-muted-foreground">
            For orders call <strong>028 9073 8989</strong> or email <strong>orders@quantumgroupni.com</strong>
          </p>
        </div>
        
        <ProductTable products={searchResults.results} />
        
        {searchResults.results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No products found matching your criteria.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
        
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-semibold mb-2">Quantum Group NI - Tile Accessories & Installation Tools</p>
            <p>This is Phase 1 stock checking portal - ordering functionality coming soon</p>
            <p className="mt-2">© 2024 Quantum Group NI. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default StockPortal;