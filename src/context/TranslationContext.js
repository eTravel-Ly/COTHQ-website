import React, { createContext, useState, useContext } from "react";
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
import Sidebarlang from './Sidebarlang'
import NavbarLoginTranslations from "./NavbarLoginlang";
import NewCoursesTranslations from './NewCoursesSectionlang'
import BorrowsHistoryTranslations from './BorrowsHistorylang'
import SettingsTranslations from './Settingslang'
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
    ...Sidebarlang.en,
    ...NavbarLoginTranslations.en,
    ...NewCoursesTranslations.en,
    ...BorrowsHistoryTranslations.en,
    ...SettingsTranslations.en
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
    ...Sidebarlang.ar,
    ...NavbarLoginTranslations.ar,
    ...NewCoursesTranslations.ar,
    ...BorrowsHistoryTranslations.ar,
    ...SettingsTranslations.ar
  },
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return sessionStorage.getItem("language") || "ar"; 
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    sessionStorage.setItem("language", lang); 
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
