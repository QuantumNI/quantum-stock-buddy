import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  products: Product[];
}

const SearchAndFilter = ({ searchQuery, onSearchChange, selectedCategory, onCategoryChange, products }: SearchAndFilterProps) => {
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

  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search by product name or code..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
        
        <div className="lg:w-80">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="h-12 text-lg">
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
      </div>
    </div>
  );
};

export default SearchAndFilter;