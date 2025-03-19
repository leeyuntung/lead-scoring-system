"use client"

import { useState, useEffect } from "react"
import { Brain, Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

interface TrainModelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TrainModelDialog({ open, onOpenChange }: TrainModelDialogProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("Initializing training...")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setProgress(0)
      setCurrentStep("Initializing training...")
      setIsComplete(false)
      return
    }

    // Simulate training progress
    const steps = [
      { message: "Initializing training...", duration: 1000, progress: 10 },
      { message: "Collecting training data...", duration: 2000, progress: 30 },
      { message: "Processing features...", duration: 1500, progress: 50 },
      { message: "Training model...", duration: 3000, progress: 80 },
      { message: "Evaluating model performance...", duration: 1500, progress: 90 },
      { message: "Finalizing and deploying model...", duration: 1000, progress: 100 },
    ]

    let timeoutId: NodeJS.Timeout
    let currentIndex = 0

    const runNextStep = () => {
      if (currentIndex < steps.length) {
        const step = steps[currentIndex]
        setCurrentStep(step.message)
        setProgress(step.progress)

        timeoutId = setTimeout(() => {
          currentIndex++
          if (currentIndex === steps.length) {
            setIsComplete(true)
          } else {
            runNextStep()
          }
        }, step.duration)
      }
    }

    runNextStep()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Training Lead Scoring Model</DialogTitle>
          <DialogDescription>
            Training your model with the latest data to improve lead qualification accuracy.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="flex items-center gap-4 mb-4">
            {isComplete ? (
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                {progress < 100 ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <Brain className="h-5 w-5 text-primary" />
                )}
              </div>
            )}
            <div>
              <p className="font-medium">{isComplete ? "Training Complete!" : currentStep}</p>
              <p className="text-sm text-muted-foreground">
                {isComplete
                  ? "Your model has been successfully trained and deployed."
                  : "Please don't close this window during training."}
              </p>
            </div>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Progress: {progress}%</span>
            {isComplete && <span>Accuracy: 92.4%</span>}
          </div>
        </div>

        <DialogFooter>
          {isComplete ? (
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          ) : (
            <Button variant="outline" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Training in progress...
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

