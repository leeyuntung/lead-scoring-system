"use client"

import { useState } from "react"
import { Calendar, Check, ChevronsUpDown, Clock, Play, Settings } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const templates = [
  { label: "LinkedIn Initial Outreach", value: "template-1" },
  { label: "Email Follow-up", value: "template-2" },
  { label: "High-Priority Lead Outreach", value: "template-3" },
]

const platforms = [
  { label: "LinkedIn", value: "linkedin" },
  { label: "Email", value: "email" },
]

export function OutreachAutomation() {
  const [scoreThreshold, setScoreThreshold] = useState(80)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [openTemplateSelect, setOpenTemplateSelect] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [openPlatformSelect, setOpenPlatformSelect] = useState(false)
  const [dailyLimit, setDailyLimit] = useState(20)
  const [scheduleEnabled, setScheduleEnabled] = useState(true)
  const [scheduleTime, setScheduleTime] = useState("09:00")
  const [scheduleDate, setScheduleDate] = useState<Date>()

  const handleStartCampaign = () => {
    // In a real app, this would start the campaign
    console.log("Starting campaign with settings:", {
      scoreThreshold,
      selectedTemplate,
      selectedPlatform,
      dailyLimit,
      scheduleEnabled,
      scheduleTime,
      scheduleDate,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Automated Outreach</h2>
        <p className="text-sm text-muted-foreground">Configure automated messaging to high-scoring leads</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Selection</CardTitle>
            <CardDescription>Define which leads will receive automated messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Minimum Lead Score</Label>
                <span className="text-sm font-medium">{scoreThreshold}</span>
              </div>
              <Slider
                value={[scoreThreshold]}
                min={50}
                max={100}
                step={1}
                onValueChange={(value) => setScoreThreshold(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Only leads with a score of {scoreThreshold} or higher will receive messages
              </p>
            </div>

            <div className="space-y-2">
              <Label>Platform</Label>
              <Popover open={openPlatformSelect} onOpenChange={setOpenPlatformSelect}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPlatformSelect}
                    className="w-full justify-between"
                  >
                    {selectedPlatform
                      ? platforms.find((p) => p.value === selectedPlatform)?.label
                      : "Select platform..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No platform found.</CommandEmpty>
                      <CommandGroup>
                        {platforms.map((platform) => (
                          <CommandItem
                            key={platform.value}
                            value={platform.value}
                            onSelect={(currentValue) => {
                              setSelectedPlatform(currentValue === selectedPlatform ? "" : currentValue)
                              setOpenPlatformSelect(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedPlatform === platform.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {platform.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Additional Filters</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-xs">
                    Industry
                  </Label>
                  <Select>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-size" className="text-xs">
                    Company Size
                  </Label>
                  <Select>
                    <SelectTrigger id="company-size">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="201-1000">201-1000</SelectItem>
                      <SelectItem value="1000+">1000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Message Configuration</CardTitle>
            <CardDescription>Select message template and delivery settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Message Template</Label>
              <Popover open={openTemplateSelect} onOpenChange={setOpenTemplateSelect}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openTemplateSelect}
                    className="w-full justify-between"
                  >
                    {selectedTemplate
                      ? templates.find((t) => t.value === selectedTemplate)?.label
                      : "Select template..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandList>
                      <CommandInput placeholder="Search templates..." />
                      <CommandEmpty>No template found.</CommandEmpty>
                      <CommandGroup>
                        {templates.map((template) => (
                          <CommandItem
                            key={template.value}
                            value={template.value}
                            onSelect={(currentValue) => {
                              setSelectedTemplate(currentValue === selectedTemplate ? "" : currentValue)
                              setOpenTemplateSelect(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedTemplate === template.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {template.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Daily Message Limit</Label>
                <span className="text-sm font-medium">{dailyLimit}</span>
              </div>
              <Slider
                value={[dailyLimit]}
                min={5}
                max={100}
                step={5}
                onValueChange={(value) => setDailyLimit(value[0])}
              />
              <p className="text-xs text-muted-foreground">Maximum number of messages to send per day</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="schedule">Schedule Messages</Label>
                <Switch id="schedule" checked={scheduleEnabled} onCheckedChange={setScheduleEnabled} />
              </div>

              {scheduleEnabled && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-xs">
                      Time
                    </Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time"
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="text-xs">
                      Start Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {scheduleDate ? format(scheduleDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={scheduleDate} onSelect={setScheduleDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button onClick={handleStartCampaign} className="w-full">
              <Play className="mr-2 h-4 w-4" />
              Start Campaign
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Currently running automated outreach campaigns</CardDescription>
          </div>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 border-b px-4 py-3 font-medium">
              <div>Campaign Name</div>
              <div>Platform</div>
              <div>Lead Score</div>
              <div>Messages Sent</div>
              <div>Status</div>
            </div>
            <div className="divide-y">
              <div className="grid grid-cols-5 items-center px-4 py-3">
                <div>High-Value Prospects</div>
                <div>LinkedIn</div>
                <div>90+</div>
                <div>42/100</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-5 items-center px-4 py-3">
                <div>Tech Decision Makers</div>
                <div>Email</div>
                <div>85+</div>
                <div>78/150</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-5 items-center px-4 py-3">
                <div>Follow-up Campaign</div>
                <div>LinkedIn</div>
                <div>80+</div>
                <div>66/100</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    Paused
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

