"use client"

import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

interface BackButtonProps {
  label?: string
}

export function BackButton({ label = "Back" }: BackButtonProps) {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      className="gap-2 pl-0 hover:pl-2 transition-all"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4" />
      {label}
    </Button>
  )
} 