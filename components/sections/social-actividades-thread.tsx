"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GridPattern } from "@/components/aceternity/grid-pattern";
import { ScrollReveal } from "@/components/aceternity/scroll-reveal";
import { cn } from "@/lib/utils";
import { sectionContainer } from "@/lib/section-layout";

gsap.registerPlugin(ScrollTrigger);

const PRIMARY_RGB = "47, 63, 68";

const CHAPTER_IMAGES = [
  { id: "volley", src: "/assets/3-social/b-volley/voll-01.jpg" },
  { id: "peques", src: "/assets/3-social/c-peques/peques-03.jpg" },
  { id: "pre", src: "/assets/3-social/d-pre/pre-01.jpg" },
] as const;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Altura del fundido superior: mismo #fff que el cierre del fútbol → zinc-50 del cuerpo (sin accent intermedio). */
const TOP_BLEND_PX = 200;

/**
 * Actividades menores dentro de Social: hilo vertical con progreso al scroll (GSAP),
 * capítulos alternados + Framer Motion (sin sombras en tarjetas / hilo).
 */
export function SocialActividadesThread() {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const threadProgressRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const chapters = CHAPTER_IMAGES.map((row, i) => {
    const keys = [
      { title: "sections.voleyJuegos.title", body: "sections.voleyJuegos.body", alt: "sections.voleyJuegos.imageAlt" },
      { title: "sections.peques.title", body: "sections.peques.body", alt: "sections.peques.imageAlt" },
      {
        title: "sections.preadolescentes.title",
        body: "sections.preadolescentes.body",
        alt: "sections.preadolescentes.imageAlt",
      },
    ] as const;
    const k = keys[i];
    return {
      ...row,
      title: t(k.title),
      body: t(k.body),
      alt: t(k.alt),
      index: i + 1,
    };
  });

  useEffect(() => {
    const el = rootRef.current;
    const progress = threadProgressRef.current;
    if (!el || !progress) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || reduceMotion) {
      gsap.set(progress, { scaleY: 1, transformOrigin: "top center" });
      return;
    }

    gsap.set(progress, { scaleY: 0, transformOrigin: "top center" });

    const ctx = gsap.context(() => {
      gsap.to(progress, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 26%",
          scrub: 0.45,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={rootRef}
      data-nav-backdrop="light"
      data-social-actividades-thread
      className="relative z-[1] overflow-hidden border-0 bg-zinc-50 shadow-none"
      aria-labelledby="social-actividades-thread-title"
    >
      {/* Capa base: orbes solo debajo del velo (no manchan el blanco del borde superior) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden"
        style={{ top: TOP_BLEND_PX * 0.45 }}
      >
        {!reduceMotion && (
          <>
            <motion.div
              className="absolute -left-1/4 top-[8%] h-[min(52vw,28rem)] w-[min(90vw,42rem)] rounded-full opacity-[0.2]"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 45%, transparent), transparent 70%)",
                filter: "blur(48px)",
              }}
              animate={{ x: [0, 24, 0], y: [0, 18, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-1/5 top-[42%] h-[min(48vw,26rem)] w-[min(85vw,38rem)] rounded-full opacity-[0.16]"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 70%, white 30%), transparent 68%)",
                filter: "blur(56px)",
              }}
              animate={{ x: [0, -20, 0], y: [0, 28, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute bottom-[5%] left-1/3 h-[min(40vw,20rem)] w-[min(70vw,32rem)] -translate-x-1/2 rounded-full opacity-[0.12]"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 35%, var(--color-accent) 65%), transparent 72%)",
                filter: "blur(40px)",
              }}
              animate={{ opacity: [0.1, 0.18, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      {/* Un solo fundido: #fff = cierre fútbol → zinc-50 (sin accent, sin sombras) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1]"
        style={{
          height: TOP_BLEND_PX,
          background: `linear-gradient(180deg,
            #ffffff 0%,
            #ffffff 18%,
            #fcfcfc 38%,
            #f6f6f6 62%,
            #f3f3f4 82%,
            #fafafa 100%
          )`,
        }}
      />

      <GridPattern className="z-[2] opacity-[0.38]" offsetYPx={8} variant="uniform" />

      <div className={`${sectionContainer} relative z-[3] py-16 sm:py-20 lg:py-28`}>
        <ScrollReveal>
          <motion.header
            initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            <p
              style={{
                fontFamily: "var(--font-family-sans)",
                color: "var(--color-secondary)",
              }}
              className="text-[10px] font-medium uppercase tracking-[0.32em] sm:text-[11px]"
            >
              {t("sections.minorThread.eyebrow")}
            </p>
            <h2
              id="social-actividades-thread-title"
              style={{
                fontFamily: "var(--font-family-serif)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
              className="mt-4 text-[clamp(2rem,5.2vw,3.35rem)] text-(--color-primary)"
            >
              <span className="block bg-gradient-to-br from-(--color-primary) via-(--color-primary) to-[color-mix(in_srgb,var(--color-primary)_55%,var(--color-secondary)_45%)] bg-clip-text text-transparent">
                {t("sections.minorThread.title")}
              </span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-family-sans)",
                color: `rgba(${PRIMARY_RGB}, 0.62)`,
              }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
            >
              {t("sections.minorThread.lead")}
            </p>
          </motion.header>
        </ScrollReveal>

        <div className="relative mt-16 sm:mt-20 lg:mt-24">
          <div
            className="absolute bottom-6 left-[11px] top-2 w-[3px] -translate-x-1/2 overflow-hidden rounded-full bg-[rgba(47,63,68,0.1)] sm:left-[13px] lg:left-1/2 lg:top-4 lg:bottom-10 lg:-translate-x-1/2"
            aria-hidden
          >
            <div
              ref={threadProgressRef}
              className="absolute inset-0 rounded-full bg-gradient-to-b from-(--color-secondary) via-[color-mix(in_srgb,var(--color-secondary)_70%,var(--color-accent)_30%)] to-[color-mix(in_srgb,var(--color-secondary)_35%,var(--color-accent)_65%)]"
              style={{ transformOrigin: "top center" }}
            />
          </div>

          <ol className="relative m-0 list-none space-y-0 p-0">
            {chapters.map((ch, i) => {
              const imageFirst = i % 2 === 0;
              return (
                <li key={ch.id} className="relative pb-20 last:pb-6 sm:pb-24 sm:last:pb-8 lg:pb-28 lg:last:pb-10">
                  <motion.div
                    initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ type: "spring", stiffness: 340, damping: 20, delay: 0.04 }}
                    className="absolute left-[11px] top-10 z-[2] flex h-6 w-6 -translate-x-1/2 items-center justify-center sm:left-[13px] sm:top-11 lg:left-1/2 lg:top-14 lg:-translate-x-1/2"
                    aria-hidden
                  >
                    {!reduceMotion && (
                      <motion.span
                        className="absolute inset-0 rounded-full border-2 border-(--color-secondary)"
                        animate={{ scale: [1, 1.55, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
                      />
                    )}
                    <span className="relative z-[1] box-border h-3.5 w-3.5 rounded-full border-2 border-(--color-secondary) bg-(--color-light)" />
                  </motion.div>

                  <div className="grid gap-10 pl-10 sm:gap-12 sm:pl-14 lg:grid-cols-2 lg:items-center lg:gap-x-14 lg:gap-y-10 lg:pl-0">
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 48 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-12% 0px" }}
                      transition={{ duration: 0.88, ease: EASE, delay: 0.05 }}
                      className={cn(
                        "group relative min-w-0",
                        imageFirst ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-1 lg:row-start-1",
                      )}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[rgba(47,63,68,0.1)] sm:aspect-[5/4] lg:aspect-[4/3]">
                        <Image
                          src={ch.src}
                          alt={ch.alt}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          sizes="(min-width: 1024px) 42vw, 100vw"
                          draggable={false}
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[rgba(30,75,110,0.14)] via-transparent to-transparent opacity-80 mix-blend-multiply"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-12% 0px" }}
                      transition={{ duration: 0.82, ease: EASE, delay: 0.14 }}
                      className={cn(
                        "flex min-w-0 flex-col gap-4 sm:gap-5",
                        imageFirst ? "lg:col-start-1 lg:row-start-1 lg:pr-6 lg:text-right" : "lg:col-start-2 lg:row-start-1 lg:pl-6",
                      )}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-family-serif)",
                          color: "color-mix(in srgb, var(--color-secondary) 18%, transparent)",
                        }}
                        className={cn(
                          "select-none text-[clamp(3.75rem,13vw,7rem)] leading-none tracking-tighter",
                          imageFirst ? "lg:ml-auto" : "",
                        )}
                        aria-hidden
                      >
                        {String(ch.index).padStart(2, "0")}
                      </span>
                      <div className={cn("space-y-4 sm:space-y-5", imageFirst ? "lg:items-end" : "")}>
                        <div
                          className={cn("h-px w-14 sm:w-16", imageFirst ? "lg:ml-auto" : "")}
                          style={{
                            background: `linear-gradient(90deg, var(--color-secondary), rgba(${PRIMARY_RGB}, 0.08))`,
                          }}
                          aria-hidden
                        />
                        <h3
                          style={{
                            fontFamily: "var(--font-family-serif)",
                            color: "var(--color-primary)",
                            letterSpacing: "-0.025em",
                            lineHeight: 1.08,
                          }}
                          className="text-2xl sm:text-3xl lg:text-[clamp(1.65rem,2.4vw,2.35rem)]"
                        >
                          {ch.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: "var(--font-family-sans)",
                            color: `rgba(${PRIMARY_RGB}, 0.68)`,
                          }}
                          className="max-w-xl text-base leading-relaxed sm:text-lg lg:leading-relaxed"
                        >
                          {ch.body}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
