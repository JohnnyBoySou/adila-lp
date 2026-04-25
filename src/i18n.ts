import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ptBR from "./locales/pt-BR.json";
import en from "./locales/en.json";

export const supportedLngs = [
  { code: "pt-BR", label: "Português", short: "PT" },
  { code: "en", label: "English", short: "EN" },
] as const;

export type Lng = (typeof supportedLngs)[number]["code"];

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "pt-BR": { translation: ptBR },
      en: { translation: en },
    },
    fallbackLng: "pt-BR",
    supportedLngs: supportedLngs.map((l) => l.code),
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "adila-lng",
    },
  });

export default i18n;
