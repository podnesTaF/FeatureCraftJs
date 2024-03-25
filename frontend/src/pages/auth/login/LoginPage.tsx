"use client";

import { GitHubSignInButton, GoogleSignInButton } from "@/src/features/main";
import { Button } from "@/src/shared/shadcn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Login = () => {
  return (
    <div className="w-full">
      <h3 className="text-xl text-center font-semibold lg:text-2xl 2xl:text-3xl mb-5 lg:mb-8">
        Login to FeatureCraftJs
      </h3>
      <div className="flex gap-3 flex-col items-center">
        <GitHubSignInButton title={"Continue with GitHub"} />
        <GoogleSignInButton title={"Continue with Google"} />
        <p className="text-xl font-semibold">||</p>
        <Button variant={"ghost"} className="w-full">
          <Link
            href="/auth/login/email"
            className="text-primary-blue text-center text-lg font-semibold flex gap-2 items-center"
          >
            <p>Sign in with email</p>
            <ArrowRight size={24} />
          </Link>
        </Button>
      </div>
    </div>
  );
};
