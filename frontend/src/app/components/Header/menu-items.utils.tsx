import {
  AudioLines,
  Cloudy,
  HandCoins,
  LucideIcon,
  PanelsTopLeft,
  ShieldX,
  Telescope,
} from "lucide-react";

interface MenuItem {
  label: string;
  href?: string;
  modules?: {
    label?: string;
    align?: "left" | "right" | "center";
    items: SubMenuItem[];
  }[];
}

interface SubMenuItem {
  itemWidth?: "w-1/2" | "w-full";
  title: string;
  description?: string;
  href: string;
  icon?: LucideIcon;
  align?: "left" | "right" | "center";
}

export const getMenuItems = (): MenuItem[] => {
  return [
    {
      label: "Features",
      modules: [
        {
          label: "Learn",
          items: [
            {
              itemWidth: "w-full",
              title: "Explore FeatureCrafts",
              icon: PanelsTopLeft,
              href: "/features",
            },
          ],
        },
        {
          label: "Features Themes",
          align: "center",
          items: [
            {
              title: "The Shield of Authentication",
              description: "Unlocking Digital Doors Securely",
              icon: ShieldX,
              itemWidth: "w-1/2",
              href: "/features/authentication",
            },
            {
              title: "Journey Through the Clouds",
              description: "Scaling Heights with Cloud Integration",
              icon: Cloudy,
              itemWidth: "w-1/2",
              href: "/features/cloud-integration",
            },
            {
              title: "Secure Web Transactions",
              description: "Streamlining Commerce with Confidence",
              icon: HandCoins,
              itemWidth: "w-1/2",
              href: "/features/transact-securely",
            },
            {
              title: "Voice of the Web",
              description: "Speaking the Language of Innovation",
              icon: AudioLines,
              itemWidth: "w-1/2",
              href: "/features/voice-of-web",
            },
            {
              title: "EcoSystem Explorer",
              description: "Connecting Dots, Enhancing Experiences",
              icon: Telescope,
              itemWidth: "w-1/2",
              href: "/features/telescope",
            },
          ],
        },
      ],
    },
    {
      label: "Documentation",
      href: "/docs",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];
};
