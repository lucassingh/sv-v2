"use client";

import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/aceternity/scroll-reveal";
import { sectionIds } from "@/lib/section-ids";
import { sectionContainer, sectionYComfortable } from "@/lib/section-layout";
import { CONTACT_EMAIL, WHATSAPP_HREF } from "@/lib/contact-constants";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.920873925533!2d-61.9835070842586!3d-33.71099631831836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c8656a67f4f687%3A0xac9b9a1f73cd22c7!2sASociaci%C3%B3n%20Civil%20Sembrando%20Valores!5e0!3m2!1ses-419!2sar!4v1649957079873!5m2!1ses-419!2sar";

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id={sectionIds.contacto} className={`border-b border-zinc-200 bg-white ${sectionYComfortable}`}>
      <div className={sectionContainer}>
        <div className="grid items-stretch gap-10 sm:gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
              {t("contact.eyebrow")}
            </p>
            <h2 className="mb-4 font-serif text-3xl font-bold text-zinc-900 sm:text-4xl lg:text-5xl">
              {t("contact.title")}
            </h2>
            <p className="mb-8 text-base leading-relaxed text-zinc-600 sm:text-lg">{t("contact.body")}</p>
            <div className="space-y-3 text-zinc-800">
              <p>
                <span className="font-semibold">{t("contact.emailLabel")}: </span>
                <a
                  className="text-zinc-700 underline-offset-2 hover:underline"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>
                <span className="font-semibold">{t("contact.phoneLabel")}: </span>
                <a
                  className="text-zinc-700 underline-offset-2 hover:underline"
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("contact.phoneDisplay")}
                </a>
              </p>
              <p>
                <span className="font-semibold">{t("contact.addressLabel")}: </span>
                {t("contact.addressLine")}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="h-full min-h-[280px] overflow-hidden rounded-2xl border-2 border-zinc-300 bg-zinc-100 shadow-inner lg:min-h-[360px]">
              <iframe
                title={t("contact.mapTitle")}
                src={MAP_EMBED_SRC}
                width="100%"
                height="100%"
                className="min-h-[280px] w-full border-0 opacity-90 grayscale lg:min-h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
