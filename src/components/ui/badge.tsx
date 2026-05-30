import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded font-label-xs transition-colors",
  {
    variants: {
      variant: {
        default: "border border-white/10 bg-white/5 px-2 py-1 text-on-surface-variant",
        primary:
          "border border-primary/20 bg-primary/10 px-3 py-1 text-primary rounded-full",
        tech: "rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-primary",
        status:
          "rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-green-400",
        highlight:
          "border border-primary/20 bg-primary/10 px-2 py-1 text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
