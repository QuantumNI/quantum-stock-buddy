import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const BulkCalculator = () => {
  const [area, setArea] = useState("");
  const [tileSize, setTileSize] = useState("");

  const tileSizes = [
    { value: "300x300", label: "300x300mm", tilesPerM2: 11.1, spacersPerM2: 44 },
    { value: "600x600", label: "600x600mm", tilesPerM2: 2.8, spacersPerM2: 11 },
    { value: "450x450", label: "450x450mm", tilesPerM2: 4.9, spacersPerM2: 20 },
    { value: "400x400", label: "400x400mm", tilesPerM2: 6.3, spacersPerM2: 25 },
    { value: "200x200", label: "200x200mm", tilesPerM2: 25, spacersPerM2: 100 },
  ];

  const calculateMaterials = () => {
    if (!area || !tileSize) return null;
    
    const selectedTile = tileSizes.find(t => t.value === tileSize);
    if (!selectedTile) return null;
    
    const areaNum = parseFloat(area);
    const spacersNeeded = Math.ceil(selectedTile.spacersPerM2 * areaNum);
    const adhesiveNeeded = Math.ceil(areaNum * 1.5); // 1.5kg per m²
    
    return {
      spacers: spacersNeeded,
      adhesive: adhesiveNeeded,
      tiles: Math.ceil(selectedTile.tilesPerM2 * areaNum * 1.1) // 10% extra
    };
  };

  const materials = calculateMaterials();

  return (
    <Card className="bg-primary text-primary-foreground shadow-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calculator className="h-6 w-6" />
          Project Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="area" className="text-primary-foreground">
              Area to tile (m²)
            </Label>
            <Input
              id="area"
              type="number"
              placeholder="Enter area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
          
          <div>
            <Label htmlFor="tile-size" className="text-primary-foreground">
              Tile size
            </Label>
            <Select value={tileSize} onValueChange={setTileSize}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select tile size" />
              </SelectTrigger>
              <SelectContent>
                {tileSizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {materials && (
          <div className="bg-white/10 rounded-lg p-4 mt-4">
            <h4 className="font-semibold mb-3">Materials needed for your project:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="font-medium">Tiles</p>
                <p className="text-white/80">{materials.tiles} tiles</p>
              </div>
              <div>
                <p className="font-medium">Spacers</p>
                <p className="text-white/80">{materials.spacers} pieces</p>
              </div>
              <div>
                <p className="font-medium">Adhesive</p>
                <p className="text-white/80">{materials.adhesive}kg approx</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BulkCalculator;