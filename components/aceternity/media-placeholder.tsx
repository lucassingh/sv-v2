"use client";

import { cn } from "@/lib/utils";

type MediaPlaceholderProps = {
  label: string;
  className?: string;
};

/** Bloque gris tipo wireframe / imagen pendiente (sin assets externos). */
export function MediaPlaceholder({ label, className }: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex w-full items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-500 shadow-inner",
        "aspect-video min-h-[180px] sm:min-h-[240px] lg:min-h-[280px]",
        className
      )}
    >
      <span className="max-w-[16rem] px-4 text-center font-sans text-xs font-semibold uppercase tracking-widest sm:text-sm">
        {label}
      </span>
    </div>
  );
}
