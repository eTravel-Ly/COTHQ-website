// src/components/PartnerSection.jsx

import React from 'react';
import { CiUser } from "react-icons/ci";
import { PiGraduationCapLight } from 'react-icons/pi'; // Ensure this is the correct import for the icon

const PartnerSection = () => {
  const partners = [
    { icon: <CiUser />, name: "وسائل الإعلام.شريك" },
    { icon: <CiUser />, name: "وسائل الإعلام.شريك" },
    { icon: <CiUser />, name: "وسائل الإعلام.شريك" },
    { icon: <CiUser />, name: "وسائل الإعلام.شريك" },
    { icon: <CiUser />, name: "وسائل الإعلام.شريك" },
    { icon: <CiUser />, name: "وسائل الإعلام.شريك" },
    { icon: <CiUser />, name: "وسائل الإعلام.شريك" },
    { icon: <CiUser />, name: "وسائل الإعلام.شريك" },
  ];

  return (
    <section 
      className="bg-gray-100 py-10 px-6 rounded-lg" 
      style={{ 
        marginTop: '200px',
        width: '95%'
      }}
    >
      <div className="text-center mb-6 top-10">
        <div className="flex items-center justify-center mb-2">
          <h2 
            className="text-xl font-bold mr-2 text-custom-orange " 
            style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
          >
            الشريك الإعلامي
          </h2>
          <PiGraduationCapLight className="text-xl text-custom-orange" />
        </div>
        <p 
          className="text-lg" 
          style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
        >
          370 شريكًا إعلاميًا موثوقًا بهم
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {partners.map((partner, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 text-gray-700 p-2 "
          >
            <span  style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}>
              {partner.name}
            </span>
            <span className="text-xl text-custom-orange">{partner.icon}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnerSection;
