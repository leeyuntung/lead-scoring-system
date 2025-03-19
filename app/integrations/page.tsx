import { Link2, MessageSquare, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IntegrationsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Integrations</h1>
        <Button>
          <Link2 className="mr-2 h-4 w-4" />
          Add New Integration
        </Button>
      </div>
      <Tabs defaultValue="data-sources" className="space-y-4">
        <TabsList>
          <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
          <TabsTrigger value="crm">CRM Systems</TabsTrigger>
          <TabsTrigger value="outreach">Outreach Tools</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>
        <TabsContent value="data-sources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">LinkedIn</CardTitle>
                <div className="h-7 w-7 rounded-full bg-green-100 p-1">
                  <div className="h-full w-full rounded-full bg-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Connected and actively collecting data</div>
                <div className="mt-2 text-xs">Last sync: 2 hours ago</div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex w-full justify-between">
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Sync Now
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Crunchbase</CardTitle>
                <div className="h-7 w-7 rounded-full bg-green-100 p-1">
                  <div className="h-full w-full rounded-full bg-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Connected and actively collecting data</div>
                <div className="mt-2 text-xs">Last sync: 1 day ago</div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex w-full justify-between">
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Sync Now
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Job Boards</CardTitle>
                <div className="h-7 w-7 rounded-full bg-green-100 p-1">
                  <div className="h-full w-full rounded-full bg-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Connected and actively collecting data</div>
                <div className="mt-2 text-xs">Last sync: 3 days ago</div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex w-full justify-between">
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Sync Now
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Website Visitors</CardTitle>
                <div className="h-7 w-7 rounded-full bg-red-100 p-1">
                  <div className="h-full w-full rounded-full bg-red-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Not connected</div>
                <div className="mt-2 text-xs">Install tracking code to enable</div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button className="w-full">Connect</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="crm" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Salesforce</CardTitle>
                <div className="h-7 w-7 rounded-full bg-red-100 p-1">
                  <div className="h-full w-full rounded-full bg-red-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Not connected</div>
                <div className="mt-2 text-xs">Connect to sync leads with Salesforce</div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button className="w-full">Connect</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">HubSpot</CardTitle>
                <div className="h-7 w-7 rounded-full bg-green-100 p-1">
                  <div className="h-full w-full rounded-full bg-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Connected and syncing data</div>
                <div className="mt-2 text-xs">Last sync: 1 hour ago</div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex w-full justify-between">
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Sync Now
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Pipedrive</CardTitle>
                <div className="h-7 w-7 rounded-full bg-red-100 p-1">
                  <div className="h-full w-full rounded-full bg-red-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Not connected</div>
                <div className="mt-2 text-xs">Connect to sync leads with Pipedrive</div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button className="w-full">Connect</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="outreach" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">LinkedIn Outreach</CardTitle>
                <div className="h-7 w-7 rounded-full bg-green-100 p-1">
                  <div className="h-full w-full rounded-full bg-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Connected and actively sending messages</div>
                <div className="mt-2 text-xs">24 messages sent today</div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <div className="flex w-full justify-between">
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                  <Button size="sm">
                    <MessageSquare className="mr-2 h-3 w-3" />
                    Templates
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Email Outreach</CardTitle>
                <div className="h-7 w-7 rounded-full bg-red-100 p-1">
                  <div className="h-full w-full rounded-full bg-red-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Not connected</div>
                <div className="mt-2 text-xs">Connect your email provider to enable</div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button className="w-full">Connect</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Access your lead data programmatically via our API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium">API Key</div>
                  <div className="mt-1 rounded-md border bg-muted p-2 text-sm">••••••••••••••••••••••••••••••</div>
                </div>
                <div>
                  <div className="text-sm font-medium">API Endpoint</div>
                  <div className="mt-1 rounded-md border bg-muted p-2 text-sm">https://api.leadqualify.ai/v1</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex w-full justify-between">
                <Button variant="outline">Regenerate API Key</Button>
                <Button>View Documentation</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

