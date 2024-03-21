import React from "react";
import { Button } from "../shadcn";

const IconButton = ({
  children,
  className,
  variant = "ghost",
}: {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}) => {
  return (
    <Button
      variant={variant}
      className={`rounded-full px-2 py-0 ${className || ""}`}
    >
      {children}
    </Button>
  );
};

export default IconButton;
