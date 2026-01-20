import team from "@/app/dashboard/team.json"
import { Badge } from "@/components/ui/badge"
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

export function TeamSection() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b px-4 py-3 lg:px-6">
        <div className="text-base font-semibold">Team</div>
        <div className="text-sm text-muted-foreground">
          Sales and CRM team performance
        </div>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-card">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Deals</TableHead>
              <TableHead className="text-right">
                <span className="inline-flex items-center justify-end gap-2">
                  Revenue
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help text-muted-foreground">?</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Revenue attributed to the owner (mock)
                    </TooltipContent>
                  </Tooltip>
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell>{m.department}</TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Badge
                          variant={m.status === "Active" ? "default" : "secondary"}
                        >
                          {m.status}
                        </Badge>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Email: {m.email} • Phone: {m.phone}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {m.dealsCount}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {m.totalRevenue}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

