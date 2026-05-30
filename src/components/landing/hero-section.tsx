"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TechBadge } from "@/components/shared/tech-badge";

export function HeroSection() {
  return (
    <section className="hero-glow relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center md:min-h-[819px] md:px-[48px]">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="animate-pulse-glow absolute top-1/4 left-1/4 size-96 rounded-full bg-primary/10 blur-[120px]" />
        <div
          className="animate-pulse-glow absolute right-1/4 bottom-1/4 size-96 rounded-full bg-secondary/10 blur-[120px]"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl space-y-8"
      >
        <TechBadge>POWERED BY PGVECTOR &amp; LLMS</TechBadge>

        <h1 className="font-display-lg leading-tight text-white">
          Find Jobs Using{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Semantic Matching
          </span>
        </h1>

        <p className="mx-auto max-w-2xl font-body-lg text-on-surface-variant">
          Leverage vector embeddings and hybrid retrieval to find your perfect
          role based on meaning, not just keywords. Our neural search engine
          understands your career trajectory.
        </p>

        <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
          <Button variant="default" size="lg" asChild>
            <Link
              href="#upload-section"
              className="shadow-[0_0_20px_rgba(208,188,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(208,188,255,0.5)]"
            >
              Upload Resume
            </Link>
          </Button>
          <Button variant="glass" size="lg" asChild>
            <Link href="/results">View Demo</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
