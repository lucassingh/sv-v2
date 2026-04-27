"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Images, Mail, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type { NavBackdropKind } from "@/lib/nav-surface";
import { CONTACT_EMAIL, INSTAGRAM_HREF, WHATSAPP_HREF } from "@/lib/contact-constants";

const iconClass = "size-5";

type FloatingSocialRailProps = {
  visible: boolean;
  fabBackdrop: NavBackdropKind;
};

export function FloatingSocialRail({ visible, fabBackdrop }: FloatingSocialRailProps) {
  const { t } = useTranslation();
  const primaryNav = fabBackdrop === "light";

  const surfaceClass = primaryNav
    ? "border border-[rgba(243,240,228,0.16)] bg-[color:var(--color-primary)] text-[color:var(--color-accent)] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)]"
    : "border border-[rgba(47,63,68,0.12)] bg-[color:var(--color-accent)] text-[color:var(--color-primary)] shadow-[0_12px_36px_-14px_rgba(47,63,68,0.18)]";

  const linkBase =
    "flex items-center justify-center rounded-lg p-3 transition-[background-color,color,transform] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const linkHover = primaryNav
    ? "hover:bg-[color:color-mix(in_srgb,var(--color-primary)_88%,white_12%)] active:bg-[color:color-mix(in_srgb,var(--color-primary)_82%,white_18%)] focus-visible:outline-[color:var(--color-accent)]"
    : "hover:bg-[color:color-mix(in_srgb,var(--color-accent)_93%,white_7%)] active:bg-[color:color-mix(in_srgb,var(--color-accent)_88%,white_12%)] focus-visible:outline-[color:var(--color-primary)]";

  return (
    <AnimatePresence>
      {visible ? (
        <div className="pointer-events-none fixed left-[calc(10px+env(safe-area-inset-left,0px))] top-1/2 z-40 -translate-y-1/2">
          <motion.nav
            key="floating-social-rail"
            aria-label={t("footer.followHeading")}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "pointer-events-auto flex flex-col gap-1 rounded-xl p-1.5",
              "transition-[background-color,color,box-shadow,border-color] duration-150 ease-out",
              surfaceClass,
            )}
          >
            <motion.a
              href={`mailto:${CONTACT_EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(linkBase, linkHover)}
              aria-label={t("footer.ariaMail")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className={iconClass} strokeWidth={2} aria-hidden />
            </motion.a>
            <motion.a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(linkBase, linkHover)}
              aria-label={t("footer.ariaWhatsapp")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className={iconClass} strokeWidth={2} aria-hidden />
            </motion.a>
            <motion.a
              href={INSTAGRAM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(linkBase, linkHover)}
              aria-label={t("footer.ariaInstagram")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
            >
              <Images className={iconClass} strokeWidth={2} aria-hidden />
            </motion.a>
          </motion.nav>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
