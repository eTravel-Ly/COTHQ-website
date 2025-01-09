import React, { useEffect } from 'react';
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { FaBookOpen, FaUserFriends, FaGlobe, FaLink } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const SecondSection = () => {
  const features = [
    {
      icon: <FaGlobe className="text-custom-orange text-4xl mb-4" />,
      title: "مقرأة ليبيا الإلكترونية العالمية",
    },
    {
      icon: <FaBookOpen className="text-custom-orange text-4xl mb-4" />,
      title: "المخطوطات القرآنية",
    },
    {
      icon: <MdOutlineSlowMotionVideo className="text-custom-orange text-4xl mb-4" />,
      title: "الجولة الافتراضية",
    },
  ];

  useEffect(() => {
    // Initialize AOS with options
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false, // Allow animations to happen more than once
    });

    // Manually trigger the AOS refresh
    AOS.refresh();

    // Refresh AOS on scroll and resize events
    const handleScroll = () => AOS.refresh();
    const handleResize = () => AOS.refresh();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="text-center py-24 bg-gray-50">
      <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2" style={{ fontFamily: "Tajwal, sans-serif" }}>
        أهلاً بكم في مجمعنا
      </h2>

      <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-10 px-4 md:px-20" style={{ fontFamily: "Tajwal, sans-serif" }}>
        تحقيقاً لرؤية صاحب السمو الشيخ -حفظه الله-، وسعياً نحو التميز والريادة في خدمة القرآن الكريم وعلومه،
        <br />
        جاءت فكرة إنشاء مجمع القرآن الكريم بليبيا ليكون منارة علمية قرآنية متميزة.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            data-aos="fade-up" // Animation when scrolling
            data-aos-duration="1500" // Duration of the animation
            data-aos-delay={`${index * 200}`} // Delay based on the index
            data-aos-easing="ease-out-back" // Easing for smoother animation
            className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
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
