"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-[48px]"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-headline-md font-bold tracking-tighter text-on-surface"
          >
            SemanticMatch AI
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href) && link.href !== "#";

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "font-label-md transition-colors duration-300",
                    isActive
                      ? "border-b-2 border-primary pb-1 font-bold text-primary"
                      : "font-medium text-on-surface-variant hover:text-primary",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="View source code"
            className="text-on-surface-variant hover:text-primary"
          >
            <Code2 className="size-5" />
          </Button>
          <Button variant="container" size="sm" asChild>
            <Link href="/#upload-section">Upload Resume</Link>
          </Button>
          {pathname === "/results" && (
            <div
              className="hidden size-10 items-center justify-center rounded-full border border-white/10 bg-primary/20 font-label-md text-primary sm:flex"
              aria-hidden="true"
            >
              U
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
