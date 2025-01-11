import React, { createContext, useState, useContext, useEffect } from "react";
import homeTranslations from "./Navbarlang";
import SecondTranslations from "./SecondSectionlang";
import ThirdTranslations from "./ThirdSectionlang";
import ServicesTranslations from "./Serviceslang";
import SectionFiveTranslations from "./SectionFivelang";
import ShiekhsListTranslations from "./ShiekhsListlang";
import NumSectionTranslations from "./NumSectionlang";
import FAQSectionTranslations from "./FAQSectionlang";
import FooterTranslations from "./Footerlang";
import LoginRegisterlang from "./LoginRegisterlang";
import Toastlang from "./Toastlang";

const TranslationContext = createContext();

const combinedTranslations = {
  en: {
    ...homeTranslations.en,
    ...SecondTranslations.en,
    ...ThirdTranslations.en,
    ...ServicesTranslations.en,
    ...SectionFiveTranslations.en,
    ...ShiekhsListTranslations.en,
    ...NumSectionTranslations.en,
    ...FAQSectionTranslations.en,
    ...FooterTranslations.en,
    ...LoginRegisterlang.en,
    ...Toastlang.en,
  },
  ar: {
    ...homeTranslations.ar,
    ...SecondTranslations.ar,
    ...ThirdTranslations.ar,
    ...ServicesTranslations.ar,
    ...SectionFiveTranslations.ar,
    ...ShiekhsListTranslations.ar,
    ...NumSectionTranslations.ar,
    ...FAQSectionTranslations.ar,
    ...FooterTranslations.ar,
    ...LoginRegisterlang.ar,
    ...Toastlang.ar,
  },
};

export const TranslationProvider = ({ children }) => {
  // استرداد اللغة المخزنة أو تعيين اللغة الافتراضية
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "ar"; // اللغة الافتراضية هي العربية
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang); // تخزين اللغة في localStorage
  };



  return (
    <TranslationContext.Provider
      value={{
        language,
        translations: combinedTranslations[language],
        changeLanguage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
