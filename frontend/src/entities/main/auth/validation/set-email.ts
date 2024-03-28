import { z } from "zod";

export const setEmailSchema = z.object({
  email: z.string().email(),
});

export type SetEmailSchema = z.infer<typeof setEmailSchema>;
