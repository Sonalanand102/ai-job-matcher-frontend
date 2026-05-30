"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_FILTERS } from "@/types/filter";
import { parseApiError } from "@/services/api";
import { uploadAndMatchResume } from "@/services/resume.service";
import { useMatchContext } from "@/providers/match-provider";
import type { UploadPhase, UploadResult } from "@/types/upload";

const PDF_ACCEPT = {
  "application/pdf": [".pdf"],
} as const;

interface UseResumeUploadReturn {
  phase: UploadPhase;
  progress: number;
  message: string;
  result: UploadResult | null;
  error: string | null;
  upload: (file: File) => Promise<void>;
  reset: () => void;
}

function isPdfFile(file: File): boolean {
  const ext = file.name.split(".").pop()?.toLowerCase();
  return file.type === "application/pdf" || ext === "pdf";
}

export function useResumeUpload(): UseResumeUploadReturn {
  const router = useRouter();
  const { commitSession, clearSession } = useMatchContext();
  const [phase, setPhase] = useState<UploadPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setPhase("idle");
    setProgress(0);
    setMessage("");
    setResult(null);
    setError(null);
    clearSession();
  }, [clearSession]);

  const upload = useCallback(
    async (file: File) => {
      if (!isPdfFile(file)) {
        setPhase("error");
        setError("Only PDF files are supported. Please upload a .pdf resume.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setPhase("error");
        setError("File must be 10MB or smaller.");
        return;
      }

      try {
        setError(null);
        setPhase("uploading");
        setProgress(0);
        setMessage("Uploading resume...");

        const matches = await uploadAndMatchResume({
          file,
          filters: DEFAULT_FILTERS,
          onUploadProgress: (percent) => {
            setProgress(percent);
            if (percent >= 90) {
              setPhase("processing");
              setMessage("Running hybrid retrieval and LLM reranking...");
            }
          },
        });

        commitSession(file, DEFAULT_FILTERS, matches);

        const uploadResult: UploadResult = {
          match_count: matches.total,
          processing_time_ms: matches.latency_ms,
        };

        setPhase("success");
        setProgress(100);
        setResult(uploadResult);

        setTimeout(() => {
          router.push("/results");
        }, 1500);
      } catch (err) {
        setPhase("error");
        setError(parseApiError(err));
      }
    },
    [commitSession, router],
  );

  return { phase, progress, message, result, error, upload, reset };
}

export { PDF_ACCEPT };
