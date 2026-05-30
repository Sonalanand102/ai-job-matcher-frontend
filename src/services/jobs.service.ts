import { getMemoryFile } from "@/lib/match-store";
import { matchResume } from "@/services/match.service";
import type { JobFilters } from "@/types/filter";
import type { JobSearchResult } from "@/types/job";

export interface FetchMatchesOptions {
  filters: JobFilters;
  onUploadProgress?: (percent: number) => void;
}

/** Re-POST /match-resume using the in-memory PDF (same tab session only). */
export async function fetchMatches({
  filters,
  onUploadProgress,
}: FetchMatchesOptions): Promise<JobSearchResult> {
  const file = getMemoryFile();
  if (!file) {
    throw new Error(
      "Resume file is no longer in memory. Upload again to re-run matching.",
    );
  }

  return matchResume({ file, filters, onUploadProgress });
}
