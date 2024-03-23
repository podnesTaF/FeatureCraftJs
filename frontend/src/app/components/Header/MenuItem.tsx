import {
  CollapsibleContent,
  CollapsibleTrigger,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/src/shared/shadcn";
import { Collapsible } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MenuItem } from "./header.types";

const MenuItem = ({ item }: { item: MenuItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <NavigationMenuItem className="!w-full justify-start relative">
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
          <Collapsible open={open} onClick={() => setOpen((prev) => !prev)}>
            <CollapsibleTrigger className="w-full">
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} rounded-full !w-full justify-between cursor-pointer`}
              >
                <p>{item.label}</p>
                {open ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </NavigationMenuLink>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-2">
              {item.modules?.map((module, i) => (
                <div key={i} className="border-b border-b-gray-200">
                  <h4 className="text-primary font-semibold p-2">
                    {module.label}
                  </h4>
                  <div className="flex flex-col gap-3">
                    {module.items.map((subItem, j) => (
                      <div
                        key={j}
                        className={`${navigationMenuTriggerStyle()} h-auto cursor-pointer !w-full flex gap-2 py-2 items-center !justify-start`}
                      >
                        {subItem.icon && (
                          <subItem.icon className="w-6 h-6 text-primary" />
                        )}
                        <div className="flex flex-col text-primary">
                          <h4 className="text-md font-medium">
                            {subItem.title}
                          </h4>
                          <p className="text-sm font-thin">
                            {subItem?.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </>
      )}
    </NavigationMenuItem>
  );
};

export default MenuItem;
