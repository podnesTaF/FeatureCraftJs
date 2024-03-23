import { SignupSchema, signupSchema } from "@/src/entities/main";
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
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";

type SignUpFormProps = {
  step: number;
  onStepChange: (step: number) => void;
  onSignUp: (data: SignupSchema) => void;
};

export const SignUpForm = ({
  step,
  onStepChange,
  onSignUp,
}: SignUpFormProps): JSX.Element => {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignUp)} className="space-y-8 w-full">
        {step === 0 && (
          <>
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
                      placeholder="Enter your email"
                      {...field}
                      type="email"
                      className="h-auto p-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormLabel className="absolute -top-2 left-2 px-2 bg-white z-10">
                    Full Name
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      placeholder="e.g. John Doe"
                      {...field}
                      className="h-auto p-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={() => onStepChange(1)}
              className="px-3 md:px-5 py-3 lg:py-5 xl:py-6 w-full text-lg bg-primary-blue hover:bg-primary-blue/85"
            >
              Continue
            </Button>
          </>
        )}
        {step === 1 && (
          <>
            <div className="flex justify-between items-center">
              <Button onClick={() => onStepChange(0)} variant={"ghost"}>
                <ArrowLeft className="w-6 h-6" />
              </Button>
              Set you password
            </div>
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
                      placeholder="Enter password"
                      {...field}
                      type="password"
                      className="h-auto p-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormLabel className="absolute -top-2 left-2 px-2 bg-white z-10">
                    Confirm Password
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      placeholder="repeat password"
                      {...field}
                      type="password"
                      className="h-auto p-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="px-3 md:px-5 py-3 lg:py-5 xl:py-6 w-full text-lg">
              Register
            </Button>
          </>
        )}
      </form>
    </Form>
  );
};
