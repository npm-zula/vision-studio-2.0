"use client"

import { ReactNode } from "react"
import { AnimatePresence } from "framer-motion"

interface ClientLayoutProps {
  children: ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>
} 