"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least two characters.",
  }),
  game: z.string().min(2, {
    message: "Game must be at least two characters.",
  }),
  earnings: z.number().int().min(0, {
    message: "Earnings must be a number."
  })
})

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      game: "",
      earnings: 0
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md w-full flex flex-col gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className = "text-2xl font-weight: 900; text-red flex justify-center" >Valorant Rank Predictor</FormLabel>
              <FormControl>
                <Input placeholder="name" type = "name"{...field} />
              </FormControl>
              <FormDescription className = "text-red w-full">
                Input your name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name = "game"
          render={({ field }) => (
            <FormItem>
              <FormLabel> </FormLabel>
              <FormControl>
                <Input placeholder="game" type = "name"{...field} />
              </FormControl>
              <FormDescription className = "text-red w-full">
                Input your game.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="earnings"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <Input placeholder="earnings" type = "name" {...field} />
              </FormControl>
              <FormDescription className = "text-red w-full">
                Input your tournament earnings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="destructive" className="w-full"> Submit </Button>
      </form>
    </Form>
    </main>
  );
}

export default InputForm;
