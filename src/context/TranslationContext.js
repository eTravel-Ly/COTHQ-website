import React, { createContext, useState, useContext } from "react";
import homeTranslations from "./Navbarlang"
import SecondTranslations from "./SecondSectionlang"
import ThirdTranslations from "./ThirdSectionlang"
import ServicesTranslations from "./Serviceslang";
import SectionFiveTranslations from "./SectionFivelang";
import ShiekhsListTranslations from "./ShiekhsListlang";
import NumSectionTranslations from "./NumSectionlang";
import FAQSectionTranslations from "./FAQSectionlang";
import FooterTranslations from "./Footerlang"

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
    ...FooterTranslations.en
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
    ...FooterTranslations.ar
  },
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("ar");

  const changeLanguage = (lang) => {
    setLanguage(lang);
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
