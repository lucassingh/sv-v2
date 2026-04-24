"use client";

import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/aceternity/scroll-reveal";
import { MediaPlaceholder } from "@/components/aceternity/media-placeholder";
import { sectionIds } from "@/lib/section-ids";
import { sectionContainer, sectionYComfortable } from "@/lib/section-layout";

export function ConstruccionInfraestructuraSection() {
  const { t } = useTranslation();

  return (
    <section
      id={sectionIds.actividades}
      className={`border-b border-zinc-200 bg-white ${sectionYComfortable}`}
    >
      <div className={sectionContainer}>
        <ScrollReveal className="text-center">
          <h2 className="font-serif text-3xl font-bold text-zinc-900 sm:text-4xl lg:text-5xl">
            {t("sections.construccion.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-zinc-600 sm:mt-6 sm:text-lg">
            {t("sections.construccion.body")}
          </p>
          <div className="mx-auto mt-10 max-w-4xl sm:mt-12">
            <MediaPlaceholder label={t("placeholders.construccion")} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
