import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

const SearchAndFilter = ({ searchQuery, onSearchChange, selectedCategory, onCategoryChange }: SearchAndFilterProps) => {
  const categories = [
    { value: "all", label: "All Products" },
    { value: "adhesives", label: "Adhesives & Grouts" },
    { value: "levelling", label: "Levelling Systems" },
    { value: "spacers", label: "Tile Spacers & Trims" },
    { value: "cutting", label: "Cutting Tools & Blades" },
    { value: "waterproofing", label: "Waterproofing & Matting" },
    { value: "accessories", label: "Installation Accessories" },
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
                  {category.label}
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