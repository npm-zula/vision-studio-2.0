"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackButton } from "@/components/back-button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { TrainingMetrics } from "./components/training-metrics"

const trainingConfigSchema = z.object({
  modelArchitecture: z.string(),
  batchSize: z.number().min(1).max(512),
  epochs: z.number().min(1).max(1000),
  learningRate: z.number().min(0.0001).max(0.1),
  augmentation: z.boolean(),
  validationSplit: z.number().min(0.1).max(0.3),
  optimizer: z.string(),
  pretrained: z.boolean(),
  freezeLayers: z.boolean(),
  customLayers: z.string(),
})

type TrainingConfig = z.infer<typeof trainingConfigSchema>

const defaultValues: Partial<TrainingConfig> = {
  modelArchitecture: "yolov8",
  batchSize: 32,
  epochs: 100,
  learningRate: 0.001,
  augmentation: true,
  validationSplit: 0.2,
  optimizer: "adam",
  pretrained: true,
  freezeLayers: true,
  customLayers: "",
}

export default function TrainPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = React.useState("config")
  const form = useForm<TrainingConfig>({
    resolver: zodResolver(trainingConfigSchema),
    defaultValues,
  })

  function onSubmit(data: TrainingConfig) {
    toast.success("Training started successfully")
    console.log(data)
    // Switch to metrics tab
    setActiveTab("metrics")
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <BackButton />
          <Breadcrumbs projectName={params.id as string} />
        </div>
        <h3 className="text-lg font-medium">Model Training</h3>
        <p className="text-sm text-muted-foreground">
          Configure and monitor your model training process
        </p>
      </div>
      <Separator />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="metrics">Training Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="config" className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="modelArchitecture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model Architecture</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose the model architecture for training
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="batchSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch Size</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Number of images processed in each training step
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="epochs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Epochs</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Number of complete passes through the training dataset
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="learningRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Learning Rate</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.0001"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Step size for model weight updates
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="validationSplit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Validation Split</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Portion of data used for validation (0.1-0.3)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="optimizer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Optimizer</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Optimization algorithm for training
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="augmentation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Data Augmentation
                        </FormLabel>
                        <FormDescription>
                          Apply random transformations to training images
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pretrained"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Use Pretrained Weights
                        </FormLabel>
                        <FormDescription>
                          Start training from pretrained model weights
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="freezeLayers"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Freeze Base Layers
                        </FormLabel>
                        <FormDescription>
                          Keep pretrained layers frozen during training
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="customLayers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Layers Configuration</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional: Specify custom model layers in JSON format
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
                <Button type="submit">Start Training</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/dashboard/projects/${params.id}/test`)}
                >
                  Go to Testing
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="metrics">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.push(`/dashboard/projects/${params.id}/test`)}
            >
              Go to Testing
            </Button>
          </div>
          <TrainingMetrics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
