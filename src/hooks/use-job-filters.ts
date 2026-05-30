"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  filtersFromSearchParams,
  filtersToActiveChips,
  filtersToSearchParams,
  removeFilterChip,
  type JobFilters,
} from "@/types/filter";

export function useJobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: JobFilters = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams],
  );

  const activeChips = useMemo(
    () => filtersToActiveChips(filters),
    [filters],
  );

  const updateFilters = useCallback(
    (patch: Partial<JobFilters>) => {
      const next: JobFilters = { ...filters, ...patch };
      const params = filtersToSearchParams(next, searchParams);
      router.replace(`/results?${params.toString()}`, { scroll: false });
    },
    [filters, router, searchParams],
  );

  const removeChip = useCallback(
    (chip: string) => {
      updateFilters(removeFilterChip(filters, chip));
    },
    [filters, updateFilters],
  );

  return { filters, activeChips, updateFilters, removeChip };
}
