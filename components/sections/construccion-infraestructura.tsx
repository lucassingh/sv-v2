"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { DottedGlowBackground } from "@/components/aceternity/dotted-glow-background";
import { ConstruccionVideoMockupBlock } from "@/components/sections/construccion-video-mockup-block";
import { sectionIds } from "@/lib/section-ids";
import { sectionContainer, sectionYComfortable } from "@/lib/section-layout";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function ConstruccionInfraestructuraSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = sectionRef.current;
    const copy = copyRef.current;
    if (!root || !copy || reduceMotion) return;

    const ctx = gsap.context(() => {
      const lines = copy.querySelectorAll(".js-constr-line");
      if (lines.length) {
        gsap.fromTo(
          lines,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      const parallax = root.querySelector(".js-constr-parallax");
      if (parallax) {
        gsap.to(parallax, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.55,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id={sectionIds.actividades}
      data-nav-backdrop="dark"
      aria-labelledby="construccion-heading"
      className={cn(
        "relative isolate overflow-x-hidden border-y border-[rgba(243,240,228,0.08)] bg-[var(--color-primary)]",
        sectionYComfortable,
      )}
    >
      {/* Malla: capa full-bleed (top/left/right/bottom) para que el canvas cubra todo el alto útil */}
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 min-h-full w-full opacity-[0.5] sm:opacity-[0.55]">
        <DottedGlowBackground
          className="min-h-full h-full w-full"
          gap={14}
          radius={1.5}
          color="rgba(243, 240, 228, 0.24)"
          glowColor="rgba(243, 240, 228, 0.42)"
          opacity={0.9}
          backgroundOpacity={0}
          speedMin={0.35}
          speedMax={1.1}
          speedScale={0.85}
        />
      </div>

      <div
        className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[1] min-h-full w-full bg-[radial-gradient(ellipse_85%_55%_at_50%_18%,rgba(30,75,110,0.2)_0%,transparent_62%)]"
        aria-hidden
      />

      <div className={cn(sectionContainer, "relative z-[2] flex flex-col items-center")}>
        <div ref={copyRef} className="max-w-3xl text-center">
          <p
            className="js-constr-line font-sans text-xs font-medium uppercase tracking-[var(--letter-spacing-widest)] text-[var(--color-accent)]/80 sm:text-sm"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            {t("sections.construccion.eyebrow")}
          </p>
          <h2
            id="construccion-heading"
            className="js-constr-line mt-4 font-serif text-3xl font-bold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-[var(--color-accent)] sm:mt-5 sm:text-4xl lg:text-5xl xl:text-[3.25rem]"
            style={{ fontFamily: "var(--font-family-serif)" }}
          >
            {t("sections.construccion.title")}
          </h2>
          <p
            className="js-constr-line mx-auto mt-5 max-w-2xl text-base leading-[var(--line-height-relaxed)] text-[rgba(243,240,228,0.82)] sm:mt-6 sm:text-lg"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            {t("sections.construccion.body")}
          </p>
        </div>

        <div className="js-constr-parallax mt-10 w-full sm:mt-12 lg:mt-14">
          <ConstruccionVideoMockupBlock mobVideoAria={t("sections.construccion.mobVideoAria")} />
        </div>
      </div>
    </section>
  );
}
