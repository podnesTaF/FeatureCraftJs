import { Button } from "@/src/shared/shadcn";
import Image from "next/image";

export const GoogleSignInButton = ({ title }: { title: string }) => {
  return (
    <Button
      type={"button"}
      className="px-3 md:px-5 py-3 lg:py-5 xl:py-7  bg-white hover:bg-gray-50 shadow-md w-full border border-gray-50"
    >
      <div className="flex items-center gap-2">
        <Image
          src="/icons/google.svg"
          alt="google"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <h3 className="text-lg text-primary">{title}</h3>
      </div>
    </Button>
  );
};
