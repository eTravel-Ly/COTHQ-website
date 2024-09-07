// src/components/PromoSection.jsx

import React from 'react';
import Banner from '../assets/images/Banner.png';
import { useNavigate } from 'react-router-dom';

const PromoSection = () => {
  const navigate = useNavigate();
  const handleAllactivity = () => {
    navigate('/Login');
  };
  return (
    <section id='PromoSection'
      className="relative bg-cover bg-center top-10 text-white rounded-lg flex justify-center items-center"
      style={{ 
        backgroundImage: `url(${Banner})`, 
        height: '100px', // Adjust the height as needed
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
          اكتشف المسابقات و الدورات التدريبية و ندواتك والمؤتمرات الآن!
        </h2>
      
      </div>
    </section>
  );
};

export default PromoSection;
