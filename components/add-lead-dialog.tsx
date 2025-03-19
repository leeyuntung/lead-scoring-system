"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

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

const seniorityLevels = [
  { label: "C-Level", value: "C-Level" },
  { label: "VP", value: "VP" },
  { label: "Director", value: "Director" },
  { label: "Manager", value: "Manager" },
  { label: "Individual Contributor", value: "Individual Contributor" },
]

const departments = [
  { label: "Executive", value: "Executive" },
  { label: "Sales", value: "Sales" },
  { label: "Marketing", value: "Marketing" },
  { label: "Engineering", value: "Engineering" },
  { label: "Product", value: "Product" },
  { label: "IT", value: "IT" },
  { label: "Finance", value: "Finance" },
  { label: "HR", value: "HR" },
  { label: "Operations", value: "Operations" },
  { label: "Customer Support", value: "Customer Support" },
]

const sources = [
  { label: "LinkedIn", value: "LinkedIn" },
  { label: "Crunchbase", value: "Crunchbase" },
  { label: "Job Board", value: "Job Board" },
  { label: "Website", value: "Website" },
  { label: "Referral", value: "Referral" },
  { label: "Conference", value: "Conference" },
  { label: "Manual Entry", value: "Manual Entry" },
]

interface AddLeadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddLeadDialog({ open, onOpenChange }: AddLeadDialogProps) {
  const { toast } = useToast()

  // Form state
  const [activeTab, setActiveTab] = useState("company")
  const [formData, setFormData] = useState({
    // Contact info
    name: "",
    position: "",
    seniority: "",
    department: "",
    email: "",
    phone: "",
    linkedInUrl: "",

    // Company info
    companyName: "",
    companySize: "",
    industry: "",
    fundingStage: "",
    annualRevenue: "",
    growthRate: "",
    location: "",
    technologyStack: "",

    // Additional info
    source: "",
    notes: "",
  })

