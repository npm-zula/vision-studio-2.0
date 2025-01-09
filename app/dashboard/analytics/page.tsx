"use client"

import * as React from "react"
import {
  BarChart3,
  Clock,
  Image as ImageIcon,
  LineChart,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = React.useState("7d")

  const stats = [
    {
      title: "Total Projects",
      value: "12",
      description: "+2 from last month",
      icon: BarChart3,
    },
    {
      title: "Active Users",
      value: "320",
      description: "+18% increase",
      icon: Users,
    },
    {
      title: "Total Images",
      value: "8.2k",
      description: "+2.3k this month",
      icon: ImageIcon,
    },
    {
      title: "Avg. Accuracy",
      value: "94.5%",
      description: "+2.1% improvement",
      icon: LineChart,
    },
  ]

  const recentModels = [
    {
      id: 1,
      name: "Object Detection v2",
      accuracy: "96.8%",
      status: "Active",
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      name: "Image Classification",
      accuracy: "94.2%",
      status: "Training",
      lastUpdated: "1 day ago",
    },
    {
      id: 3,
      name: "Semantic Segmentation",
      accuracy: "92.5%",
      status: "Active",
      lastUpdated: "3 days ago",
    },
  ]

  const usageData = [
    {
      id: 1,
      metric: "API Calls",
      value: "52.8k",
      change: "+12%",
      limit: "100k",
    },
    {
      id: 2,
      metric: "Storage Used",
      value: "128 GB",
      change: "+8%",
      limit: "500 GB",
    },
    {
      id: 3,
      metric: "Processing Time",
      value: "1.2s",
      change: "-15%",
      limit: "2s",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Analytics Overview</h2>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Model Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentModels.map((model) => (
                <div
                  key={model.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{model.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {model.lastUpdated}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{model.accuracy}</div>
                    <div className="text-sm text-muted-foreground">
                      {model.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageData.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="text-sm font-medium">{item.metric}</p>
                    <p className="text-sm text-muted-foreground">
                      Limit: {item.limit}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.value}</div>
                    <div
                      className={`text-sm ${
                        item.change.startsWith("+")
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 