import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Brain, 
  Target,
  AlertTriangle,
  Eye,
  Zap
} from "lucide-react";
import { AISignalCard } from "./AISignalCard";
import { MarketOverview } from "./MarketOverview";
import { BacktestResults } from "./BacktestResults";
import { ScreeningFilters } from "./ScreeningFilters";

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

const mockSignals: TradingSignal[] = [
  {
    id: "1",
    symbol: "AAPL",
    company: "Apple Inc.",
    action: "BUY",
    confidence: 87,
    price: 185.42,
    change: 3.25,
    changePercent: 1.78,
    rationale: "RSI oversold + bullish MACD crossover + positive earnings sentiment",
    indicators: ["RSI", "MACD", "Volume", "Sentiment"],
    timestamp: new Date()
  },
  {
    id: "2", 
    symbol: "TSLA",
    company: "Tesla Inc.",
    action: "SELL",
    confidence: 92,
    price: 248.73,
    change: -12.45,
    changePercent: -4.77,
    rationale: "Bearish divergence + resistance break failure + negative news flow",
    indicators: ["Divergence", "Support/Resistance", "News"],
    timestamp: new Date()
  },
  {
    id: "3",
    symbol: "NVDA", 
    company: "NVIDIA Corp.",
    action: "BUY",
    confidence: 94,
    price: 722.15,
    change: 18.92,
    changePercent: 2.69,
    rationale: "AI sector momentum + volume breakout + institutional accumulation",
    indicators: ["Volume", "Momentum", "Institutional"],
    timestamp: new Date()
  }
];

export function TradingDashboard() {
  const [signals, setSignals] = useState<TradingSignal[]>(mockSignals);
  const [isRealTime, setIsRealTime] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!isRealTime) return;
    
    const interval = setInterval(() => {
      setSignals(prev => prev.map(signal => ({
        ...signal,
        price: signal.price + (Math.random() - 0.5) * 2,
        change: signal.change + (Math.random() - 0.5) * 0.5,
        confidence: Math.max(70, Math.min(99, signal.confidence + (Math.random() - 0.5) * 5)),
        timestamp: new Date()
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const highConfidenceSignals = signals.filter(s => s.confidence >= 85);
  const buySignals = signals.filter(s => s.action === "BUY");
  const sellSignals = signals.filter(s => s.action === "SELL");

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary animate-pulse-glow" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Trading Engine
            </h1>
          </div>
          <Badge variant="secondary" className="animate-pulse-glow">
            <Zap className="h-3 w-3 mr-1" />
            Live Analysis
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant={isRealTime ? "default" : "outline"}
            onClick={() => setIsRealTime(!isRealTime)}
            className="gap-2"
          >
            <Activity className="h-4 w-4" />
            {isRealTime ? "Pause" : "Resume"} Real-time
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-card to-secondary/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Signals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{signals.length}</div>
            <p className="text-xs text-muted-foreground">
              {highConfidenceSignals.length} high confidence
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-bullish/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buy Signals</CardTitle>
            <TrendingUp className="h-4 w-4 text-bullish" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bullish">{buySignals.length}</div>
            <p className="text-xs text-muted-foreground">
              Avg confidence: {Math.round(buySignals.reduce((acc, s) => acc + s.confidence, 0) / buySignals.length)}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-bearish/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sell Signals</CardTitle>
            <TrendingDown className="h-4 w-4 text-bearish" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bearish">{sellSignals.length}</div>
            <p className="text-xs text-muted-foreground">
              Avg confidence: {Math.round(sellSignals.reduce((acc, s) => acc + s.confidence, 0) / sellSignals.length)}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alert Status</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">3</div>
            <p className="text-xs text-muted-foreground">
              Critical opportunities
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="signals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
          <TabsTrigger value="signals" className="gap-2">
            <Eye className="h-4 w-4" />
            AI Signals
          </TabsTrigger>
          <TabsTrigger value="market" className="gap-2">
            <Activity className="h-4 w-4" />
            Market Overview
          </TabsTrigger>
          <TabsTrigger value="backtest" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Backtesting
          </TabsTrigger>
          <TabsTrigger value="screening" className="gap-2">
            <Target className="h-4 w-4" />
            Screening
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signals" className="space-y-6">
          <div className="grid gap-6">
            {signals.map((signal, index) => (
              <AISignalCard 
                key={signal.id} 
                signal={signal}
                delay={index * 100}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="market">
          <MarketOverview />
        </TabsContent>

        <TabsContent value="backtest">
          <BacktestResults />
        </TabsContent>

        <TabsContent value="screening">
          <ScreeningFilters />
        </TabsContent>
      </Tabs>
    </div>
  );
}