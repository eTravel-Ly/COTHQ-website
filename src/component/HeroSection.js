import React from 'react';
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import test from '../assets/images/test.png'; // استيراد الصورة
import { IoIosLogIn } from "react-icons/io";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/LoginRegister");
  };

  return (
    <section
      id="hero"
      className="text-center py-72 flex flex-col items-center relative"
      style={{
        backgroundImage: `url(${test})`, // استخدام الصورة المستوردة
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
          <div className="absolute inset-0 bg-blues bg-opacity-50"></div>

      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      ></div>
      <div className="container mx-auto px-4 relative">
        {/* العنوان والنص */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-9 text-white"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          مجمع القرآن الكريم في ليبيا
        </h1>
        <p
          className="text-gray-200 text-sm sm:text-base md:text-lg mb-6 line-clamp-2"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          هو مؤسسة حكومية تُعنى بالقرآن الكريم وعلومه تعليما وتأليفا وتحقيقاً
          ونشراً، وتُحافظ على الهُويّة الإسلامية، <br />
          وترتقي بالمجتمع المسلم عبر وسائل نُزاوج بين ثوابت الأصالة ومقتضيات
          التقنية المعاصرة
        </p>

        {/* الأزرار */}
        <div className="flex flex-row justify-center space-x-2 sm:space-x-4">
          <button
            className="py-1 px-2 sm:py-2 sm:px-4 rounded-full flex items-center text-sm sm:text-base border-2 border-white text-white hover:bg-white hover:text-black transition duration-300"
            style={{ fontFamily: "Tajwal, sans-serif", background: "transparent" }}
          >
            <IoIosLogIn className="mr-1 sm:mr-2" />
            سجل معنا الآن
          </button>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
