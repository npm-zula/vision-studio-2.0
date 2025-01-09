"use client"

import * as React from "react"
import Image from "next/image"

interface AnnotationCanvasProps {
  image: {
    id: number
    name: string
    url: string
    size: string
    uploadedAt: string
    labels: Array<{
      id: number
      name: string
      color: string
    }>
    annotations: any[]
  }
  selectedLabel: {
    id: number
    name: string
    color: string
  } | null
  annotations: any[]
  onAddAnnotation: (annotation: any) => void
}

export function AnnotationCanvas({
  image,
  selectedLabel,
  annotations,
  onAddAnnotation,
}: AnnotationCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = React.useState(false)
  const [startPos, setStartPos] = React.useState({ x: 0, y: 0 })
  const [currentAnnotation, setCurrentAnnotation] = React.useState<any>(null)
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [scale, setScale] = React.useState(1)
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })

  // Draw everything on canvas
  const draw = React.useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw existing annotations
    annotations.forEach((annotation) => {
      ctx.strokeStyle = annotation.color
      ctx.fillStyle = `${annotation.color}33`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.rect(
        annotation.x * scale + offset.x,
        annotation.y * scale + offset.y,
        annotation.width * scale,
        annotation.height * scale
      )
      ctx.stroke()
      ctx.fill()
    })

    // Draw current annotation
    if (currentAnnotation) {
      ctx.strokeStyle = currentAnnotation.color
      ctx.fillStyle = `${currentAnnotation.color}33`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.rect(
        currentAnnotation.x,
        currentAnnotation.y,
        currentAnnotation.width,
        currentAnnotation.height
      )
      ctx.stroke()
      ctx.fill()
    }
  }, [annotations, currentAnnotation, scale, offset])

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedLabel || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / scale - offset.x
    const y = (e.clientY - rect.top) / scale - offset.y

    setIsDrawing(true)
    setStartPos({ x, y })
    setCurrentAnnotation({
      x,
      y,
      width: 0,
      height: 0,
      labelId: selectedLabel.id,
      color: selectedLabel.color,
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentAnnotation || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / scale - offset.x
    const y = (e.clientY - rect.top) / scale - offset.y

    setCurrentAnnotation({
      ...currentAnnotation,
      width: x - startPos.x,
      height: y - startPos.y,
    })
  }

  const handleMouseUp = () => {
    if (!isDrawing || !currentAnnotation) return

    setIsDrawing(false)
    if (
      Math.abs(currentAnnotation.width) > 5 &&
      Math.abs(currentAnnotation.height) > 5
    ) {
      // Normalize negative width/height
      const annotation = {
        ...currentAnnotation,
        x: currentAnnotation.width < 0 ? startPos.x + currentAnnotation.width : startPos.x,
        y: currentAnnotation.height < 0 ? startPos.y + currentAnnotation.height : startPos.y,
        width: Math.abs(currentAnnotation.width),
        height: Math.abs(currentAnnotation.height),
      }
      onAddAnnotation(annotation)
    }
    setCurrentAnnotation(null)
  }

  // Handle image load and resize
  const handleImageLoad = (img: HTMLImageElement) => {
    if (!canvasRef.current || !containerRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight
    const imageRatio = img.width / img.height
    const containerRatio = containerWidth / containerHeight

    let width = containerWidth
    let height = containerHeight

    if (imageRatio > containerRatio) {
      height = width / imageRatio
    } else {
      width = height * imageRatio
    }

    canvas.width = width
    canvas.height = height
    setScale(width / img.width)
    setImageLoaded(true)
  }

  // Draw on canvas whenever annotations change
  React.useEffect(() => {
    draw()
  }, [draw])

  return (
    <div ref={containerRef} className="relative h-full w-full bg-muted">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm text-muted-foreground">Loading image...</div>
        </div>
      )}
      <Image
        src={image.url}
        alt={image.name}
        className="absolute left-0 top-0 h-full w-full object-contain"
        onLoad={(e) => handleImageLoad(e.target as HTMLImageElement)}
        width={800}
        height={600}
      />
      <canvas
        ref={canvasRef}
        className="absolute left-0 top-0 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  )
} 