import * as React from "react"

import data from "@/app/dashboard/data.json"
import { AppSidebar, type SidebarSection } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { CompanyProfile } from "@/components/company-profile"
import { DataTable } from "@/components/data-table"
import { AccountsSection } from "@/components/section-accounts"
import { AnalyticsSection } from "@/components/section-analytics"
import { ContactsSection } from "@/components/section-contacts"
import { SectionCards } from "@/components/section-cards"
import { LeadsSection } from "@/components/section-leads"
import { SiteHeader } from "@/components/site-header"
import { TeamSection } from "@/components/section-team"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

function App() {
  const [section, setSection] = React.useState<SidebarSection>("dashboard")

  return (
    <SidebarProvider>
      <AppSidebar activeSection={section} onSectionChange={setSection} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 py-4">
          {section === "dashboard" && (
            <>
              <SectionCards />
              <div className="grid gap-4 px-4 lg:grid-cols-[1fr_320px] lg:px-6">
                <div className="flex min-w-0 flex-col gap-4">
                  <ChartAreaInteractive />
                  <DataTable data={data} />
                </div>
                <div className="hidden lg:block">
                  <CompanyProfile />
                </div>
              </div>
            </>
          )}
          {section !== "dashboard" && (
            <div className="px-4 lg:px-6">
              {section === "deals" && <DataTable data={data} />}
              {section === "leads" && <LeadsSection />}
              {section === "contacts" && <ContactsSection />}
              {section === "accounts" && <AccountsSection />}
              {section === "analytics" && <AnalyticsSection />}
              {section === "team" && <TeamSection />}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App;

