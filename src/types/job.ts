export type MatchTier = "high" | "medium" | "low";

export interface Job {
  id: number;
  company_name: string;
  job_title: string;
  location: string;
  employment_type: string;
  level: string;
  description: string;
  /** Primary display score — maps from backend rerank_score (0–100) */
  match_score: number;
  semantic_score: number;
  keyword_rank: number;
  rerank_score: number;
  semantic_rank: number;
  match_tier: MatchTier;
  company_initial: string;
  skills: string[];
  highlight_skill?: string;
}

export interface JobSearchResult {
  jobs: Job[];
  total: number;
  latency_ms: number;
}
