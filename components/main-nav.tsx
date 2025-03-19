"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Filter, Home, LineChart, Link2, MessageSquare, Settings, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      title: "Leads",
      href: "/leads",
      icon: Users,
    },
    {
      title: "Lead Scoring",
      href: "/lead-scoring",
      icon: BarChart3,
    },
    {
      title: "Scoring Demo",
      href: "/lead-scoring/demo",
      icon: LineChart,
    },
    {
      title: "Outreach",
      href: "/outreach",
      icon: MessageSquare,
    },
    {
      title: "Integrations",
      href: "/integrations",
      icon: Link2,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex h-14 items-center px-4">
          <Filter className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">LeadQualify AI</span>
          <div className="ml-auto md:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
                <Link href={route.href}>
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div className="text-sm">
              <p className="font-medium">LeadQualify AI</p>
              <p className="text-xs text-muted-foreground">Pro Plan</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

