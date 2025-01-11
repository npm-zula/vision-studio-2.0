"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Upload, Cpu } from "lucide-react"
import { useDropzone } from "react-dropzone"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { ImageGrid } from "./components/image-grid"
import { BackButton } from "@/components/back-button"
import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/components/breadcrumbs"

// Dummy data for images
const dummyImages = [
  {
    id: 1,
    name: "Training Image 1",
    url: "/assets/images/image.png",
    size: "230 KB",
    uploadedAt: "2 hours ago",
    annotated: true,
  },
  {
    id: 2,
    name: "Training Image 2",
    url: "/assets/images/image.png",
    size: "230 KB",
    uploadedAt: "1 day ago",
    annotated: false,
  },
  {
    id: 3,
    name: "Training Image 3",
    url: "/assets/images/image.png",
    size: "230 KB",
    uploadedAt: "2 days ago",
    annotated: true,
  },
]

export default function ImagesPage() {
  const params = useParams()
  const [images, setImages] = React.useState(dummyImages)
  const [filter, setFilter] = React.useState("all")
  const [uploading, setUploading] = React.useState(false)

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setUploading(true)
    // Simulate upload delay
    setTimeout(() => {
      const newImages = acceptedFiles.map((file, index) => ({
        id: images.length + index + 1,
        name: file.name,
        url: URL.createObjectURL(file),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: "Just now",
        annotated: false,
      }))
      setImages((prev) => [...prev, ...newImages])
      setUploading(false)
      toast.success(`${acceptedFiles.length} images uploaded successfully`)
    }, 1500)
  }, [images])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const handleDelete = React.useCallback((id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
    toast.success("Image deleted successfully")
  }, [])

  const handleAnnotate = React.useCallback((id: number) => {
    // Navigate to annotation page
    window.location.href = `/dashboard/projects/${params.id}/annotate?image=${id}`
  }, [params.id])

  const filteredImages = React.useMemo(() => {
    switch (filter) {
      case "annotated":
        return images.filter((img) => img.annotated)
      case "not-annotated":
        return images.filter((img) => !img.annotated)
      default:
        return images
    }
  }, [images, filter])

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <BackButton />
          <Breadcrumbs />
        </div>
        <h3 className="text-lg font-medium">Project Images</h3>
        <p className="text-sm text-muted-foreground">
          Manage and organize your project's image dataset
        </p>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Project Images</h2>
          <p className="text-sm text-muted-foreground">
            Upload and manage images for your project
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            defaultValue={filter}
            onValueChange={setFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter images" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Images</SelectItem>
              <SelectItem value="annotated">Annotated</SelectItem>
              <SelectItem value="not-annotated">Not Annotated</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href={`/dashboard/projects/${params.id}/train`}>
              <Cpu className="mr-2 h-4 w-4" />
              Start Training
            </Link>
          </Button>
        </div>
      </div>

      {/* Upload Area */}
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
            {uploading
              ? "Uploading..."
              : isDragActive
              ? "Drop the files here"
              : "Drop images here"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            or click to select files
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: PNG, JPG, JPEG up to 10MB each
          </p>
        </div>
      </div>

      {/* Image Grid */}
      <ImageGrid
        images={filteredImages}
        onDelete={handleDelete}
        onAnnotate={handleAnnotate}
      />
    </div>
  )
} 