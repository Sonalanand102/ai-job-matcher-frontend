import { matchResume } from "@/services/match.service";
import type { JobFilters } from "@/types/filter";
import type { JobSearchResult } from "@/types/job";

export interface UploadResumeOptions {
  file: File;
  filters?: JobFilters;
  onUploadProgress?: (percent: number) => void;
}

/** POST /match-resume — caller commits response to MatchProvider */
export async function uploadAndMatchResume({
  file,
  filters,
  onUploadProgress,
}: UploadResumeOptions): Promise<JobSearchResult> {
  return matchResume({
    file,
    filters,
    onUploadProgress,
  });
}
