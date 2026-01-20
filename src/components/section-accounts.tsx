import accounts from "@/app/dashboard/accounts.json"
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

export function AccountsSection() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b px-4 py-3 lg:px-6">
        <div className="text-base font-semibold">Accounts</div>
        <div className="text-sm text-muted-foreground">
          Companies and account health
        </div>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-card">
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="text-right">Deals</TableHead>
              <TableHead className="text-right">Total Value</TableHead>
              <TableHead>
                <span className="inline-flex items-center gap-2">
                  Status
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help text-muted-foreground">?</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Active accounts have open pipeline or recent activity
                    </TooltipContent>
                  </Tooltip>
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell>{a.industry}</TableCell>
                <TableCell>{a.employees}</TableCell>
                <TableCell>{a.owner}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {a.dealsCount}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {a.totalValue}
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Badge
                          variant={a.status === "Active" ? "default" : "secondary"}
                        >
                          {a.status}
                        </Badge>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Owner: {a.owner} • Location: {a.location}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

