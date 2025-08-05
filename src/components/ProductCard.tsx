import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  code: string;
  brand: string;
  image: string;
  stockLevel: number;
  stockStatus: "high" | "medium" | "low" | "out";
  price: number;
  unit: string;
  badge?: string;
  expectedDate?: string;
}

const ProductCard = ({ 
  name, 
  code, 
  brand, 
  image, 
  stockLevel, 
  stockStatus, 
  price, 
  unit, 
  badge,
  expectedDate 
}: ProductCardProps) => {
  const getStatusColor = () => {
    switch (stockStatus) {
      case "high": return "bg-success";
      case "medium": return "bg-warning";
      case "low": return "bg-danger";
      case "out": return "bg-muted-foreground";
      default: return "bg-muted-foreground";
    }
  };

  const getStatusText = () => {
    if (stockStatus === "out") {
      return expectedDate ? `Expected: ${expectedDate}` : "Out of Stock";
    }
    return `${stockLevel.toLocaleString()} ${unit} available`;
  };

  return (
    <Card className="h-full bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="aspect-square relative mb-3 bg-white rounded-lg overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
          {badge && (
            <Badge 
              variant="secondary" 
              className="absolute top-2 right-2 text-xs font-medium bg-primary text-primary-foreground"
            >
              {badge}
            </Badge>
          )}
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground font-medium">{brand}</p>
          <h3 className="font-semibold text-lg leading-tight mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground font-mono">{code}</p>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">£{price.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">+ VAT</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          disabled={stockStatus === "out"}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Quote
        </Button>
        <Button variant="secondary" size="sm">
          <FileText className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;