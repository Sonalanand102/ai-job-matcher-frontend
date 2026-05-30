import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {
  as?: "div" | "section" | "main" | "header" | "footer";
  narrow?: boolean;
  section?: boolean;
}

export function Container({
  as: Tag = "div",
  narrow = false,
  section = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1280px]",
        narrow ? "max-w-4xl" : "px-4 md:px-[48px]",
        section && "py-[80px]",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
