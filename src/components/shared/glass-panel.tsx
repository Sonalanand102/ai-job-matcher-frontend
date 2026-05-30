import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.ComponentProps<"div"> {
  variant?: "panel" | "card" | "primary-tint";
  hover?: boolean;
}

export function GlassPanel({
  variant = "panel",
  hover = false,
  className,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        variant === "panel" && "glass-panel",
        variant === "card" && (hover ? "glass-card" : "glass-panel rounded-xl"),
        variant === "primary-tint" &&
          "glass-panel border-primary/20 bg-primary/5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
