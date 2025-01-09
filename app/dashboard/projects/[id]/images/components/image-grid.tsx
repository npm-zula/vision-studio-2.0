"use client"

import * as React from "react"
import Image from "next/image"
import { FileImage, Pencil, Tag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"

interface ImageFile {
  id: number
  name: string
  url: string
  size: string
  uploadedAt: string
  labels?: string[]
  annotated?: boolean
}

interface ImageGridProps {
  images: ImageFile[]
  onDelete: (id: number) => void
  onAnnotate: (id: number) => void
}

export function ImageGrid({ images, onDelete, onAnnotate }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = React.useState<ImageFile | null>(null)
  const [selectedImages, setSelectedImages] = React.useState<Set<number>>(new Set())
  const [imageError, setImageError] = React.useState<Record<number, boolean>>({})

  const toggleImageSelection = (id: number, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setSelectedImages((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleDelete = (id: number, event?: React.MouseEvent) => {
    event?.stopPropagation()
    onDelete(id)
    setSelectedImages((prev) => {
      const newSet = new Set(prev)
      newSet.delete(id)
      return newSet
    })
  }

  const handleBulkDelete = () => {
    selectedImages.forEach((id) => onDelete(id))
    setSelectedImages(new Set())
    toast.success(`${selectedImages.size} images deleted`)
  }

  const handleImageError = (id: number) => {
    setImageError((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <>
      {selectedImages.size > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-lg border bg-muted/50 p-2">
          <span className="text-sm">
            {selectedImages.size} image{selectedImages.size > 1 ? "s" : ""}{" "}
            selected
          </span>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedImages(new Set())}
            >
              Clear Selection
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
            >
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <ContextMenu key={image.id}>
            <ContextMenuTrigger>
              <Card
                className={`overflow-hidden cursor-pointer transition-shadow hover:shadow-lg ${
                  selectedImages.has(image.id)
                    ? "ring-2 ring-primary"
                    : ""
                }`}
                onClick={(e) => {
                  if (selectedImages.size > 0) {
                    toggleImageSelection(image.id, e)
                  } else {
                    setSelectedImage(image)
                  }
                }}
                onContextMenu={(e) => {
                  if (selectedImages.size > 0) {
                    e.preventDefault()
                    toggleImageSelection(image.id, e)
                  }
                }}
              >
                <CardContent className="p-0">
                  <div className="group relative aspect-square">
                    {imageError[image.id] ? (
                      <div className="flex h-full items-center justify-center bg-muted">
                        <FileImage className="h-12 w-12 text-muted-foreground" />
                      </div>
                    ) : (
                      <Image
                        src={image.url}
                        alt={image.name}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(image.id)}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-full items-center justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            onAnnotate(image.id)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => handleDelete(image.id, e)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {image.annotated && (
                      <div className="absolute right-2 top-2">
                        <Tag className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileImage className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium truncate">
                          {image.name}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{image.size}</span>
                      <span>{image.uploadedAt}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                onClick={() => onAnnotate(image.id)}
              >
                Annotate
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => setSelectedImage(image)}
              >
                Preview
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem
                className="text-red-600"
                onClick={() => handleDelete(image.id)}
              >
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.name}</DialogTitle>
            <DialogDescription>
              Uploaded {selectedImage?.uploadedAt}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(100vh-200px)]">
            {selectedImage && (
              <div className="relative aspect-square">
                {imageError[selectedImage.id] ? (
                  <div className="flex h-full items-center justify-center bg-muted">
                    <FileImage className="h-24 w-24 text-muted-foreground" />
                  </div>
                ) : (
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.name}
                    fill
                    className="object-contain"
                    onError={() => handleImageError(selectedImage.id)}
                  />
                )}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
} 