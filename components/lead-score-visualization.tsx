"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { ArrowRight, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TooltipProvider } from "@/components/ui/tooltip"

type LeadScoreVisualizationProps = {
  score: number
  categoryScores: {
    company: number
    contact: number
    behavior: number
  }
  topFactors: {
    factor: string
    impact: number
  }[]
  explanation: string
}

export function LeadScoreVisualization({
  score,
  categoryScores,
  topFactors,
  explanation,
}: LeadScoreVisualizationProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Format category scores for charts
  const categoryData = [
    { name: "Company", score: categoryScores.company },
    { name: "Contact", score: categoryScores.contact },
    { name: "Behavior", score: categoryScores.behavior || 0 },
  ]

  // Format top factors for charts
  const factorsData = topFactors.map((factor) => ({
    name: factor.factor,
    impact: factor.impact,
  }))

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 70) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    if (score >= 50) return "text-yellow-600"
    return "text-red-500"
  }

  // Get score badge variant based on value
  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "outline" | "destructive" => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    if (score >= 50) return "outline"
    return "destructive"
  }

  return (
    <TooltipProvider>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lead Score Analysis</CardTitle>
            <Badge variant={getScoreBadgeVariant(score)} className="text-lg px-3 py-1">
              {score}
            </Badge>
          </div>
          <CardDescription>Detailed breakdown of lead qualification score</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="factors">Key Factors</TabsTrigger>
              <TabsTrigger value="explanation">Explanation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Score</span>
                  <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}/100</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${score}%` }} />
                </div>
              </div>

              <div className="h-[250px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex flex-col items-center justify-center rounded-lg border p-3">
                    <span className="text-sm text-muted-foreground">{category.name}</span>
                    <span className={`text-lg font-bold ${getScoreColor(category.score)}`}>{category.score}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="factors" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={factorsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="impact"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {factorsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Top Contributing Factors</h4>
                  {topFactors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{factor.factor}</span>
                      </div>
                      <span className="text-sm font-medium">{factor.impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="explanation" className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <p className="text-sm">{explanation}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t p-4">
          <Button variant="outline" className="w-full">
            View Detailed Report
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  )
}

