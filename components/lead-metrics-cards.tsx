import { ArrowUpRight, BarChart3, Target, Zap } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LeadMetricsCards() {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,248</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
          <div className="mt-4 flex items-center text-xs text-green-500">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            <span>Increasing</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">342</div>
          <p className="text-xs text-muted-foreground">27.4% qualification rate</p>
          <div className="mt-4 flex items-center text-xs text-green-500">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            <span>+8% from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contacted</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">186</div>
          <p className="text-xs text-muted-foreground">54.4% of qualified leads</p>
          <div className="mt-4 flex items-center text-xs text-green-500">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            <span>+15% from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8.2%</div>
          <p className="text-xs text-muted-foreground">Of contacted leads</p>
          <div className="mt-4 flex items-center text-xs text-green-500">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            <span>+2.1% from last month</span>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

