import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import HOME_EN from "./locales/en/en-home.json";
import HOME_JP from "./locales/jp/jp-home.json";

>>>>>>> origin/Develop
ort const locales = {
  jp: "jp",
  en: "en",
};

const resources = {
  en: {
    home: HOME_EN,
  },
  jp: {
    home: HOME_JP,
  },
};

const NSdefault = "home";

i18n.use(initReactI18next).init({
  resources,
  ns: ["home"],
  lng: "en",
  fallbackLng: "en",
  defaultNS: NSdefault,

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
