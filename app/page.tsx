"use client"

import Link from "next/link"
import { ArrowRight, BarChart3, Database, Filter, Plus, Users } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadMetricsCards } from "@/components/lead-metrics-cards"
import { LeadTable } from "@/components/lead-table"
import { RecentActivity } from "@/components/recent-activity"
import { LeadFilterDialog } from "@/components/lead-filter-dialog"
import { AddLeadDialog } from "@/components/add-lead-dialog"

export default function Dashboard() {
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [addLeadDialogOpen, setAddLeadDialogOpen] = useState(false)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <LeadMetricsCards />
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Leads</TabsTrigger>
            <TabsTrigger value="qualified">Qualified</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="contacted">Contacted</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setFilterDialogOpen(true)}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={() => setAddLeadDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Button>
            <Button size="sm">
              <Database className="mr-2 h-4 w-4" />
              Collect New Leads
            </Button>
          </div>
        </div>

        <LeadFilterDialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen} />
        <AddLeadDialog open={addLeadDialogOpen} onOpenChange={setAddLeadDialogOpen} />

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Lead Qualification Overview</CardTitle>
                <CardDescription>View and manage your leads from various sources</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <LeadTable />
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button asChild variant="ghost" className="w-full" size="sm">
                  <Link href="/leads">
                    View All Leads
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest lead interactions and system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button asChild variant="ghost" className="w-full" size="sm">
                  <Link href="/activity">
                    View All Activity
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lead Sources Distribution</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 Active Sources</div>
                <p className="text-xs text-muted-foreground">LinkedIn, Crunchbase, Job Boards</p>
                <div className="mt-4 h-[80px]">
                  {/* Placeholder for chart */}
                  <div className="flex h-full items-end gap-2">
                    <div className="w-1/3 rounded-t bg-primary h-[60%]" />
                    <div className="w-1/3 rounded-t bg-primary h-[40%]" />
                    <div className="w-1/3 rounded-t bg-primary h-[20%]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lead Quality Score</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72.8%</div>
                <p className="text-xs text-muted-foreground">Average qualification score</p>
                <div className="mt-4">
                  <div className="flex w-full items-center gap-2">
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[73%] rounded-full bg-primary" />
                    </div>
                    <span className="text-xs font-medium">73%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outreach Performance</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.3%</div>
                <p className="text-xs text-muted-foreground">Response rate from automated outreach</p>
                <div className="mt-4 h-[80px]">
                  {/* Placeholder for chart */}
                  <div className="flex h-full items-end gap-2">
                    <div className="w-1/4 rounded-t bg-primary h-[30%]" />
                    <div className="w-1/4 rounded-t bg-primary h-[50%]" />
                    <div className="w-1/4 rounded-t bg-primary h-[40%]" />
                    <div className="w-1/4 rounded-t bg-primary h-[60%]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="qualified" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Qualified Leads</CardTitle>
              <CardDescription>Leads that have been qualified by the AI system</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Qualified leads content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Leads</CardTitle>
              <CardDescription>Leads that are waiting to be qualified</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Pending leads content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contacted" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contacted Leads</CardTitle>
              <CardDescription>Leads that have been contacted through automated outreach</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contacted leads content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

