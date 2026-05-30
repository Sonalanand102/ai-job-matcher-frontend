"use client";

import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { StatusBadge } from "@/components/shared/status-badge";

export function InsightsBentoSection() {
  return (
    <Container as="section" section className="pt-0">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative overflow-hidden rounded-3xl md:col-span-2"
        >
          <GlassPanel className="relative min-h-[300px] overflow-hidden rounded-3xl p-8">
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent opacity-60"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(76,215,246,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(76,215,246,0.15) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-end space-y-2">
              <h3 className="font-headline-lg text-white">
                Vector Similarity Clustering
              </h3>
              <p className="max-w-md text-on-surface-variant">
                Our AI maps your skills into a multidimensional vector space,
                finding adjacencies that traditional keyword search misses
                entirely.
              </p>
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlassPanel
            variant="primary-tint"
            className="flex h-full flex-col justify-between rounded-3xl p-8"
          >
            <div className="space-y-4">
              <Gauge className="size-10 text-primary" aria-hidden="true" />
              <h3 className="font-headline-md text-white">
                Millisecond Latency
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                Search across 50M+ job listings in under 50ms using pgvector
                HNSW indexing.
              </p>
            </div>
            <div className="pt-6">
              <StatusBadge label="INFRASTRUCTURE: OPERATIONAL" />
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </Container>
  );
}
