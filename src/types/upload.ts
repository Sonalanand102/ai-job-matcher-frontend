import type { JobFilters } from "@/types/filter";
import type { JobSearchResult } from "@/types/job";

export type UploadPhase =
  | "idle"
  | "uploading"
  | "processing"
  | "success"
  | "error";

export interface UploadResult {
  match_count: number;
  processing_time_ms: number;
}

/** Persisted in sessionStorage — no PDF contents */
export interface MatchSession {
  fileName: string;
  uploadedAt: number;
  filters: JobFilters;
  matches: JobSearchResult;
}
