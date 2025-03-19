"use client"

import { useState } from "react"
import { Copy, Edit, MoreHorizontal, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageTemplateDialog } from "@/components/message-template-dialog"

const templates = [
  {
    id: "template-1",
    name: "LinkedIn Initial Outreach",
    platform: "linkedin",
    subject: "",
    content:
      "Hi {{firstName}},\n\nI noticed your role at {{company}} and thought you might be interested in our lead qualification solution. Our AI-powered system has helped companies like yours increase conversion rates by 35%.\n\nWould you be open to a quick chat about how we could help {{company}} streamline your lead qualification process?\n\nBest regards,\nYour Name",
    variables: ["firstName", "company"],
    createdAt: "2023-10-15",
  },
  {
    id: "template-2",
    name: "Email Follow-up",
    platform: "email",
    subject: "Following up on our lead qualification solution",
    content:
      "Hello {{firstName}},\n\nI wanted to follow up on my previous message about our lead qualification solution. I understand you're busy, but I thought you might be interested to know that companies in the {{industry}} industry have seen an average of 40% reduction in sales cycle time using our platform.\n\nI'd love to show you a quick demo. Would you have 15 minutes this week?\n\nBest regards,\nYour Name",
    variables: ["firstName", "industry", "company"],
    createdAt: "2023-10-20",
  },
  {
    id: "template-3",
    name: "High-Priority Lead Outreach",
    platform: "linkedin",
    subject: "",
    content:
      "Hi {{firstName}},\n\nI've been researching {{company}} and I'm impressed with your recent growth in the {{industry}} space. I believe our lead qualification solution could be particularly valuable for your team right now.\n\nOur system has helped companies similar to {{company}} increase their qualified lead volume by 45% while reducing the time spent on manual qualification.\n\nWould you be interested in learning more about how this could work specifically for {{company}}?\n\nBest regards,\nYour Name",
    variables: ["firstName", "company", "industry"],
    createdAt: "2023-11-05",
  },
]

export function OutreachTemplates() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)

  const handleCreateTemplate = () => {
    setEditingTemplate(null)
    setIsDialogOpen(true)
  }

  const handleEditTemplate = (template: any) => {
    setEditingTemplate(template)
    setIsDialogOpen(true)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Message Templates</h2>
          <p className="text-sm text-muted-foreground">Create and manage templates for automated outreach messages</p>
        </div>
        <Button onClick={handleCreateTemplate}>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{template.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEditTemplate(template)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>Platform: {template.platform === "linkedin" ? "LinkedIn" : "Email"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-32 overflow-hidden text-sm text-muted-foreground">
                {template.content.substring(0, 150)}
                {template.content.length > 150 && "..."}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {template.variables.map((variable) => (
                  <span
                    key={variable}
                    className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                  >
                    {variable}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
              Created: {template.createdAt}
            </CardFooter>
          </Card>
        ))}
      </div>

      <MessageTemplateDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} template={editingTemplate} />
    </>
  )
}

