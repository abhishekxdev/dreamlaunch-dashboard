import * as React from "react"
import {
  BarChartIcon,
  BuildingIcon,
  ChevronRightIcon,
  ContactIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  PanelLeftCloseIcon,
  SettingsIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export type SidebarSection =
  | "dashboard"
  | "deals"
  | "leads"
  | "contacts"
  | "accounts"
  | "analytics"
  | "team"

const data = {
  user: {
    name: "John Doe",
    email: "john.doe@acmecorp.com",
    avatar: "/api/placeholder/40/40",
  },
  navMain: [
    {
      title: "Dashboard",
      icon: LayoutDashboardIcon,
      key: "dashboard" as SidebarSection,
    },
    {
      title: "Deals",
      icon: TargetIcon,
      key: "deals" as SidebarSection,
    },
    {
      title: "Leads",
      icon: ListIcon,
      key: "leads" as SidebarSection,
    },
    {
      title: "Contacts",
      icon: ContactIcon,
      key: "contacts" as SidebarSection,
    },
    {
      title: "Accounts",
      icon: BuildingIcon,
      key: "accounts" as SidebarSection,
    },
    {
      title: "Analytics",
      icon: BarChartIcon,
      key: "analytics" as SidebarSection,
    },
    {
      title: "Team",
      icon: UsersIcon,
      key: "team" as SidebarSection,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Support",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
}

export function AppSidebar({
  activeSection,
  onSectionChange,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  activeSection?: SidebarSection
  onSectionChange?: (key: SidebarSection) => void
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
              <span className="text-sm font-bold">C</span>
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-base font-semibold leading-none">
                DreamLaunch
              </span>
             
            </div>
          </div>
          <SidebarTrigger className="h-6 w-6" />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <NavMain
          items={data.navMain}
          activeKey={activeSection}
          onSelect={(key) => onSectionChange?.(key as SidebarSection)}
        />
        <SidebarSeparator className="my-4" />
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter className="border-t px-4 py-3">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
