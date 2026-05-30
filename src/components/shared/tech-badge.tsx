import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
}

export function TechBadge({ children, icon = true, className }: TechBadgeProps) {
  return (
    <Badge variant="tech" className={cn("font-label-xs", className)}>
      {icon && <Sparkles className="size-3.5" aria-hidden="true" />}
      {children}
    </Badge>
  );
}
