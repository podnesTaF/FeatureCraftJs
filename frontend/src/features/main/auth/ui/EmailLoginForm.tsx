"use client";

import { EmailLoginSchema, emailLoginSchema } from "@/src/entities/main";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/src/shared/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const EmailLoginForm = ({ onSignIn }: { onSignIn: any }) => {
  const form = useForm<EmailLoginSchema>({
    resolver: zodResolver(emailLoginSchema),
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignIn)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative w-full">
              <FormLabel className="absolute -top-2 left-2 px-2 bg-white z-10">
                Email
              </FormLabel>
              <FormControl className="w-full">
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your email"
                  className="h-auto p-4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative w-full">
              <FormLabel className="absolute -top-2 left-2 px-2 bg-white z-10">
                Password
              </FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="Enter your password"
                  {...field}
                  className="h-auto p-4"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="px-3 md:px-5 py-3 lg:py-5 xl:py-6 w-full text-lg">
          Login
        </Button>
      </form>
    </Form>
  );
};
export default EmailLoginForm;
