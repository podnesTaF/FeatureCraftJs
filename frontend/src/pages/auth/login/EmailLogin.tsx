"use client";

import EmailLoginForm from "@/src/features/main/auth/ui/EmailLoginForm";

export const EmailLogin = () => {
  return (
    <div className="w-full">
      <h3 className="text-xl text-center font-semibold lg:text-2xl 2xl:text-3xl mb-5 lg:mb-8">
        Login to FeatureCraftJs
      </h3>
      <div className="flex flex-col gap-3">
        <h5 className="text-lg">Continue with email</h5>
        <EmailLoginForm onSignIn={() => {}} />
      </div>
    </div>
  );
};
