"use client";

import {
  GitHubSignInButton,
  GoogleSignInButton,
  SignUpForm,
  useSignUp,
} from "@/src/features/main";
import { useState } from "react";

export const SignUp = () => {
  const { form, onSignUp } = useSignUp();
  const [step, setStep] = useState(0);

  const onStepChange = (step: number) => {
    setStep(step);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl text-center font-semibold lg:text-2xl 2xl:text-3xl mb-5 lg:mb-8">
        Sign up to FeatureCaft
      </h3>
      <div className="flex flex-col gap-3 items-center">
        <SignUpForm
          form={form}
          onSignUp={onSignUp}
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
