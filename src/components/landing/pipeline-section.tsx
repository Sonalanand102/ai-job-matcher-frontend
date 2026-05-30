"use client";

import { motion } from "framer-motion";
import {
  Upload,
  GitBranch,
  Search,
  Network,
  Database,
  ListOrdered,
  CheckCircle,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { PIPELINE_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  upload_file: Upload,
  schema: GitBranch,
  search_insights: Search,
  hub: Network,
  database: Database,
  reorder: ListOrdered,
  task_alt: CheckCircle,
};

export function PipelineSection() {
  return (
    <Container as="section" section>
      <SectionHeader
        title="The Semantic Engine Pipeline"
        subtitle="See how our distributed architecture processes your profile through seven layers of AI matching."
      />

      <div className="relative py-12">
        <svg
          className="pointer-events-none absolute top-1/2 left-0 hidden h-1 w-full -translate-y-1/2 md:block"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="line-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#a078ff" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#4cd7f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a078ff" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            className="flow-path"
            d="M 100 0 L 1100 0"
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="2"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center justify-between gap-8 overflow-x-auto pb-8 md:flex-row md:gap-6">
          {PIPELINE_STEPS.map((step, index) => {
            const Icon = ICON_MAP[step.icon] ?? Upload;
            const isActive = "active" in step && step.active;
            const isFilled = step.accent === "filled";

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08 }}
                className="group shrink-0 cursor-default"
              >
                <div
                  className={cn(
                    "mb-2 flex size-16 items-center justify-center rounded-2xl transition-all",
                    isFilled
                      ? "bg-primary shadow-[0_0_15px_rgba(160,120,255,0.4)]"
                      : "glass-panel",
                    isActive &&
                      "scale-110 border-secondary/50 pipeline-node-active",
                    !isFilled &&
                      !isActive &&
                      "group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:pipeline-node-active",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-8",
                      isFilled
                        ? "text-on-primary"
                        : step.accent === "secondary"
                          ? "text-secondary"
                          : "text-primary",
                    )}
                    aria-hidden="true"
                  />
                </div>
                <p
                  className={cn(
                    "text-center font-label-xs uppercase tracking-widest",
                    isActive
                      ? "font-bold text-secondary"
                      : isFilled
                        ? "text-white"
                        : "text-on-surface-variant",
                  )}
                >
                  {step.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
