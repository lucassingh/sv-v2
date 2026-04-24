"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/aceternity/scroll-reveal";
import { MediaPlaceholder } from "@/components/aceternity/media-placeholder";
import { sectionIds } from "@/lib/section-ids";
import { sectionContainer, sectionYComfortable } from "@/lib/section-layout";

export function DonationSection() {
  const { t } = useTranslation();

  const rows = [
    { label: t("donation.bankLabel"), value: t("donation.bankValue") },
    { label: t("donation.accountNameLabel"), value: t("donation.accountNameValue") },
    { label: t("donation.accountTypeLabel"), value: t("donation.accountTypeValue") },
    { label: t("donation.numberLabel"), value: t("donation.numberValue") },
    { label: t("donation.cbuLabel"), value: t("donation.cbuValue") },
    { label: t("donation.aliasLabel"), value: t("donation.aliasValue") },
  ];

  return (
    <section
      id={sectionIds.colabora}
      className={`border-b border-zinc-200 bg-gradient-to-b from-white to-zinc-100 ${sectionYComfortable}`}
    >
      <div className={sectionContainer}>
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="relative hidden lg:block">
            <MediaPlaceholder label={t("placeholders.donation")} className="min-h-[360px] w-full" />
          </div>

          <div>
            <ScrollReveal>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                {t("donation.eyebrow")}
              </p>
              <h2 className="mb-4 font-serif text-3xl font-bold text-zinc-900 sm:text-4xl lg:text-5xl">
                {t("donation.title")}
              </h2>
              <p className="mb-8 text-base leading-relaxed text-zinc-600 sm:text-lg">{t("donation.body")}</p>
            </ScrollReveal>

            <motion.div
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 font-serif text-lg font-bold text-zinc-900">{t("donation.bankTitle")}</p>
              <dl className="space-y-3 text-sm sm:text-base">
                {rows.map((row) => (
                  <div key={row.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                    <dt className="font-semibold text-zinc-800 sm:min-w-[10rem]">{row.label}</dt>
                    <dd className="break-words text-zinc-600">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
