import { CheckCircle2Icon, ChevronRightIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="group-data-[collapsible=icon]:justify-center"
          asChild
        >
          <a href="#" className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium leading-none">
                  {user.name}
                </span>
                <CheckCircle2Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="mt-1 block text-xs text-muted-foreground leading-none">
                {user.email}
              </span>
            </div>
            <ChevronRightIcon className="ml-auto h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
