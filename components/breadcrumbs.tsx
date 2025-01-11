"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

interface BreadcrumbsProps {
  projectName?: string
}

export function Breadcrumbs({ projectName = "Project" }: BreadcrumbsProps) {
  const params = useParams()
  const pathname = usePathname()
  
  // Create breadcrumb items based on the current path
  const breadcrumbs = [
    {
      label: "Projects",
      href: "/dashboard/projects",
      current: pathname === "/dashboard/projects"
    },
   
  ]

  // Add additional breadcrumbs based on the current route
  if (pathname.includes("/images")) {
    breadcrumbs.push({
      label: "Images",
      href: `/dashboard/projects/${params.id}/images`,
      current: true
    })
  } else if (pathname.includes("/annotate")) {
    breadcrumbs.push(
      {
        label: "Images",
        href: `/dashboard/projects/${params.id}/images`,
        current: false
      },
      {
        label: "Annotate",
        href: `/dashboard/projects/${params.id}/annotate`,
        current: true
      }
    )
  } else if (pathname.includes("/train")) {
    breadcrumbs.push(
      {
        label: "Images",
        href: `/dashboard/projects/${params.id}/images`,
        current: false
      },
      {
        label: "Train",
        href: `/dashboard/projects/${params.id}/train`,
        current: true
      }
    )
  } else if (pathname.includes("/test")) {
    breadcrumbs.push(
      {
        label: "Images",
        href: `/dashboard/projects/${params.id}/images`,
        current: false
      },
      {
        label: "Train",
        href: `/dashboard/projects/${params.id}/train`,
        current: false
      },
      {
        label: "Test",
        href: `/dashboard/projects/${params.id}/test`,
        current: true
      }
    )
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
            )}
            <Link
              href={breadcrumb.href}
              className={`text-sm transition-colors hover:text-foreground ${
                breadcrumb.current
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
} 