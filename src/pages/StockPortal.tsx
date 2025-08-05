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
      name: "LevTec Levelling System Starter Kit",
      code: "LT-START-KIT",
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
      id: "2",
      name: "Raimondi Levelling System Clips 1.5mm",
      code: "RM-CLIP-1.5",
      brand: "Raimondi",
      image: levellingSystemKit,
      stockLevel: 12500,
      stockStatus: "high" as const,
      price: 0.08,
      unit: "each",
      badge: "Bulk Available",
      category: "levelling"
    },
    {
      id: "3",
      name: "AquaTank Waterproofing Kit Complete",
      code: "AQ-TANK-COMP",
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
      id: "4",
      name: "Y-Spacers 3mm Cross",
      code: "YS-3MM-CROSS",
      brand: "Y-Spacers",
      image: "/api/placeholder/400/300",
      stockLevel: 25000,
      stockStatus: "high" as const,
      price: 0.02,
      unit: "each",
      badge: "High Volume",
      category: "spacers"
    },
    {
      id: "5",
      name: "MONTOLIT TutorCut Diamond Blade 115mm",
      code: "MT-115-DIAM",
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
      code: "SM-XT-1X10",
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
      name: "Alphachem Flexible Adhesive 20kg",
      code: "AC-FLEX-20",
      brand: "Alphachem",
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
      code: "DB-CI-1X5",
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
      name: "Ultra Tile ProFix Rapid Set",
      code: "UT-RAPID-SET",
      brand: "Ultra Tile",
      image: tileAdhesive,
      stockLevel: 5,
      stockStatus: "low" as const,
      price: 35.20,
      unit: "bags",
      category: "adhesives"
    },
    {
      id: "10",
      name: "Premium Edge Trim Chrome 12mm",
      code: "PET-CHR-12",
      brand: "Premium",
      image: "/api/placeholder/400/300",
      stockLevel: 0,
      stockStatus: "out" as const,
      price: 8.99,
      unit: "lengths",
      expectedDate: "Feb 15th",
      category: "spacers"
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