"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricTile } from "@/components/shared/metric-tile";
import {
  formatKeywordRank,
  formatMatchPercent,
  formatRank,
  formatSemanticScore,
} from "@/lib/formatters";
import type { Job } from "@/types/job";
import { cn } from "@/lib/utils";

interface JobMatchCardProps {
  job: Job;
}

export function JobMatchCard({ job }: JobMatchCardProps) {
  const isHigh = job.match_tier === "high";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative rounded-xl p-6 glass-panel",
        isHigh
          ? "ai-glow border-l-4 border-l-primary"
          : "border-l-4 border-l-secondary/50",
      )}
    >
      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/10">
            <span className="font-headline-md text-on-surface">
              {job.company_initial}
            </span>
          </div>
          <div>
            <h3 className="font-headline-md text-on-surface">
              {job.job_title}
            </h3>
            <p className="flex flex-wrap items-center gap-2 font-body-sm text-on-surface-variant">
              {job.company_name}
              <span
                className="size-1 rounded-full bg-outline"
                aria-hidden="true"
              />
              {job.location}
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <div
            className={cn(
              "font-label-md text-xl font-bold",
              isHigh ? "text-primary" : "text-secondary",
            )}
          >
            {formatMatchPercent(job.match_score)}
          </div>
          <div className="font-label-xs text-outline uppercase">
            {formatRank(job.semantic_rank)}
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <MetricTile
          label="Semantic Score"
          value={formatSemanticScore(job.semantic_score)}
          valueClassName="text-secondary"
        />
        <MetricTile
          label="Keyword Rank"
          value={formatKeywordRank(job.keyword_rank)}
        />
        <MetricTile label="Level" value={job.level} />
        <MetricTile label="Type" value={job.employment_type} />
      </div>

      <p className="mb-6 line-clamp-2 font-body-sm text-on-surface-variant">
        {job.description}
      </p>

      {job.skills.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <Badge key={skill} variant="default">
              {skill}
            </Badge>
          ))}
          {job.highlight_skill && (
            <Badge variant="highlight">{job.highlight_skill}</Badge>
          )}
        </div>
      )}

      <div className="flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
        <Button
          variant="link"
          className={cn(
            "flex items-center gap-2 font-label-md",
            !isHigh && "text-secondary",
          )}
        >
          View Model Details
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Button>
        <Button variant={isHigh ? "default" : "secondary"} asChild>
          <Link href="#">Apply Now</Link>
        </Button>
      </div>
    </motion.article>
  );
}
