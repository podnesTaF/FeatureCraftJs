import { Header } from "@/src/app/components/Header";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex justify-center items-center mx-4">
        <div className="max-w-sm w-full">{children}</div>
      </div>
    </>
  );
};

export default AuthLayout;
