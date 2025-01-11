import React, { createContext, useState, useContext } from "react";
import homeTranslations from "./Navbarlang"


const TranslationContext = createContext();

const combinedTranslations = {
  en: {
    ...homeTranslations.en,
  },
  ar: {
    ...homeTranslations.ar,
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
