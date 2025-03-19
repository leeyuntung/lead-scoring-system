"use client"

import { Filter, Plus, Search } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadTable } from "@/components/lead-table"
import { LeadFilterDialog } from "@/components/lead-filter-dialog"
import { AddLeadDialog } from "@/components/add-lead-dialog"

export default function LeadsPage() {
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [addLeadDialogOpen, setAddLeadDialogOpen] = useState(false)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lead Management</h1>
        <Button onClick={() => setAddLeadDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Lead Manually
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search leads..." className="w-full pl-8" />
        </div>
        <Button variant="outline" onClick={() => setFilterDialogOpen(true)}>
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filters
        </Button>
      </div>

      <LeadFilterDialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen} />
      <AddLeadDialog open={addLeadDialogOpen} onOpenChange={setAddLeadDialogOpen} />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Leads</TabsTrigger>
          <TabsTrigger value="qualified">Qualified</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Leads</CardTitle>
              <CardDescription>View and manage all leads collected from various sources</CardDescription>
            </CardHeader>
            <CardContent>
              <LeadTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="qualified" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Qualified Leads</CardTitle>
              <CardDescription>Leads that have been qualified by the AI system</CardDescription>
            </CardHeader>
            <CardContent>
              <LeadTable />
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
              <LeadTable />
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
              <LeadTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

