import React, { useState, useEffect } from "react";
import pic2 from '../assets/images/bg.webp';
import { useTranslation } from "../context/TranslationContext"; // استيراد هوك الترجمة

function SectionFive() {
    const { translations,  language } = useTranslation(); // استخدام الترجمة
  
  const quotes = [
    {
      text:  translations.quotes[0].text,
      author: translations.quotes[0].author,
    },
    {
      text:  translations.quotes[1].text,
      author: translations.quotes[1].author,
    },
    {
      text:  translations.quotes[2].text,
      author: translations.quotes[2].author,
    },
  ];
  

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true); // حالة للتحكم بالأنيميشن

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFade(true); 
      }, 800); 
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-64 md:h-96 flex items-center justify-center"
      style={{
        backgroundImage: `url(${pic2})`,
      }}
    >
      <div className="absolute inset-0 bg-blues bg-opacity-50"></div>

      <div className={`relative z-10 text-center transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`} dir="rtl">
        <h1
            dir={language === "ar" ? "ltr" : "rtl"} // تغيير الاتجاه
          className="text-lg md:text-1xl lg:text-2xl text-white font-bold"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          {quotes[currentQuoteIndex].text}
        </h1>
        <p
            dir={language === "ar" ? "ltr" : "rtl"} // تغيير الاتجاه
          className="text-sm md:text-base lg:text-lg text-white mt-2"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          {quotes[currentQuoteIndex].author}
        </p>
      </div>
    </section>
  );
}

export default SectionFive;
