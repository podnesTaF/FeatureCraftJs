import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/src/shared/shadcn";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { getMenuItems } from "./menu-items.utils";

interface MobileMenuProps {
  open: boolean;
}

const MobileMenu = ({ open }: MobileMenuProps) => {
  return (
    <Collapsible open={open}>
      <CollapsibleContent className="absolute top-10 left-0 w-full  z-20">
        <NavigationMenu className="!p-3 w-full max-w-none">
          <NavigationMenuList className="w-full flex flex-col gap-2">
            <NavigationMenuItem className="w-[96vw]">
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
              <MenuItem key={index} item={item} />
            ))}
          </NavigationMenuList>
          <NavigationMenuViewport className="w-full" />
        </NavigationMenu>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileMenu;
