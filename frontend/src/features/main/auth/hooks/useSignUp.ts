import { SignupSchema, signupSchema } from "@/src/entities/main";
import { AuthApi } from "@/src/entities/main/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const useSignUp = () => {
  const router = useRouter();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSignUp(values: SignupSchema) {
    if (values.confirmPassword !== values.password) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Password does not match",
      });

      return;
    }

    try {
      const authApi = new AuthApi();
      const data = await authApi.register(values);

      router.push("/");
    } catch (error: any) {
      form.setError("root", {
        type: "manual",
        message:
          error?.response?.data?.message ||
          "An error occurred while registering user",
      });
    }
  }

  return { form, onSignUp };
};
