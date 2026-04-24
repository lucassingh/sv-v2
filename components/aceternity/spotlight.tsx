"use client";

import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
};

/** Resalte suave tipo Aceternity UI (sin dependencias Radix). */
export function Spotlight({ className }: SpotlightProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -top-48 left-1/2 h-[420px] w-[90vw] max-w-3xl -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-400/25 via-primary-500/15 to-transparent blur-3xl",
        className
      )}
    />
  );
}
