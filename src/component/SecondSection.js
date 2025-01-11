import React, { useEffect } from 'react';
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { FaBookOpen, FaGlobe } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { useTranslation } from "../context/TranslationContext"; // استيراد هوك الترجمة

const SecondSection = () => {
      const { translations,  language } = useTranslation(); // استخدام الترجمة
  

  const features = [
    {
      icon: <FaGlobe className="text-custom-orange text-4xl mb-4" />,
       title: translations.features[0].title,
    },
    {
      icon: <FaBookOpen className="text-custom-orange text-4xl mb-4" />,
      title: translations.features[1].title,
    },
    {
      icon: <MdOutlineSlowMotionVideo className="text-custom-orange text-4xl mb-4" />,
      title: translations.features[2].title,
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });

    const handleScroll = () => AOS.refresh();
    const handleResize = () => AOS.refresh();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="text-center py-24 bg-gray-50">
      <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2" style={{ fontFamily: "Tajwal, sans-serif" }}>
      {translations.welcomeTitle}

      </h2>

      <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-10 px-4 md:px-20" style={{ fontFamily: "Tajwal, sans-serif" }}>
      {translations.welcomeText}
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay={`${index * 200}`}
            data-aos-easing="ease-out-back"
            className="flex flex-col items-center justify-center text-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            style={{
              width: '230px', // تحديد عرض الكارد
              height: '190px', // تحديد ارتفاع الكارد
            }}
          >
            {feature.icon}
            <h3 className="text-base md:text-lg font-medium text-gray-700 mt-2" style={{ fontFamily: "Tajwal, sans-serif" }}>
              {feature.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SecondSection;
