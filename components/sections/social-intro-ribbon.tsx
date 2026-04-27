"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { sectionContainer } from "@/lib/section-layout";

gsap.registerPlugin(ScrollTrigger);

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Cabecera de Social: secondary (#1E4B6E), tipografía accent.
 * Puente accent→secondary solo en ≥ sm; en mobile arranca directo el fondo secondary.
 * `data-nav-backdrop="dark"` → navbar accent sobre este bloque.
 */
export function SocialIntroRibbon() {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-social-intro-line]",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: reduce ? 0.35 : 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        },
      );
      if (!reduce) {
        gsap.to("[data-social-intro-glow]", {
          xPercent: 18,
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-nav-backdrop="dark"
      className="relative max-sm:-translate-y-px overflow-hidden border-0 bg-(--color-secondary) shadow-none ring-0 outline-none"
      aria-labelledby="social-intro-title"
    >
      {/* Puente accent → secondary: solo ≥ sm (en mobile se omite el “cajón” del gradiente) */}
      <div
        aria-hidden
        className="hidden w-full shrink-0 border-0 sm:block"
        style={{
          height: "clamp(4.5rem, 14vw, 9rem)",
          background: `linear-gradient(180deg,
            var(--color-accent) 0%,
            color-mix(in srgb, var(--color-accent) 94%, var(--color-secondary) 6%) 10%,
            color-mix(in srgb, var(--color-accent) 78%, var(--color-secondary) 22%) 26%,
            color-mix(in srgb, var(--color-accent) 52%, var(--color-secondary) 48%) 48%,
            color-mix(in srgb, var(--color-accent) 28%, var(--color-secondary) 72%) 68%,
            color-mix(in srgb, var(--color-accent) 10%, var(--color-secondary) 90%) 86%,
            var(--color-secondary) 100%
          )`,
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-0 hidden h-[140%] w-[90%] rounded-full blur-3xl sm:block"
        initial={{ opacity: 0.32 }}
        animate={
          reduceMotion
            ? { opacity: 0.36 }
            : { opacity: [0.28, 0.46, 0.3, 0.42, 0.28] }
        }
        transition={
          reduceMotion
            ? { duration: 0.3 }
            : { duration: 14, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div
          data-social-intro-glow
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 40% 30%, color-mix(in srgb, var(--color-accent) 45%, transparent), transparent 62%)",
          }}
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/3 bottom-0 h-full w-1/2 opacity-25"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, color-mix(in srgb, var(--color-primary) 22%, transparent) 100%)",
        }}
      />

      <div className={`${sectionContainer} relative z-[1] py-14 sm:py-20 lg:py-24`}>
        <div className="mx-auto max-w-4xl text-center">
          {/* Subrayado del eyebrow: ancho del texto, trazo sólido (sin gradiente) */}
          <div className="mx-auto mb-8 flex w-fit max-w-full flex-col items-stretch sm:mb-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.75, ease: EASE }}
              style={{
                fontFamily: "var(--font-family-sans)",
                color: "color-mix(in srgb, var(--color-accent) 82%, transparent)",
              }}
              className="w-fit text-[10px] font-medium uppercase tracking-[0.32em] sm:text-[11px]"
            >
              {t("social.eyebrow")}
            </motion.p>
            <div
              data-social-intro-line
              aria-hidden
              className="mt-3 h-[2px] w-full origin-left bg-(--color-accent)"
            />
          </div>

          <motion.h2
            id="social-intro-title"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.95, delay: 0.06, ease: EASE }}
            style={{
              fontFamily: "var(--font-family-serif)",
              color: "var(--color-accent)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
            }}
            className="text-[clamp(2.35rem,6.5vw,4.25rem)]"
          >
            {t("social.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.85, delay: 0.14, ease: EASE }}
            style={{
              fontFamily: "var(--font-family-sans)",
              color: "color-mix(in srgb, var(--color-accent) 88%, var(--color-primary) 12%)",
            }}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed sm:mt-10 sm:text-lg"
          >
            {t("social.intro")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
