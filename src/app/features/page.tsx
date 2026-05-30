"use client";

import { TopNav } from "@/components/layout/top-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/shared/container";
import {
  FeatureBentoGrid,
  HybridRetrievalSection,
  TechStackMarquee,
} from "@/components/features/feature-sections";

export default function FeaturesPage() {
  return (
    <div className="mesh-gradient min-h-screen">
      <TopNav />
      <main>
        <Container className="space-y-[80px] py-8">
          <header className="mx-auto max-w-3xl space-y-2 pt-12 text-center">
            <span className="font-label-md tracking-widest text-primary uppercase">
              SYSTEM ARCHITECTURE
            </span>
            <h1 className="font-display-lg text-on-surface">
              Precision Semantic Infrastructure
            </h1>
            <p className="font-body-lg text-on-surface-variant">
              Our infrastructure is built for high-throughput semantic analysis,
              combining the speed of Redis with the depth of pgvector and
              LLM-driven reranking.
            </p>
          </header>

          <FeatureBentoGrid />
          <HybridRetrievalSection />
          <TechStackMarquee />
        </Container>
      </main>
      <SiteFooter showStatus />
    </div>
  );
}
