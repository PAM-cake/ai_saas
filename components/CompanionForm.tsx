"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const formSchema = z.object({
  name: z.string().min(2, { message: "Companion is required" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  topic: z.string().min(2, { message: "Topic is required" }),
  voice: z.string().min(2, { message: "Voice is required" }),
  style: z.string().min(2, { message: "Style is required" }),
  duration: z.coerce.number().min(1, { message: "Duration is required" }),
})

const CompanionForm = () => {
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  const selectTriggerClass =
    "border border-input rounded-md px-3 py-2 capitalize"

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full px-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the Companion Name"
                  {...field}
                  className="focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

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
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with ?</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex. Algebra" {...field} />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

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
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

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
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

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
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

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
