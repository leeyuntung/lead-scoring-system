import { ArrowUpDown, Mail, MessageSquare, MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const leads = [
  {
    id: "LEAD-1001",
    name: "Sarah Johnson",
    company: "TechGrowth Inc.",
    position: "VP of Marketing",
    source: "LinkedIn",
    score: 92,
    status: "qualified",
    lastActivity: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
    outreachStatus: "responded", // New field
    outreachPlatform: "linkedin", // New field
    outreachDate: "2023-11-15", // New field
  },
  {
    id: "LEAD-1002",
    name: "Michael Chen",
    company: "Innovate Solutions",
    position: "CTO",
    source: "Crunchbase",
    score: 88,
    status: "qualified",
    lastActivity: "1 day ago",
    avatar: "/placeholder.svg?height=32&width=32",
    outreachStatus: "sent", // New field
    outreachPlatform: "email", // New field
    outreachDate: "2023-11-15", // New field
  },
  {
    id: "LEAD-1003",
    name: "Jessica Williams",
    company: "DataDrive Analytics",
    position: "Director of Operations",
    source: "Job Board",
    score: 76,
    status: "pending",
    lastActivity: "3 days ago",
    avatar: "/placeholder.svg?height=32&width=32",
    outreachStatus: "none", // New field
    outreachPlatform: null, // New field
    outreachDate: null, // New field
  },
  {
    id: "LEAD-1004",
    name: "David Rodriguez",
    company: "Cloud Systems Co.",
    position: "Head of Sales",
    source: "LinkedIn",
    score: 84,
    status: "contacted",
    lastActivity: "5 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
    outreachStatus: "sent", // New field
    outreachPlatform: "linkedin", // New field
    outreachDate: "2023-11-14", // New field
  },
  {
    id: "LEAD-1005",
    name: "Emma Thompson",
    company: "Growth Ventures",
    position: "CEO",
    source: "Crunchbase",
    score: 95,
    status: "qualified",
    lastActivity: "1 hour ago",
    avatar: "/placeholder.svg?height=32&width=32",
    outreachStatus: "responded", // New field
    outreachPlatform: "email", // New field
    outreachDate: "2023-11-13", // New field
  },
]

export function LeadTable() {
  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead>Lead</TableHead>
            <TableHead>
              <div className="flex items-center">
                Score
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Outreach</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={lead.avatar} alt={lead.name} />
                    <AvatarFallback>{lead.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{lead.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {lead.position} at {lead.company}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className={`font-medium ${getScoreColor(lead.score)}`}>{lead.score}</span>
                </div>
              </TableCell>
              <TableCell>{lead.source}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
              </TableCell>
              <TableCell>
                {lead.outreachStatus === "none" ? (
                  <span className="text-sm text-muted-foreground">None</span>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        {lead.outreachPlatform === "linkedin" ? (
                          <MessageSquare className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Mail className="h-4 w-4 text-green-500" />
                        )}
                        <span
                          className={`text-sm ${lead.outreachStatus === "responded" ? "text-green-600 font-medium" : "text-muted-foreground"}`}
                        >
                          {lead.outreachStatus === "responded" ? "Responded" : "Sent"}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Message sent on {lead.outreachDate}</p>
                      {lead.outreachStatus === "responded" && <p>Lead has responded</p>}
                    </TooltipContent>
                  </Tooltip>
                )}
              </TableCell>
              <TableCell>{lead.lastActivity}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                    <DropdownMenuItem>Add to CRM</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  )
}

function getScoreColor(score: number) {
  if (score >= 90) return "text-green-600"
  if (score >= 80) return "text-green-500"
  if (score >= 70) return "text-yellow-500"
  return "text-red-500"
}

function getStatusVariant(status: string): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case "qualified":
      return "default"
    case "contacted":
      return "secondary"
    case "pending":
      return "outline"
    default:
      return "outline"
  }
}

