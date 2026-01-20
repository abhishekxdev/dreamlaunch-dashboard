import leads from "@/app/dashboard/leads.json"
import { Badge } from "@/components/ui/badge"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

type Lead = (typeof leads)[number]

function statusVariant(status: Lead["status"]) {
  switch (status) {
    case "New":
      return "secondary"
    case "Contacted":
      return "outline"
    case "Qualified":
      return "default"
    default:
      return "secondary"
  }
}

export function LeadsSection() {
  const statusCounts = leads.reduce(
    (acc, l) => {
      acc[l.status] = (acc[l.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const radarData = Object.entries(statusCounts).map(([status, count]) => ({
    metric: status,
    value: Math.round((count / leads.length) * 100),
  }))

  const chartConfig = {
    score: {
      label: "Share",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-semibold">Leads</div>
              <div className="text-sm text-muted-foreground">
                New and active leads from all sources
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground tabular-nums">
                {leads.length}
              </span>{" "}
              total
            </div>
          </div>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-2">
                    Status
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help text-muted-foreground">?</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        New → Contacted → Qualified
                      </TooltipContent>
                    </Tooltip>
                  </span>
                </TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <Badge variant={statusVariant(lead.status)}>
                            {lead.status}
                          </Badge>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        Created: {lead.createdDate} • Source: {lead.source}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{lead.assignedTo}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {lead.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-xl border bg-card p-4">
          <div className="text-sm font-semibold">Lead Status Mix</div>
          <div className="text-xs text-muted-foreground">
            % share by stage
          </div>
          <div className="mt-3">
            <ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
              <RadarChart data={radarData} outerRadius="80%">
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tickLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelKey="metric"
                      nameKey="metric"
                      formatter={(value) => [`${value}%`, "Share"]}
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
          </div>
          <div className="mt-3 grid gap-2 text-xs text-muted-foreground">
            {Object.entries(statusCounts).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span>{k}</span>
                <span className="font-medium tabular-nums text-foreground">
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

