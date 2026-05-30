"use client";

import { motion } from "framer-motion";
import {
  Search,
  Zap,
  Database,
  GitBranch,
  Server,
  RefreshCw,
  Brain,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GlassPanel } from "@/components/shared/glass-panel";
import { FEATURE_CARDS, HYBRID_CHECKLIST } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FEATURE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  search_insights: Search,
  bolt: Zap,
  database: Database,
  account_tree: GitBranch,
  api: Server,
  sync: RefreshCw,
  psychology: Brain,
};

export function FeatureBentoGrid() {
  return (
    <section
      className="grid grid-cols-1 gap-6 md:grid-cols-12"
      aria-label="Infrastructure features"
    >
      {FEATURE_CARDS.map((card, index) => {
        const Icon = FEATURE_ICONS[card.icon] ?? Search;
        const isPrimary = card.accent === "primary";

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={cn(card.colSpan, "group relative")}
          >
            <GlassPanel
              className={cn(
                "flex h-full flex-col justify-between rounded-xl p-8",
                "borderAccent" in card &&
                  card.borderAccent &&
                  "border-l-2 border-l-primary/30",
                "tall" in card && card.tall && "min-h-64 overflow-hidden",
              )}
            >
              {"tall" in card && card.tall && (
                <div
                  className="absolute right-0 bottom-0 h-full w-1/2 bg-gradient-to-l from-primary/5 to-transparent"
                  aria-hidden="true"
                />
              )}

              <div className="relative z-10">
                {"iconBox" in card && card.iconBox ? (
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="mb-2 font-headline-md text-on-surface">
                        {card.title}
                      </h3>
                      <p className="font-body-md text-on-surface-variant">
                        {card.description}
                      </p>
                    </div>
                    <div className="rounded-xl bg-primary/10 p-4">
                      <Icon className="size-10 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                ) : (
                  <>
                    <Icon
                      className={cn(
                        "mb-4 size-10",
                        isPrimary ? "text-primary" : "text-secondary",
                      )}
                      aria-hidden="true"
                    />
                    <h3 className="mb-2 font-headline-md text-on-surface">
                      {card.title}
                    </h3>
                    <p
                      className={cn(
                        "text-on-surface-variant",
                        "tags" in card ? "font-body-md" : "font-body-sm",
                      )}
                    >
                      {card.description}
                    </p>
                  </>
                )}

                {"tags" in card && card.tags && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="default"
                        className="rounded-full px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {"tall" in card && card.tall && (
                  <div className="mt-12 flex animate-pulse gap-4">
                    <div className="h-2 w-16 rounded-full bg-primary/20" />
                    <div className="h-2 w-32 rounded-full bg-primary/40" />
                    <div className="h-2 w-24 rounded-full bg-primary/20" />
                  </div>
                )}
              </div>

              {"footer" in card && card.footer && (
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-label-xs text-secondary">
                    {card.footer}
                  </span>
                  <Zap
                    className="size-5 text-on-surface-variant"
                    aria-hidden="true"
                  />
                </div>
              )}
            </GlassPanel>
          </motion.div>
        );
      })}
    </section>
  );
}

export function HybridRetrievalSection() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-surface-container-low p-8 md:p-12"
      aria-labelledby="hybrid-heading"
    >
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <h2
            id="hybrid-heading"
            className="font-headline-lg text-on-surface"
          >
            The Hybrid Retrieval Engine
          </h2>
          <p className="font-body-md text-on-surface-variant">
            To solve the &quot;cold start&quot; and &quot;exact match&quot;
            problems of pure vector search, we implemented a sophisticated
            Reciprocal Rank Fusion (RRF) algorithm.
          </p>
          <ul className="mt-8 space-y-4">
            {HYBRID_CHECKLIST.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <CheckCircle
                  className="mt-1 size-5 shrink-0 text-secondary"
                  aria-hidden="true"
                />
                <div>
                  <span className="block font-label-md text-on-surface">
                    {item.title}
                  </span>
                  <p className="font-body-sm text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <GlassPanel className="relative rounded-2xl border border-white/10 p-6">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-label-md text-primary">
              RECONSTRUCTION LOGIC
            </span>
            <Badge variant="status" className="text-[10px] font-bold">
              STABLE
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                <span className="font-label-xs">Vector Retrieval (Dense)</span>
              </div>
              <span className="font-label-xs text-on-surface">
                Weight: 0.7
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-secondary" />
                <span className="font-label-xs">
                  Full-Text Search (Sparse)
                </span>
              </div>
              <span className="font-label-xs text-on-surface">
                Weight: 0.3
              </span>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <Progress value={85} gradient className="h-4" />
              <div className="mt-2 flex justify-between">
                <span className="text-[10px] text-on-surface-variant">
                  AGGREGATED SCORE
                </span>
                <span className="text-[10px] font-bold text-on-surface">
                  0.892 (HIGH MATCH)
                </span>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

export function TechStackMarquee() {
  const items = [
    { label: "Next.js 14", abbr: "N" },
    { label: "TypeScript", abbr: "TS" },
    { label: "Tailwind CSS", abbr: "TW" },
    { label: "shadcn/ui", abbr: "S/U" },
    { label: "Framer Motion", abbr: "FM" },
  ];

  return (
    <section
      className="border-t border-white/5 py-8"
      aria-label="Technology stack"
    >
      <h4 className="mb-6 text-center font-label-md text-on-surface-variant">
        BUILT WITH THE MODERN STACK
      </h4>
      <div className="flex flex-wrap justify-center gap-8 opacity-60 transition-opacity hover:opacity-100">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded bg-on-surface/10 text-[10px] font-bold">
              {item.abbr}
            </div>
            <span className="font-label-xs text-on-surface">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
