"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Upload, BarChart2, Crosshair, Layers } from "lucide-react"
import { useDropzone } from "react-dropzone"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

// Dummy test results data
const dummyTestResults = {
  metrics: {
    mAP: 0.892,
    precision: 0.912,
    recall: 0.876,
    f1Score: 0.894,
  },
  classMetrics: [
    { name: "Person", precision: 0.95, recall: 0.92, f1: 0.93 },
    { name: "Car", precision: 0.88, recall: 0.85, f1: 0.86 },
    { name: "Bicycle", precision: 0.82, recall: 0.79, f1: 0.80 },
  ],
  confusionMatrix: {
    // Simplified confusion matrix data
    labels: ["Person", "Car", "Bicycle"],
    values: [
      [120, 5, 2],
      [4, 98, 3],
      [3, 4, 85],
    ],
  },
}

export default function TestPage() {
  const params = useParams()
  const [testResults, setTestResults] = React.useState(dummyTestResults)
  const [isProcessing, setIsProcessing] = React.useState(false)

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setIsProcessing(true)
    // Simulate test processing delay
    setTimeout(() => {
      setIsProcessing(false)
      toast.success("Test images processed successfully")
    }, 2000)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-lg font-medium">Model Testing</h3>
        <p className="text-sm text-muted-foreground">
          Evaluate your trained model's performance on test images
        </p>
      </div>
      <Separator />

      {/* Upload Test Images */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "border-muted hover:bg-muted/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <Upload className="h-8 w-8 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">
            {isProcessing
              ? "Processing..."
              : isDragActive
              ? "Drop the test images here"
              : "Upload Test Images"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            or click to select files
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: PNG, JPG, JPEG up to 10MB each
          </p>
        </div>
      </div>

      {/* Test Results */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Overall Metrics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Performance
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(testResults.metrics.mAP * 100).toFixed(1)}% mAP
            </div>
            <p className="text-xs text-muted-foreground">
              Mean Average Precision
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex text-sm">
                <span className="flex-1">Precision</span>
                <span className="text-muted-foreground">
                  {(testResults.metrics.precision * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex text-sm">
                <span className="flex-1">Recall</span>
                <span className="text-muted-foreground">
                  {(testResults.metrics.recall * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex text-sm">
                <span className="flex-1">F1 Score</span>
                <span className="text-muted-foreground">
                  {(testResults.metrics.f1Score * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Per-Class Performance */}
        {testResults.classMetrics.map((classMetric) => (
          <Card key={classMetric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {classMetric.name}
              </CardTitle>
              <Crosshair className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(classMetric.f1 * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">F1 Score</p>
              <div className="mt-4 space-y-2">
                <div className="space-y-1">
                  <div className="flex text-sm justify-between">
                    <span>Precision</span>
                    <span className="text-muted-foreground">
                      {(classMetric.precision * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={classMetric.precision * 100} />
                </div>
                <div className="space-y-1">
                  <div className="flex text-sm justify-between">
                    <span>Recall</span>
                    <span className="text-muted-foreground">
                      {(classMetric.recall * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={classMetric.recall * 100} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Confusion Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5" />
            <span>Confusion Matrix</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] rounded-lg border bg-muted p-6">
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Confusion matrix visualization will be implemented here
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 