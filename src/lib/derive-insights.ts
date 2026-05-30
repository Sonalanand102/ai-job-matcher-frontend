import type { JobModelSuggestion, MatchInsight } from "@/types/insight";
import type { JobSearchResult } from "@/types/job";

export function deriveMatchInsight(
  result: JobSearchResult | null | undefined,
): MatchInsight | null {
  if (!result?.jobs.length) return null;

  const top = result.jobs[0];
  const vectorProximity = Math.round(top.semantic_score);
  const keywordAlignment = Math.round(top.keyword_rank * 100);

  return {
    vector_proximity: vectorProximity,
    keyword_alignment: keywordAlignment,
    narrative: `Your profile aligns strongly with ${top.job_title} roles at ${top.company_name}. Top match score: ${Math.round(top.rerank_score)}% based on LLM reranking.`,
    focus_areas: [top.job_title, top.company_name],
  };
}

export function deriveJobModelSuggestions(
  result: JobSearchResult | null | undefined,
): JobModelSuggestion[] {
  if (!result?.jobs.length) return [];

  const accents: JobModelSuggestion["accent"][] = [
    "primary",
    "secondary",
    "muted",
  ];

  return result.jobs.slice(0, 3).map((job, index) => ({
    id: String(job.id),
    title: job.job_title,
    match_count: 1,
    accent: accents[index] ?? "muted",
  }));
}
