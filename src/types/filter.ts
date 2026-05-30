/** Metadata filters sent as query params to POST /match-resume */
export interface JobFilters {
  location: string;
  experience_level: string;
  employment_type: string;
}

export const DEFAULT_FILTERS: JobFilters = {
  location: "",
  experience_level: "",
  employment_type: "",
};

export function filtersToQueryParams(
  filters: JobFilters,
): Record<string, string> {
  const params: Record<string, string> = {};
  if (filters.location.trim()) params.location = filters.location.trim();
  if (filters.experience_level.trim())
    params.experience_level = filters.experience_level.trim();
  if (filters.employment_type.trim())
    params.employment_type = filters.employment_type.trim();
  return params;
}

export function filtersToActiveChips(filters: JobFilters): string[] {
  return [
    filters.location,
    filters.experience_level,
    filters.employment_type,
  ].filter(Boolean);
}

export function removeFilterChip(
  filters: JobFilters,
  chip: string,
): JobFilters {
  const next = { ...filters };
  if (next.location === chip) next.location = "";
  if (next.experience_level === chip) next.experience_level = "";
  if (next.employment_type === chip) next.employment_type = "";
  return next;
}

export function filtersFromSearchParams(
  params: URLSearchParams,
): JobFilters {
  return {
    location: params.get("location") ?? "",
    experience_level: params.get("experience_level") ?? "",
    employment_type: params.get("employment_type") ?? "",
  };
}

export function filtersToSearchParams(
  filters: JobFilters,
  existing?: URLSearchParams,
): URLSearchParams {
  const params = new URLSearchParams(existing?.toString() ?? "");

  for (const key of [
    "location",
    "experience_level",
    "employment_type",
  ] as const) {
    const value = filters[key].trim();
    if (value) params.set(key, value);
    else params.delete(key);
  }

  return params;
}
