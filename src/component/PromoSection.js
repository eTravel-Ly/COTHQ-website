
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PromoSection = () => {

  const services = [
    {
      id: 1,
      image: "https://i.pinimg.com/736x/c0/b4/12/c0b412829bedefd715de361a674890fa.jpg", // استبدل بالرابط الخاص بالصورة
      title: "متابعة مراكز تحفيظ القران الكريم ورعايته",
      description: "متابعة مراكز تحفيظ القرآن الكريم ورعايتها والعمل على إقامة الدورات العلمية والتربوية للمحفظين: للارتقاء بمستواهم العلميّ",
    },
    {
      id: 2,
      image: "https://i.pinimg.com/736x/9d/02/2c/9d022c885195889ea601dfc2c21ff7b5.jpg", // استبدل بالرابط الخاص بالصورة
      title: "منح شهادات معتمدة في حفظ القران الكريم ",
      description: " منح شهادات معتمدة في حفظ القران الكريم برواياته المتواترة من خلال إقامة امتحانات الإجازة التي يشرف عليها كبار الحفاظ والمقرئين",
    },
    {
      id: 3,
      image: "https://i.pinimg.com/736x/b7/aa/11/b7aa1185559eb7917e2e88b8a5f2a06b.jpg", // استبدل بالرابط الخاص بالصورة
      title: "عقد الندوات والمؤتمرات ",
      description: "عقد الندوات والمؤتمرات التي تخدم القران الكريم وعلومه، ونشر الدراسات والبحوث العلمية المتخصصة في هذا المجال.",
    },
    {
      id: 4,
      image: "https://i.pinimg.com/736x/97/54/12/9754124e8db8cd9a3eb9dbda2f8b67a8.jpg", // استبدل بالرابط الخاص بالصورة
      title: "إقامة المسابقات المحلية والدولية ",
      description: "إقامة المسابقات المحلية والدولية في حفظ القرآن الكريم وتجويده وتفسيره.    .",
    },
    {
      id: 5,
      image: "https://i.pinimg.com/736x/ee/d8/f8/eed8f8a26ad75cd1e7c7431cd08214f9.jpg", // استبدل بالرابط الخاص بالصورة
      title: "الاهتمام بطباعة المصحف الشريف برواياته المتواترة ",
      description: "الاهتمام بطباعة المصحف الشريف برواياته المتواترة       .",
    },
    
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* عنوان القسم */}
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-500 mb-8" style={{ fontFamily: "Tajwal, sans-serif" }}>
          تعرف عن خدماتنا
        </h2>

        {/* الخدمات */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="text-center"
            >
              {/* صورة داخل شكل دائري */}
              <div className="w-32 h-32 mx-auto mb-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {/* العنوان والوصف */}
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
