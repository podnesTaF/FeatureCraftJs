import { cn } from "@/src/shared/lib/utils";

interface DocsPageHeaderProps {
  heading: string;
  text?: string;
  className?: string;
}

export function DocsPageHeader({
  heading,
  text,
  className,
}: DocsPageHeaderProps) {
  return (
    <>
      <div className={cn("space-y-4", className)}>
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">
          {heading}
        </h1>
        {text && <p className="text-xl text-muted-foreground">{text}</p>}
      </div>
      <hr className="my-4" />
    </>
  );
}
