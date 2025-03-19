import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LeadScoringModel() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="model-type">Model Type</Label>
        <Select defaultValue="gradient-boosting">
          <SelectTrigger id="model-type">
            <SelectValue placeholder="Select model type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gradient-boosting">Gradient Boosting</SelectItem>
            <SelectItem value="random-forest">Random Forest</SelectItem>
            <SelectItem value="neural-network">Neural Network</SelectItem>
            <SelectItem value="logistic-regression">Logistic Regression</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Gradient Boosting models typically perform well for lead scoring tasks
        </p>
      </div>

      <div className="space-y-2">
        <Label>Data Sources</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="linkedin" defaultChecked />
            <Label htmlFor="linkedin">LinkedIn Data</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="crunchbase" defaultChecked />
            <Label htmlFor="crunchbase">Crunchbase Data</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="job-boards" defaultChecked />
            <Label htmlFor="job-boards">Job Board Data</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="website" />
            <Label htmlFor="website">Website Visitor Data</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Feature Selection</Label>
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
          <TabsContent value="company" className="space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <Switch id="company-size" defaultChecked />
              <Label htmlFor="company-size">Company Size</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="industry" defaultChecked />
              <Label htmlFor="industry">Industry</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="funding" defaultChecked />
              <Label htmlFor="funding">Funding Status</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="tech-stack" defaultChecked />
              <Label htmlFor="tech-stack">Technology Stack</Label>
            </div>
          </TabsContent>
          <TabsContent value="contact" className="space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <Switch id="job-title" defaultChecked />
              <Label htmlFor="job-title">Job Title</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="seniority" defaultChecked />
              <Label htmlFor="seniority">Seniority Level</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="department" defaultChecked />
              <Label htmlFor="department">Department</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="location" />
              <Label htmlFor="location">Location</Label>
            </div>
          </TabsContent>
          <TabsContent value="behavior" className="space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <Switch id="website-visits" />
              <Label htmlFor="website-visits">Website Visits</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="content-downloads" />
              <Label htmlFor="content-downloads">Content Downloads</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="email-engagement" />
              <Label htmlFor="email-engagement">Email Engagement</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="social-engagement" />
              <Label htmlFor="social-engagement">Social Media Engagement</Label>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-2">
        <Label>Training Configuration</Label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="training-ratio" className="text-xs">
              Training/Test Split
            </Label>
            <Select defaultValue="80-20">
              <SelectTrigger id="training-ratio">
                <SelectValue placeholder="Select split ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="70-30">70% / 30%</SelectItem>
                <SelectItem value="80-20">80% / 20%</SelectItem>
                <SelectItem value="90-10">90% / 10%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="cross-validation" className="text-xs">
              Cross-Validation Folds
            </Label>
            <Select defaultValue="5">
              <SelectTrigger id="cross-validation">
                <SelectValue placeholder="Select folds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 Folds</SelectItem>
                <SelectItem value="5">5 Folds</SelectItem>
                <SelectItem value="10">10 Folds</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Advanced Options</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="auto-retrain" defaultChecked />
            <Label htmlFor="auto-retrain">Auto-retrain on new data</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="feature-importance" defaultChecked />
            <Label htmlFor="feature-importance">Calculate feature importance</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="explainability" />
            <Label htmlFor="explainability">Enable model explainability</Label>
          </div>
        </div>
      </div>
    </div>
  )
}

