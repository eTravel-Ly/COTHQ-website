import React, { useEffect, useState } from "react";
import pic2 from '../assets/images/tt12.jpg';
import { useTranslation } from "../context/TranslationContext"; // استيراد هوك الترجمة


function ThirdSection() {
   const { translations,  language } = useTranslation(); // استخدام الترجمة
 
  return (
    <section
    className="relative bg-cover bg-center bg-no-repeat h-64 md:h-96 flex items-center justify-center"
    style={{
      backgroundImage: `url(${pic2})`, // استخدام الصورة المستوردة
    }}
  >
    {/* Overlay الأزرق الشفاف */}

    <div className="absolute inset-0 bg-blues bg-opacity-50"></div>
    {/* النص */}
    <div className="relative z-10 text-center" dir="rtl">
  <p className="text-sm md:text-lg text-white font-light mb-2" style={{ fontFamily: "Tajwal, sans-serif" }}>
  {translations.hadith}

  </p>
  <br/>



  <h1 className="text-xl md:text-3xl lg:text-5xl text-white font-bold" style={{ fontFamily: "Tajwal, sans-serif" }}>
  {translations.quote}
  </h1>
</div>

  </section>
  );
}

export default ThirdSection;
