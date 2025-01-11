"use client"

import * as React from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  ChevronRight,
  Layers,
  Redo2,
  Save,
  Undo2,
  Wand2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { AnnotationCanvas } from "./components/annotation-canvas"
import { AnnotationTools } from "./components/annotation-tools"
import { LabelList } from "./components/label-list"
import { BackButton } from "@/components/back-button"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Dummy data - in a real app, this would come from your backend
const dummyImage = {
  id: 1,
  name: "Training Image 1",
  url: "/assets/images/image.png",
  size: "230 KB",
  uploadedAt: "2 hours ago",
  labels: [
    { id: 1, name: "Person", color: "#ff0000" },
    { id: 2, name: "Car", color: "#00ff00" },
    { id: 3, name: "Building", color: "#0000ff" },
  ],
  annotations: [],
}

export default function AnnotatePage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const imageId = searchParams.get("image")

  const [selectedLabel, setSelectedLabel] = React.useState<{
    id: number
    name: string
    color: string
  } | null>(null)
  const [annotations, setAnnotations] = React.useState<any[]>([])
  const [history, setHistory] = React.useState<any[][]>([])
  const [historyIndex, setHistoryIndex] = React.useState(-1)

  const addAnnotation = (annotation: any) => {
    const newAnnotations = [...annotations, annotation]
    setAnnotations(newAnnotations)
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newAnnotations)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setAnnotations(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setAnnotations(history[historyIndex + 1])
    }
  }

  const handleSave = () => {
    // In a real app, save annotations to your backend
    toast.success("Annotations saved successfully")
  }

  const handleAutoAnnotate = () => {
    toast.promise(
      // In a real app, this would be an API call to your AI service
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "AI is analyzing the image...",
        success: "Auto-annotation complete!",
        error: "Failed to auto-annotate",
      }
    )
  }

  return (
    <div className="flex h-[calc(100vh-57px)] flex-col">
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center space-x-4">
          <BackButton />
          <div>
            <div className="mb-1">
              <Breadcrumbs />
            </div>
            <p className="text-sm text-muted-foreground">
              {dummyImage.name}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={historyIndex <= 0}
          >
            <Undo2 className="mr-2 h-4 w-4" />
            Undo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
          >
            <Redo2 className="mr-2 h-4 w-4" />
            Redo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAutoAnnotate}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Use AI
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="flex h-full flex-col border-r">
              <div className="flex h-12 items-center border-b px-4">
                <Layers className="mr-2 h-4 w-4" />
                <span className="font-medium">Labels</span>
              </div>
              <ScrollArea className="flex-1">
                <LabelList
                  labels={dummyImage.labels}
                  selectedLabel={selectedLabel}
                  onSelectLabel={setSelectedLabel}
                />
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Main Canvas */}
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full flex-col">
              <div className="flex h-12 items-center justify-center border-b">
                <AnnotationTools />
              </div>
              <div className="relative flex-1">
                <AnnotationCanvas
                  image={dummyImage}
                  selectedLabel={selectedLabel}
                  annotations={annotations}
                  onAddAnnotation={addAnnotation}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="flex h-full flex-col border-l">
              <div className="flex h-12 items-center border-b px-4">
                <ChevronRight className="mr-2 h-4 w-4" />
                <span className="font-medium">Properties</span>
              </div>
              <ScrollArea className="flex-1 p-4">
                {selectedLabel && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{selectedLabel.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Click and drag on the image to create annotations
                      </p>
                    </div>
                    <div
                      className="h-4 w-full rounded"
                      style={{ backgroundColor: selectedLabel.color }}
                    />
                  </div>
                )}
              </ScrollArea>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
} 