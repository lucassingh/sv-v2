"use client";

import { useTranslation } from "react-i18next";
import type { AppLocale } from "@/lib/i18n/client";

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const current = (i18n.language?.startsWith("en") ? "en" : "es") as AppLocale;

  const setLocale = (lng: AppLocale) => {
    if (lng !== current) {
      void i18n.changeLanguage(lng);
    }
  };

  return (
    <div
      className="flex items-center rounded-full border border-zinc-200 bg-white/90 p-0.5 shadow-sm backdrop-blur-sm"
      role="group"
      aria-label={t("languageToggle.aria")}
    >
      <button
        type="button"
        onClick={() => setLocale("es")}
        className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 ${
          current === "es"
            ? "bg-zinc-800 text-white"
            : "text-zinc-600 hover:bg-zinc-100"
        }`}
      >
        {t("languageToggle.esShort")}
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 ${
          current === "en"
            ? "bg-zinc-800 text-white"
            : "text-zinc-600 hover:bg-zinc-100"
        }`}
      >
        {t("languageToggle.enShort")}
      </button>
    </div>
  );
}
