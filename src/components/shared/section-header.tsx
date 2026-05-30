import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        "mb-[80px] space-y-2",
        className,
      )}
    >
      {eyebrow && (
        <span className="font-label-md text-primary tracking-widest uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="font-headline-lg text-white">{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "font-body-md text-on-surface-variant",
            align === "center" && "mx-auto max-w-xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
