"use client";

import { AuthenticatedUser } from "@/src/entities/main/auth/model";
import { useAuth } from "@/src/features/main";
import {
  Button,
  Input,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/src/shared/shadcn";
import IconButton from "@/src/shared/ui/IconButton";
import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { AlignLeft, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import { getMenuItems } from "./menu-items.utils";

export const Header = ({ user }: { user: AuthenticatedUser | null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    if (user) {
      login(user);
    }
  }, [user, login]);

  return (
    <>
      <div className="flex justify-between fixed top-0 left-0 w-full px-3 py-2 z-40 bg-white/50 backdrop-blur">
        <div className="flex gap-6 items-center flex-[2]">
          <Button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            variant={"ghost"}
            className="lg:hidden px-2"
          >
            <AlignLeft size={24} />
          </Button>
          <Link href={"/"} passHref>
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
          </Link>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="w-full">
              {getMenuItems().map((item, i) => (
                <NavigationMenuItem key={i} className="justify-start relative">
                  {item.href ? (
                    <Link
                      className="justify-start"
                      href={item.href}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} rounded-full justify-start`}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="rounded-full w-full justify-start">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {item.modules?.map((module, i) => (
                          <div
                            key={i}
                            className="w-1/2 border-b border-b-gray-200"
                          >
                            <h4 className="text-primary font-semibold p-2">
                              {module.label}
                            </h4>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                              {module.items.map((subItem, j) => (
                                <li key={j}>
                                  <NavigationMenuLink
                                    className={`${navigationMenuTriggerStyle()} flex gap-2 py-2 items-center`}
                                  >
                                    {subItem.icon && (
                                      <subItem.icon className="w-6 h-6 text-primary" />
                                    )}
                                    <div className="flex flex-col text-primary">
                                      <h4 className="text-md ">
                                        {subItem.title}
                                      </h4>
                                      <p className="text-sm">
                                        {subItem?.description}
                                      </p>
                                    </div>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
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
          <div className="sm:flex-1 max-w-2xl relative">
            <MagnifyingGlassIcon className="w-6 h-6 absolute left-2 top-1/2 -translate-y-1/2 text-primary hidden sm:block" />
            <Input
              placeholder="Search for a Feature"
              color="secondary"
              className="rounded-full h-10 pr-4 pl-9  hidden sm:block w-full bg-gray-100 placeholder:text-primary font-medium"
            />
          </div>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Link
                className=" justify-start rounded-full"
                href={"/auth/login"}
                legacyBehavior
                passHref
              >
                <Button
                  variant={"ghost"}
                  className={`rounded-full justify-start`}
                >
                  Login
                </Button>
              </Link>
              <Link
                className=" justify-start"
                href={"/auth/signup"}
                legacyBehavior
                passHref
              >
                <Button className={`!rounded-full justify-start`}>
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <MobileMenu open={isMobileMenuOpen} />
    </>
  );
};
