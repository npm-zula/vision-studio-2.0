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
import { Area, AreaChart, CartesianGrid, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

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

// Dummy data for loss curves
const lossData = [
  { epoch: 1, trainLoss: 2.5, valLoss: 2.7 },
  { epoch: 20, trainLoss: 1.8, valLoss: 2.0 },
  { epoch: 40, trainLoss: 1.2, valLoss: 1.5 },
  { epoch: 60, trainLoss: 0.8, valLoss: 1.1 },
  { epoch: 80, trainLoss: 0.4, valLoss: 0.7 },
  { epoch: 100, trainLoss: 0.245, valLoss: 0.312 },
]

// Dummy data for metrics history
const metricsData = [
  { epoch: 1, mAP: 0.2, precision: 0.3, recall: 0.25 },
  { epoch: 20, mAP: 0.45, precision: 0.5, recall: 0.4 },
  { epoch: 40, mAP: 0.6, precision: 0.65, recall: 0.55 },
  { epoch: 60, mAP: 0.7, precision: 0.75, recall: 0.65 },
  { epoch: 80, mAP: 0.8, precision: 0.85, recall: 0.75 },
  { epoch: 100, mAP: 0.856, precision: 0.892, recall: 0.834 },
]

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
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="h-5 w-5" />
                <span>Loss Curves</span>
              </CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-blue-500/20" />
                  <span className="text-sm text-muted-foreground">Training</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-orange-500/20" />
                  <span className="text-sm text-muted-foreground">Validation</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={lossData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}
                    vertical={false}
                    stroke="hsl(var(--muted))"
                    opacity={0.4}
                  />
                  <XAxis
                    dataKey="epoch"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const trainLoss = payload[0].value as number
                        const valLoss = payload[1].value as number
                        return (
                          <div className="rounded-lg border bg-background px-3 py-2 shadow-sm">
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-medium text-foreground">
                                Epoch {label}
                              </span>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                                  <span className="text-sm">
                                    Train: {trainLoss.toFixed(3)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                                  <span className="text-sm">
                                    Val: {valLoss.toFixed(3)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="trainLoss"
                    stroke="hsl(217, 91%, 60%)" // Blue
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      r: 4,
                      strokeWidth: 0,
                      fill: "hsl(217, 91%, 60%)"
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="valLoss"
                    stroke="hsl(24, 75%, 50%)" // Orange
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      r: 4,
                      strokeWidth: 0,
                      fill: "hsl(24, 75%, 50%)"
                    }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Metrics History</span>
              </CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-green-500/20" />
                  <span className="text-sm text-muted-foreground">mAP</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-purple-500/20" />
                  <span className="text-sm text-muted-foreground">Precision</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                  <span className="text-sm text-muted-foreground">Recall</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={metricsData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}
                    vertical={false}
                    stroke="hsl(var(--muted))"
                    opacity={0.4}
                  />
                  <XAxis
                    dataKey="epoch"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                    tickFormatter={(value: number) => `${(value * 100).toFixed(0)}%`}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    domain={[0, 1]}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const mAP = payload[0].value as number
                        const precision = payload[1].value as number
                        const recall = payload[2].value as number
                        return (
                          <div className="rounded-lg border bg-background px-3 py-2 shadow-sm">
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-medium text-foreground">
                                Epoch {label}
                              </span>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-green-500" />
                                  <span className="text-sm">
                                    mAP: {(mAP * 100).toFixed(1)}%
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                                  <span className="text-sm">
                                    Precision: {(precision * 100).toFixed(1)}%
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                  <span className="text-sm">
                                    Recall: {(recall * 100).toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mAP"
                    stroke="hsl(142, 76%, 36%)" // Green
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      r: 4,
                      strokeWidth: 0,
                      fill: "hsl(142, 76%, 36%)"
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="precision"
                    stroke="hsl(280, 87%, 65%)" // Purple
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      r: 4,
                      strokeWidth: 0,
                      fill: "hsl(280, 87%, 65%)"
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="recall"
                    stroke="hsl(45, 93%, 47%)" // Yellow
                    strokeWidth={2}
                    dot={false}
                    activeDot={{
                      r: 4,
                      strokeWidth: 0,
                      fill: "hsl(45, 93%, 47%)"
                    }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 