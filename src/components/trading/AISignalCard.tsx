import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock,
  Lightbulb,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TradingSignal {
  id: string;
  symbol: string;
  company: string;
  action: "BUY" | "SELL" | "HOLD";
  confidence: number;
  price: number;
  change: number;
  changePercent: number;
  rationale: string;
  indicators: string[];
  timestamp: Date;
}

interface AISignalCardProps {
  signal: TradingSignal;
  delay?: number;
}

export function AISignalCard({ signal, delay = 0 }: AISignalCardProps) {
  const isPositive = signal.change > 0;
  const actionColor = signal.action === "BUY" ? "bullish" : signal.action === "SELL" ? "bearish" : "neutral";
  
  return (
    <Card 
      className={cn(
        "bg-gradient-to-br from-card to-secondary/30 animate-slide-up hover:shadow-lg transition-all duration-300",
        signal.confidence >= 90 && "ring-2 ring-primary/50 shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl">{signal.symbol}</CardTitle>
                <Badge 
                  variant="secondary"
                  className={cn(
                    "text-xs font-bold",
                    signal.action === "BUY" && "bg-bullish/20 text-bullish",
                    signal.action === "SELL" && "bg-bearish/20 text-bearish",
                    signal.action === "HOLD" && "bg-neutral/20 text-neutral"
                  )}
                >
                  {signal.action}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{signal.company}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">${signal.price.toFixed(2)}</div>
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isPositive ? "text-bullish" : "text-bearish"
              )}>
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {isPositive ? "+" : ""}{signal.change.toFixed(2)} ({isPositive ? "+" : ""}{signal.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Confidence Score */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">AI Confidence</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500 rounded-full",
                  signal.confidence >= 90 ? "bg-gradient-to-r from-primary to-accent" :
                  signal.confidence >= 80 ? "bg-bullish" :
                  signal.confidence >= 70 ? "bg-warning" : "bg-bearish"
                )}
                style={{ width: `${signal.confidence}%` }}
              />
            </div>
            <span className="text-sm font-bold">{signal.confidence}%</span>
          </div>
        </div>

        {/* AI Rationale */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">AI Analysis</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {signal.rationale}
          </p>
        </div>

        {/* Technical Indicators */}
        <div className="space-y-2">
          <span className="text-sm font-medium">Key Indicators</span>
          <div className="flex flex-wrap gap-2">
            {signal.indicators.map((indicator) => (
              <Badge key={indicator} variant="outline" className="text-xs">
                {indicator}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Updated {signal.timestamp.toLocaleTimeString()}</span>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <Activity className="h-3 w-3" />
              View Chart
            </Button>
            <Button 
              size="sm" 
              className={cn(
                "gap-1",
                signal.action === "BUY" && "bg-bullish hover:bg-bullish/90",
                signal.action === "SELL" && "bg-bearish hover:bg-bearish/90"
              )}
            >
              Execute Trade
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}