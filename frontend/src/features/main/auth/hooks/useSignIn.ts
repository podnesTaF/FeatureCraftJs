import {
  AuthApi,
  EmailLoginSchema,
  emailLoginSchema,
} from "@/src/entities/main";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "..";

export const useSignIn = () => {
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm<EmailLoginSchema>({
    resolver: zodResolver(emailLoginSchema),
  });

  const onSignIn = async (dto: EmailLoginSchema) => {
    try {
      const authApi = new AuthApi();
      const data = await authApi.login(dto);
      if (!data) throw new Error("An error occurred while login user");

      login(data);

      window.location.href = "/";
    } catch (error: any) {
      form.setError("root", {
        type: "manual",
        message:
          error?.response?.data?.message ||
          "An error occurred while login user",
      });
    }
  };

  return {
    signIn: onSignIn,
    form,
  };
};
