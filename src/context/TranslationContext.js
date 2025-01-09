import React, { createContext, useState, useContext } from 'react';

const TranslationContext = createContext();

const translations = {
    en: {
      welcome: "Welcome",
      account: "Account",
      register: "Register",
      login: "Login",
      contactUs: "Contact Us",
      sheikhs: "Sheikhs",
      services: "Our Services",
      home: "Home",
      quranComplex: "Holy Quran Complex",
    },
    ar: {
      welcome: "مرحبًا",
      account: "حسابي",
      register: "الاشتراك",
      login: "تسجيل الدخول",
      contactUs: "اتصل بنا",
      sheikhs: "المشايخ",
      services: "خدماتنا",
      home: "الصفحة الرئيسية",
      quranComplex: "مجمع القرآن الكريم",
    },
  };
  

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <TranslationContext.Provider value={{ language, translations: translations[language], changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
