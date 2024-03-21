import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/src/shared/shadcn";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import Link from "next/link";
import { getMenuItems } from "./menu-items.utils";

interface MobileMenuProps {
  open: boolean;
}

const MobileMenu = ({ open }: MobileMenuProps) => {
  return (
    <Collapsible open={open}>
      <CollapsibleContent className="absolute top-10 left-0 w-full">
        <NavigationMenu className="!p-3 w-full max-w-none">
          <NavigationMenuList className="w-full flex flex-col gap-2">
            <NavigationMenuItem className="w-[98vw]">
              <Link href="/signup" className="!w-full" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} rounded-full !w-full text-center`}
                >
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <Link href="/signup" className="!w-full" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} rounded-full !w-full text-center bg-primary text-primary-foreground `}
                >
                  Sign up
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {getMenuItems().map((item, index) => (
              <NavigationMenuItem
                className="!w-full justify-start relative"
                key={index}
              >
                {item.href ? (
                  <Link
                    className="!w-full justify-start"
                    href={item.href}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} rounded-full !w-full !justify-start`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                ) : (
                  <>
                    <NavigationMenuTrigger className="rounded-full w-full justify-start">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="relative">
                      {item.modules?.map((module, i) => (
                        <div key={i} className="border-b border-b-gray-200">
                          <h4 className="text-primary font-semibold p-2">
                            {module.label}
                          </h4>
                          <div className="flex flex-col gap-3">
                            {module.items.map((subItem, j) => (
                              <NavigationMenuLink
                                key={j}
                                className={`${navigationMenuTriggerStyle()} w-full flex gap-2 py-2 items-center`}
                              >
                                {subItem.icon && (
                                  <subItem.icon className="w-6 h-6 text-primary" />
                                )}
                                <div className="flex flex-col text-primary">
                                  <h4 className="text-md ">{subItem.title}</h4>
                                  <p className="text-sm">
                                    {subItem?.description}
                                  </p>
                                </div>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      ))}
                    </NavigationMenuContent>
                  </>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          <NavigationMenuViewport className="w-full" />
        </NavigationMenu>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileMenu;
