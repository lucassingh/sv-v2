"use client";

import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/aceternity/scroll-reveal";
import { MediaPlaceholder } from "@/components/aceternity/media-placeholder";
import { sectionIds } from "@/lib/section-ids";
import { sectionContainer, sectionYComfortable } from "@/lib/section-layout";

export function SocialSection() {
  const { t } = useTranslation();

  return (
    <section
      id={sectionIds.social}
      className={`border-b border-zinc-200 bg-zinc-50 ${sectionYComfortable}`}
    >
      <div className={`${sectionContainer} flex flex-col gap-16 sm:gap-20 lg:gap-24`}>
        <ScrollReveal className="text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {t("social.eyebrow")}
          </p>
          <h2 className="font-serif text-3xl font-bold text-zinc-900 sm:text-4xl lg:text-5xl">
            {t("social.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            {t("social.intro")}
          </p>
        </ScrollReveal>

        <div className="border-t border-zinc-200 pt-12 sm:pt-16">
          <ScrollReveal className="text-center">
            <h3 className="font-serif text-2xl font-bold text-zinc-900 sm:text-3xl lg:text-4xl">
              {t("sections.escuelaFutbol.title")}
            </h3>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              {t("sections.escuelaFutbol.body")}
            </p>
            <div className="mx-auto mt-10 max-w-4xl sm:mt-12">
              <MediaPlaceholder label={t("placeholders.escuelaFutbol")} />
            </div>
          </ScrollReveal>
        </div>

        <div className="grid items-center gap-10 border-t border-zinc-200 pt-12 sm:gap-12 sm:pt-16 lg:grid-cols-2 lg:gap-14 lg:pt-20">
          <ScrollReveal>
            <MediaPlaceholder label={t("placeholders.voleyJuegos")} className="lg:min-h-[320px]" />
          </ScrollReveal>
          <ScrollReveal>
            <h3 className="font-serif text-2xl font-bold text-zinc-900 sm:text-3xl lg:text-4xl">
              {t("sections.voleyJuegos.title")}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 sm:mt-6 sm:text-lg">
              {t("sections.voleyJuegos.body")}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid items-center gap-10 border-t border-zinc-200 pt-12 sm:gap-12 sm:pt-16 lg:grid-cols-2 lg:gap-14 lg:pt-20">
          <ScrollReveal className="order-2 lg:order-1">
            <h3 className="font-serif text-2xl font-bold text-zinc-900 sm:text-3xl lg:text-4xl">
              {t("sections.peques.title")}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 sm:mt-6 sm:text-lg">
              {t("sections.peques.body")}
            </p>
          </ScrollReveal>
          <ScrollReveal className="order-1 lg:order-2">
            <MediaPlaceholder label={t("placeholders.peques")} className="lg:min-h-[320px]" />
          </ScrollReveal>
        </div>

        <div className="grid items-center gap-10 border-t border-zinc-200 pt-12 sm:gap-12 sm:pt-16 lg:grid-cols-2 lg:gap-14 lg:pt-20">
          <ScrollReveal>
            <MediaPlaceholder label={t("placeholders.preadolescentes")} className="lg:min-h-[320px]" />
          </ScrollReveal>
          <ScrollReveal>
            <h3 className="font-serif text-2xl font-bold text-zinc-900 sm:text-3xl lg:text-4xl">
              {t("sections.preadolescentes.title")}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 sm:mt-6 sm:text-lg">
              {t("sections.preadolescentes.body")}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
