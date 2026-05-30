import { Skeleton } from "@/components/ui/skeleton";
import { GlassPanel } from "@/components/shared/glass-panel";

export function JobMatchSkeleton() {
  return (
    <GlassPanel className="rounded-xl p-6">
      <div className="mb-4 flex gap-4">
        <Skeleton className="size-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-1/3 rounded" />
          <Skeleton className="h-4 w-1/4 rounded" />
        </div>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-lg" />
        ))}
      </div>
      <Skeleton className="mb-6 h-20 rounded" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </GlassPanel>
  );
}
