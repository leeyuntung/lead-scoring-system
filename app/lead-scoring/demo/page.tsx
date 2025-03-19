"use client"

import { Brain } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { LeadScoreSimulator } from "@/components/lead-score-simulator"

export default function LeadScoringDemoPage() {
  const { toast } = useToast()

  const handleConfigureModel = () => {
    toast({
      title: "Model Configuration",
      description: "Redirecting to model configuration page...",
      duration: 3000,
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lead Scoring Demo</h1>
        <Button onClick={handleConfigureModel}>
          <Brain className="mr-2 h-4 w-4" />
          Configure Model
        </Button>
      </div>

      <Tabs defaultValue="simulator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="simulator">Score Simulator</TabsTrigger>
          <TabsTrigger value="algorithm">Algorithm Explanation</TabsTrigger>
          <TabsTrigger value="batch">Batch Processing</TabsTrigger>
        </TabsList>

        <TabsContent value="simulator" className="space-y-4">
          <LeadScoreSimulator />
        </TabsContent>

        <TabsContent value="algorithm" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Scoring Algorithm Explanation</CardTitle>
              <CardDescription>How our AI-powered lead scoring algorithm works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Overview</h3>
                <p className="text-sm text-muted-foreground">
                  Our lead scoring algorithm uses a weighted multi-factor approach to evaluate leads based on company
                  information, contact details, and behavioral data. The algorithm assigns a score from 0-100, with
                  higher scores indicating higher-quality leads.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Scoring Categories</h3>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Company Factors (40%)</h4>
                    <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      <li>Company Size - Larger companies typically receive higher scores</li>
                      <li>Industry Relevance - Industries aligned with our target market score higher</li>
                      <li>Funding Stage - Later-stage companies typically indicate more buying power</li>
                      <li>Annual Revenue - Higher revenue companies score better</li>
                      <li>Growth Rate - Faster growing companies are often better prospects</li>
                      <li>Technology Stack - Companies using complementary technologies score higher</li>
                    </ul>
                  </div>

                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Contact Factors (40%)</h4>
                    <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      <li>Position/Title - Decision-makers and influencers score higher</li>
                      <li>Seniority Level - C-level and VP positions receive the highest scores</li>
                      <li>Department - Contacts in relevant departments score better</li>
                    </ul>
                  </div>

                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">Behavioral Factors (20%)</h4>
                    <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      <li>Website Visits - More visits indicate higher interest</li>
                      <li>Content Downloads - Downloading resources shows engagement</li>
                      <li>Email Engagement - Opening and clicking emails indicates interest</li>
                      <li>Social Media Engagement - Interactions on social platforms</li>
                      <li>Event Attendance - Attending webinars or in-person events</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Score Interpretation</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-md border p-4 bg-green-50">
                    <h4 className="font-medium text-green-700">80-100: Qualified Lead</h4>
                    <p className="mt-1 text-sm text-green-600">
                      High-quality leads ready for sales outreach. These leads have strong company fit, appropriate
                      contacts, and often show engagement.
                    </p>
                  </div>

                  <div className="rounded-md border p-4 bg-yellow-50">
                    <h4 className="font-medium text-yellow-700">50-79: Pending Lead</h4>
                    <p className="mt-1 text-sm text-yellow-600">
                      Potential leads that need nurturing or additional information before sales engagement.
                    </p>
                  </div>

                  <div className="rounded-md border p-4 bg-red-50">
                    <h4 className="font-medium text-red-700">0-49: Unqualified Lead</h4>
                    <p className="mt-1 text-sm text-red-600">
                      Leads that don't match our ideal customer profile or are not ready for sales engagement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Machine Learning Enhancement</h3>
                <p className="text-sm text-muted-foreground">
                  The algorithm is continuously improved through machine learning by analyzing conversion patterns and
                  feedback from the sales team. As more leads convert to customers, the system learns which factors are
                  most predictive of success.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Batch Lead Scoring</CardTitle>
              <CardDescription>
                Score multiple leads at once to quickly identify the highest quality prospects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Batch processing functionality will be available in the full version
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

