// src/components/PromoSection.jsx

import React from 'react';
import Banner from '../assets/images/Banner.png';

const PromoSection = () => {
  return (
    <section
      className="relative bg-cover bg-center top-10 text-white rounded-lg flex justify-center items-center"
      style={{ 
        backgroundImage: `url(${Banner})`, 
        height: '300px', // Adjust the height as needed
        width: '95%', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className="absolute inset-0 "></div>
      <div className="relative text-center z-10">
        <h2 
          className="text-3xl font-bold mb-4" 
          style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
        >
          اكتشف دورتك المثالية الآن!
        </h2>
        <p 
          className="mb-6" 
          style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
        >
          لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة عن الاستمتاع بالمتع
        </p>
        <p 
          className="mb-6" 
          style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
        >
          وتمجيد الألم وسأعطيك فكرة عن النظام وأشرح لك
        </p>
        <button 
          className="bg-custom-orange text-white px-6 py-3 rounded-full" 
          style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
        >
          سجل الآن
        </button>
      </div>
    </section>
  );
};

export default PromoSection;
