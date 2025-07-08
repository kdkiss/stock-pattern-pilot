import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Target,
  Calendar,
  DollarSign,
  Percent,
  BarChart3,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BacktestMetrics {
  strategy: string;
  period: string;
  totalReturn: number;
  annualizedReturn: number;
  winRate: number;
  sharpeRatio: number;
  maxDrawdown: number;
  totalTrades: number;
  avgHoldingPeriod: string;
  profitFactor: number;
}

const mockBacktests: BacktestMetrics[] = [
  {
    strategy: "AI Momentum + Sentiment",
    period: "2022-2024",
    totalReturn: 187.3,
    annualizedReturn: 31.2,
    winRate: 68.4,
    sharpeRatio: 1.84,
    maxDrawdown: -12.7,
    totalTrades: 342,
    avgHoldingPeriod: "5.2 days",
    profitFactor: 2.31
  },
  {
    strategy: "RSI + MACD Crossover",
    period: "2022-2024", 
    totalReturn: 94.7,
    annualizedReturn: 18.3,
    winRate: 61.2,
    sharpeRatio: 1.42,
    maxDrawdown: -18.3,
    totalTrades: 567,
    avgHoldingPeriod: "8.1 days",
    profitFactor: 1.67
  },
  {
    strategy: "Volume Breakout",
    period: "2022-2024",
    totalReturn: 156.2,
    annualizedReturn: 26.8,
    winRate: 59.8,
    sharpeRatio: 1.63,
    maxDrawdown: -15.9,
    totalTrades: 428,
    avgHoldingPeriod: "6.7 days", 
    profitFactor: 1.94
  }
];

const monthlyReturns = [
  { month: "Jan", return: 4.2 },
  { month: "Feb", return: -2.1 },
  { month: "Mar", return: 7.8 },
  { month: "Apr", return: 3.4 },
  { month: "May", return: -1.7 },
  { month: "Jun", return: 8.9 },
  { month: "Jul", return: 5.6 },
  { month: "Aug", return: -3.2 },
  { month: "Sep", return: 6.1 },
  { month: "Oct", return: 9.3 },
  { month: "Nov", return: 2.8 },
  { month: "Dec", return: 4.7 }
];

export function BacktestResults() {
  return (
    <div className="space-y-6">
      {/* Strategy Performance Cards */}
      <div className="grid gap-6">
        {mockBacktests.map((backtest, index) => (
          <Card key={backtest.strategy} className="bg-gradient-to-br from-card to-secondary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    {backtest.strategy}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {backtest.period} • {backtest.totalTrades} trades
                  </p>
                </div>
                <Badge 
                  variant="secondary"
                  className={cn(
                    "text-lg font-bold px-3 py-1",
                    backtest.totalReturn > 0 ? "bg-bullish/20 text-bullish" : "bg-bearish/20 text-bearish"
                  )}
                >
                  {backtest.totalReturn > 0 ? "+" : ""}{backtest.totalReturn.toFixed(1)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Annual Return</p>
                  <p className={cn(
                    "text-lg font-bold",
                    backtest.annualizedReturn > 0 ? "text-bullish" : "text-bearish"
                  )}>
                    {backtest.annualizedReturn > 0 ? "+" : ""}{backtest.annualizedReturn.toFixed(1)}%
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                  <p className="text-lg font-bold text-primary">
                    {backtest.winRate.toFixed(1)}%
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                  <p className={cn(
                    "text-lg font-bold",
                    backtest.sharpeRatio > 1.5 ? "text-bullish" : 
                    backtest.sharpeRatio > 1.0 ? "text-warning" : "text-bearish"
                  )}>
                    {backtest.sharpeRatio.toFixed(2)}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Max Drawdown</p>
                  <p className="text-lg font-bold text-bearish">
                    {backtest.maxDrawdown.toFixed(1)}%
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Profit Factor</p>
                  <p className={cn(
                    "text-lg font-bold",
                    backtest.profitFactor > 2 ? "text-bullish" : 
                    backtest.profitFactor > 1.5 ? "text-warning" : "text-bearish"
                  )}>
                    {backtest.profitFactor.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Avg holding period: <span className="font-medium">{backtest.avgHoldingPeriod}</span>
                </p>
                <Button size="sm" variant="outline" className="gap-1">
                  <Download className="h-3 w-3" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Returns Chart */}
      <Card className="bg-gradient-to-br from-card to-secondary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            Monthly Returns (2024)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monthlyReturns.map((month) => (
              <div key={month.month} className="flex items-center gap-4">
                <div className="w-8 text-sm font-medium">{month.month}</div>
                <div className="flex-1 relative">
                  <div className="h-8 bg-secondary rounded-lg flex items-center overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-500 rounded-lg flex items-center justify-end pr-2",
                        month.return > 0 ? "bg-bullish" : "bg-bearish"
                      )}
                      style={{ 
                        width: `${Math.max(10, Math.abs(month.return) * 8)}%`,
                        marginLeft: month.return < 0 ? `${100 - Math.abs(month.return) * 8}%` : '0'
                      }}
                    >
                      <span className="text-xs font-bold text-white">
                        {month.return > 0 ? "+" : ""}{month.return.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-card to-bullish/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Strategy</CardTitle>
            <TrendingUp className="h-4 w-4 text-bullish" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bullish">AI Momentum</div>
            <p className="text-xs text-muted-foreground">
              +187.3% total return
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Win Rate</CardTitle>
            <Percent className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">63.1%</div>
            <p className="text-xs text-muted-foreground">
              Across all strategies
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">1,337</div>
            <p className="text-xs text-muted-foreground">
              Executed successfully
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}