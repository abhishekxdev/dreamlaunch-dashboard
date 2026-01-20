import analytics from "@/app/dashboard/analytics.json"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

function formatMoney(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`
  return `$${value}`
}

export function AnalyticsSection() {
  const o = analytics.overview
  const ph = analytics.pipelineHealth

  // Normalize different metric ranges into a 0–100 score for the radar.
  const radarData = [
    {
      metric: "Win rate",
      value: ph.averageWinRate,
      hint: "Average % of deals that end up Won",
    },
    {
      metric: "Cycle speed",
      value: Math.max(0, 100 - Math.min(100, ph.averageSalesCycle)),
      hint: "Faster sales cycle = higher score",
    },
    {
      metric: "Pipeline",
      value: Math.min(100, Math.round((ph.weightedPipelineValue / ph.totalPipelineValue) * 100)),
      hint: "Weighted pipeline as % of total pipeline",
    },
    {
      metric: "Conversion",
      value: o.conversionRate,
      hint: "Lead → deal conversion rate",
    },
    {
      metric: "Deal size",
      value: Math.min(100, Math.round((o.averageDealSize / 200_000) * 100)),
      hint: "Normalized against a $200k target deal size",
    },
  ]

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              Total Revenue
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help text-muted-foreground">?</span>
                </TooltipTrigger>
                <TooltipContent>Sum of closed revenue over the last 6 months</TooltipContent>
              </Tooltip>
            </CardDescription>
            <CardTitle className="text-2xl tabular-nums">
              {formatMoney(o.totalRevenue)}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Last 6 months
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Deals</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{o.totalDeals}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Active in pipeline
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Leads</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{o.totalLeads}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            New this month
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversion</CardDescription>
            <CardTitle className="text-2xl tabular-nums">
              {o.conversionRate}%
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Lead → deal
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Stage</CardTitle>
            <CardDescription>Where revenue sits in your pipeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {analytics.revenueByStage.map((s) => (
              <div
                key={s.stage}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{s.stage}</Badge>
                  <span className="text-muted-foreground">{s.count} deals</span>
                </div>
                <span className="font-medium tabular-nums">
                  {formatMoney(s.revenue)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pipeline Health</CardTitle>
            <CardDescription>At-a-glance balance across key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
              <RadarChart data={radarData} outerRadius="80%">
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tickLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelKey="metric"
                      nameKey="metric"
                      formatter={(value) => [`${value}`, "Score"]}
                    />
                  }
                />
                <Radar
                  dataKey="value"
                  stroke="var(--color-score)"
                  fill="var(--color-score)"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ChartContainer>
            <div className="mt-3 grid gap-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Weighted pipeline</span>
                <span className="font-medium tabular-nums text-foreground">
                  {formatMoney(ph.weightedPipelineValue)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total pipeline</span>
                <span className="font-medium tabular-nums text-foreground">
                  {formatMoney(ph.totalPipelineValue)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
          <CardDescription>Revenue attributed by owner</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2">
          {analytics.topPerformers.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
            >
              <div className="min-w-0">
                <div className="truncate font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.deals} deals</div>
              </div>
              <div className="font-medium tabular-nums">{formatMoney(p.revenue)}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

