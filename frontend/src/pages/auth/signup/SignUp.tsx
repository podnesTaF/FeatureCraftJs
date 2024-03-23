"use client";

import { SignupSchema } from "@/src/entities/main";
import {
  GitHubSignInButton,
  GoogleSignInButton,
  SignUpForm,
} from "@/src/features/main";
import { useState } from "react";

export const SignUp = () => {
  const [step, setStep] = useState(0);

  const onStepChange = (step: number) => {
    setStep(step);
  };

  const onSubmit = (data: SignupSchema) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl text-center font-semibold lg:text-2xl 2xl:text-3xl mb-5 lg:mb-8">
        Sign up to FeatureCaft
      </h3>
      <div className="flex flex-col gap-3 items-center">
        <SignUpForm
          onSignUp={onSubmit}
          step={step}
          onStepChange={onStepChange}
        />
        <p className="text-xl font-semibold">||</p>
        <GitHubSignInButton title={"Continue with GitHub"} />
        <GoogleSignInButton title={"Continue with Google"} />
      </div>
    </div>
  );
};
