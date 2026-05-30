"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudUpload,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GlassPanel } from "@/components/shared/glass-panel";
import { PDF_ACCEPT, useResumeUpload } from "@/hooks/use-resume-upload";
import type { UploadPhase } from "@/types/upload";
import { cn } from "@/lib/utils";

function UploadState({
  phase,
  progress,
  message,
  matchCount,
  processingTimeMs,
  error,
  onReset,
  onSelectFile,
}: {
  phase: UploadPhase;
  progress: number;
  message: string;
  matchCount?: number;
  processingTimeMs?: number;
  error: string | null;
  onReset: () => void;
  onSelectFile: () => void;
}) {
  return (
    <AnimatePresence mode="wait">
      {(phase === "idle" || phase === "error") && (
        <motion.div
          key="idle"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="space-y-4"
        >
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-surface-container-highest transition-transform group-hover/drop:scale-110">
            <CloudUpload
              className="size-10 text-primary"
              aria-hidden="true"
            />
          </div>
          <h3 className="font-headline-md text-white">
            Drag &amp; drop your resume
          </h3>
          <p className="font-body-md text-on-surface-variant">
            PDF only, up to 10MB
          </p>
          {error && (
            <p
              className="flex items-center justify-center gap-2 text-sm text-destructive"
              role="alert"
            >
              <AlertCircle className="size-4" aria-hidden="true" />
              {error}
            </p>
          )}
          <Button
            variant="outline"
            className="mt-2 font-label-md"
            onClick={(e) => {
              e.stopPropagation();
              onSelectFile();
            }}
          >
            Select File
          </Button>
        </motion.div>
      )}

      {(phase === "uploading" || phase === "processing") && (
        <motion.div
          key="processing"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="space-y-6 py-8"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="size-24 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="size-8 text-primary" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-headline-md text-white">
              {phase === "uploading"
                ? "Uploading resume..."
                : "Generating Embeddings..."}
            </h3>
            <Progress
              value={progress}
              glow
              className="mx-auto max-w-xs"
            />
            <p className="font-label-xs text-secondary">{message}</p>
          </div>
        </motion.div>
      )}

      {phase === "success" && (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4 py-4"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2
            className="mx-auto size-12 text-green-400"
            aria-hidden="true"
          />
          <h3 className="font-headline-md text-white">
            Semantic Profile Created
          </h3>
          <p className="text-on-surface-variant">
            {matchCount} match results found in {processingTimeMs}ms
          </p>
          <Button variant="link" onClick={onReset} className="font-label-md">
            Clear and restart
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function UploadDropzone() {
  const { phase, progress, message, result, error, upload, reset } =
    useResumeUpload();
  const [isDragActive, setIsDragActive] = useState(false);
  const isBusy = phase === "uploading" || phase === "processing";

  const onDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (file && !isBusy) void upload(file);
    },
    [upload, isBusy],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive: dropzoneActive,
    open,
  } = useDropzone({
    onDrop,
    accept: PDF_ACCEPT,
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    disabled: isBusy || phase === "success",
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    noClick: phase === "success",
  });

  return (
    <GlassPanel className="group relative overflow-hidden rounded-3xl p-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />

      <div
        {...getRootProps()}
        className={cn(
          "group/drop relative z-10 rounded-2xl border-2 border-dashed border-white/10 p-8 text-center transition-all duration-500 md:p-12",
          (dropzoneActive || isDragActive) &&
            "border-primary bg-primary/5",
          !isBusy &&
            phase !== "success" &&
            "cursor-pointer hover:border-primary/50",
        )}
        aria-label="Resume upload dropzone"
      >
        <input {...getInputProps()} aria-hidden="true" />

        <UploadState
          phase={phase}
          progress={progress}
          message={message}
          matchCount={result?.match_count}
          processingTimeMs={result?.processing_time_ms}
          error={error}
          onReset={reset}
          onSelectFile={open}
        />
      </div>
    </GlassPanel>
  );
}
