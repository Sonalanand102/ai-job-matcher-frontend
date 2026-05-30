"use client";

import { Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { GlassPanel } from "@/components/shared/glass-panel";
import type { MatchInsight, JobModelSuggestion } from "@/types/insight";
import { cn } from "@/lib/utils";

interface InsightsSidebarProps {
  insight: MatchInsight;
  jobModels: JobModelSuggestion[];
}

const accentDot: Record<JobModelSuggestion["accent"], string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  muted: "bg-outline",
};

const accentHover: Record<JobModelSuggestion["accent"], string> = {
  primary: "group-hover:text-primary",
  secondary: "group-hover:text-secondary",
  muted: "group-hover:text-on-surface",
};

export function InsightsSidebar({ insight, jobModels }: InsightsSidebarProps) {
  const parts = insight.narrative.split(
    new RegExp(`(${insight.focus_areas.join("|")})`, "g"),
  );

  return (
    <aside className="hidden lg:block lg:col-span-4" aria-label="AI insights">
      <div className="sticky top-[160px] space-y-6">
        <GlassPanel
          variant="primary-tint"
          className="rounded-xl p-6"
        >
          <h4 className="mb-4 flex items-center gap-2 font-label-md text-primary uppercase">
            <Brain className="size-5" aria-hidden="true" />
            AI Match Insights
          </h4>

          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between font-label-xs">
                <span>Vector Proximity</span>
                <span className="text-primary">{insight.vector_proximity}%</span>
              </div>
              <Progress value={insight.vector_proximity} className="h-1.5" />
            </div>
            <div>
              <div className="mb-1 flex justify-between font-label-xs">
                <span>Keyword Alignment</span>
                <span className="text-secondary">
                  {insight.keyword_alignment}%
                </span>
              </div>
              <Progress
                value={insight.keyword_alignment}
                gradient
                className="h-1.5"
              />
            </div>
          </div>

          <p className="mt-6 font-body-sm leading-relaxed text-on-surface-variant">
            {parts.map((part, i) =>
              insight.focus_areas.includes(part) ? (
                <strong key={i} className="text-on-surface">
                  {part}
                </strong>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </p>
        </GlassPanel>

        <GlassPanel variant="card" className="rounded-xl p-6">
          <h4 className="mb-4 font-label-md text-on-surface uppercase">
            Suggested Job Models
          </h4>
          <ul className="space-y-4">
            {jobModels.map((model) => (
              <li key={model.id}>
                <button
                  type="button"
                  className="group flex w-full cursor-pointer items-center gap-3 text-left"
                >
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      accentDot[model.accent],
                    )}
                    aria-hidden="true"
                  />
                  <div>
                    <div
                      className={cn(
                        "font-body-sm transition-colors",
                        accentHover[model.accent],
                      )}
                    >
                      {model.title}
                    </div>
                    <div className="font-label-xs text-outline">
                      {model.match_count} roles matching profile
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </div>
    </aside>
  );
}
