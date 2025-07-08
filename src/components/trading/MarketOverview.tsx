import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign,
  BarChart3,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}

const mockMarketData: MarketData[] = [
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF",
    price: 428.73,
    change: 2.45,
    changePercent: 0.57,
    volume: "89.2M",
    marketCap: "394.2B"
  },
  {
    symbol: "QQQ", 
    name: "Invesco QQQ Trust",
    price: 367.12,
    change: -1.82,
    changePercent: -0.49,
    volume: "42.8M",
    marketCap: "196.7B"
  },
  {
    symbol: "IWM",
    name: "iShares Russell 2000 ETF", 
    price: 198.45,
    change: 3.21,
    changePercent: 1.64,
    volume: "28.3M",
    marketCap: "31.2B"
  }
];

const sectorData = [
  { sector: "Technology", change: 1.23, color: "text-bullish" },
  { sector: "Healthcare", change: 0.87, color: "text-bullish" },
  { sector: "Financial", change: -0.45, color: "text-bearish" },
  { sector: "Energy", change: 2.14, color: "text-bullish" },
  { sector: "Consumer", change: -1.12, color: "text-bearish" }
];

export function MarketOverview() {
  return (
    <div className="space-y-6">
      {/* Market Indices */}
      <Card className="bg-gradient-to-br from-card to-secondary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Market Indices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mockMarketData.map((market) => {
              const isPositive = market.change > 0;
              return (
                <div key={market.symbol} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-lg">{market.symbol}</div>
                      <div className="text-sm text-muted-foreground">{market.name}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-lg">${market.price.toFixed(2)}</div>
                    <div className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      isPositive ? "text-bullish" : "text-bearish"
                    )}>
                      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {isPositive ? "+" : ""}{market.change.toFixed(2)} ({isPositive ? "+" : ""}{market.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                  
                  <div className="text-right text-sm text-muted-foreground">
                    <div>Vol: {market.volume}</div>
                    <div>Cap: {market.marketCap}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sector Performance */}
      <Card className="bg-gradient-to-br from-card to-secondary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            Sector Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {sectorData.map((sector) => (
              <div key={sector.sector} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="font-medium">{sector.sector}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-500",
                        sector.change > 0 ? "bg-bullish" : "bg-bearish"
                      )}
                      style={{ 
                        width: `${Math.min(100, Math.abs(sector.change) * 30)}%`,
                        marginLeft: sector.change < 0 ? `${100 - Math.abs(sector.change) * 30}%` : '0'
                      }}
                    />
                  </div>
                  <span className={cn("font-bold text-sm", sector.color)}>
                    {sector.change > 0 ? "+" : ""}{sector.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-card to-bullish/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Advancing</CardTitle>
            <TrendingUp className="h-4 w-4 text-bullish" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bullish">1,847</div>
            <p className="text-xs text-muted-foreground">
              Stocks moving higher
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-bearish/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Declining</CardTitle>
            <TrendingDown className="h-4 w-4 text-bearish" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bearish">1,203</div>
            <p className="text-xs text-muted-foreground">
              Stocks moving lower
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8.7B</div>
            <p className="text-xs text-muted-foreground">
              Total shares traded
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}