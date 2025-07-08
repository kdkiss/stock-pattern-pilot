import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Filter, 
  Search, 
  TrendingUp,
  Volume2,
  DollarSign,
  Settings,
  Play,
  RotateCcw
} from "lucide-react";

interface ScreeningCriteria {
  minPrice: number;
  maxPrice: number;
  minVolume: number;
  minMarketCap: number;
  sectors: string[];
  volatilityRange: number[];
  rsiRange: number[];
  enableMomentum: boolean;
  enableBreakout: boolean;
  enableReversal: boolean;
}

const sectorOptions = [
  "Technology", "Healthcare", "Financial", "Energy", 
  "Consumer Discretionary", "Industrials", "Materials", 
  "Real Estate", "Utilities", "Telecommunications"
];

export function ScreeningFilters() {
  const [criteria, setCriteria] = useState<ScreeningCriteria>({
    minPrice: 10,
    maxPrice: 500,
    minVolume: 1000000,
    minMarketCap: 1000000000,
    sectors: ["Technology", "Healthcare"],
    volatilityRange: [15, 40],
    rsiRange: [20, 80],
    enableMomentum: true,
    enableBreakout: true,
    enableReversal: false
  });

  const [screeningResults, setScreeningResults] = useState([
    {
      symbol: "NVDA",
      price: 722.15,
      volume: "45.2M",
      marketCap: "1.78T",
      sector: "Technology",
      signals: ["Momentum", "Breakout"]
    },
    {
      symbol: "AAPL", 
      price: 185.42,
      volume: "89.3M",
      marketCap: "2.87T",
      sector: "Technology",
      signals: ["Reversal"]
    },
    {
      symbol: "JNJ",
      price: 164.73,
      volume: "12.8M", 
      marketCap: "428.9B",
      sector: "Healthcare",
      signals: ["Momentum"]
    }
  ]);

  const runScreening = () => {
    // Simulate screening process
    setScreeningResults(prev => prev.map(stock => ({
      ...stock,
      signals: Math.random() > 0.5 ? ["Momentum", "Breakout"] : ["Reversal"]
    })));
  };

  const resetFilters = () => {
    setCriteria({
      minPrice: 10,
      maxPrice: 500,
      minVolume: 1000000,
      minMarketCap: 1000000000,
      sectors: [],
      volatilityRange: [15, 40],
      rsiRange: [20, 80],
      enableMomentum: true,
      enableBreakout: true,
      enableReversal: false
    });
  };

  return (
    <div className="space-y-6">
      {/* Screening Controls */}
      <Card className="bg-gradient-to-br from-card to-secondary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Screening Criteria
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minPrice">Minimum Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="minPrice"
                  type="number"
                  value={criteria.minPrice}
                  onChange={(e) => setCriteria(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxPrice">Maximum Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="maxPrice"
                  type="number"
                  value={criteria.maxPrice}
                  onChange={(e) => setCriteria(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Volume & Market Cap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Minimum Volume</Label>
              <div className="relative">
                <Volume2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={criteria.minVolume}
                  onChange={(e) => setCriteria(prev => ({ ...prev, minVolume: Number(e.target.value) }))}
                  className="pl-10"
                  placeholder="1,000,000"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Minimum Market Cap</Label>
              <Input
                type="number"
                value={criteria.minMarketCap}
                onChange={(e) => setCriteria(prev => ({ ...prev, minMarketCap: Number(e.target.value) }))}
                placeholder="1,000,000,000"
              />
            </div>
          </div>

          {/* Sectors */}
          <div className="space-y-2">
            <Label>Sectors</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select sectors" />
              </SelectTrigger>
              <SelectContent>
                {sectorOptions.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {criteria.sectors.map((sector) => (
                <Badge key={sector} variant="secondary" className="gap-1">
                  {sector}
                  <button
                    onClick={() => setCriteria(prev => ({
                      ...prev,
                      sectors: prev.sectors.filter(s => s !== sector)
                    }))}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Volatility Range */}
          <div className="space-y-2">
            <Label>Volatility Range: {criteria.volatilityRange[0]}% - {criteria.volatilityRange[1]}%</Label>
            <Slider
              value={criteria.volatilityRange}
              onValueChange={(value) => setCriteria(prev => ({ ...prev, volatilityRange: value }))}
              min={5}
              max={60}
              step={5}
              className="w-full"
            />
          </div>

          {/* RSI Range */}
          <div className="space-y-2">
            <Label>RSI Range: {criteria.rsiRange[0]} - {criteria.rsiRange[1]}</Label>
            <Slider
              value={criteria.rsiRange}
              onValueChange={(value) => setCriteria(prev => ({ ...prev, rsiRange: value }))}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          {/* Strategy Toggles */}
          <div className="space-y-4">
            <Label>Trading Strategies</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="momentum"
                  checked={criteria.enableMomentum}
                  onCheckedChange={(checked) => setCriteria(prev => ({ ...prev, enableMomentum: checked }))}
                />
                <Label htmlFor="momentum">Momentum</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="breakout"
                  checked={criteria.enableBreakout}
                  onCheckedChange={(checked) => setCriteria(prev => ({ ...prev, enableBreakout: checked }))}
                />
                <Label htmlFor="breakout">Breakout</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="reversal"
                  checked={criteria.enableReversal}
                  onCheckedChange={(checked) => setCriteria(prev => ({ ...prev, enableReversal: checked }))}
                />
                <Label htmlFor="reversal">Reversal</Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={runScreening} className="gap-2 flex-1">
              <Play className="h-4 w-4" />
              Run Screening
            </Button>
            <Button onClick={resetFilters} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Screening Results */}
      <Card className="bg-gradient-to-br from-card to-secondary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-accent" />
            Screening Results
            <Badge variant="secondary">{screeningResults.length} stocks found</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {screeningResults.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-bold text-lg">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">{stock.sector}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {stock.signals.map((signal) => (
                      <Badge key={signal} variant="outline" className="text-xs">
                        {signal}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg">${stock.price.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">
                    Vol: {stock.volume} • Cap: {stock.marketCap}
                  </div>
                </div>
                
                <Button size="sm" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Analyze
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}