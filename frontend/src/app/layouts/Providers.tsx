"use client";

import { AuthProvider } from "@/src/features/main";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
