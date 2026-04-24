"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Images, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { sectionIds, SITE_FOOTER_ID, type NavSectionId } from "@/lib/section-ids";
import { handleInPageNavClick } from "@/lib/scroll-to-section";
import { CONTACT_EMAIL, INSTAGRAM_HREF, WHATSAPP_HREF } from "@/lib/contact-constants";
import { sectionContainer } from "@/lib/section-layout";

const iconMuted = "mt-1 size-5 shrink-0 text-zinc-400";
const iconSocial = "size-5";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const navLinks: { id: NavSectionId; label: string }[] = [
    { id: sectionIds.inicio, label: t("nav.home") },
    { id: sectionIds.nosotros, label: t("nav.about") },
    { id: sectionIds.social, label: t("nav.social") },
    { id: sectionIds.actividades, label: t("nav.actividades") },
    { id: sectionIds.colabora, label: t("nav.donations") },
    { id: sectionIds.contacto, label: t("nav.contact") },
  ];

  return (
    <footer id={SITE_FOOTER_ID} className="relative overflow-hidden bg-zinc-900 text-white">
      <motion.div
        className="absolute top-0 right-0 h-96 w-96 rounded-full bg-zinc-800 opacity-20 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <div className={`relative z-10 ${sectionContainer}`}>
        <div className="grid gap-10 py-12 sm:gap-12 sm:py-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-3 font-serif text-xl font-bold sm:text-2xl">{t("footer.brand")}</h3>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-zinc-400 sm:text-base">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3">
              <motion.a
                href={`mailto:${CONTACT_EMAIL}`}
                className="rounded-lg bg-zinc-800 p-3 hover:bg-zinc-700"
                aria-label={t("footer.ariaMail")}
                whileHover={{ scale: 1.08 }}
              >
                <Mail className={iconSocial} strokeWidth={2} aria-hidden />
              </motion.a>
              <motion.a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-zinc-800 p-3 hover:bg-zinc-700"
                aria-label={t("footer.ariaWhatsapp")}
                whileHover={{ scale: 1.08 }}
              >
                <MessageCircle className={iconSocial} strokeWidth={2} aria-hidden />
              </motion.a>
              <motion.a
                href={INSTAGRAM_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-zinc-800 p-3 hover:bg-zinc-700"
                aria-label={t("footer.ariaInstagram")}
                whileHover={{ scale: 1.08 }}
              >
                <Images className={iconSocial} strokeWidth={2} aria-hidden />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 font-serif text-lg font-bold">{t("footer.columnNav")}</h4>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-1">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <motion.a
                    href={`#${item.id}`}
                    className="inline-block text-sm text-zinc-400 hover:text-white sm:text-base"
                    whileHover={{ x: 4 }}
                    onClick={(e) => handleInPageNavClick(e, item.id)}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 font-serif text-lg font-bold">{t("footer.columnContact")}</h4>
            <p className="text-sm leading-relaxed text-zinc-400">{t("contact.addressLine")}</p>
            <a
              href={WHATSAPP_HREF}
              className="mt-2 inline-block text-sm text-zinc-400 hover:text-white sm:text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("contact.phoneDisplay")}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-1 block text-sm text-zinc-400 hover:text-white sm:text-base"
            >
              {CONTACT_EMAIL}
            </a>
          </motion.div>
        </div>

        <motion.div
          className="grid gap-6 border-t border-zinc-800 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-3">
            <MapPin className={iconMuted} strokeWidth={2} aria-hidden />
            <div>
              <p className="font-semibold">{t("footer.location")}</p>
              <p className="text-sm text-zinc-400">{t("contact.addressLine")}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className={iconMuted} strokeWidth={2} aria-hidden />
            <div>
              <p className="font-semibold">{t("footer.phone")}</p>
              <a
                href={WHATSAPP_HREF}
                className="text-sm text-zinc-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("contact.phoneDisplay")}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
            <Mail className={iconMuted} strokeWidth={2} aria-hidden />
            <div>
              <p className="font-semibold">{t("footer.email")}</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-zinc-400 hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-between gap-4 border-t border-zinc-800 py-6 sm:flex-row sm:py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-xs text-zinc-500 sm:text-left sm:text-sm">
            © {year} {t("footer.copyright")}. {t("footer.rightsReserved")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
