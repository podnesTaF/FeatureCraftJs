import { LucideIcon } from "lucide-react";

export interface MenuItem {
  label: string;
  href?: string;
  modules?: {
    label?: string;
    align?: "left" | "right" | "center";
    items: SubMenuItem[];
  }[];
}

export interface SubMenuItem {
  itemWidth?: "w-1/2" | "w-full";
  title: string;
  description?: string;
  href: string;
  icon?: LucideIcon;
  align?: "left" | "right" | "center";
}
