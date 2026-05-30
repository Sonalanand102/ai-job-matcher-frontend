"use client";

import { MatchProvider } from "@/providers/match-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <MatchProvider>{children}</MatchProvider>;
}
