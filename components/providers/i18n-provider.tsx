"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";
import i18n, { getStoredLocale, persistLocale } from "@/lib/i18n/client";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const saved = getStoredLocale();
    if (saved && i18n.language !== saved) {
      void i18n.changeLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const onLang = (lng: string) => {
      if (typeof document !== "undefined") {
        document.documentElement.lang = lng === "en" ? "en" : "es";
      }
      persistLocale(lng);
    };
    onLang(i18n.language);
    i18n.on("languageChanged", onLang);
    return () => {
      i18n.off("languageChanged", onLang);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
