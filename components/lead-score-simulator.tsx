"use client"

import { useState, useEffect } from "react"
import { Brain, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadScoreVisualization } from "@/components/lead-score-visualization"
import { scoreLeadAction, getSampleLeads } from "@/app/actions/lead-scoring"
import type { LeadData } from "@/lib/lead-scoring-algorithm"

export function LeadScoreSimulator() {
  const [loading, setLoading] = useState(false)
  const [sampleLeads, setSampleLeads] = useState<LeadData[]>([])
  const [selectedLeadId, setSelectedLeadId] = useState<string>("")
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null)
  const [scoreResult, setScoreResult] = useState<any>(null)

  // Load sample leads on component mount
  useEffect(() => {
    const loadSampleLeads = async () => {
      const leads = await getSampleLeads()
      setSampleLeads(leads)
      if (leads.length > 0) {
        setSelectedLeadId(leads[0].id)
        setSelectedLead(leads[0])
      }
    }

    loadSampleLeads()
  }, [])

  // Update selected lead when ID changes
  useEffect(() => {
    if (selectedLeadId && sampleLeads.length > 0) {
      const lead = sampleLeads.find((l) => l.id === selectedLeadId)
      if (lead) {
        setSelectedLead(lead)
      }
    }
  }, [selectedLeadId, sampleLeads])

  // Score the selected lead
  const handleScoreLead = async () => {
    if (!selectedLead) return

    setLoading(true)
    try {
      const result = await scoreLeadAction(selectedLead)
      setScoreResult(result)
    } catch (error) {
      console.error("Error scoring lead:", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle lead selection change
  const handleLeadChange = (id: string) => {
    setSelectedLeadId(id)
    setScoreResult(null) // Reset score when lead changes
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lead Score Simulator</CardTitle>
          <CardDescription>Test the lead scoring algorithm with sample data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lead-select">Select a Sample Lead</Label>
              <Select value={selectedLeadId} onValueChange={handleLeadChange}>
                <SelectTrigger id="lead-select">
                  <SelectValue placeholder="Select a lead" />
                </SelectTrigger>
                <SelectContent>
                  {sampleLeads.map((lead) => (
                    <SelectItem key={lead.id} value={lead.id}>
                      {lead.name} - {lead.company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedLead && (
              <div className="space-y-4 pt-4">
                <Tabs defaultValue="company" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="company" className="flex-1">
                      Company
                    </TabsTrigger>
                    <TabsTrigger value="contact" className="flex-1">
                      Contact
                    </TabsTrigger>
                    <TabsTrigger value="behavior" className="flex-1">
                      Behavior
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="company" className="space-y-4 pt-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" value={selectedLead.company.name} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-size">Company Size</Label>
                        <Input id="company-size" value={selectedLead.company.size} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-industry">Industry</Label>
                        <Input id="company-industry" value={selectedLead.company.industry} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-funding">Funding Stage</Label>
                        <Input id="company-funding" value={selectedLead.company.fundingStage || "Unknown"} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-revenue">Annual Revenue</Label>
                        <Input
                          id="company-revenue"
                          value={
                            selectedLead.company.annualRevenue
                              ? `$${(selectedLead.company.annualRevenue / 1000000).toFixed(1)}M`
                              : "Unknown"
                          }
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-growth">Growth Rate</Label>
                        <Input
                          id="company-growth"
                          value={selectedLead.company.growthRate ? `${selectedLead.company.growthRate}%` : "Unknown"}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-tech">Technology Stack</Label>
                      <div className="rounded-md border p-3 text-sm">
                        {selectedLead.company.technologyStack
                          ? selectedLead.company.technologyStack.join(", ")
                          : "No technology stack data available"}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="contact" className="space-y-4 pt-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Name</Label>
                        <Input id="contact-name" value={selectedLead.name} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-position">Position</Label>
                        <Input id="contact-position" value={selectedLead.contact.position} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-seniority">Seniority</Label>
                        <Input id="contact-seniority" value={selectedLead.contact.seniority} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-department">Department</Label>
                        <Input id="contact-department" value={selectedLead.contact.department} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input id="contact-email" value={selectedLead.contact.email || "Unknown"} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-linkedin">LinkedIn</Label>
                        <Input id="contact-linkedin" value={selectedLead.contact.linkedInUrl || "Unknown"} readOnly />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="behavior" className="space-y-4 pt-4">
                    {selectedLead.behavior ? (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="behavior-visits">Website Visits</Label>
                          <Input id="behavior-visits" value={selectedLead.behavior.websiteVisits || 0} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="behavior-downloads">Content Downloads</Label>
                          <Input id="behavior-downloads" value={selectedLead.behavior.contentDownloads || 0} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="behavior-email">Email Engagement</Label>
                          <Input
                            id="behavior-email"
                            value={
                              selectedLead.behavior.emailEngagement
                                ? `${(selectedLead.behavior.emailEngagement * 100).toFixed(0)}%`
                                : "0%"
                            }
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="behavior-social">Social Engagement</Label>
                          <Input
                            id="behavior-social"
                            value={
                              selectedLead.behavior.socialEngagement
                                ? `${(selectedLead.behavior.socialEngagement * 100).toFixed(0)}%`
                                : "0%"
                            }
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="behavior-event">Event Attendance</Label>
                          <Input
                            id="behavior-event"
                            value={selectedLead.behavior.eventAttendance ? "Yes" : "No"}
                            readOnly
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-md border p-4 text-center text-sm text-muted-foreground">
                        No behavioral data available for this lead
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <Button onClick={handleScoreLead} disabled={!selectedLead || loading} className="w-full">
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Scoring Lead...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Score This Lead
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {scoreResult && scoreResult.success && (
        <LeadScoreVisualization
          score={scoreResult.score}
          categoryScores={scoreResult.categoryScores}
          topFactors={scoreResult.topFactors}
          explanation={scoreResult.explanation}
        />
      )}
    </div>
  )
}

