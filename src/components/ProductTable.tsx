import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";

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

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const getStatusColor = (stockLevel: number) => {
    if (stockLevel >= 100) return "bg-green-500";
    if (stockLevel >= 10) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusText = (stockLevel: number, unit: string) => {
    const formatted = stockLevel.toLocaleString();
    if (stockLevel >= 100) return `${formatted} ${unit}`;
    if (stockLevel >= 10) return `${formatted} ${unit}`;
    return `${formatted} left`;
  };

  const getStockWarning = (stockLevel: number) => {
    return stockLevel < 10 ? "Low Stock" : null;
  };

  return (
    <div className="bg-card rounded-lg shadow-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold text-foreground">Product Name</TableHead>
            <TableHead className="font-semibold text-foreground">Code</TableHead>
            <TableHead className="font-semibold text-foreground">Stock Level</TableHead>
            <TableHead className="font-semibold text-foreground">Price + VAT</TableHead>
            <TableHead className="font-semibold text-foreground">Brand</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow 
              key={product.id} 
              className={`hover:bg-muted/30 transition-colors ${
                index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
              }`}
            >
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span className="text-foreground">{product.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    {product.badge && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-primary/10 text-primary"
                      >
                        {product.badge}
                      </Badge>
                    )}
                    {getStockWarning(product.stockLevel) && (
                      <Badge 
                        variant="destructive" 
                        className="text-xs bg-red-100 text-red-700"
                      >
                        {getStockWarning(product.stockLevel)}
                      </Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm text-muted-foreground">{product.code}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div 
                    className={`w-3 h-3 rounded-full ${getStatusColor(product.stockLevel)}`}
                  ></div>
                  <span className="text-sm font-medium">
                    {getStatusText(product.stockLevel, product.unit)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold text-primary">£{product.price.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">+ VAT</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-sm">
                  {product.brand}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;