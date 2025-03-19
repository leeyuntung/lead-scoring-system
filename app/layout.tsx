import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { MainNav } from "@/components/main-nav"
import { AppHeader } from "@/components/app-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LeadQualify AI - Intelligent Lead Qualification System",
  description: "AI-powered lead identification and qualification from online sources",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <MainNav />
              <div className="flex flex-1 flex-col">
                <AppHeader />
                <main className="flex-1">{children}</main>
              </div>
            </div>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'