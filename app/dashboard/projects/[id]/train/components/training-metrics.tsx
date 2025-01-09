"use client"

import * as React from "react"
import {
  BarChart3,
  Cpu,
  Database,
  LineChart,
  Network,
  Timer,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Dummy data for metrics
const dummyMetrics = {
  dataset: {
    totalImages: 2458,
    trainingSplit: 0.8,
    validationSplit: 0.2,
    annotatedImages: 0.98,
  },
  hardware: {
    gpu: "A100",
    gpuMemory: "80GB",
    cpuCores: 32,
    ram: "128GB",
  },
  training: {
    epoch: 45,
    totalEpochs: 100,
    timeElapsed: "2h 15m",
    timeRemaining: "3h 45m",
    learningRate: 0.001,
    batchesProcessed: 1240,
  },
  metrics: {
    trainLoss: 0.245,
    valLoss: 0.312,
    mAP: 0.856,
    precision: 0.892,
    recall: 0.834,
  },
}

export function TrainingMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Dataset Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dataset Overview
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyMetrics.dataset.totalImages.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total training images
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex text-sm">
                <span className="flex-1">Training split</span>
                <span className="text-muted-foreground">
                  {(dummyMetrics.dataset.trainingSplit * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex text-sm">
                <span className="flex-1">Validation split</span>
                <span className="text-muted-foreground">
                  {(dummyMetrics.dataset.validationSplit * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex text-sm">
                <span className="flex-1">Annotated images</span>
                <span className="text-muted-foreground">
                  {(dummyMetrics.dataset.annotatedImages * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hardware Resources */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hardware Resources
            </CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyMetrics.hardware.gpu}</div>
            <p className="text-xs text-muted-foreground">
              NVIDIA GPU Instance
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex text-sm">
                <span className="flex-1">GPU Memory</span>
                <span className="text-muted-foreground">
                  {dummyMetrics.hardware.gpuMemory}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="flex-1">CPU Cores</span>
                <span className="text-muted-foreground">
                  {dummyMetrics.hardware.cpuCores}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="flex-1">RAM</span>
                <span className="text-muted-foreground">
                  {dummyMetrics.hardware.ram}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Progress */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Training Progress
            </CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Epoch {dummyMetrics.training.epoch}/{dummyMetrics.training.totalEpochs}
            </div>
            <Progress
              value={(dummyMetrics.training.epoch / dummyMetrics.training.totalEpochs) * 100}
              className="mt-2"
            />
            <div className="mt-4 space-y-2">
              <div className="flex text-sm">
                <span className="flex-1">Time Elapsed</span>
                <span className="text-muted-foreground">
                  {dummyMetrics.training.timeElapsed}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="flex-1">Time Remaining</span>
                <span className="text-muted-foreground">
                  {dummyMetrics.training.timeRemaining}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="flex-1">Learning Rate</span>
                <span className="text-muted-foreground">
                  {dummyMetrics.training.learningRate}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Metrics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Metrics</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(dummyMetrics.metrics.mAP * 100).toFixed(1)}% mAP
            </div>
            <p className="text-xs text-muted-foreground">
              Mean Average Precision
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex text-sm">
                <span className="flex-1">Training Loss</span>
                <span className="text-muted-foreground">
                  {dummyMetrics.metrics.trainLoss.toFixed(3)}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="flex-1">Validation Loss</span>
                <span className="text-muted-foreground">
                  {dummyMetrics.metrics.valLoss.toFixed(3)}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="flex-1">Precision</span>
                <span className="text-muted-foreground">
                  {(dummyMetrics.metrics.precision * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex text-sm">
                <span className="flex-1">Recall</span>
                <span className="text-muted-foreground">
                  {(dummyMetrics.metrics.recall * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loss Curves */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LineChart className="h-5 w-5" />
              <span>Loss Curves</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] rounded-lg border bg-muted p-6">
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Loss curves visualization will be implemented here
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Metrics History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] rounded-lg border bg-muted p-6">
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Metrics history visualization will be implemented here
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 