/**
 * Companion Form Component
 * A form for creating new learning companions with validation
 * Handles form submission and companion creation
 */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { createCompanion } from "@/lib/actions/companion.actions"

/**
 * Form validation schema using Zod
 * Defines required fields and validation rules for companion creation
 */
const formSchema = z.object({
  name: z.string().min(2, { message: "Companion is required" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  topic: z.string().min(2, { message: "Topic is required" }),
  voice: z.string().min(2, { message: "Voice is required" }),
  style: z.string().min(2, { message: "Style is required" }),
  duration: z.coerce.number().min(1, { message: "Duration is required" }),
})

/**
 * Companion Form component for creating new learning companions
 * Uses React Hook Form with Zod validation
 * @returns A form component with fields for companion creation
 */
const CompanionForm = () => {
  const router = useRouter()

  // Initialize form with validation and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  })

  /**
   * Handles form submission
   * Creates a new companion and redirects to companions page on success
   * @param values - Form values validated against the schema
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const companion = await createCompanion(values)
      if (companion) {
        router.push("/companions")
      }
    } catch (error) {
      console.error("Failed to create companion:", error)
    }
  }

  // Common class for select triggers
  const selectTriggerClass =
    "border border-input rounded-md px-3 py-2 capitalize"

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto w-full px-4"
      >
        {/* Companion Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the Companion Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Subject Selection Field */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select The Subject" />
                  </SelectTrigger>
                  <SelectContent className="absolute z-50 bg-white shadow-lg border border-gray-200">
                    {subjects.map((subject) => (
                      <SelectItem
                        value={subject}
                        key={subject}
                        className="capitalize"
                      >
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Topic Description Field */}
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with ?</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex. Algebra" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Voice Selection Field */}
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Voices</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select The Voice" />
                  </SelectTrigger>
                  <SelectContent className="absolute z-50 bg-white shadow-lg border border-gray-200">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Style Selection Field */}
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select The Style" />
                  </SelectTrigger>
                  <SelectContent className="absolute z-50 bg-white shadow-lg border border-gray-200">
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration Input Field */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Essitmated duration in mins</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="15"
                  {...field}
                  className="border border-input rounded-md px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full cursor-pointer bg-black text-white"
        >
          Build your Companion
        </Button>
      </form>
    </Form>
  )
}

export default CompanionForm
