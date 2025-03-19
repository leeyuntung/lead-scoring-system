import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Account Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="LeadQualify AI" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input id="admin-email" defaultValue="admin@leadqualify.ai" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable dark mode for the application</p>
                    </div>
                    <Switch id="dark-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-refresh">Auto-refresh Data</Label>
                      <p className="text-sm text-muted-foreground">Automatically refresh data every 5 minutes</p>
                    </div>
                    <Switch id="auto-refresh" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics">Usage Analytics</Label>
                      <p className="text-sm text-muted-foreground">Allow us to collect anonymous usage data</p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button className="ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-lead">New Lead Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new leads are collected</p>
                  </div>
                  <Switch id="new-lead" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="qualified-lead">Qualified Lead Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when leads are qualified by the AI</p>
                  </div>
                  <Switch id="qualified-lead" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="outreach">Outreach Responses</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when leads respond to automated outreach
                    </p>
                  </div>
                  <Switch id="outreach" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system">System Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified about system updates and maintenance</p>
                  </div>
                  <Switch id="system" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button className="ml-auto">Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage your API keys and access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">API Keys</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <Input id="api-key" value="••••••••••••••••••••••••••••••" readOnly />
                      <Button variant="outline" size="sm">
                        Show
                      </Button>
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Last used: 2 hours ago</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="api-access">API Access</Label>
                      <p className="text-sm text-muted-foreground">Enable API access for your account</p>
                    </div>
                    <Switch id="api-access" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Rate Limits</h3>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Current Plan:</span>
                    <span>Pro (1,000 requests/day)</span>
                  </div>
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm">Today's Usage</span>
                      <span className="text-sm">243 / 1,000</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-[24.3%] rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex w-full justify-between">
                <Button variant="outline">Regenerate API Key</Button>
                <Button>View API Documentation</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage team members and their access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Team management functionality will be available in the full version
              </p>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button className="w-full">Upgrade to Team Plan</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

