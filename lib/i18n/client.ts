import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "@/locales/es.json";
import en from "@/locales/en.json";

const STORAGE_KEY = "sv-landing-locale";

export type AppLocale = "es" | "en";

export function getStoredLocale(): AppLocale | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === "es" || raw === "en") return raw;
  return null;
}

export function persistLocale(lng: string) {
  if (typeof window === "undefined") return;
  if (lng === "es" || lng === "en") {
    window.localStorage.setItem(STORAGE_KEY, lng);
  }
}

if (!i18n.isInitialized) {
  const esBundle = JSON.parse(JSON.stringify(es)) as typeof es;
  const enBundle = JSON.parse(JSON.stringify(en)) as typeof en;

  i18n.use(initReactI18next).init({
    resources: {
      es: { translation: esBundle },
      en: { translation: enBundle },
    },
    lng: "es",
    fallbackLng: "es",
    defaultNS: "translation",
    ns: ["translation"],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    initAsync: false,
  });
}

export default i18n;
