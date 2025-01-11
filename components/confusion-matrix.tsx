"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers } from "lucide-react"

interface ConfusionMatrixProps {
  data: {
    labels: string[]
    values: number[][]
  }
}

export function ConfusionMatrix({ data }: ConfusionMatrixProps) {
  // Calculate the total predictions for each true class for percentages
  const rowSums = data.values.map(row => row.reduce((a, b) => a + b, 0))
  
  // Get the maximum value for color scaling
  const maxValue = Math.max(...data.values.flat())

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Layers className="h-5 w-5" />
          <span>Confusion Matrix</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Column Headers */}
            <div className="flex mb-2">
              <div className="w-32" /> {/* Empty space for row headers */}
              <div className="flex-1 flex justify-around">
                <div className="text-sm font-medium text-muted-foreground">
                  Predicted Class
                </div>
              </div>
            </div>
            <div className="flex mb-1">
              <div className="w-32" />
              {data.labels.map((label) => (
                <div
                  key={label}
                  className="flex-1 text-center"
                >
                  <span className="text-sm font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Matrix Content */}
            <div className="relative">
              {/* Row Header */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 rotate-270">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  True Class
                </span>
              </div>

              {/* Matrix Rows */}
              {data.values.map((row, i) => (
                <div key={i} className="flex items-center mb-1">
                  <div className="w-32 text-right pr-4">
                    <span className="text-sm font-medium">
                      {data.labels[i]}
                    </span>
                  </div>
                  {row.map((value, j) => {
                    const percentage = (value / rowSums[i]) * 100
                    const intensity = value / maxValue
                    const isCorrectPrediction = i === j

                    return (
                      <div
                        key={j}
                        className="flex-1 aspect-square flex items-center justify-center relative group"
                      >
                        <div
                          className={`
                            absolute inset-0.5 rounded-sm
                            ${isCorrectPrediction ? 'bg-primary' : 'bg-muted-foreground'}
                          `}
                          style={{
                            opacity: Math.max(0.1, intensity * 0.9)
                          }}
                        />
                        <div className="relative">
                          <span className="text-sm font-medium">
                            {value}
                          </span>
                          <div className="
                            absolute left-1/2 -translate-x-1/2 -bottom-6
                            opacity-0 group-hover:opacity-100
                            transition-opacity bg-background border
                            rounded-md px-2 py-1 text-xs whitespace-nowrap
                          ">
                            {percentage.toFixed(1)}% of {data.labels[i]}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-sm bg-primary opacity-90" />
            <span className="text-sm text-muted-foreground">
              Correct Predictions
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-sm bg-muted-foreground opacity-50" />
            <span className="text-sm text-muted-foreground">
              Incorrect Predictions
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 