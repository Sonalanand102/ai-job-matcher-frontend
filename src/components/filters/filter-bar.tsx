"use client";

import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/shared/glass-panel";
import {
  FILTER_EMPLOYMENT_TYPES,
  FILTER_EXPERIENCE_LEVELS,
  FILTER_LOCATIONS,
} from "@/lib/constants";
import type { JobFilters } from "@/types/filter";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filters: JobFilters;
  activeChips: string[];
  onFilterChange: (patch: Partial<JobFilters>) => void;
  onRemoveChip: (chip: string) => void;
  disabled?: boolean;
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "appearance-none rounded-lg border border-white/10 bg-white/5 py-2 pr-9 pl-4",
          "font-label-md text-on-surface transition-colors hover:bg-white/10",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
        aria-label={label}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-surface-container">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2 size-4 text-outline"
        aria-hidden="true"
      />
    </label>
  );
}

export function FilterBar({
  filters,
  activeChips,
  onFilterChange,
  onRemoveChip,
  disabled = false,
}: FilterBarProps) {
  return (
    <section
      className="sticky top-[72px] z-40 mb-8"
      aria-label="Job filters"
    >
      <GlassPanel className="flex flex-wrap items-center gap-4 rounded-xl p-4">
        <FilterSelect
          label="Location"
          value={filters.location}
          options={FILTER_LOCATIONS}
          onChange={(location) => onFilterChange({ location })}
          disabled={disabled}
        />

        <FilterSelect
          label="Experience Level"
          value={filters.experience_level}
          options={FILTER_EXPERIENCE_LEVELS}
          onChange={(experience_level) => onFilterChange({ experience_level })}
          disabled={disabled}
        />

        <FilterSelect
          label="Employment Type"
          value={filters.employment_type}
          options={FILTER_EMPLOYMENT_TYPES}
          onChange={(employment_type) => onFilterChange({ employment_type })}
          disabled={disabled}
        />

        {(filters.location ||
          filters.experience_level ||
          filters.employment_type) && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            onClick={() =>
              onFilterChange({
                location: "",
                experience_level: "",
                employment_type: "",
              })
            }
            className="font-label-md"
          >
            Clear filters
          </Button>
        )}

        {activeChips.length > 0 && (
          <>
            <div
              className="hidden h-8 w-px bg-white/10 md:block"
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 font-label-xs text-outline uppercase tracking-widest">
                Active:
              </span>
              {activeChips.map((chip) => (
                <Badge key={chip} variant="primary" className="gap-1">
                  {chip}
                  <button
                    type="button"
                    onClick={() => onRemoveChip(chip)}
                    disabled={disabled}
                    className="rounded-full hover:text-white disabled:opacity-50"
                    aria-label={`Remove ${chip} filter`}
                  >
                    <X className="size-3.5" aria-hidden="true" />
                  </button>
                </Badge>
              ))}
            </div>
          </>
        )}
      </GlassPanel>
    </section>
  );
}
