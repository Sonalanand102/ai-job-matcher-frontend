import { MATCH_SESSION_KEY } from "@/lib/constants";
import type { MatchSession } from "@/types/upload";

/** In-memory PDF reference — survives route changes, cleared on tab close / refresh */
let memoryFile: File | null = null;

export function setMemoryFile(file: File | null): void {
  memoryFile = file;
}

export function getMemoryFile(): File | null {
  return memoryFile;
}

export function hasMemoryFile(): boolean {
  return memoryFile !== null;
}

export function persistMatchSession(session: MatchSession): void {
  if (typeof window === "undefined") return;

  sessionStorage.setItem(
    MATCH_SESSION_KEY,
    JSON.stringify({
      fileName: session.fileName,
      uploadedAt: session.uploadedAt,
      filters: session.filters,
      matches: session.matches,
    }),
  );
}

export function loadMatchSession(): MatchSession | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(MATCH_SESSION_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<MatchSession>;
    if (
      typeof parsed.fileName !== "string" ||
      typeof parsed.uploadedAt !== "number" ||
      !parsed.filters ||
      !parsed.matches
    ) {
      return null;
    }
    return parsed as MatchSession;
  } catch {
    return null;
  }
}

export function clearMatchSession(): void {
  memoryFile = null;
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(MATCH_SESSION_KEY);
}

export function hasMatchSession(): boolean {
  return loadMatchSession() !== null;
}
