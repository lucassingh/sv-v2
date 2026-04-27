"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { Images, Mail, MapPin, Phone } from "lucide-react";
import { FloatingCard } from "@/components/aceternity/floating-card";
import { ScrollReveal } from "@/components/aceternity/scroll-reveal";
import { cn } from "@/lib/utils";
import { sectionIds } from "@/lib/section-ids";
import { sectionContainer } from "@/lib/section-layout";
import { CONTACT_EMAIL, INSTAGRAM_HREF, WHATSAPP_HREF } from "@/lib/contact-constants";

gsap.registerPlugin(ScrollTrigger);

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.920873925533!2d-61.9835070842586!3d-33.71099631831836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c8656a67f4f687%3A0xac9b9a1f73cd22c7!2sASociaci%C3%B3n%20Civil%20Sembrando%20Valores!5e0!3m2!1ses-419!2sar!4v1649957079873!5m2!1ses-419!2sar";

export function ContactSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mapFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = mapFrameRef.current;
    if (!section || !frame || reduceMotion) return;

    const tween = gsap.fromTo(
      frame,
      { y: 28, rotateX: 5 },
      {
        y: 0,
        rotateX: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: frame,
          start: "top 88%",
          end: "top 45%",
          scrub: 0.65,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id={sectionIds.contacto}
      data-nav-backdrop="light"
      className={cn(
        "relative overflow-hidden bg-white",
        "pt-12 sm:pt-16 lg:pt-20 xl:pt-24",
        "pb-0",
      )}
    >
      <div className={cn(sectionContainer, "relative")}>
        <ScrollReveal>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {t("contact.eyebrow")}
          </p>
          <h2 className="mb-4 max-w-3xl font-serif text-3xl font-bold tracking-tight text-[color:var(--color-primary)] sm:text-4xl lg:text-5xl">
            {t("contact.title")}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">{t("contact.body")}</p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-2 xl:grid-cols-4">
          <FloatingCard delay={0} className="h-full rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-lg shadow-zinc-900/5 backdrop-blur-sm">
            <div className="mb-4 inline-flex rounded-xl bg-[color:var(--color-secondary)]/10 p-2.5 text-[color:var(--color-secondary)]">
              <Mail className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{t("contact.emailLabel")}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block break-all text-base font-semibold text-zinc-900 underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </FloatingCard>

          <FloatingCard delay={0.06} className="h-full rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-lg shadow-zinc-900/5 backdrop-blur-sm">
            <div className="mb-4 inline-flex rounded-xl bg-[color:var(--color-secondary)]/10 p-2.5 text-[color:var(--color-secondary)]">
              <Phone className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{t("contact.phoneLabel")}</p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-base font-semibold text-zinc-900 underline-offset-4 hover:underline"
            >
              {t("contact.phoneDisplay")}
            </a>
          </FloatingCard>

          <FloatingCard delay={0.1} className="h-full rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-lg shadow-zinc-900/5 backdrop-blur-sm">
            <div className="mb-4 inline-flex rounded-xl bg-[color:var(--color-secondary)]/10 p-2.5 text-[color:var(--color-secondary)]">
              <Images className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{t("contact.instagramLabel")}</p>
            <a
              href={INSTAGRAM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-base font-semibold text-zinc-900 underline-offset-4 hover:underline"
            >
              {t("contact.instagramCta")}
            </a>
          </FloatingCard>

          <FloatingCard
            delay={0.14}
            className="h-full rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-lg shadow-zinc-900/5 backdrop-blur-sm"
          >
            <div className="mb-4 inline-flex rounded-xl bg-[color:var(--color-secondary)]/10 p-2.5 text-[color:var(--color-secondary)]">
              <MapPin className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{t("contact.addressLabel")}</p>
            <p className="mt-2 text-base font-semibold leading-snug text-zinc-900">{t("contact.addressLine")}</p>
          </FloatingCard>
        </div>
      </div>

      <div className="relative mt-14 bg-zinc-50 lg:mt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-zinc-50 to-zinc-100"
        />
        <div className={cn(sectionContainer, "relative pb-4 pt-6 sm:pb-5 sm:pt-8 lg:pb-6")}>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-6xl"
          >
            <div className="relative [perspective:1200px]">
              <div
                ref={mapFrameRef}
                className="relative will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute -inset-[2px] rounded-[1.65rem] opacity-90 blur-sm"
                  style={{
                    background:
                      "linear-gradient(125deg, rgba(82, 82, 91, 0.2), rgba(161, 161, 170, 0.28), rgba(228, 228, 231, 0.45))",
                  }}
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-[1.6rem] border border-solid border-[color:var(--color-primary)] bg-zinc-950 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.45)]">
                  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />

                  <div className="relative aspect-[16/11] min-h-[min(72vh,640px)] w-full sm:aspect-[16/9] lg:min-h-[420px]">
                    <iframe
                      title={t("contact.mapTitle")}
                      src={MAP_EMBED_SRC}
                      width="100%"
                      height="100%"
                      className="absolute inset-x-0 top-0 bottom-3 w-full border-0 contrast-[1.02] saturate-[0.92] transition duration-700 ease-out hover:saturate-100 sm:bottom-4"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
