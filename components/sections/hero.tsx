"use client";

import Image from "next/image";
import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { sectionIds } from "@/lib/section-ids";
import { handleInPageNavClick } from "@/lib/scroll-to-section";

// Colores en RGB para usar en gradientes inline
const PRIMARY_RGB = "47, 63, 68";
const ACCENT_RGB  = "243, 240, 228";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Tiras de escala — rasgo visual del patrón "Shadow & Scales":
 * líneas verticales que encuadran la imagen con un aspecto medido.
 */
function ScaleStrips({ count = 28 }: { count?: number }) {
  return (
    <div
      aria-hidden
      className="h-4 w-full sm:h-5"
      style={{
        backgroundImage: `repeating-linear-gradient(
          90deg,
          transparent 0,
          transparent calc(100% / ${count} - 1px),
          rgba(${ACCENT_RGB}, 0.08) calc(100% / ${count} - 1px),
          rgba(${ACCENT_RGB}, 0.08) calc(100% / ${count})
        )`,
      }}
    />
  );
}

export function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  // ── Cursor spotlight suave ──────────────────────────────────
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const spotX = useSpring(rawX, { stiffness: 55, damping: 18 });
  const spotY = useSpring(rawY, { stiffness: 55, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(
    600px circle at ${spotX}% ${spotY}%,
    rgba(148, 187, 196, 0.09) 0%,
    transparent 70%
  )`;

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      rawX.set(((e.clientX - rect.left) / rect.width) * 100);
      rawY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [rawX, rawY],
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMouseMove);
    return () => el.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <section
      ref={sectionRef}
      id={sectionIds.inicio}
      data-nav-backdrop="dark"
      className="relative flex min-h-screen flex-col overflow-hidden bg-(--color-primary) pb-0"
      style={{ paddingTop: "calc(var(--anchor-offset) + 2.5rem)" }}
    >
      {/* ── Spotlight de cursor ──────────────────────────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ backgroundImage: spotlight }}
      />

      {/* ── Contenido textual ───────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-(--layout-content-max) px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          style={{
            fontFamily: "var(--font-family-sans)",
            color: `rgba(${ACCENT_RGB}, 0.38)`,
          }}
          className="text-[10px] font-medium uppercase tracking-[0.28em]"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Línea separadora animada */}
        <motion.span
          aria-hidden
          className="mt-3 block h-px"
          style={{ backgroundColor: `rgba(${ACCENT_RGB}, 0.18)`, transformOrigin: "left center" }}
          initial={{ scaleX: 0, width: "3rem" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
        />

        {/* Título — split-line reveal (cada línea sube desde máscara) */}
        <h1
          className="mt-4 text-[clamp(3.75rem,10vw,7.5rem)]"
          style={{
            fontFamily: "var(--font-family-serif)",
            color: "var(--color-accent)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.28, ease: EASE }}
            >
              {t("hero.titleLine1")}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
            >
              {t("hero.titleLine2")}
            </motion.span>
          </span>
        </h1>

        {/* Lead + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <p
            style={{
              fontFamily: "var(--font-family-sans)",
              color: `rgba(${ACCENT_RGB}, 0.52)`,
            }}
            className="max-w-[38ch] text-sm leading-relaxed sm:text-[0.9375rem]"
          >
            {t("hero.lead")}
          </p>

          <div className="flex shrink-0 flex-wrap gap-3">
            {/* CTA primario — fondo accent, texto primary */}
            <motion.a
              href={`#${sectionIds.nosotros}`}
              whileHover={{ opacity: 0.88 }}
              style={{
                fontFamily: "var(--font-family-sans)",
                backgroundColor: "var(--color-accent)",
                color: "var(--color-primary)",
              }}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-opacity duration-200 sm:px-6 sm:py-3"
              onClick={(e) => handleInPageNavClick(e, sectionIds.nosotros)}
            >
              {t("hero.ctaPrimary")}
              <ArrowRight className="size-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
            </motion.a>

            {/* CTA secundario — borde + texto accent */}
            <motion.a
              href={`#${sectionIds.contacto}`}
              initial={{
                borderColor: `rgba(${ACCENT_RGB}, 0.28)`,
                color: `rgba(${ACCENT_RGB}, 0.6)`,
              }}
              whileHover={{
                borderColor: `rgba(${ACCENT_RGB}, 0.55)`,
                color: `rgba(${ACCENT_RGB}, 1)`,
              }}
              transition={{ duration: 0.18 }}
              style={{
                fontFamily: "var(--font-family-sans)",
                borderColor: `rgba(${ACCENT_RGB}, 0.28)`,
                color: `rgba(${ACCENT_RGB}, 0.6)`,
              }}
              className="inline-flex items-center rounded-lg border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] sm:px-6 sm:py-3"
              onClick={(e) => handleInPageNavClick(e, sectionIds.contacto)}
            >
              {t("hero.ctaSecondary")}
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* ── Imagen con scale strips y perspectiva ─────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 44 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        className="relative z-10 mt-10 flex flex-1 flex-col sm:mt-14"
      >
        <ScaleStrips count={28} />

        <div className="relative flex-1">
          <div
            className="relative h-full min-h-[40vh] overflow-hidden sm:min-h-[50vh]"
            style={{
              transform: "perspective(1400px) rotateX(5deg) scale(0.995)",
              transformOrigin: "50% 0%",
            }}
          >
            {/* Degradados de fusión */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5"
              style={{ background: `linear-gradient(to top, rgb(${PRIMARY_RGB}), transparent)` }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28"
              style={{ background: `linear-gradient(to right, rgba(${PRIMARY_RGB}, 0.7), transparent)` }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28"
              style={{ background: `linear-gradient(to left, rgba(${PRIMARY_RGB}, 0.7), transparent)` }}
            />

            <Image
              src="/assets/1-hero/hero.jpg"
              alt={t("hero.imageAlt")}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        <ScaleStrips count={28} />
      </motion.div>
    </section>
  );
}
