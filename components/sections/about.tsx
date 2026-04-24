"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ParallaxSection } from "@/components/aceternity/parallax-section";
import { FloatingCard } from "@/components/aceternity/floating-card";
import { ScrollReveal } from "@/components/aceternity/scroll-reveal";
import { MediaPlaceholder } from "@/components/aceternity/media-placeholder";
import { sectionIds } from "@/lib/section-ids";
import { sectionContainer, sectionYComfortable } from "@/lib/section-layout";

export function AboutSection() {
  const { t } = useTranslation();

  const pillars = [
    { title: t("missionBlock.missionTitle"), text: t("missionBlock.missionText") },
    { title: t("missionBlock.visionTitle"), text: t("missionBlock.visionText") },
    { title: t("missionBlock.valuesTitle"), text: t("missionBlock.valuesText") },
  ];

  return (
    <section
      id={sectionIds.nosotros}
      className={`relative border-b border-zinc-200 bg-white ${sectionYComfortable}`}
    >
      <div className={sectionContainer}>
        <ScrollReveal className="mb-10 text-center sm:mb-12 lg:mb-14">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {t("about.eyebrow")}
          </p>
          <h2 className="mb-5 font-serif text-3xl font-bold text-zinc-900 sm:mb-6 sm:text-4xl lg:text-5xl xl:text-6xl">
            {t("about.title")}
          </h2>
        </ScrollReveal>

        <div className="mb-14 grid min-w-0 grid-cols-1 items-center gap-10 sm:mb-16 sm:gap-12 lg:mb-20 lg:grid-cols-2 lg:gap-14">
          <ParallaxSection offset={30} className="min-w-0">
            <ScrollReveal className="min-w-0">
              <MediaPlaceholder label={t("placeholders.about")} className="min-h-[280px] lg:min-h-[360px]" />
            </ScrollReveal>
          </ParallaxSection>

          <ScrollReveal className="min-w-0">
            <p className="break-words text-base leading-relaxed text-zinc-600 sm:text-lg">{t("about.body")}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mb-8 text-center sm:mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {t("missionBlock.slogan")}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-bold text-zinc-900 sm:text-3xl lg:text-4xl">
            {t("missionBlock.title")}
          </h3>
        </ScrollReveal>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <FloatingCard key={pillar.title} delay={index * 0.1}>
              <motion.div
                className="h-full rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-6 text-center md:text-left"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 16px 32px rgba(0,0,0,0.06)",
                }}
              >
                <h4 className="mb-3 font-serif text-xl font-bold text-zinc-900">
                  {pillar.title}
                </h4>
                <p className="leading-relaxed text-zinc-600">{pillar.text}</p>
              </motion.div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  );
}
