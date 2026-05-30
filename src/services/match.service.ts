import { api, ApiRequestError, parseApiError, uploadProgressPercent } from "@/services/api";
import { mapBackendMatches } from "@/lib/mappers";
import { filtersToQueryParams } from "@/types/filter";
import type { MatchResumeParams, MatchResumeResponse } from "@/types/api";
import type { JobFilters } from "@/types/filter";
import type { JobSearchResult } from "@/types/job";

export interface MatchResumeOptions {
  file: File;
  filters?: JobFilters;
  onUploadProgress?: (percent: number) => void;
}

export async function matchResume({
  file,
  filters,
  onUploadProgress,
}: MatchResumeOptions): Promise<JobSearchResult> {
  const startedAt = performance.now();
  const formData = new FormData();
  formData.append("file", file);

  const params: MatchResumeParams = filters
    ? filtersToQueryParams(filters)
    : {};

  try {
    const { data } = await api.post<MatchResumeResponse>(
      "/match-resume",
      formData,
      {
        params,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = uploadProgressPercent(event);
          if (percent !== undefined) onUploadProgress?.(percent);
        },
      },
    );

    const jobs = mapBackendMatches(data.matches ?? []);

    return {
      jobs,
      total: jobs.length,
      latency_ms: Math.round(performance.now() - startedAt),
    };
  } catch (error) {
    throw new ApiRequestError(parseApiError(error));
  }
}
