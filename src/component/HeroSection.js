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
      className=" hero-section text-center py-16 bg-white mt-10"
    >
      <div className="container mx-auto px-4 relative">
        <div
          className="absolute"
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
        <h1
          className="text-4xl md:text-5xl font-bold mb-9"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          تحويل الفصول الدراسية إلى حاضنات لتتألق
        </h1>
        <p
          className="text-gray-600 text-base md:text-lg mb-1"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة المتمثلة في إدانة
          اللذة وتمجيد الألم
        </p>
        <p
          className="text-gray-600 text-base md:text-lg mb-9"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          وسأقدم لك وصفاً كاملاً للنظام، وأشرح لك
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-custom-orange hover:bg-orange-600 text-white py-2 px-4 rounded-full"
            style={{ fontFamily: "Tajwal, sans-serif" }}
            onClick={handleRegisterRedirect}
          >
            البدء
          </button>
          <button
            className="hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center"
            style={{ fontFamily: "Tajwal, sans-serif", background: "#229575" }}
          >
            <MdOutlineSlowMotionVideo className="mr-2" />
            تشغيل العرض التوضيحي
          </button>
        </div>
        <div
          className="absolute top-0 right-0 mr-0"
          style={{
            marginRight: "-190px",
          }}
        >
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-custom-orange rounded-full"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
