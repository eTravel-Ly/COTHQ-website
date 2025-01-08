import React, { useEffect, useRef } from "react";
import { IoIosLogIn } from "react-icons/io";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const navigate = useNavigate();

  // مراجع النصوص والأزرار
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  const handleRegisterRedirect = () => {
    navigate("/LoginRegister");
  };

  useEffect(() => {
    // أنيميشن عند تحميل الصفحة
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.3, ease: "power3.out" }
    );

    gsap.fromTo(
      buttonRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, delay: 0.5, ease: "power3.out" }
    );

    // أنيميشن عند التمرير باستخدام ScrollTrigger
    ScrollTrigger.batch([titleRef.current, textRef.current, buttonRef.current], {
      start: "top 80%", // يبدأ الأنيميشن عند ظهور العنصر في 80% من الشاشة
      onEnter: (batch) =>
        gsap.to(batch, { y: 0, opacity: 1, stagger: 0.2, duration: 1 }),
    });
  }, []);

  return (
    <section
      id="hero"
      className="text-center py-72 flex flex-col items-center relative"
      style={{
        backgroundImage: `url("https://i.pinimg.com/originals/d0/36/1c/d0361c7d1c5ba81a5f020b50076ecb52.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
       <div className="absolute inset-0 bg-blues bg-opacity-50"></div>
             <div className="container mx-auto px-4 relative">
        {/* العنوان */}
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-9 text-white"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          مجمع القرآن الكريم في ليبيا
        </h1>

        {/* النص */}
        <p
          ref={textRef}
          className="text-gray-200 text-sm sm:text-base md:text-lg mb-6 line-clamp-2"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          هو مؤسسة حكومية تُعنى بالقرآن الكريم وعلومه تعليما وتأليفا وتحقيقاً
          ونشراً، وتُحافظ على الهُويّة الإسلامية، <br />
          وترتقي بالمجتمع المسلم عبر وسائل نُزاوج بين ثوابت الأصالة ومقتضيات
          التقنية المعاصرة
        </p>

        {/* الأزرار */}
        <div
          ref={buttonRef}
          className="flex flex-row justify-center space-x-2 sm:space-x-4"
        >
          <button
            onClick={handleRegisterRedirect}
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
