"use client"

import * as React from "react"
import { Box, MousePointer2, Pencil } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function AnnotationTools() {
  const [activeMode, setActiveMode] = React.useState<string>("box")

  return (
    <div className="flex items-center space-x-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            pressed={activeMode === "box"}
            onPressedChange={() => setActiveMode("box")}
            size="sm"
          >
            <Box className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Box Tool (B)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            pressed={activeMode === "polygon"}
            onPressedChange={() => setActiveMode("polygon")}
            size="sm"
          >
            <Pencil className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Polygon Tool (P)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            pressed={activeMode === "select"}
            onPressedChange={() => setActiveMode("select")}
            size="sm"
          >
            <MousePointer2 className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Select Tool (V)</TooltipContent>
      </Tooltip>
    </div>
  )
} 