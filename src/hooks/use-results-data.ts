"use client";

import { useCallback, useEffect } from "react";
import {
  filtersEqual,
  useMatchContext,
} from "@/providers/match-provider";

export function useResultsData(filters: {
  location: string;
  experience_level: string;
  employment_type: string;
}) {
  const {
    hydrated,
    hasSession,
    canRematch,
    matches,
    insight,
    jobModels,
    isRefetching,
    error,
    refreshMatches,
    session,
  } = useMatchContext();

  useEffect(() => {
    if (!hydrated || !hasSession || !session) return;
    if (filtersEqual(session.filters, filters)) return;
    if (!canRematch) return;

    void refreshMatches(filters);
  }, [hydrated, hasSession, session, filters, canRematch, refreshMatches]);

  const refetch = useCallback(async () => {
    await refreshMatches(filters, { force: true });
  }, [filters, refreshMatches]);

  const needsReupload =
    hydrated &&
    hasSession &&
    session !== null &&
    !filtersEqual(session.filters, filters) &&
    !canRematch;

  return {
    jobs: matches,
    insight,
    jobModels,
    isLoading: isRefetching,
    isRefetching,
    error,
    hasSession: hydrated && hasSession,
    canRematch,
    needsReupload,
    refetch,
  };
}
