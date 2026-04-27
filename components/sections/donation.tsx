"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { Check, Copy, Landmark, Package, Sparkles } from "lucide-react";
import { FloatingCard } from "@/components/aceternity/floating-card";
import { GridPattern } from "@/components/aceternity/grid-pattern";
import { CollaboraWordsMarquee } from "@/components/aceternity/collabora-words-marquee";
import { ScrollReveal } from "@/components/aceternity/scroll-reveal";
import { cn } from "@/lib/utils";
import { sectionIds } from "@/lib/section-ids";
import { sectionContainer, sectionYComfortable } from "@/lib/section-layout";

gsap.registerPlugin(ScrollTrigger);

const PRIMARY_RGB = "47, 63, 68";
const SECONDARY_RGB = "30, 75, 110";

const sparks = [
  { Icon: Package, titleKey: "donation.spark1Title", hintKey: "donation.spark1Hint" },
  { Icon: Landmark, titleKey: "donation.spark2Title", hintKey: "donation.spark2Hint" },
  { Icon: Sparkles, titleKey: "donation.spark3Title", hintKey: "donation.spark3Hint" },
] as const;

export function DonationSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = parallaxRef.current;
    if (!section || !inner || reduceMotion) return;

    const tween = gsap.to(inner, {
      y: -56,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.15,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduceMotion]);

  const copyValue = async (raw: string, key: string) => {
    const text = key === "cbu" ? raw.replace(/\s+/g, "") : raw;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      /* ignore */
    }
  };

  const rows = [
    { label: t("donation.bankLabel"), value: t("donation.bankValue"), copyKey: null as string | null },
    { label: t("donation.accountNameLabel"), value: t("donation.accountNameValue"), copyKey: null },
    { label: t("donation.accountTypeLabel"), value: t("donation.accountTypeValue"), copyKey: null },
    {
      label: t("donation.numberLabel"),
      value: t("donation.numberValue"),
      copyKey: "number" as const,
    },
    { label: t("donation.cbuLabel"), value: t("donation.cbuValue"), copyKey: "cbu" as const },
    { label: t("donation.aliasLabel"), value: t("donation.aliasValue"), copyKey: "alias" as const },
  ];

  return (
    <section
      ref={sectionRef}
      id={sectionIds.colabora}
      data-nav-backdrop="light"
      className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-b from-white via-zinc-50/80 to-white",
        sectionYComfortable,
      )}
    >
      <GridPattern variant="uniform" className="z-0 opacity-[0.28]" offsetYPx={8} />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(${SECONDARY_RGB}, 0.12) 0%, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(${PRIMARY_RGB}, 0.1) 0%, transparent 70%)`,
        }}
      />

      <CollaboraWordsMarquee />

      <div className={cn(sectionContainer, "relative z-10")}>
        <ScrollReveal>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {t("donation.eyebrow")}
          </p>
          <h2 className="mb-4 max-w-3xl font-serif text-3xl font-bold tracking-tight text-[color:var(--color-primary)] sm:text-4xl lg:text-5xl">
            {t("donation.title")}
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="relative lg:col-span-5">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              className="relative mx-auto max-w-lg lg:mx-0 lg:max-w-none"
            >
              <div className="relative overflow-hidden rounded-[1.75rem] border border-zinc-200/90 shadow-[0_28px_80px_-24px_rgba(15,23,42,0.35)] ring-1 ring-black/5">
                <div className="relative aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-[3/4]">
                  <div ref={parallaxRef} className="absolute inset-[-14%] will-change-transform">
                    <Image
                      src="/assets/5-colaborate/colab.jpg"
                      alt={t("donation.imageAlt")}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      priority={false}
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="font-serif text-2xl font-bold leading-tight text-white drop-shadow-sm sm:text-3xl">
                      {t("donation.title")}
                    </p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85">{t("donation.eyebrow")}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {sparks.map(({ Icon, titleKey, hintKey }, i) => (
                <FloatingCard
                  key={titleKey}
                  delay={0.06 * i}
                  className="rounded-2xl border border-zinc-200/90 bg-white/90 p-4 shadow-lg shadow-zinc-900/5 backdrop-blur-md"
                >
                  <div
                    className="mb-3 inline-flex rounded-xl p-2"
                    style={{
                      background: `linear-gradient(135deg, rgba(${SECONDARY_RGB}, 0.12), rgba(${PRIMARY_RGB}, 0.08))`,
                    }}
                  >
                    <Icon className="h-5 w-5 text-[color:var(--color-secondary)]" aria-hidden />
                  </div>
                  <p className="font-semibold text-zinc-900">{t(titleKey)}</p>
                  <p className="mt-1 text-sm leading-snug text-zinc-600">{t(hintKey)}</p>
                </FloatingCard>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <ScrollReveal>
              <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">{t("donation.body")}</p>
            </ScrollReveal>

            <motion.div
              className="relative mt-8 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 p-6 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.12)] backdrop-blur-[2px] sm:p-8"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 80, damping: 17, delay: 0.05 }}
              style={{ fontFamily: "var(--font-family-sans)" }}
            >
              <GridPattern className="opacity-[0.22]" offsetYPx={20} />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-secondary)]/35 to-transparent"
              />

              <div className="relative">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                  <p className="text-sm font-bold uppercase leading-snug tracking-[0.14em] text-zinc-500 sm:text-base sm:tracking-[0.12em]">
                    {t("donation.bankTitle")}
                  </p>
                  <span
                    className="sr-only"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {copiedKey ? t("donation.copiedToast") : ""}
                  </span>
                </div>

                <dl className="divide-y divide-zinc-200/80">
                  {rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                    >
                      <div className="min-w-0 flex-1">
                        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:text-xs sm:tracking-wide">
                          {row.label}
                        </dt>
                        <dd
                          className={cn(
                            "mt-1.5 break-words font-medium leading-relaxed text-zinc-900",
                            row.copyKey
                              ? "font-mono text-sm tracking-tight sm:text-base"
                              : "text-sm sm:text-base",
                          )}
                        >
                          {row.value}
                        </dd>
                      </div>
                      {row.copyKey ? (
                        <button
                          type="button"
                          onClick={() => void copyValue(row.value, row.copyKey!)}
                          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-zinc-200/90 bg-zinc-50/90 px-3 py-2 text-sm font-medium text-zinc-800 transition hover:border-[color:var(--color-secondary)]/25 hover:bg-white"
                          aria-label={t("donation.copyButton")}
                        >
                          {copiedKey === row.copyKey ? (
                            <Check className="h-4 w-4 text-emerald-600" aria-hidden />
                          ) : (
                            <Copy className="h-4 w-4" aria-hidden />
                          )}
                          {copiedKey === row.copyKey ? t("donation.copiedToast") : t("donation.copyButton")}
                        </button>
                      ) : null}
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
