"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { BackgroundGradient } from "@/components/aceternity/background-gradient";
import { Spotlight } from "@/components/aceternity/spotlight";
import { GridPattern } from "@/components/aceternity/grid-pattern";
import { MediaPlaceholder } from "@/components/aceternity/media-placeholder";
import { sectionIds } from "@/lib/section-ids";
import { handleInPageNavClick } from "@/lib/scroll-to-section";
import { sectionContainer, sectionYHero } from "@/lib/section-layout";

export function HeroSection() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id={sectionIds.inicio}
      className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white to-zinc-100 ${sectionYHero}`}
    >
      <BackgroundGradient />
      <GridPattern className="z-[1]" />
      <Spotlight className="z-[1]" />

      <div className={`relative z-10 ${sectionContainer}`}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8 sm:gap-10 lg:flex-row lg:gap-12"
        >
          <motion.div variants={itemVariants} className="flex-1">
            <motion.h1
              className="font-serif text-4xl font-bold leading-[1.1] text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t("hero.titleLine1")}
              <span className="block bg-gradient-to-r from-zinc-700 to-zinc-900 bg-clip-text text-transparent">
                {t("hero.titleLine2")}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-2 text-base tracking-[0.15em] text-zinc-600 sm:text-lg sm:tracking-[0.2em] md:text-xl"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-lg text-base leading-relaxed text-zinc-600 sm:mt-6 sm:text-lg md:text-xl"
            >
              {t("hero.lead")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4"
            >
              <a
                href={`#${sectionIds.nosotros}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-zinc-800 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-900 sm:min-h-12 sm:px-8 sm:py-3 sm:text-base sm:hover:scale-105"
                onClick={(e) => handleInPageNavClick(e, sectionIds.nosotros)}
              >
                {t("hero.ctaPrimary")}
                <ArrowRight className="size-5 shrink-0" strokeWidth={2} aria-hidden />
              </a>
              <a
                href={`#${sectionIds.contacto}`}
                className="min-h-11 rounded-lg border-2 border-zinc-700 px-6 py-2.5 text-sm font-semibold text-zinc-800 transition-all duration-300 hover:bg-zinc-100 sm:min-h-12 sm:px-8 sm:py-3 sm:text-base"
                onClick={(e) => handleInPageNavClick(e, sectionIds.contacto)}
              >
                {t("hero.ctaSecondary")}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative w-full flex-1 lg:max-w-[52%]"
          >
            <motion.div
              className="relative w-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-200/80 to-zinc-300/50 opacity-70 blur-2xl" />
              <div className="relative">
                <MediaPlaceholder label={t("placeholders.hero")} className="shadow-xl" />
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-8 -right-4 h-24 w-24 rounded-full bg-zinc-200/80 opacity-70 max-lg:hidden"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-zinc-300/60 opacity-70 max-lg:hidden"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transform"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-zinc-400 pt-2">
          <motion.div
            className="h-2 w-1 rounded-full bg-zinc-500"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
