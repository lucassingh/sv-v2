"use client";

import { useTranslation } from "react-i18next";
import type { AppLocale } from "@/lib/i18n/client";

type LanguageToggleProps = {
  /** light/dark = uso genérico; header* = alineado a la navbar editorial */
  variant?: "light" | "dark" | "headerCream" | "headerInk";
};

export function LanguageToggle({ variant = "light" }: LanguageToggleProps) {
  const { i18n, t } = useTranslation();
  const current = (i18n.language?.startsWith("en") ? "en" : "es") as AppLocale;

  const setLocale = (lng: AppLocale) => {
    if (lng !== current) {
      void i18n.changeLanguage(lng);
    }
  };

  let containerClass: string;
  let activeClass: string;
  let inactiveClass: string;

  if (variant === "dark" || variant === "headerInk") {
    containerClass = "flex items-center rounded-full border border-white/20 p-0.5";
    activeClass =
      "bg-white text-[var(--color-primary)] cursor-pointer rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase transition-colors sm:px-3";
    inactiveClass =
      "text-white/65 hover:text-white/90 cursor-pointer rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase transition-colors sm:px-3";
  } else if (variant === "headerCream") {
    containerClass =
      "flex items-center rounded-full border border-[rgba(47,63,68,0.14)] bg-[rgba(255,255,255,0.72)] p-0.5 shadow-sm backdrop-blur-sm";
    activeClass =
      "cursor-pointer rounded-full bg-(--color-secondary) px-2.5 py-1 text-[10px] font-semibold tracking-wider text-(--color-accent) uppercase transition-colors sm:px-3";
    inactiveClass =
      "cursor-pointer rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[rgba(47,63,68,0.74)] uppercase transition-colors hover:bg-[rgba(47,63,68,0.08)] sm:px-3";
  } else {
    containerClass =
      "flex items-center rounded-full border border-zinc-200 bg-white/90 p-0.5 shadow-sm backdrop-blur-sm";
    activeClass =
      "bg-zinc-800 text-white cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3";
    inactiveClass =
      "text-zinc-600 hover:bg-zinc-100 cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3";
  }

  return (
    <div className={containerClass} role="group" aria-label={t("languageToggle.aria")}>
      <button
        type="button"
        onClick={() => setLocale("es")}
        className={current === "es" ? activeClass : inactiveClass}
      >
        {t("languageToggle.esShort")}
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={current === "en" ? activeClass : inactiveClass}
      >
        {t("languageToggle.enShort")}
      </button>
    </div>
  );
}
