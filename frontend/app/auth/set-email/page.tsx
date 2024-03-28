"use client";
import { AuthApi, SetEmailSchema, setEmailSchema } from "@/src/entities/main";
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
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const SetEmailPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const form = useForm<SetEmailSchema>({
    resolver: zodResolver(setEmailSchema),
  });

  const onSetEmail = async (dto: SetEmailSchema) => {
    try {
      if (token) {
        const authApi = new AuthApi(token);
        const authUser = await authApi.setEmail(dto.email);
        if (!authUser.token)
          throw new Error("An error occurred while setting email");

        await authApi.setCookie(authUser.token);

        window.location.href = "/";
      } else {
        console.error("Token is missing");
      }
    } catch (error: any) {
      form.setError("root", {
        type: "manual",
        message:
          error?.response?.data?.message ||
          "An error occurred while registering user",
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full py-24">
      <div className="bg-white rounded-md shadow-md p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSetEmail)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative w-full mb-4">
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
            {form.formState.errors.root && (
              <FormMessage className="text-red-500 mb-3">
                {form.formState.errors.root.message}
              </FormMessage>
            )}
            <Button className="px-3 md:px-5 py-3 lg:py-5 xl:py-6 w-full text-lg">
              Set Email
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SetEmailPage;