  // Dropdown state
  const [openIndustry, setOpenIndustry] = useState(false)
  const [openSeniority, setOpenSeniority] = useState(false)
  const [openDepartment, setOpenDepartment] = useState(false)
  const [openSource, setOpenSource] = useState(false)

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle dropdown selection
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.name || !formData.companyName) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, this would save the lead to the database
      console.log("Saving lead:", formData)

      // Show success message
      toast({
        title: "Lead added successfully",
        description: `${formData.name} from ${formData.companyName} has been added.`,
      })

      // Close the dialog and reset form
      onOpenChange(false)
      setFormData({
        name: "",
        position: "",
        seniority: "",
        department: "",
        email: "",
        phone: "",
        linkedInUrl: "",
        companyName: "",
        companySize: "",
        industry: "",
        fundingStage: "",
        annualRevenue: "",
        growthRate: "",
        location: "",
        technologyStack: "",
        source: "",
        notes: "",
      })
    } catch (error) {
      console.error("Error adding lead:", error)
      toast({
        title: "Error adding lead",
        description: "There was a problem adding the lead. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Navigate to next tab
  const handleNextTab = () => {
    if (activeTab === "company") {
      setActiveTab("contact")
    } else if (activeTab === "contact") {
      setActiveTab("additional")
    }
  }

  // Navigate to previous tab
  const handlePrevTab = () => {
    if (activeTab === "additional") {
      setActiveTab("contact")
    } else if (activeTab === "contact") {
      setActiveTab("company")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Lead Manually</DialogTitle>
          <DialogDescription>Enter lead information to add them to your database.</DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => e.preventDefault()}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="additional">Additional</TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g., Acme Inc."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Input
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      placeholder="e.g., 250"
                      type="number"
                    />
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
                          {formData.industry
                            ? industries.find((i) => i.value === formData.industry)?.label
                            : "Select industry..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search industry..." />
                          <CommandList>
                            <CommandEmpty>No industry found.</CommandEmpty>
                            <CommandGroup>
                              {industries.map((industry) => (
                                <CommandItem
                                  key={industry.value}
                                  value={industry.value}
                                  onSelect={() => {
                                    handleSelectChange("industry", industry.value)
                                    setOpenIndustry(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.industry === industry.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {industry.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fundingStage">Funding Stage</Label>
                    <Input
                      id="fundingStage"
                      name="fundingStage"
                      value={formData.fundingStage}
                      onChange={handleInputChange}
                      placeholder="e.g., Series A"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="annualRevenue">Annual Revenue</Label>
                    <Input
                      id="annualRevenue"
                      name="annualRevenue"
                      value={formData.annualRevenue}
                      onChange={handleInputChange}
                      placeholder="e.g., 5000000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="growthRate">Growth Rate (%)</Label>
                    <Input
                      id="growthRate"
                      name="growthRate"
                      value={formData.growthRate}
                      onChange={handleInputChange}
                      placeholder="e.g., 25"
                      type="number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technologyStack">Technology Stack</Label>
                  <Input
                    id="technologyStack"
                    name="technologyStack"
                    value={formData.technologyStack}
                    onChange={handleInputChange}
                    placeholder="e.g., AWS, React, Node.js"
                  />
                  <p className="text-xs text-muted-foreground">Separate technologies with commas</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={handleNextTab}>
                  Next: Contact Information
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Job Title</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="e.g., Marketing Director"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Seniority Level</Label>
                    <Popover open={openSeniority} onOpenChange={setOpenSeniority}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openSeniority}
                          className="w-full justify-between"
                        >
                          {formData.seniority
                            ? seniorityLevels.find((s) => s.value === formData.seniority)?.label
                            : "Select level..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandList>
                            <CommandEmpty>No level found.</CommandEmpty>
                            <CommandGroup>
                              {seniorityLevels.map((level) => (
                                <CommandItem
                                  key={level.value}
                                  value={level.value}
                                  onSelect={() => {
                                    handleSelectChange("seniority", level.value)
                                    setOpenSeniority(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.seniority === level.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {level.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Department</Label>
                  <Popover open={openDepartment} onOpenChange={setOpenDepartment}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openDepartment}
                        className="w-full justify-between"
                      >
                        {formData.department
                          ? departments.find((d) => d.value === formData.department)?.label
                          : "Select department..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search department..." />
                        <CommandList>
                          <CommandEmpty>No department found.</CommandEmpty>
                          <CommandGroup>
                            {departments.map((department) => (
                              <CommandItem
                                key={department.value}
                                value={department.value}
                                onSelect={() => {
                                  handleSelectChange("department", department.value)
                                  setOpenDepartment(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.department === department.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {department.label}
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
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g., john.doe@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g., +1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedInUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedInUrl"
                    name="linkedInUrl"
                    value={formData.linkedInUrl}
                    onChange={handleInputChange}
                    placeholder="e.g., linkedin.com/in/johndoe"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevTab}>
                  Back: Company Information
                </Button>
                <Button type="button" onClick={handleNextTab}>
                  Next: Additional Information
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="additional" className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Lead Source</Label>
                  <Popover open={openSource} onOpenChange={setOpenSource}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openSource}
                        className="w-full justify-between"
                      >
                        {formData.source ? sources.find((s) => s.value === formData.source)?.label : "Select source..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandList>
                          <CommandEmpty>No source found.</CommandEmpty>
                          <CommandGroup>
                            {sources.map((source) => (
                              <CommandItem
                                key={source.value}
                                value={source.value}
                                onSelect={() => {
                                  handleSelectChange("source", source.value)
                                  setOpenSource(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.source === source.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {source.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Add any additional notes about this lead..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevTab}>
                  Back: Contact Information
                </Button>
                <Button type="submit">Add Lead</Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>

        <DialogFooter className="flex items-center justify-between border-t pt-4">
          <div className="text-sm text-muted-foreground">
            <span className="text-red-500">*</span> Required fields
          </div>
          {activeTab === "additional" && (
            <Button type="button" onClick={handleSubmit}>
              Add Lead
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

