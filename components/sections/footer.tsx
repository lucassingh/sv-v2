"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { Images, Mail, MessageCircle } from "lucide-react";
import { sectionIds, SITE_FOOTER_ID, type NavSectionId } from "@/lib/section-ids";
import { handleInPageNavClick } from "@/lib/scroll-to-section";
import { CONTACT_EMAIL, INSTAGRAM_HREF, WHATSAPP_HREF } from "@/lib/contact-constants";
import { sectionContainer } from "@/lib/section-layout";

gsap.registerPlugin(ScrollTrigger);

const iconSocial = "size-5";

const footerRevealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const reduceMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    if (reduceMotion) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      /**
       * Mismo criterio que footers tipo [BGenAI](https://bgenai.bizitglobal.com/):
       * - Al acercarse al final del documento, el bloque primary llega a ancho completo (scaleX 1).
       * - `end: bottom bottom` = cuando el pie del footer toca el borde inferior del viewport (scroll máximo),
       *   no cuando el footer ya salió por arriba (`bottom top`), que dejaba siempre márgenes blancos abajo.
       */
      gsap.fromTo(
        footer,
        { scaleX: 0.86 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.75,
            invalidateOnRefresh: true,
          },
        },
      );
    }, footer);

    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(id);
      ctx.revert();
    };
  }, [reduceMotion]);

  const navLinks: { id: NavSectionId; label: string }[] = [
    { id: sectionIds.inicio, label: t("nav.home") },
    { id: sectionIds.nosotros, label: t("nav.about") },
    { id: sectionIds.social, label: t("nav.social") },
    { id: sectionIds.actividades, label: t("nav.actividades") },
    { id: sectionIds.colabora, label: t("nav.donations") },
  ];

  return (
    <div className="relative z-10 w-full min-w-0 -mt-20 sm:-mt-24 lg:-mt-28">
      <footer
        ref={footerRef}
        id={SITE_FOOTER_ID}
        className="relative w-full min-w-0 origin-top overflow-x-hidden overflow-y-visible rounded-t-[clamp(1.75rem,4.5vw,3.25rem)] bg-[color:var(--color-primary)] text-[color:var(--color-accent)] shadow-[0_-28px_80px_-32px_rgba(0,0,0,0.22)] will-change-transform"
      >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-0 h-[min(70%,28rem)] w-[min(90%,36rem)] rounded-full bg-white/6 blur-3xl"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.12, ease: footerRevealEase }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[color:var(--color-accent)]/6 blur-3xl"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          />

          <div className={`relative z-[1] ${sectionContainer}`}>
            <div className="grid gap-12 pt-14 pb-10 sm:gap-14 sm:pt-16 sm:pb-12 lg:grid-cols-2 lg:gap-16 lg:pt-20 lg:pb-14">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.08, ease: footerRevealEase }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <h3 className="mb-6 font-serif text-xl font-bold tracking-tight sm:text-2xl">
                  {t("footer.followHeading")}
                </h3>
                <div className="flex gap-3">
                  <motion.a
                    href={`mailto:${CONTACT_EMAIL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-accent)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--color-accent)_8%,transparent)] p-3 transition-colors hover:bg-[color:color-mix(in_srgb,var(--color-accent)_14%,transparent)]"
                    aria-label={t("footer.ariaMail")}
                    whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <Mail className={iconSocial} strokeWidth={2} aria-hidden />
                  </motion.a>
                  <motion.a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-accent)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--color-accent)_8%,transparent)] p-3 transition-colors hover:bg-[color:color-mix(in_srgb,var(--color-accent)_14%,transparent)]"
                    aria-label={t("footer.ariaWhatsapp")}
                    whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <MessageCircle className={iconSocial} strokeWidth={2} aria-hidden />
                  </motion.a>
                  <motion.a
                    href={INSTAGRAM_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-[color:color-mix(in_srgb,var(--color-accent)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--color-accent)_8%,transparent)] p-3 transition-colors hover:bg-[color:color-mix(in_srgb,var(--color-accent)_14%,transparent)]"
                    aria-label={t("footer.ariaInstagram")}
                    whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <Images className={iconSocial} strokeWidth={2} aria-hidden />
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.14, ease: footerRevealEase }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <h4 className="mb-5 font-serif text-lg font-bold">{t("footer.columnNav")}</h4>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-x-8">
                  {navLinks.map((item) => (
                    <li key={item.id}>
                      <motion.a
                        href={`#${item.id}`}
                        className="inline-block text-sm text-[color:color-mix(in_srgb,var(--color-accent)_62%,transparent)] transition-colors hover:text-[color:var(--color-accent)] sm:text-base"
                        whileHover={reduceMotion ? undefined : { x: 4 }}
                        onClick={(e) => handleInPageNavClick(e, item.id)}
                      >
                        {item.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              className="border-t border-[color:color-mix(in_srgb,var(--color-accent)_14%,transparent)] py-10 sm:py-14 lg:py-16"
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: footerRevealEase }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <p className="sr-only">{t("footer.brand")}</p>
              <div
                className="select-none font-serif font-bold leading-[0.82] tracking-[-0.04em] text-[color:var(--color-accent)]"
                aria-hidden
              >
                <span className="block text-[clamp(2.85rem,11.5vw,8.5rem)]">{t("hero.titleLine1")}</span>
                <span className="block text-[clamp(2.85rem,11.5vw,8.5rem)]">{t("hero.titleLine2")}</span>
              </div>
            </motion.div>

            <motion.div
              className="border-t border-[color:color-mix(in_srgb,var(--color-accent)_14%,transparent)] py-8 sm:py-10"
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
            >
              <p className="text-center text-xs text-[color:color-mix(in_srgb,var(--color-accent)_48%,transparent)] sm:text-left sm:text-sm">
                © {year} {t("footer.copyright")}. {t("footer.rightsReserved")}
              </p>
            </motion.div>
          </div>
      </footer>
    </div>
  );
}
