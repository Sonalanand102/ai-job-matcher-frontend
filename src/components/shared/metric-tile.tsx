import { cn } from "@/lib/utils";

interface MetricTileProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export function MetricTile({ label, value, valueClassName }: MetricTileProps) {
  return (
    <div className="rounded-lg border border-white/5 bg-black/20 p-3">
      <div className="mb-1 font-label-xs text-outline uppercase">{label}</div>
      <div className={cn("font-label-md text-on-surface", valueClassName)}>
        {value}
      </div>
    </div>
  );
}
