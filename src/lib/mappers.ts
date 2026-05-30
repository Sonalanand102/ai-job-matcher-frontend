import type { BackendJobMatch } from "@/types/api";
import type { Job, MatchTier } from "@/types/job";

function deriveMatchTier(rerankScore: number): MatchTier {
  if (rerankScore >= 75) return "high";
  if (rerankScore >= 50) return "medium";
  return "low";
}

export function mapBackendMatch(
  raw: BackendJobMatch,
  semanticRank: number,
): Job {
  return {
    id: raw.id,
    company_name: raw.company_name,
    job_title: raw.job_title,
    location: raw.location,
    employment_type: raw.employment_type,
    level: raw.experience_level,
    description: raw.job_description,
    match_score: raw.rerank_score,
    semantic_score: raw.semantic_score,
    keyword_rank: raw.keyword_rank,
    rerank_score: raw.rerank_score,
    semantic_rank: semanticRank,
    match_tier: deriveMatchTier(raw.rerank_score),
    company_initial: raw.company_name.charAt(0).toUpperCase(),
    skills: [],
  };
}

export function mapBackendMatches(matches: BackendJobMatch[]): Job[] {
  return matches.map((match, index) => mapBackendMatch(match, index + 1));
}
