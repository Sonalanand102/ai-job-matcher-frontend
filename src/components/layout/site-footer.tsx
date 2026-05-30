import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/constants";
import { Container } from "@/components/shared/container";
import { StatusBadge } from "@/components/shared/status-badge";

interface SiteFooterProps {
  showStatus?: boolean;
}

export function SiteFooter({ showStatus = false }: SiteFooterProps) {
  return (
    <footer className="mt-auto w-full border-t border-white/5 bg-surface-container-lowest py-8">
      <Container className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <span className="font-headline-md font-bold text-on-surface-variant">
            SemanticMatch AI
          </span>
          <p className="mt-1 font-body-sm text-secondary opacity-80">
            © 2024 SemanticMatch AI. Built with pgvector, Redis, and LLMs.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-label-xs text-on-surface-variant opacity-80 transition-all hover:text-secondary-fixed-dim hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
          {showStatus && (
            <StatusBadge
              label="Infrastructure Operational"
              className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-green-500"
            />
          )}
        </div>
      </Container>
    </footer>
  );
}
