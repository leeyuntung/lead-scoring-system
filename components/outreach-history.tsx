"use client"

import { useState } from "react"
import { Calendar, Check, Clock, Search, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const messageHistory = [
  {
    id: "msg-1",
    leadId: "LEAD-1001",
    leadName: "Sarah Johnson",
    company: "TechGrowth Inc.",
    platform: "LinkedIn",
    templateName: "LinkedIn Initial Outreach",
    sentAt: "2023-11-15T09:30:00",
    status: "delivered",
    response: true,
    responseAt: "2023-11-15T14:22:00",
  },
  {
    id: "msg-2",
    leadId: "LEAD-1002",
    leadName: "Michael Chen",
    company: "Innovate Solutions",
    platform: "Email",
    templateName: "Email Follow-up",
    sentAt: "2023-11-15T10:15:00",
    status: "delivered",
    response: false,
    responseAt: null,
  },
  {
    id: "msg-3",
    leadId: "LEAD-1003",
    leadName: "Jessica Williams",
    company: "DataDrive Analytics",
    platform: "LinkedIn",
    templateName: "High-Priority Lead Outreach",
    sentAt: "2023-11-14T11:45:00",
    status: "delivered",
    response: true,
    responseAt: "2023-11-14T16:30:00",
  },
  {
    id: "msg-4",
    leadId: "LEAD-1004",
    leadName: "David Rodriguez",
    company: "Cloud Systems Co.",
    platform: "LinkedIn",
    templateName: "LinkedIn Initial Outreach",
    sentAt: "2023-11-14T14:20:00",
    status: "delivered",
    response: false,
    responseAt: null,
  },
  {
    id: "msg-5",
    leadId: "LEAD-1005",
    leadName: "Emma Thompson",
    company: "Growth Ventures",
    platform: "Email",
    templateName: "High-Priority Lead Outreach",
    sentAt: "2023-11-13T09:10:00",
    status: "delivered",
    response: true,
    responseAt: "2023-11-13T11:45:00",
  },
]

export function OutreachHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [platform, setPlatform] = useState("all")
  const [responseStatus, setResponseStatus] = useState("all")

  // Filter messages based on search and filters
  const filteredMessages = messageHistory.filter((message) => {
    // Search filter
    if (
      searchQuery &&
      !message.leadName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !message.company.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Platform filter
    if (platform !== "all" && message.platform.toLowerCase() !== platform) {
      return false
    }

    // Response status filter
    if (responseStatus === "responded" && !message.response) {
      return false
    }
    if (responseStatus === "not-responded" && message.response) {
      return false
    }

    // Date filters
    if (dateFrom) {
      const messageDate = new Date(message.sentAt)
      if (messageDate < dateFrom) {
        return false
      }
    }

    if (dateTo) {
      const messageDate = new Date(message.sentAt)
      if (messageDate > dateTo) {
        return false
      }
    }

    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-medium">Outreach History</h2>
          <p className="text-sm text-muted-foreground">Track all automated messages sent to leads</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search leads..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>

          <Select value={responseStatus} onValueChange={setResponseStatus}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Response" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="responded">Responded</SelectItem>
              <SelectItem value="not-responded">Not Responded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Date Range:</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Calendar className="mr-2 h-3.5 w-3.5" />
              {dateFrom ? format(dateFrom, "MMM d, yyyy") : "From"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Calendar className="mr-2 h-3.5 w-3.5" />
              {dateTo ? format(dateTo, "MMM d, yyyy") : "To"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
          </PopoverContent>
        </Popover>

        {(dateFrom || dateTo || searchQuery || platform !== "all" || responseStatus !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => {
              setDateFrom(undefined)
              setDateTo(undefined)
              setSearchQuery("")
              setPlatform("all")
              setResponseStatus("all")
            }}
          >
            <X className="mr-2 h-3.5 w-3.5" />
            Clear Filters
          </Button>
        )}
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 border-b px-4 py-3 font-medium">
                  <div>Lead</div>
                  <div>Platform</div>
                  <div>Template</div>
                  <div>Sent</div>
                  <div>Status</div>
                  <div>Response</div>
                </div>
                <div className="divide-y">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message) => (
                      <div key={message.id} className="grid grid-cols-6 items-center px-4 py-3">
                        <div>
                          <div className="font-medium">{message.leadName}</div>
                          <div className="text-xs text-muted-foreground">{message.company}</div>
                        </div>
                        <div>{message.platform}</div>
                        <div className="text-sm">{message.templateName}</div>
                        <div className="text-sm">{format(new Date(message.sentAt), "MMM d, h:mm a")}</div>
                        <div>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {message.status}
                          </span>
                        </div>
                        <div>
                          {message.response ? (
                            <div className="flex items-center">
                              <Check className="mr-1 h-4 w-4 text-green-500" />
                              <span className="text-sm">
                                {message.responseAt && format(new Date(message.responseAt), "MMM d")}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4 text-yellow-500" />
                              <span className="text-sm">Pending</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                      No messages found matching your filters.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Response Rate</CardTitle>
                <CardDescription>Percentage of messages that received a response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="text-4xl font-bold">
                    {filteredMessages.length > 0
                      ? `${Math.round((filteredMessages.filter((m) => m.response).length / filteredMessages.length) * 100)}%`
                      : "N/A"}
                  </div>
                  <div className="w-full max-w-md">
                    <div className="h-4 w-full rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width:
                            filteredMessages.length > 0
                              ? `${Math.round((filteredMessages.filter((m) => m.response).length / filteredMessages.length) * 100)}%`
                              : "0%",
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {filteredMessages.filter((m) => m.response).length} responses from {filteredMessages.length}{" "}
                    messages
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
                <CardDescription>Average time to receive a response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="text-4xl font-bold">3.2 hrs</div>
                  <div className="text-sm text-muted-foreground">Average response time for this period</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

