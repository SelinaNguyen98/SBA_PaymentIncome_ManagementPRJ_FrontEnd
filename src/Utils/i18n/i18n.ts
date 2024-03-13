import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from "./locales/en/home.json";
import HOME_JP from "./locales/jp/home.json";


// Định nghĩa các ngôn ngữ hỗ trợ trong ứng dụng
export const locales = {
  jp: "jp",
  en: "en",
};

// Tạo đối tượng resources chứa các nguồn ngôn ngữ tương ứng
const resources = {
  en: {
    home: HOME_EN,
  },
  jp: {
    home: HOME_JP,
  },
};

// Thiết lập namespace mặc định là 'home'
const NSdefault = "home";

// Khởi tạo i18n với các cấu hình
i18n.use(initReactI18next).init({
  // Đối tượng nguồn ngôn ngữ
  resources,
  
  // Namespace mặc định là 'home'
  ns: ["home"],
  
  // Ngôn ngữ mặc định là tiếng Anh
  lng: "en",
  
  // Ngôn ngữ dự fallback là tiếng Anh
  fallbackLng: "en",
  
  // Namespace mặc định là 'home'
  defaultNS: NSdefault,

  // Cấu hình về việc tránh XSS
  interpolation: {
    escapeValue: false, // React đã tự động bảo vệ khỏi XSS
  },
});

// Xuất đối tượng i18n để sử dụng trong ứng dụng
export default i18n;