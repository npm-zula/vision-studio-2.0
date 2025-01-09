"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LabelListProps {
  labels: {
    id: number
    name: string
    color: string
  }[]
  selectedLabel: {
    id: number
    name: string
    color: string
  } | null
  onSelectLabel: (label: { id: number; name: string; color: string }) => void
}

export function LabelList({
  labels,
  selectedLabel,
  onSelectLabel,
}: LabelListProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [newLabel, setNewLabel] = React.useState({
    name: "",
    color: "#000000",
  })

  const handleAddLabel = () => {
    // In a real app, save to backend
    setIsOpen(false)
    setNewLabel({ name: "", color: "#000000" })
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {labels.length} labels
        </span>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Label
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Label</DialogTitle>
              <DialogDescription>
                Create a new label for annotations
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Label Name</Label>
                <Input
                  id="name"
                  value={newLabel.name}
                  onChange={(e) =>
                    setNewLabel({ ...newLabel, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="color"
                    type="color"
                    value={newLabel.color}
                    className="h-10 w-20"
                    onChange={(e) =>
                      setNewLabel({ ...newLabel, color: e.target.value })
                    }
                  />
                  <span className="text-sm text-muted-foreground">
                    {newLabel.color}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleAddLabel}
                disabled={!newLabel.name.trim()}
              >
                Add Label
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        {labels.map((label) => (
          <button
            key={label.id}
            className={`flex w-full items-center space-x-2 rounded-lg border p-2 text-left text-sm hover:bg-accent ${
              selectedLabel?.id === label.id ? "bg-accent" : ""
            }`}
            onClick={() => onSelectLabel(label)}
          >
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: label.color }}
            />
            <span>{label.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
} 