import React from 'react';
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/LoginRegister");
  };

  return (
    <section
      id="hero"
      className="hero-section text-center py-16 bg-white mt-10 flex flex-col items-center"
    >
      <div className="container mx-auto px-4 relative">
        {/* دوائر الزخرفة (تظهر فقط على الشاشات الأكبر من sm) */}
        <div
          className="absolute hidden sm:block"
          style={{
            marginTop: "160px",
            marginLeft: "-190px",
          }}
        >
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* العنوان والنص */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-9"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          المنصة الالكترونية لمجمع القرآن الكريم
        </h1>
        <p
          className="text-gray-600 text-sm sm:text-base md:text-lg mb-6"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          مرحباً بك في منصة مجمع القرآن الكريم
        </p>

        {/* الأزرار */}
        <div className="flex flex-row justify-center space-x-2 sm:space-x-4">
          <button
            className="bg-custom-orange hover:bg-orange-600 text-white py-1 px-2 sm:py-2 sm:px-4 rounded-full text-sm sm:text-base"
            style={{ fontFamily: "Tajwal, sans-serif" }}
            onClick={handleRegisterRedirect}
          >
            البدء
          </button>
          <button
            className="hover:bg-green-600 text-white py-1 px-2 sm:py-2 sm:px-4 rounded-full flex items-center text-sm sm:text-base"
            style={{ fontFamily: "Tajwal, sans-serif", background: "#229575" }}
          >
            <MdOutlineSlowMotionVideo className="mr-1 sm:mr-2" />
            تشغيل العرض التوضيحي
          </button>
        </div>

        {/* دوائر الزخرفة (تظهر فقط على الشاشات الأكبر من sm) */}
        <div
          className="absolute hidden sm:block top-0 right-0"
          style={{
            marginRight: "-190px",
          }}
        >
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-custom-orange rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
