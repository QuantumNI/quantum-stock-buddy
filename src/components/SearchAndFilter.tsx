import { Search, Clock, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";

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

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedBrand: string;
  onBrandChange: (value: string) => void;
  products: Product[];
  suggestions: string[];
  recentSearches: string[];
  brandCounts: [string, number][];
  resultCount: number;
  didYouMean: string | null;
  aiEnhanced?: boolean;
  intent?: string;
  enhancedQuery?: string;
  exactMatches?: number;
}

const SearchAndFilter = ({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  selectedBrand,
  onBrandChange,
  products,
  suggestions,
  recentSearches,
  brandCounts,
  resultCount,
  didYouMean,
  aiEnhanced = false,
  intent = '',
  enhancedQuery = '',
  exactMatches = 0
}: SearchAndFilterProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getCategoryCount = (categoryValue: string) => {
    if (categoryValue === "all") return products.length;
    return products.filter(product => product.category === categoryValue).length;
  };

  const categories = [
    { value: "all", label: "All Products" },
    { value: "adhesives", label: "Adhesives & Sealants" },
    { value: "cutting", label: "Cutting Tools & Blades" },
    { value: "levelling", label: "Levelling Systems" },
    { value: "spacers", label: "Spacers & Accessories" },
    { value: "waterproofing", label: "Waterproofing & Matting" },
    { value: "cleaning", label: "Cleaning & Maintenance" },
    { value: "tools", label: "Installation Tools" },
    { value: "installation", label: "Installation Accessories" },
    { value: "heating", label: "Heating Systems" },
  ];

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-GB';
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onSearchChange(transcript);
      };
      
      recognition.start();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-6">
      <div className="flex flex-col gap-4">
        {/* Search Bar with Suggestions */}
        <div className="flex-1 relative" ref={inputRef}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search products... try 'waterproof', 'cutting tools', or product codes"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10 pr-12 h-12 text-lg"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVoiceSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <Mic className="h-4 w-4" />
          </Button>
          
          {/* Auto-complete Suggestions */}
          {showSuggestions && (searchQuery.length >= 2 || recentSearches.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {searchQuery.length >= 2 && suggestions.length > 0 && (
                <div className="p-2">
                  <div className="text-xs text-muted-foreground mb-2 px-2">Suggestions</div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-2 py-1 hover:bg-muted rounded text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              {recentSearches.length > 0 && searchQuery.length < 2 && (
                <div className="p-2">
                  <div className="text-xs text-muted-foreground mb-2 px-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Recent searches
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-2 py-1 hover:bg-muted rounded text-sm"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label} ({getCategoryCount(category.value)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Select value={selectedBrand} onValueChange={onBrandChange}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands ({products.length})</SelectItem>
                {brandCounts.map(([brand, count]) => (
                  <SelectItem key={brand} value={brand}>
                    {brand} ({count})
                  </SelectItem>
                ))}
                {brandCounts.length > 0 && (
                  <SelectItem value="others">
                    Others ({products.length - brandCounts.reduce((sum, [,count]) => sum + count, 0)})
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Brand Quick Filters */}
        <div className="flex flex-wrap gap-2">
          {brandCounts.slice(0, 6).map(([brand, count]) => (
            <Button
              key={brand}
              variant={selectedBrand === brand ? "default" : "outline"}
              size="sm"
              onClick={() => onBrandChange(selectedBrand === brand ? "all" : brand)}
              className="text-xs"
            >
              {brand} ({count})
            </Button>
          ))}
        </div>

        {/* Search Results Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex flex-col gap-1">
            <div>
              {searchQuery ? (
                <span>
                  {exactMatches > 0 ? (
                    <span>
                      Found <span className="font-semibold text-green-600">{exactMatches} exact match{exactMatches > 1 ? 'es' : ''}</span>
                      {resultCount > exactMatches && <span> and {resultCount - exactMatches} related product{resultCount - exactMatches > 1 ? 's' : ''}</span>}
                      {' '}for '{searchQuery}'
                    </span>
                  ) : (
                    <span>Found {resultCount} products for '{searchQuery}'</span>
                  )}
                  {aiEnhanced && enhancedQuery !== searchQuery && (
                    <span className="text-primary"> (enhanced: "{enhancedQuery}")</span>
                  )}
                  {didYouMean && (
                    <span className="ml-2">
                      - Did you mean: 
                      <button 
                        onClick={() => onSearchChange(didYouMean)}
                        className="text-primary hover:underline ml-1"
                      >
                        {didYouMean}
                      </button>
                      ?
                    </span>
                  )}
                </span>
              ) : (
                <span>Showing all {resultCount} products</span>
              )}
            </div>
            {intent && (
              <div className="text-xs text-primary">
                AI Intent: {intent}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {aiEnhanced ? (
              <Badge variant="default" className="text-xs bg-primary">
                🤖 AI-Enhanced
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs">
                AI-powered search
              </Badge>
            )}
            <span>Last synced: 2 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchAndFilter;