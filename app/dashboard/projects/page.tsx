"use client"

import * as React from "react"
import Link from "next/link"
import {
  BarChart3,
  FolderPlus,
  Image as ImageIcon,
  MoreVertical,
  Play,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateProjectDialog } from "./components/create-project-dialog"

// Dummy data for projects
const dummyProjects = [
  {
    id: 1,
    name: "Object Detection",
    description: "Detect and classify objects in images",
    type: "object-detection",
    images: 245,
    status: "Active",
    progress: 85,
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "Face Recognition",
    description: "Facial recognition and analysis",
    type: "classification",
    images: 180,
    status: "Training",
    progress: 45,
    lastUpdated: "1 day ago",
  },
  {
    id: 3,
    name: "Scene Classification",
    description: "Classify different types of scenes",
    type: "classification",
    images: 320,
    status: "Active",
    progress: 92,
    lastUpdated: "3 days ago",
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState(dummyProjects)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-green-500"
      case "training":
        return "text-blue-500"
      case "paused":
        return "text-yellow-500"
      default:
        return "text-muted-foreground"
    }
  }

  const handleDeleteProject = (id: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Projects</h2>
          <p className="text-sm text-muted-foreground">
            Manage your computer vision projects
          </p>
        </div>
        <CreateProjectDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Create New Project Card */}
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <FolderPlus className="h-8 w-8 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Create New Project</h3>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              Start a new computer vision project with custom datasets and models
            </p>
            <CreateProjectDialog />
          </CardContent>
        </Card>

        {/* Project Cards */}
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                {project.name}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/projects/${project.id}/images`}>
                      Manage Images
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/projects/${project.id}/annotate`}>
                      Annotate Images
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/projects/${project.id}/train`}>
                      Train Model
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/projects/${project.id}/test`}>
                      Test Model
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Last updated {project.lastUpdated}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <ImageIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{project.images} images</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart3 className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{project.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Play className="mr-1 h-4 w-4" />
                    <span className={getStatusColor(project.status)}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 