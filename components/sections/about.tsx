"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { sectionIds } from "@/lib/section-ids";
import { sectionContainer } from "@/lib/section-layout";

gsap.registerPlugin(ScrollTrigger);

const PRIMARY_RGB = "47, 63, 68";

export function AboutSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const pillars = [
    { num: "01", title: t("missionBlock.missionTitle"), text: t("missionBlock.missionText") },
    { num: "02", title: t("missionBlock.visionTitle"), text: t("missionBlock.visionText") },
    { num: "03", title: t("missionBlock.valuesTitle"), text: t("missionBlock.valuesText") },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-about-eyebrow]", {
          y: 20, opacity: 0, duration: 0.75, ease: "power2.out",
          scrollTrigger: { trigger: "[data-about-eyebrow]", start: "top 88%" },
        });
        gsap.from("[data-about-title]", {
          y: 52, opacity: 0, duration: 1.05, ease: "power3.out",
          scrollTrigger: { trigger: "[data-about-title]", start: "top 86%" },
        });
        gsap.from("[data-about-body]", {
          y: 30, opacity: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: "[data-about-body]", start: "top 83%" },
        });
        gsap.from("[data-pillar]", {
          y: 38, opacity: 0, duration: 0.82, ease: "power2.out",
          stagger: 0.14,
          scrollTrigger: { trigger: "[data-pillars]", start: "top 78%" },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={sectionIds.nosotros}
      data-nav-backdrop="light"
      className="relative overflow-hidden border-0 bg-(--color-accent)"
    >
      {/* Fundido ancho #fff → accent (transición desde el hero) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[clamp(6rem,32vh,18rem)] sm:h-[clamp(7rem,36vh,20rem)] lg:h-[clamp(8rem,40vh,22rem)]"
        style={{
          background: `linear-gradient(180deg,
            #ffffff 0%,
            rgba(255,255,255,0.94) 12%,
            color-mix(in srgb, var(--color-accent) 22%, white) 28%,
            color-mix(in srgb, var(--color-accent) 55%, white) 48%,
            color-mix(in srgb, var(--color-accent) 88%, white) 72%,
            var(--color-accent) 100%
          )`,
        }}
      />
      <div className={`${sectionContainer} relative z-[1] py-20 sm:py-28 lg:py-36`}>

        {/* Eyebrow */}
        <p
          data-about-eyebrow
          style={{ fontFamily: "var(--font-family-sans)", color: "var(--color-secondary)" }}
          className="text-[10px] font-medium uppercase tracking-[0.28em] mb-8 sm:mb-10"
        >
          {t("about.eyebrow")}
        </p>

        {/* Title */}
        <div data-about-title className="mb-16 sm:mb-20 lg:mb-24">
          <h2
            style={{
              fontFamily: "var(--font-family-serif)",
              color: "var(--color-primary)",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
            }}
            className="text-[clamp(2.5rem,7vw,5.5rem)] max-w-4xl"
          >
            {t("about.title")}
          </h2>
        </div>

        {/* Two-col: slogan label left + body text right */}
        <div
          data-about-body
          className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 mb-20 sm:mb-24 lg:mb-32"
        >
          <div className="flex flex-col gap-4 pt-1">
            <div
              className="h-px w-10"
              style={{ backgroundColor: "var(--color-secondary)" }}
            />
            <p
              style={{
                fontFamily: "var(--font-family-sans)",
                color: `rgba(${PRIMARY_RGB}, 0.38)`,
              }}
              className="flex flex-col gap-1.5 text-[10.5px] uppercase tracking-[0.2em] font-medium leading-snug"
            >
              {t("missionBlock.slogan")
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
            </p>
          </div>
          <p
            style={{
              fontFamily: "var(--font-family-sans)",
              color: `rgba(${PRIMARY_RGB}, 0.68)`,
            }}
            className="text-base leading-loose sm:text-[1.0625rem]"
          >
            {t("about.body")}
          </p>
        </div>

        {/* Horizontal rule */}
        <div
          className="mb-14 sm:mb-16 h-px"
          style={{ backgroundColor: `rgba(${PRIMARY_RGB}, 0.1)` }}
        />

        {/* Misión / Visión / Valores — tríada editorial (reglas finas, sin contenedor “card”) */}
        <div data-pillars className="grid grid-cols-1 sm:grid-cols-3">
          {pillars.map(({ num, title, text }, i) => (
            <div
              key={num}
              data-pillar
              className={`flex flex-col gap-6 ${
                i === 0
                  ? "pb-12 sm:pb-0 sm:pr-8 lg:pr-14"
                  : i === 1
                    ? "border-t border-[rgba(47,63,68,0.1)] py-12 sm:border-t-0 sm:border-l sm:border-[rgba(47,63,68,0.1)] sm:px-8 sm:py-0 lg:px-14"
                    : "border-t border-[rgba(47,63,68,0.1)] pt-12 sm:border-t-0 sm:border-l sm:border-[rgba(47,63,68,0.1)] sm:pl-8 sm:pt-0 lg:pl-14"
              }`}
            >
              <div className="flex flex-col gap-3">
                <span
                  aria-hidden
                  style={{
                    fontFamily: "var(--font-family-serif)",
                    color:
                      "color-mix(in srgb, var(--color-secondary) 52%, var(--color-primary) 48%)",
                  }}
                  className="text-[clamp(2.65rem,5.2vw,4.1rem)] leading-[0.88] tabular-nums tracking-[-0.04em]"
                >
                  {num}
                </span>
                <div
                  aria-hidden
                  className="h-px w-10 sm:w-11"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--color-secondary) 38%, transparent)",
                  }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-family-serif)",
                  color: "var(--color-primary)",
                  lineHeight: 1.15,
                }}
                className="text-xl tracking-[-0.014em] max-sm:text-2xl lg:text-[1.375rem]"
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-family-sans)",
                  color: `rgba(${PRIMARY_RGB}, 0.6)`,
                }}
                className="max-w-[52ch] text-sm leading-relaxed sm:text-[0.9375rem]"
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
