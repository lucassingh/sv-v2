"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
  "/assets/3-social/a-futbol/fut-02.jpg",
  "/assets/3-social/a-futbol/fut-03.jpg",
  "/assets/3-social/a-futbol/fut-04.jpg",
] as const;

/** Cada foto visible antes del fundido (simula slider; solo opacidad) */
const SLIDE_HOLD_MS = 3000;
const FADE_MS = 1000;

const PRIMARY_RGB = "47, 63, 68";

/**
 * Escuela de fútbol — hero a pantalla completa con degradé claro a la izquierda
 * (texto sobre blanco que se funde con la foto). fut-02, fut-03 y fut-04 alternan con
 * crossfade cada ~3 s (fut-02 → fut-03 → fut-04 → …), sin controles.
 */
export function SocialEscuelaFutbolShowcase() {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    if (mq.matches) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % HERO_IMAGES.length);
    }, SLIDE_HOLD_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.from("[data-fut-typography] > *", {
        opacity: 0,
        y: prefersReduce ? 10 : 36,
        duration: prefersReduce ? 0.35 : 0.95,
        stagger: prefersReduce ? 0 : 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      if (!prefersReduce) {
        gsap.to("[data-fut-hero-scale]", {
          scale: 1.07,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.15,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const heroAlts = [
    t("sections.escuelaFutbol.imageMainAlt"),
    t("sections.escuelaFutbol.imageLeftAlt"),
    t("sections.escuelaFutbol.imageTeamAlt"),
  ] as const;

  return (
    <section
      ref={rootRef}
      data-nav-backdrop="light"
      aria-labelledby="escuela-futbol-heading"
      className="relative min-h-[100svh] overflow-hidden border-0 bg-(--color-light) shadow-none"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          data-fut-hero-scale
          className="absolute inset-0 origin-center will-change-transform"
        >
          {HERO_IMAGES.map((src, i) => {
            const visible = prefersReduced ? i === 0 : slide === i;
            const opacity = prefersReduced ? (i === 0 ? 1 : 0) : slide === i ? 1 : 0;
            return (
              <div
                key={src}
                className="absolute inset-0"
                style={{
                  opacity,
                  zIndex: visible ? 2 : 1,
                  transition: prefersReduced ? "none" : `opacity ${FADE_MS}ms ease-in-out`,
                }}
              >
                <Image
                  src={src}
                  alt={heroAlts[i]}
                  fill
                  className="object-cover object-[center_32%] sm:object-[center_28%] lg:object-center"
                  sizes="100vw"
                  priority={i === 0}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-white/72 via-white/55 to-white/28 sm:from-white/76 sm:via-white/58 sm:to-white/26 lg:bg-gradient-to-r lg:from-white lg:from-[42%] lg:via-white/52 lg:via-[52%] lg:to-transparent"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-70 mix-blend-multiply lg:opacity-50"
        style={{
          backgroundImage: `linear-gradient(165deg, transparent 0%, rgba(${PRIMARY_RGB}, 0.04) 45%, transparent 70%)`,
        }}
      />

      {/* Velo inferior: solo desktop — en mobile se leía como línea dura bajo el texto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] hidden h-[clamp(2.5rem,9vh,4.75rem)] lg:block"
        style={{
          background: `linear-gradient(to top,
            #ffffff 0%,
            rgba(255,255,255,0.96) 30%,
            rgba(255,255,255,0.55) 62%,
            rgba(255,255,255,0) 100%
          )`,
        }}
      />

      <div
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:flex-row lg:items-center lg:justify-start lg:px-8 lg:py-20 xl:px-12"
      >
        <div className="w-full max-w-xl lg:max-w-[min(36rem,44vw)]">
          <div data-fut-typography className="flex flex-col gap-6 sm:gap-7">
            <h2
              id="escuela-futbol-heading"
              style={{
                fontFamily: "var(--font-family-serif)",
                color: "var(--color-primary)",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
              }}
              className="text-[clamp(2.5rem,8vw,4.75rem)]"
            >
              {t("sections.escuelaFutbol.title")}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-family-sans)",
                color: `rgba(${PRIMARY_RGB}, 0.72)`,
              }}
              className="max-w-xl text-base leading-relaxed sm:text-[1.0625rem] lg:text-[1.08rem]"
            >
              {t("sections.escuelaFutbol.body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
