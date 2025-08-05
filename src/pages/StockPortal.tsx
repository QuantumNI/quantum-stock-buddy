import { useState } from "react";
import StockHeader from "@/components/StockHeader";
import SearchAndFilter from "@/components/SearchAndFilter";
import ProductCard from "@/components/ProductCard";
import BulkCalculator from "@/components/BulkCalculator";
import ProfessionalNotices from "@/components/ProfessionalNotices";

// Import product images
import levellingSystemKit from "@/assets/levelling-system-kit.jpg";
import diamondBlade from "@/assets/diamond-blade.jpg";
import waterproofingKit from "@/assets/waterproofing-kit.jpg";
import tileAdhesive from "@/assets/tile-adhesive.jpg";

const StockPortal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: "1",
      name: "AquaTank Waterproofing Kit Complete",
      code: "AQ-KIT-COMP",
      brand: "AquaTank",
      image: waterproofingKit,
      stockLevel: 45,
      stockStatus: "medium" as const,
      price: 89.99,
      unit: "kits",
      badge: "Professional Grade",
      category: "waterproofing"
    },
    {
      id: "2",
      name: "LevTec Levelling System Starter Kit",
      code: "LT-KIT-START",
      brand: "LevTec",
      image: levellingSystemKit,
      stockLevel: 850,
      stockStatus: "high" as const,
      price: 24.99,
      unit: "kits",
      badge: "Most Popular",
      category: "levelling"
    },
    {
      id: "3",
      name: "Raimondi Levelling System Clips 1.5mm",
      code: "RM-CLIP-1.5",
      brand: "Raimondi",
      image: levellingSystemKit,
      stockLevel: 12500,
      stockStatus: "high" as const,
      price: 0.08,
      unit: "pieces",
      badge: "Bulk Available",
      category: "levelling"
    },
    {
      id: "4",
      name: "Y Spacers 3mm Cross",
      code: "QT-SPC-3MM",
      brand: "Quantum",
      image: "/api/placeholder/400/300",
      stockLevel: 25000,
      stockStatus: "high" as const,
      price: 0.02,
      unit: "pieces",
      badge: "High Volume",
      category: "spacers"
    },
    {
      id: "5",
      name: "MONTOLIT TutorCut Diamond Blade 115mm",
      code: "MT-BLD-115",
      brand: "MONTOLIT",
      image: diamondBlade,
      stockLevel: 180,
      stockStatus: "high" as const,
      price: 18.50,
      unit: "blades",
      badge: "Professional Tool",
      category: "cutting"
    },
    {
      id: "6",
      name: "Structamat XT Movement Matting 1m x 10m",
      code: "SM-MAT-XT10",
      brand: "Structamat",
      image: "/api/placeholder/400/300",
      stockLevel: 75,
      stockStatus: "medium" as const,
      price: 45.99,
      unit: "rolls",
      badge: "Prevents Cracking",
      category: "waterproofing"
    },
    {
      id: "7",
      name: "ALPHACHEM Alpha Grip Adhesive 20kg",
      code: "AC-ADH-GRIP",
      brand: "ALPHACHEM",
      image: tileAdhesive,
      stockLevel: 320,
      stockStatus: "high" as const,
      price: 28.75,
      unit: "bags",
      badge: "Fast Setting",
      category: "adhesives"
    },
    {
      id: "8",
      name: "Durabase CI++ Matting 1m x 5m",
      code: "DB-MAT-CI5",
      brand: "Durabase",
      image: "/api/placeholder/400/300",
      stockLevel: 95,
      stockStatus: "medium" as const,
      price: 32.40,
      unit: "rolls",
      badge: "Underfloor Heating",
      category: "waterproofing"
    },
    {
      id: "9",
      name: "ALPHACHEM Sanitary Silicone 808",
      code: "AC-SIL-808",
      brand: "ALPHACHEM",
      image: "/api/placeholder/400/300",
      stockLevel: 450,
      stockStatus: "high" as const,
      price: 12.99,
      unit: "tubes",
      badge: "Anti-Mould",
      category: "adhesives"
    },
    {
      id: "10",
      name: "115mm Diamond Disc Blade",
      code: "QT-BLD-115D",
      brand: "Quantum",
      image: diamondBlade,
      stockLevel: 95,
      stockStatus: "medium" as const,
      price: 24.99,
      unit: "blades",
      badge: "Diamond Grade",
      category: "cutting"
    },
    {
      id: "11",
      name: "Aluminium Coloured Straight Edge Trims 2.5m",
      code: "QT-TRM-COL25",
      brand: "Quantum",
      image: "/api/placeholder/400/300",
      stockLevel: 280,
      stockStatus: "high" as const,
      price: 8.99,
      unit: "lengths",
      badge: "Professional Finish",
      category: "spacers"
    },
    {
      id: "12",
      name: "BASEBOARD Panels",
      code: "QT-PNL-BASE",
      brand: "Quantum",
      image: "/api/placeholder/400/300",
      stockLevel: 125,
      stockStatus: "high" as const,
      price: 55.00,
      unit: "panels",
      badge: "Wet Room",
      category: "waterproofing"
    },
    {
      id: "13",
      name: "ALPHACHEM Pure Anti-Mould Silicone",
      code: "AC-SIL-MOULD",
      brand: "ALPHACHEM",
      image: "/api/placeholder/400/300",
      stockLevel: 380,
      stockStatus: "high" as const,
      price: 15.99,
      unit: "tubes",
      badge: "Anti-Mould",
      category: "adhesives"
    },
    {
      id: "14",
      name: "ALPHACHEM Decorators Caulk",
      code: "AC-CAULK-DEC",
      brand: "ALPHACHEM",
      image: "/api/placeholder/400/300",
      stockLevel: 1200,
      stockStatus: "high" as const,
      price: 9.99,
      unit: "tubes",
      badge: "High Volume",
      category: "adhesives"
    },
    {
      id: "15",
      name: "Aluminium Mill Straight Edge Trim 2.5m",
      code: "QT-TRM-MILL25",
      brand: "Quantum",
      image: "/api/placeholder/400/300",
      stockLevel: 195,
      stockStatus: "high" as const,
      price: 7.50,
      unit: "lengths",
      badge: "Professional Finish",
      category: "spacers"
    },
    {
      id: "16",
      name: "AquaBoard Drywall Screws",
      code: "QT-SCR-AQUA",
      brand: "Quantum",
      image: "/api/placeholder/400/300",
      stockLevel: 5000,
      stockStatus: "high" as const,
      price: 0.15,
      unit: "pieces",
      badge: "High Volume",
      category: "installation"
    },
    {
      id: "17",
      name: "Raimondi Levelling System Starter Kit",
      code: "RM-KIT-START",
      brand: "Raimondi",
      image: levellingSystemKit,
      stockLevel: 265,
      stockStatus: "high" as const,
      price: 35.50,
      unit: "kits",
      badge: "Professional Grade",
      category: "levelling"
    },
    {
      id: "18",
      name: "ALPHACHEM Alpha Grip Solvent Free",
      code: "AC-ADH-SOLV",
      brand: "ALPHACHEM",
      image: tileAdhesive,
      stockLevel: 285,
      stockStatus: "high" as const,
      price: 31.20,
      unit: "tubes",
      badge: "Solvent Free",
      category: "adhesives"
    },
    {
      id: "19",
      name: "ALPHACHEM MP & Sanitary Silicone",
      code: "AC-SIL-MP",
      brand: "ALPHACHEM",
      image: "/api/placeholder/400/300",
      stockLevel: 340,
      stockStatus: "high" as const,
      price: 14.50,
      unit: "tubes",
      badge: "Multi-Purpose",
      category: "adhesives"
    },
    {
      id: "20",
      name: "Adhesive for Silicon Carbide Paper Discs",
      code: "QT-ADH-CARB",
      brand: "Quantum",
      image: "/api/placeholder/400/300",
      stockLevel: 150,
      stockStatus: "high" as const,
      price: 18.99,
      unit: "tubes",
      badge: "Specialized Use",
      category: "adhesives"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <StockHeader />
      
      <main className="container mx-auto px-4 py-8">
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <ProfessionalNotices />
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Available Products ({filteredProducts.length})
              </h2>
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No products found matching your criteria.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search or category filter.
                </p>
              </div>
            )}
          </div>
          
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <BulkCalculator />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StockPortal;