import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  confirmPassword: z.string().min(8).max(50),
});

export type SignupSchema = z.infer<typeof signupSchema>;
