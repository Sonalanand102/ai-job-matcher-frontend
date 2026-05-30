"use client";

import { useCallback, useState } from "react";

interface UseRescanOptions {
  onComplete: () => Promise<void>;
}

export function useRescan({ onComplete }: UseRescanOptions) {
  const [isScanning, setIsScanning] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const rescan = useCallback(async () => {
    setIsScanning(true);

    try {
      await onComplete();
      setShowSkeleton(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
    } finally {
      setShowSkeleton(false);
      setIsScanning(false);
    }
  }, [onComplete]);

  return { isScanning, showSkeleton, rescan };
}
