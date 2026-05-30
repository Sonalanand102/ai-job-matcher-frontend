"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  deriveJobModelSuggestions,
  deriveMatchInsight,
} from "@/lib/derive-insights";
import {
  clearMatchSession,
  getMemoryFile,
  hasMemoryFile,
  loadMatchSession,
  persistMatchSession,
  setMemoryFile,
} from "@/lib/match-store";
import { matchResume } from "@/services/match.service";
import { parseApiError } from "@/services/api";
import type { JobFilters } from "@/types/filter";
import type { JobSearchResult } from "@/types/job";
import type { JobModelSuggestion, MatchInsight } from "@/types/insight";
import type { MatchSession } from "@/types/upload";

function filtersEqual(a: JobFilters, b: JobFilters): boolean {
  return (
    a.location === b.location &&
    a.experience_level === b.experience_level &&
    a.employment_type === b.employment_type
  );
}

interface MatchContextValue {
  session: MatchSession | null;
  hydrated: boolean;
  hasSession: boolean;
  canRematch: boolean;
  matches: JobSearchResult | null;
  insight: MatchInsight | null;
  jobModels: JobModelSuggestion[];
  isRefetching: boolean;
  error: string | null;
  commitSession: (
    file: File,
    filters: JobFilters,
    matches: JobSearchResult,
  ) => void;
  refreshMatches: (
    filters: JobFilters,
    options?: { force?: boolean },
  ) => Promise<void>;
  clearSession: () => void;
}

const MatchContext = createContext<MatchContextValue | null>(null);

export function MatchProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<MatchSession | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void Promise.resolve().then(() => {
      setSession(loadMatchSession());
      setHydrated(true);
    });
  }, []);

  const commitSession = useCallback(
    (file: File, filters: JobFilters, matches: JobSearchResult) => {
      setMemoryFile(file);
      const next: MatchSession = {
        fileName: file.name,
        uploadedAt: Date.now(),
        filters,
        matches,
      };
      persistMatchSession(next);
      setSession(next);
      setError(null);
    },
    [],
  );

  const refreshMatches = useCallback(
    async (filters: JobFilters, options?: { force?: boolean }) => {
      const file = getMemoryFile();
      if (!file) {
        setError(
          "Resume file is no longer in memory. Upload again to apply filters or re-scan.",
        );
        return;
      }

      if (
        !options?.force &&
        session &&
        filtersEqual(session.filters, filters)
      ) {
        return;
      }

      setError(null);
      setIsRefetching(true);

      try {
        const matches = await matchResume({ file, filters });
        const next: MatchSession = {
          fileName: session?.fileName ?? file.name,
          uploadedAt: session?.uploadedAt ?? Date.now(),
          filters,
          matches,
        };
        persistMatchSession(next);
        setSession(next);
      } catch (err) {
        setError(parseApiError(err));
        throw err;
      } finally {
        setIsRefetching(false);
      }
    },
    [session],
  );

  const clearSessionHandler = useCallback(() => {
    clearMatchSession();
    setSession(null);
    setError(null);
  }, []);

  const matches = session?.matches ?? null;

  const insight = useMemo(() => deriveMatchInsight(matches), [matches]);
  const jobModels = useMemo(
    () => deriveJobModelSuggestions(matches),
    [matches],
  );

  const value: MatchContextValue = {
    session,
    hydrated,
    hasSession: session !== null,
    canRematch: hasMemoryFile(),
    matches,
    insight,
    jobModels,
    isRefetching,
    error,
    commitSession,
    refreshMatches,
    clearSession: clearSessionHandler,
  };

  return (
    <MatchContext.Provider value={value}>{children}</MatchContext.Provider>
  );
}

export function useMatchContext(): MatchContextValue {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatchContext must be used within MatchProvider");
  }
  return context;
}

export { filtersEqual };
