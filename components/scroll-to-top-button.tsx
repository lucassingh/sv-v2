"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpToLine } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type { NavBackdropKind } from "@/lib/nav-surface";
import { sectionIds } from "@/lib/section-ids";
import { scrollToSection } from "@/lib/scroll-to-section";

type ScrollToTopButtonProps = {
  visible: boolean;
  /** Contraste según `data-nav-backdrop` bajo la esquina del FAB (no bajo el nav), para que cambie al entrar en cada bloque. */
  fabBackdrop: NavBackdropKind;
};

export function ScrollToTopButton({ visible, fabBackdrop }: ScrollToTopButtonProps) {
  const { t } = useTranslation();
  const primaryNav = fabBackdrop === "light";

  const goTop = () => {
    scrollToSection(sectionIds.inicio);
  };

  const surfaceClass = primaryNav
    ? "border border-[rgba(243,240,228,0.16)] bg-[color:var(--color-primary)] text-[color:var(--color-accent)] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] hover:bg-[color:color-mix(in_srgb,var(--color-primary)_88%,white_12%)] active:bg-[color:color-mix(in_srgb,var(--color-primary)_82%,white_18%)]"
    : "border border-[rgba(47,63,68,0.12)] bg-[color:var(--color-accent)] text-[color:var(--color-primary)] shadow-[0_12px_36px_-14px_rgba(47,63,68,0.18)] hover:bg-[color:color-mix(in_srgb,var(--color-accent)_93%,white_7%)] active:bg-[color:color-mix(in_srgb,var(--color-accent)_88%,white_12%)]";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="scroll-top"
          type="button"
          data-scroll-fab
          aria-label={t("nav.scrollToTop")}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "fixed bottom-6 right-4 z-40 rounded-lg p-3 sm:right-6",
            "transition-[background-color,color,box-shadow,border-color,transform] duration-150 ease-out",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
            primaryNav
              ? "focus-visible:outline-[color:var(--color-accent)]"
              : "focus-visible:outline-[color:var(--color-primary)]",
            surfaceClass,
          )}
          onClick={goTop}
        >
          <ArrowUpToLine className="size-5" strokeWidth={2} aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
