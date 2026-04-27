"use client";

import { cn } from "@/lib/utils";

type GridPatternProps = {
  className?: string;
  /** Desplaza el patrón en Y (px) para que la 1ª línea horizontal no coincida con el borde de una sección. */
  offsetYPx?: number;
  /**
   * `default`: máscara radial suave (spotlight arriba).
   * `uniform`: misma densidad en todo el ancho, sin radial (p. ej. fundidos horizontales con otra sección).
   */
  variant?: "default" | "uniform";
};

const maskDefault =
  "[mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_50%,transparent_100%)]";

/** Fondo de grilla tipo Aceternity UI. */
export function GridPattern({ className, offsetYPx = 0, variant = "default" }: GridPatternProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(63,63,70,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(63,63,70,0.07)_1px,transparent_1px)] bg-[size:32px_32px]",
        variant === "default" ? maskDefault : "[mask-image:none]",
        className,
      )}
      style={
        offsetYPx
          ? { backgroundPosition: `0 ${offsetYPx}px, 0 ${offsetYPx}px` }
          : undefined
      }
    />
  );
}
