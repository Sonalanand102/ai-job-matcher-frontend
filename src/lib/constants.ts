export const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/results", label: "Candidates" },
  { href: "/features", label: "Job Models" },
  { href: "#", label: "Logs" },
] as const;

export const FOOTER_LINKS = [
  { href: "#", label: "API Docs" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Infrastructure Status" },
  { href: "#", label: "GitHub" },
] as const;

export const PIPELINE_STEPS = [
  { icon: "upload_file", label: "Resume Upload", accent: "primary" as const },
  { icon: "schema", label: "Embeddings", accent: "secondary" as const },
  { icon: "search_insights", label: "Vector Search", accent: "primary" as const },
  {
    icon: "hub",
    label: "Hybrid retrieval",
    accent: "secondary" as const,
    active: true,
  },
  { icon: "database", label: "Redis Cache", accent: "primary" as const },
  { icon: "reorder", label: "Reranking", accent: "secondary" as const },
  { icon: "task_alt", label: "Final Matches", accent: "filled" as const },
] as const;

export const FEATURE_CARDS = [
  {
    icon: "search_insights",
    title: "Semantic Search",
    description:
      "Beyond keywords. We utilize dense vector embeddings to understand the underlying intent and professional context of every resume fragment.",
    tags: ["Ada-002", "Cosine Similarity"],
    colSpan: "md:col-span-8",
    accent: "primary" as const,
  },
  {
    icon: "bolt",
    title: "Redis Caching",
    description:
      "Sub-millisecond retrieval of hot vector data for real-time ranking adjustments.",
    footer: "Latency: < 2ms",
    colSpan: "md:col-span-4",
    accent: "secondary" as const,
  },
  {
    icon: "database",
    title: "pgvector",
    description:
      "Highly scalable vector storage within our Postgres core. Perfect for managing millions of resume nodes with HNSW indexing.",
    colSpan: "md:col-span-4",
    accent: "primary" as const,
    borderAccent: true,
  },
  {
    icon: "account_tree",
    title: "Hybrid Retrieval",
    description:
      "Merging BM25 keyword matching with dense vector search results for the most balanced candidate selection algorithm.",
    colSpan: "md:col-span-4",
    accent: "secondary" as const,
  },
  {
    icon: "api",
    title: "FastAPI Backend",
    description:
      "Asynchronous I/O processing ensures non-blocking ingestion of thousands of PDFs simultaneously without performance degradation.",
    colSpan: "md:col-span-4",
    accent: "primary" as const,
  },
  {
    icon: "sync",
    title: "Async Ingestion",
    description:
      "Parallel resume parsing using Celery workers. From raw PDF to vectorized skill clusters in seconds.",
    colSpan: "md:col-span-6",
    accent: "primary" as const,
    tall: true,
  },
  {
    icon: "psychology",
    title: "LLM Reranking",
    description:
      "The top 50 candidates are re-evaluated by GPT-4o for nuanced cultural and skill alignment, moving beyond pure statistical similarity.",
    colSpan: "md:col-span-6",
    accent: "primary" as const,
    iconBox: true,
  },
] as const;

export const HYBRID_CHECKLIST = [
  {
    title: "Keyword Overlays",
    description:
      'Ensures specific certifications like "AWS Certified" are never missed due to semantic drift.',
  },
  {
    title: "Neural Reranking",
    description:
      "Applies cross-encoders to top results to provide highly accurate relevance scores.",
  },
  {
    title: "Context-Aware Normalization",
    description:
      "Aligns disparate scores from different retrieval engines into a single unified confidence index.",
  },
] as const;

export const TECH_STACK = [
  { icon: "terminal", label: "Next.js 14" },
  { icon: "palette", label: "TypeScript" },
  { icon: "palette", label: "Tailwind CSS" },
  { icon: "layers", label: "shadcn/ui" },
  { icon: "animation", label: "Framer Motion" },
] as const;

export const MATCH_SESSION_KEY = "semantic-match-session";

/** @deprecated Use MATCH_SESSION_KEY */
export const SESSION_STORAGE_KEY = MATCH_SESSION_KEY;

/** Backend-aligned metadata filter options for dropdowns */
export const FILTER_LOCATIONS = [
  "Bangalore",
  "Pune, India",
  "Remote (San Francisco, CA)",
  "Hybrid (Seattle, WA)",
] as const;

export const FILTER_EXPERIENCE_LEVELS = [
  "Junior",
  "Mid Level",
  "Senior",
  "Senior+",
  "Staff",
] as const;

export const FILTER_EMPLOYMENT_TYPES = [
  "Full-time",
  "Contract",
  "Part-time",
  "Remote",
] as const;
