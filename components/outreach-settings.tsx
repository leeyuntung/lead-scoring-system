"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function OutreachSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Outreach Settings</h2>
        <p className="text-sm text-muted-foreground">Configure your automated outreach preferences and connections</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>LinkedIn Integration</CardTitle>
            <CardDescription>Connect your LinkedIn account for automated messaging</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Connection Status</div>
                <div className="text-sm text-muted-foreground">LinkedIn Sales Navigator</div>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Connected</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="linkedin-email">LinkedIn Email</Label>
              <Input id="linkedin-email" value="user@example.com" readOnly />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="daily-connection-requests">Daily Connection Requests</Label>
                <span className="text-sm">20</span>
              </div>
              <Input id="daily-connection-requests" type="range" min="0" max="50" defaultValue="20" />
              <p className="text-xs text-muted-foreground">LinkedIn limits: Maximum 100 connection requests per week</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="follow-up" defaultChecked />
              <Label htmlFor="follow-up">Automatically follow up on unanswered messages</Label>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full">
              Reconnect LinkedIn Account
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Integration</CardTitle>
            <CardDescription>Connect your email account for automated outreach</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Connection Status</div>
                <div className="text-sm text-muted-foreground">Gmail / Google Workspace</div>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Connected</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="email-address">Email Address</Label>
              <Input id="email-address" value="user@example.com" readOnly />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-sender-name">Sender Name</Label>
              <Input id="email-sender-name" defaultValue="John Doe" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-signature">Email Signature</Label>
              <div className="rounded-md border p-3 text-sm">
                <p>John Doe</p>
                <p>Sales Manager</p>
                <p>LeadQualify AI</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="track-opens" defaultChecked />
              <Label htmlFor="track-opens">Track email opens and clicks</Label>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full">
              Reconnect Email Account
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Outreach Settings</CardTitle>
          <CardDescription>Configure global settings for all outreach campaigns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="time-zone">Time Zone</Label>
              <Select defaultValue="america-new_york">
                <SelectTrigger id="time-zone">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="america-new_york">Eastern Time (ET)</SelectItem>
                  <SelectItem value="america-chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="america-denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="america-los_angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="europe-london">London (GMT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="business-hours">Business Hours</Label>
              <div className="flex items-center gap-2">
                <Select defaultValue="9">
                  <SelectTrigger id="business-hours-start">
                    <SelectValue placeholder="Start" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 7).map((hour) => (
                      <SelectItem key={hour} value={hour.toString()}>
                        {hour}:00 {hour < 12 ? "AM" : "PM"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span>to</span>
                <Select defaultValue="17">
                  <SelectTrigger id="business-hours-end">
                    <SelectValue placeholder="End" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 7).map((hour) => (
                      <SelectItem key={hour} value={hour.toString()}>
                        {hour}:00 {hour < 12 ? "AM" : "PM"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Message Sending Frequency</Label>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center space-x-2">
                <Switch id="weekdays-only" defaultChecked />
                <Label htmlFor="weekdays-only">Weekdays only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="delay-between" defaultChecked />
                <Label htmlFor="delay-between">Random delay between messages</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="avoid-spam" defaultChecked />
                <Label htmlFor="avoid-spam">Avoid spam triggers</Label>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Notification Settings</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-2">
                <Switch id="notify-responses" defaultChecked />
                <Label htmlFor="notify-responses">Notify on responses</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notify-campaigns" defaultChecked />
                <Label htmlFor="notify-campaigns">Notify when campaigns complete</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="daily-summary" defaultChecked />
                <Label htmlFor="daily-summary">Send daily summary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notify-errors" defaultChecked />
                <Label htmlFor="notify-errors">Notify on errors</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button className="ml-auto">Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

