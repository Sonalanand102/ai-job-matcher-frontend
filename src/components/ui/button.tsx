import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:brightness-110",
        container:
          "bg-primary-container text-on-primary-container font-bold hover:scale-105 active:scale-95",
        secondary:
          "bg-secondary-container text-on-secondary-container font-bold hover:scale-105 active:scale-95",
        outline:
          "border border-white/10 bg-white/5 text-on-surface hover:bg-white/10",
        ghost: "text-on-surface-variant hover:bg-white/10 hover:text-primary",
        glass:
          "glass-panel text-white font-bold hover:bg-white/10",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm gap-2",
        sm: "h-8 px-3 text-xs gap-1.5",
        lg: "h-auto px-8 py-4 text-lg font-bold rounded-xl",
        icon: "size-10 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
