"use client";

import { Suspense } from "react";
import Link from "next/link";
import { RefreshCw, Upload } from "lucide-react";
import { TopNav } from "@/components/layout/top-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/shared/container";
import { FilterBar } from "@/components/filters/filter-bar";
import { JobMatchCard } from "@/components/jobs/job-match-card";
import { JobMatchSkeleton } from "@/components/jobs/job-match-skeleton";
import { InsightsSidebar } from "@/components/insights/insights-sidebar";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/shared/glass-panel";
import { useJobFilters } from "@/hooks/use-job-filters";
import { useResultsData } from "@/hooks/use-results-data";
import { useRescan } from "@/hooks/use-rescan";

function ResultsEmptyState() {
  return (
    <GlassPanel className="rounded-2xl px-8 py-16 text-center">
      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-surface-container-highest">
        <Upload className="size-8 text-primary" aria-hidden="true" />
      </div>
      <h2 className="font-headline-md mb-3 text-on-surface">
        No resume uploaded yet
      </h2>
      <p className="mx-auto mb-8 max-w-md font-body-md text-on-surface-variant">
        Upload a PDF resume from the dashboard to run semantic matching and view
        your top job matches here.
      </p>
      <Button variant="default" size="lg" asChild>
        <Link href="/#upload-section">Upload Resume</Link>
      </Button>
    </GlassPanel>
  );
}

function ResultsContent() {
  const { filters, activeChips, updateFilters, removeChip } = useJobFilters();
  const {
    jobs,
    insight,
    jobModels,
    isLoading,
    isRefetching,
    error,
    hasSession,
    canRematch,
    needsReupload,
    refetch,
  } = useResultsData(filters);

  const { isScanning, showSkeleton, rescan } = useRescan({
    onComplete: refetch,
  });

  const showLoading = hasSession && (isLoading || isRefetching || showSkeleton);
  const isBusy = isScanning || isRefetching;

  if (!hasSession) {
    return (
      <>
        <TopNav />
        <main>
          <Container className="py-8">
            <div className="mb-12">
              <h1 className="font-display-lg mb-2 text-on-surface">
                Semantic Discovery
              </h1>
              <p className="max-w-2xl font-body-lg text-on-surface-variant">
                Visualizing candidate-to-model alignment using neural embeddings
                and reranked semantic vectors.
              </p>
            </div>
            <ResultsEmptyState />
          </Container>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <TopNav />
      <main>
        <Container className="py-8">
          <div className="mb-[80px] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="font-display-lg mb-2 text-on-surface">
                Semantic Discovery
              </h1>
              <p className="max-w-2xl font-body-lg text-on-surface-variant">
                Visualizing candidate-to-model alignment using neural embeddings
                and reranked semantic vectors.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full font-label-md"
              onClick={() => void rescan()}
              disabled={isBusy || !canRematch}
              aria-busy={isBusy}
              title={
                !canRematch
                  ? "Upload your resume again to enable re-scan"
                  : undefined
              }
            >
              <RefreshCw
                className={`size-5 ${isBusy ? "animate-spin" : ""}`}
                aria-hidden="true"
              />
              {isBusy ? "Scanning..." : "Re-scan Resume"}
            </Button>
          </div>

          <FilterBar
            filters={filters}
            activeChips={activeChips}
            onFilterChange={updateFilters}
            onRemoveChip={removeChip}
            disabled={isBusy || !canRematch}
          />

          {needsReupload && (
            <div
              className="mb-6 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-on-surface-variant"
              role="status"
            >
              Filter changes require a fresh upload after a page refresh.{" "}
              <Link href="/#upload-section" className="text-primary underline">
                Upload resume again
              </Link>{" "}
              to apply new filters.
            </div>
          )}

          {error && (
            <div
              className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12">
            {isScanning && (
              <div
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md"
                role="status"
                aria-live="polite"
                aria-label="Running semantic search"
              >
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="size-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
                    aria-hidden="true"
                  />
                  <p className="animate-pulse font-label-md text-primary">
                    Running semantic search...
                  </p>
                  <div className="flex w-64 flex-col gap-2">
                    <div className="h-1 w-full shimmer rounded-full" />
                    <div className="h-1 w-4/5 shimmer rounded-full" />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6 lg:col-span-8">
              {showLoading ? (
                <>
                  <JobMatchSkeleton />
                  <JobMatchSkeleton />
                </>
              ) : jobs && jobs.jobs.length > 0 ? (
                jobs.jobs.map((job) => (
                  <JobMatchCard key={job.id} job={job} />
                ))
              ) : (
                <p className="py-12 text-center text-on-surface-variant">
                  No matches found for the selected filters. Try adjusting your
                  criteria.
                </p>
              )}
            </div>

            {insight && (
              <InsightsSidebar insight={insight} jobModels={jobModels} />
            )}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-on-surface-variant">
          Loading results...
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
