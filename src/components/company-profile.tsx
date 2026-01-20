import { Building2Icon, MailIcon, MapPinIcon, PhoneIcon, UsersIcon, GlobeIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function CompanyProfile() {
  return (
    <Card className="sticky top-4 h-fit">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/api/placeholder/64/64" alt="Company Logo" />
            <AvatarFallback className="bg-primary/10 text-primary">
              <Building2Icon className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl">DreamLaunch</CardTitle>
            <CardDescription>Enterprise Technology Solutions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-sm">
            <MapPinIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-muted-foreground">
                123 Business Street, Suite 100<br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <PhoneIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <MailIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">contact@acmecorp.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <GlobeIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Website</p>
              <p className="text-muted-foreground">www.acmecorp.com</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Employees</span>
            </div>
            <span className="text-muted-foreground">250-500</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Industry</span>
            <Badge variant="secondary">Technology</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Founded</span>
            <span className="text-muted-foreground">2015</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Annual Revenue</span>
            <span className="text-muted-foreground">$50M - $100M</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-sm font-medium">Key Contacts</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/api/placeholder/32/32" alt="Contact" />
                <AvatarFallback className="text-xs">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">CEO</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/api/placeholder/32/32" alt="Contact" />
                <AvatarFallback className="text-xs">JS</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Jane Smith</p>
                <p className="text-xs text-muted-foreground truncate">VP Sales</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
