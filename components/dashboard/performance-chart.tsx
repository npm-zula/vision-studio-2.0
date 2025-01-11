"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts"

interface DataPoint {
  date: string
  accuracy: number
}

const data: DataPoint[] = [
  { date: "Jan 1", accuracy: 78 },
  { date: "Jan 5", accuracy: 82 },
  { date: "Jan 10", accuracy: 85 },
  { date: "Jan 15", accuracy: 87 },
  { date: "Jan 20", accuracy: 89 },
  { date: "Jan 25", accuracy: 91 },
  { date: "Jan 30", accuracy: 94.5 },
]

type CustomTooltipProps = TooltipProps<number, string>

export function PerformanceChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Model Performance</CardTitle>
            <CardDescription>
              Training progress over time
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-full bg-primary/20" />
              <span className="text-sm text-muted-foreground">Accuracy</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="accuracy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                horizontal={true}
                vertical={false}
                stroke="hsl(var(--muted))"
                opacity={0.4}
              />
              <XAxis
                dataKey="date"
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
                tickFormatter={(value: number) => `${value}%`}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                domain={[70, 100]}
              />
              <Tooltip
                content={({ active, payload, label }: CustomTooltipProps) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background px-3 py-2 shadow-sm">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-foreground">
                            {label}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-sm font-semibold">
                              {payload[0].value}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="accuracy"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#accuracy)"
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 0,
                  fill: "hsl(var(--primary))"
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 