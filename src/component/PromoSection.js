import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // استيراد ملفات الأنيميشن الخاصة بـ AOS
import { useTranslation } from "../context/TranslationContext"; // استيراد هوك الترجمة

const PromoSection = () => {
  const { translations,  language } = useTranslation(); // استخدام الترجمة

  useEffect(() => {
    AOS.init({ duration: 1000 }); // إعداد AOS
  }, []);

  const services = [
    {
      id: 1,
      image: "https://i.pinimg.com/736x/c0/b4/12/c0b412829bedefd715de361a674890fa.jpg",
      title: translations.services2[0].title,
      description: translations.services2[0].description,
    },
    {
      id: 2,
      image: "https://i.pinimg.com/736x/9d/02/2c/9d022c885195889ea601dfc2c21ff7b5.jpg",
      title: translations.services2[1].title,
      description: translations.services2[1].description,
    },
    {
      id: 3,
      image: "https://i.pinimg.com/736x/b7/aa/11/b7aa1185559eb7917e2e88b8a5f2a06b.jpg",
      title:translations.services2[2].title,
      description: translations.services2[2].description,
    },
    {
      id: 4,
      image: "https://i.pinimg.com/736x/97/54/12/9754124e8db8cd9a3eb9dbda2f8b67a8.jpg",
      title: translations.services2[3].title,
      description:translations.services2[3].description,
    },
    {
      id: 5,
      image: "https://i.pinimg.com/736x/ee/d8/f8/eed8f8a26ad75cd1e7c7431cd08214f9.jpg",
      title: translations.services2[4].title,
      description: translations.services2[4].description,
    },
  ];

  return (
    <section className="py-12 bg-gray-50"  id="PartnerSection">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-500 mb-8" style={{ fontFamily: "Tajwal, sans-serif" }}>
        {translations.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="text-center"
              data-aos="fade-up" // أضف هذا لتطبيق حركة عند التمرير
            >
              <div className="w-32 h-32 mx-auto mb-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2" style={{ fontFamily: "Tajwal, sans-serif" }}>
                {service.title}
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Tajwal, sans-serif" }}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default PromoSection;
