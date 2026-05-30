import { cn } from "@/lib/utils";

interface ProgressProps extends React.ComponentProps<"div"> {
  value: number;
  glow?: boolean;
  gradient?: boolean;
}

function Progress({
  value,
  glow = false,
  gradient = false,
  className,
  ...props
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-surface-container-highest",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500",
          gradient
            ? "bg-gradient-to-r from-primary to-secondary"
            : "bg-primary",
          glow && "shadow-[0_0_10px_rgba(208,188,255,0.8)]",
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export { Progress };
