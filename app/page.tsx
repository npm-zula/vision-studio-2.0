import Link from "next/link"
import { ArrowRight, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-[64rem]">
            <div className="mb-8 inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
              <Eye className="mr-2 h-4 w-4" />
              Vision Studio Beta
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Train Computer Vision Models{" "}
              <span className="block">Without Code</span>
            </h1>
            <p className="mb-8 max-w-[42rem] text-xl text-muted-foreground">
              Upload images, annotate data, and deploy custom computer vision
              models in minutes. No coding required.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg">
                  Documentation
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/50">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-[58rem] text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Features
              </h2>
              <p className="mb-12 text-xl text-muted-foreground">
                Everything you need to train and deploy computer vision models.
              </p>
            </div>
            <div className="mx-auto grid max-w-[64rem] gap-8 sm:grid-cols-2 md:grid-cols-3">
              {features.map(({ title, description, icon: Icon }) => (
                <div
                  key={title}
                  className="flex flex-col rounded-lg border bg-background p-6"
                >
                  <Icon className="mb-6 h-8 w-8" />
                  <h3 className="mb-2 text-xl font-bold">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

const features = [
  {
    title: "Image Annotation",
    description:
      "Powerful tools for bounding boxes, polygons, and semantic segmentation.",
    icon: Eye,
  },
  {
    title: "Model Training",
    description:
      "Train custom models with state-of-the-art architectures and techniques.",
    icon: Eye,
  },
  {
    title: "Real-time Testing",
    description:
      "Test your models in real-time with our interactive testing environment.",
    icon: Eye,
  },
] 