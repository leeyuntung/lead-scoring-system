"use client"

import { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

const platforms = [
  { label: "LinkedIn", value: "linkedin" },
  { label: "Email", value: "email" },
]

const availableVariables = [
  { label: "First Name", value: "firstName" },
  { label: "Last Name", value: "lastName" },
  { label: "Full Name", value: "fullName" },
  { label: "Company", value: "company" },
  { label: "Position", value: "position" },
  { label: "Industry", value: "industry" },
  { label: "Company Size", value: "companySize" },
]

interface MessageTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template?: any
}

export function MessageTemplateDialog({ open, onOpenChange, template }: MessageTemplateDialogProps) {
  const [name, setName] = useState("")
  const [platform, setPlatform] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [openPlatformSelect, setOpenPlatformSelect] = useState(false)

  // Reset form when dialog opens/closes or template changes
  useEffect(() => {
    if (open && template) {
      setName(template.name)
      setPlatform(template.platform)
      setSubject(template.subject || "")
      setContent(template.content)
    } else if (open) {
      setName("")
      setPlatform("")
      setSubject("")
      setContent("")
    }
  }, [open, template])

  const handleSaveTemplate = () => {
    // In a real app, this would save the template to the database
    console.log("Saving template:", { name, platform, subject, content })
    onOpenChange(false)
  }

  const insertVariable = (variable: string) => {
    setContent((prev) => `${prev}{{${variable}}}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{template ? "Edit Template" : "Create Template"}</DialogTitle>
          <DialogDescription>
            {template
              ? "Update your message template with personalization variables."
              : "Create a new message template with personalization variables."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="E.g., LinkedIn Initial Outreach"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Platform</Label>
            <div className="col-span-3">
              <Popover open={openPlatformSelect} onOpenChange={setOpenPlatformSelect}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPlatformSelect}
                    className="w-full justify-between"
                  >
                    {platform ? platforms.find((p) => p.value === platform)?.label : "Select platform..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No platform found.</CommandEmpty>
                      <CommandGroup>
                        {platforms.map((p) => (
                          <CommandItem
                            key={p.value}
                            value={p.value}
                            onSelect={(currentValue) => {
                              setPlatform(currentValue === platform ? "" : currentValue)
                              setOpenPlatformSelect(false)
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", platform === p.value ? "opacity-100" : "opacity-0")} />
                            {p.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {platform === "email" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="col-span-3"
                placeholder="Email subject line"
              />
            </div>
          )}

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right pt-2">
              Message
            </Label>
            <div className="col-span-3 space-y-2">
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
                placeholder="Write your message here. Use {{variable}} for personalization."
              />

              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Insert variable:</span>
                {availableVariables.map((variable) => (
                  <Button
                    key={variable.value}
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable(variable.value)}
                  >
                    {variable.label}
                  </Button>
                ))}
              </div>

              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium">Preview:</p>
                <div className="mt-2 whitespace-pre-wrap text-sm">
                  {content.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
                    const foundVar = availableVariables.find((v) => v.value === variable)
                    return foundVar ? `[${foundVar.label}]` : match
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveTemplate}>{template ? "Update Template" : "Save Template"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

