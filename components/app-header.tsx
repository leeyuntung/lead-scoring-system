import Link from "next/link"
import { Bell, HelpCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="hidden md:block">
        <SidebarTrigger />
      </div>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search leads, companies..." className="w-full pl-8 md:max-w-sm" />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button asChild variant="default" size="sm">
          <Link href="/integrations">Connect CRM</Link>
        </Button>
      </div>
    </header>
  )
}

