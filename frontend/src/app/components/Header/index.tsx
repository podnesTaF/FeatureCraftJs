"use client";

import { Button, Input } from "@/src/shared/shadcn";
import IconButton from "@/src/shared/ui/IconButton";
import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { AlignLeft, Moon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between fixed top-0 left-0 w-full px-3 py-2">
        <div className="flex gap-6 items-center flex-[2]">
          <Button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            variant={"ghost"}
            className="lg:hidden px-2"
          >
            <AlignLeft size={24} />
          </Button>
          <Image
            height={32}
            width={32}
            className="h-6 w-6 2xl:hidden"
            src={"/logo/logo-short.svg"}
            alt="Logo"
          />
          <Image
            height={28}
            width={400}
            className="h-6 w-auto hidden 2xl:block"
            src={"/logo/logo-inline.svg"}
            alt="Logo"
          />
          <div className="sm:flex-1 max-w-2xl relative">
            <MagnifyingGlassIcon className="w-6 h-6 absolute left-2 top-1/2 -translate-y-1/2 text-primary" />
            <Input
              placeholder="Search for a Feature"
              color="secondary"
              className="rounded-full h-10 pr-4 pl-9  hidden sm:block w-full bg-gray-100 placeholder:text-primary font-medium"
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <IconButton className="sm:hidden">
            <MagnifyingGlassIcon className="w-6 h-6" />
          </IconButton>
          <IconButton>
            <Moon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
          </IconButton>
          <IconButton>
            <GitHubLogoIcon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
          </IconButton>
        </div>
      </div>
      <MobileMenu open={isMobileMenuOpen} />
    </>
  );
};
