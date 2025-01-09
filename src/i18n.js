import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './i18n/en.json';
import arTranslations from './i18n/ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ar: {
        translation: arTranslations,
      },
    },
    lng: 'ar', 
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, 
    },
  });


export default i18n;
