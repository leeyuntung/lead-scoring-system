"use client"

import { ArrowRight, Brain } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { LeadScoringModel } from "@/components/lead-scoring-model"
import { TrainModelDialog } from "@/components/train-model-dialog"

export default function LeadScoringPage() {
  const { toast } = useToast()
  const [showTrainingDialog, setShowTrainingDialog] = useState(false)

  const handleTrainModel = () => {
    setShowTrainingDialog(true)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lead Scoring Configuration</h1>
        <Button onClick={handleTrainModel}>
          <Brain className="mr-2 h-4 w-4" />
          Train Model
        </Button>
      </div>

      <TrainModelDialog open={showTrainingDialog} onOpenChange={setShowTrainingDialog} />
      <Tabs defaultValue="model" className="space-y-4">
        <TabsList>
          <TabsTrigger value="model">Scoring Model</TabsTrigger>
          <TabsTrigger value="criteria">Scoring Criteria</TabsTrigger>
          <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
          <TabsTrigger value="history">Training History</TabsTrigger>
        </TabsList>
        <TabsContent value="model" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>AI Lead Scoring Model</CardTitle>
                <CardDescription>Configure your machine learning model for lead qualification</CardDescription>
              </CardHeader>
              <CardContent>
                <LeadScoringModel />
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button className="ml-auto">
                  Save Configuration
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
                <CardDescription>Current model accuracy and metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <Label>Accuracy</Label>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[92%] rounded-full bg-primary" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <Label>Precision</Label>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[88%] rounded-full bg-primary" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <Label>Recall</Label>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[85%] rounded-full bg-primary" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <Label>F1 Score</Label>
                    <span className="text-sm font-medium">86%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[86%] rounded-full bg-primary" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" className="w-full">
                  View Detailed Metrics
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="criteria" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scoring Criteria</CardTitle>
              <CardDescription>Configure the criteria used to score and qualify leads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Company Size Weight</Label>
                  <div className="flex items-center gap-4 pt-2">
                    <Slider defaultValue={[70]} max={100} step={1} />
                    <span className="w-12 text-sm font-medium">70%</span>
                  </div>
                </div>
                <div>
                  <Label>Industry Relevance Weight</Label>
                  <div className="flex items-center gap-4 pt-2">
                    <Slider defaultValue={[85]} max={100} step={1} />
                    <span className="w-12 text-sm font-medium">85%</span>
                  </div>
                </div>
                <div>
                  <Label>Job Title Seniority Weight</Label>
                  <div className="flex items-center gap-4 pt-2">
                    <Slider defaultValue={[90]} max={100} step={1} />
                    <span className="w-12 text-sm font-medium">90%</span>
                  </div>
                </div>
                <div>
                  <Label>Company Growth Rate Weight</Label>
                  <div className="flex items-center gap-4 pt-2">
                    <Slider defaultValue={[65]} max={100} step={1} />
                    <span className="w-12 text-sm font-medium">65%</span>
                  </div>
                </div>
                <div>
                  <Label>Technology Stack Weight</Label>
                  <div className="flex items-center gap-4 pt-2">
                    <Slider defaultValue={[75]} max={100} step={1} />
                    <span className="w-12 text-sm font-medium">75%</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button className="ml-auto">Save Criteria</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="thresholds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Qualification Thresholds</CardTitle>
              <CardDescription>Set thresholds for lead qualification status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Qualified Lead Threshold</Label>
                  <div className="flex items-center gap-4 pt-2">
                    <Slider defaultValue={[80]} max={100} step={1} />
                    <span className="w-12 text-sm font-medium">80%</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Leads with scores above this threshold will be marked as qualified
                  </p>
                </div>
                <div>
                  <Label>High-Priority Lead Threshold</Label>
                  <div className="flex items-center gap-4 pt-2">
                    <Slider defaultValue={[90]} max={100} step={1} />
                    <span className="w-12 text-sm font-medium">90%</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Leads with scores above this threshold will be marked as high-priority
                  </p>
                </div>
                <div>
                  <Label>Auto-Outreach Threshold</Label>
                  <div className="flex items-center gap-4 pt-2">
                    <Slider defaultValue={[85]} max={100} step={1} />
                    <span className="w-12 text-sm font-medium">85%</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Leads with scores above this threshold will receive automated outreach
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button className="ml-auto">Save Thresholds</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Training History</CardTitle>
              <CardDescription>View the history of model training and performance improvements</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Training history will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

