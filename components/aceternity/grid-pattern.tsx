"use client";

import { cn } from "@/lib/utils";

/** Fondo de grilla tipo Aceternity UI. */
export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(63,63,70,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(63,63,70,0.07)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_50%,transparent_100%)]",
        className
      )}
    />
  );
}
