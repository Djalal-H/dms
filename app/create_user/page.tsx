"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";

const signupSchema: z.ZodSchema = z
  .object({
    fullname: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email(),
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
    departement: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
  });

function CreateUser() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof signupSchema>) {
    toast(`User created successfully! ${data.length}`, {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <Link href={"/dashboard"} className="text-white">
            Go back home
          </Link>
        </pre>
      ),
    });
    //TODO: simulate sending data to backend
    console.log(data);
    
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 my-10 max-w-md mx-auto p-6 bg-card rounded-lg shadow-md border"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Personal Information
          </h2>
          <p className="text-muted-foreground mt-1">
            Please enter the user&apos;s details below
          </p>
        </div>

        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter user's full name"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm font-medium text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm text-muted-foreground">
                Make sure to enter a valid email address that will have to be
                verified
              </FormDescription>
              <FormMessage className="text-sm font-medium text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="departement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departement</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user's departement" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select user&apos;s departement</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter user's password"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm font-medium text-destructive" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm user's password"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm font-medium text-destructive" />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full transition-all hover:opacity-90"
          >
            Create User
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default CreateUser;
