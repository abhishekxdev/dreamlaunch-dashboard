import { ChevronRightIcon, type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  activeKey,
  onSelect,
}: {
  items: {
    title: string
    icon?: LucideIcon
    key: string
  }[]
  activeKey?: string
  onSelect?: (key: string) => void
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        MAIN
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = item.key === activeKey
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  className="group-data-[collapsible=icon]:justify-center"
                  onClick={() => onSelect?.(item.key)}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span className="group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                  {isActive && (
                    <ChevronRightIcon className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
