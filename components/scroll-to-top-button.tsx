"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpToLine } from "lucide-react";
import { useTranslation } from "react-i18next";
import { sectionIds } from "@/lib/section-ids";
import { scrollToSection } from "@/lib/scroll-to-section";

type ScrollToTopButtonProps = {
  visible: boolean;
};

export function ScrollToTopButton({ visible }: ScrollToTopButtonProps) {
  const { t } = useTranslation();

  const goTop = () => {
    scrollToSection(sectionIds.inicio);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="scroll-top"
          type="button"
          aria-label={t("nav.scrollToTop")}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-4 z-40 rounded-lg bg-zinc-800 p-3 text-white shadow-lg hover:bg-zinc-900 sm:right-6"
          onClick={goTop}
        >
          <ArrowUpToLine className="size-5" strokeWidth={2} aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
