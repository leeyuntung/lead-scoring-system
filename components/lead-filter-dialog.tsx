"use client"

import { useState } from "react"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface LeadFilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const industries = [
  { label: "Technology", value: "technology" },
  { label: "SaaS", value: "saas" },
  { label: "Financial Services", value: "financial-services" },
  { label: "Healthcare", value: "healthcare" },
  { label: "E-commerce", value: "e-commerce" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Education", value: "education" },
  { label: "Retail", value: "retail" },
  { label: "Telecommunications", value: "telecommunications" },
  { label: "Media", value: "media" },
]

const sources = [
  { label: "LinkedIn", value: "linkedin" },
  { label: "Crunchbase", value: "crunchbase" },
  { label: "Job Boards", value: "job-boards" },
  { label: "Website Visitors", value: "website" },
  { label: "Manual Entry", value: "manual" },
]

export function LeadFilterDialog({ open, onOpenChange }: LeadFilterDialogProps) {
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100])
  const [industry, setIndustry] = useState("")
  const [source, setSource] = useState("")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [openIndustry, setOpenIndustry] = useState(false)
  const [openSource, setOpenSource] = useState(false)
  const [openDateFrom, setOpenDateFrom] = useState(false)
  const [openDateTo, setOpenDateTo] = useState(false)

  const handleApplyFilters = () => {
    // In a real application, this would apply the filters to the data
    console.log("Applying filters:", {
      scoreRange,
      industry,
      source,
      dateRange: { from: dateFrom, to: dateTo },
    })

    onOpenChange(false)
  }

  const handleResetFilters = () => {
    setScoreRange([0, 100])
    setIndustry("")
    setSource("")
    setDateFrom(undefined)
    setDateTo(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
          <DialogDescription>
            Filter leads based on specific criteria to find the most relevant prospects.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Lead Score Range</Label>
            <div className="pt-2">
              <Slider
                value={scoreRange}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setScoreRange(value as [number, number])}
                className="my-4"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">{scoreRange[0]}</span>
                <span className="text-sm">{scoreRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Industry</Label>
            <Popover open={openIndustry} onOpenChange={setOpenIndustry}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openIndustry}
                  className="w-full justify-between"
                >
                  {industry ? industries.find((i) => i.value === industry)?.label : "Select industry..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search industry..." />
                  <CommandList>
                    <CommandEmpty>No industry found.</CommandEmpty>
                    <CommandGroup>
                      {industries.map((i) => (
                        <CommandItem
                          key={i.value}
                          value={i.value}
                          onSelect={(currentValue) => {
                            setIndustry(currentValue === industry ? "" : currentValue)
                            setOpenIndustry(false)
                          }}
                        >
                          <Check className={cn("mr-2 h-4 w-4", industry === i.value ? "opacity-100" : "opacity-0")} />
                          {i.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Lead Source</Label>
            <Popover open={openSource} onOpenChange={setOpenSource}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={openSource} className="w-full justify-between">
                  {source ? sources.find((s) => s.value === source)?.label : "Select source..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search source..." />
                  <CommandList>
                    <CommandEmpty>No source found.</CommandEmpty>
                    <CommandGroup>
                      {sources.map((s) => (
                        <CommandItem
                          key={s.value}
                          value={s.value}
                          onSelect={(currentValue) => {
                            setSource(currentValue === source ? "" : currentValue)
                            setOpenSource(false)
                          }}
                        >
                          <Check className={cn("mr-2 h-4 w-4", source === s.value ? "opacity-100" : "opacity-0")} />
                          {s.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date From</Label>
              <Popover open={openDateFrom} onOpenChange={setOpenDateFrom}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={(date) => {
                      setDateFrom(date)
                      setOpenDateFrom(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Date To</Label>
              <Popover open={openDateTo} onOpenChange={setOpenDateTo}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={(date) => {
                      setDateTo(date)
                      setOpenDateTo(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Lead Status</Label>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="qualified" />
                <label
                  htmlFor="qualified"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Qualified
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pending" defaultChecked />
                <label
                  htmlFor="pending"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pending
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="contacted" defaultChecked />
                <label
                  htmlFor="contacted"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Contacted
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="unqualified" />
                <label
                  htmlFor="unqualified"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Unqualified
                </label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleResetFilters}>
            Reset Filters
          </Button>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

