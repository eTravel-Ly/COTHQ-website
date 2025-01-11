import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/images/logo.svg";
import logo1 from "../assets/images/logo.png";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { IoLanguageOutline } from "react-icons/io5";
import { useTranslation } from "../context/TranslationContext"; // استيراد هوك الترجمة

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  // Refs for animation
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const linksRef = useRef([]);
  const { translations,  language, changeLanguage } = useTranslation(); // استخدام الترجمة
  
  useEffect(() => {
    // تحقق من وجود قيمة في localStorage لتحديد حالة تسجيل الدخول
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // تعيين الحالة بناءً على وجود التوكن
  }, []);

  useEffect(() => {
    // وظيفة لتغيير الحالة عند التمرير
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    // Animate navbar on load
    gsap.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 2}
    );
    gsap.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power3.out" }
    );
    
    // Animate links individually
    gsap.fromTo(
      linksRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 2, stagger: 0.2 }
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );
    }
  }, [isOpen]);

  const handleRegisterRedirect = () => {
    navigate("/LoginRegister");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleAccount = () => {
    navigate("/HomeAfterLogin"); // أو أي مسار لحساب المستخدم
  };


// استرداد اللغة المخزنة أو استخدام القيمة الافتراضية
useEffect(() => {
  const storedLanguage = localStorage.getItem('language') || 'ar'; // اللغة الافتراضية "ar"
  changeLanguage(storedLanguage); // تغيير اللغة عند بدء التطبيق
}, []);

// التبديل بين العربية والإنجليزية
const handleLanguageChange = () => {
  const newLanguage = language === 'ar' ? 'en' : 'ar'; // التبديل بين اللغتين
  changeLanguage(newLanguage); // تغيير اللغة
  localStorage.setItem('language', newLanguage); // تخزين اللغة الجديدة في localStorage
};
  return (
    <nav
    dir={language === "ar" ? "ltr" : "rtl"} // تغيير الاتجاه
    ref={navRef}
      className={`fixed top-0 left-0 w-full z-50  flex items-center px-4 h-14 sm:h-16 md:h-20 transition-all duration-300 ${
        scrolled ? "bg-white text-black" : "bg-transparent text-white"
      }`}
    >
      <div className="flex justify-between items-center w-full">
        {/* القائمة للموبايل */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`mobile-menu-button ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <IoLanguageOutline size={22} className="ml-2 cursor-pointer" onClick={handleLanguageChange} />

        </div>

        {/* القائمة للشاشات الكبيرة */}
        <div
          className={`hidden md:flex items-center space-x-4 text-xs sm:text-sm lg:text-base ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          {isLoggedIn ? (
            <a
              href="#"
              ref={(el) => (linksRef.current[0] = el)}
              style={{ fontFamily: "Tajwal, sans-serif" }}
              className={`py-2 px-3 rounded-full ${
                scrolled ? "bg-custom-orange text-white" : "border border-white"
              }`}
              onClick={handleAccount}
            >
                          {translations.account}

            </a>
          ) : (
            <>
              <a
                href="#"
                ref={(el) => (linksRef.current[1] = el)}
                style={{ fontFamily: "Tajwal, sans-serif" }}
                className={`py-2 px-3 border rounded-full   ml-3   ${
                  scrolled
                    ? "border-black text-black"
                    : "border-white text-white"
                }`}
                onClick={handleRegisterRedirect}
              >
                   {translations.register}
              </a>
              <a
                href="#"
                ref={(el) => (linksRef.current[2] = el)}
                style={{ fontFamily: "Tajwal, sans-serif" }}
                className={`py-2 px-3 border rounded-full ml-3  ${
                  scrolled
                    ? "border-black text-black"
                    : "border-white text-white"
                }`}
                onClick={handleLogin}
              >
                                 {translations.login}

              </a>
            </>
          )}
          <IoLanguageOutline size={22} className="ml-2 cursor-pointer" onClick={handleLanguageChange} />
          <a
            href="#contact"
            ref={(el) => (linksRef.current[3] = el)}
            style={{ fontFamily: "Tajwal, sans-serif" }}
            className={`py-4 px-3 font-bold ${
              scrolled ? "hover:text-gray-700" : "hover:text-gray-900"
            }`}
          >
                                     {translations.contactUs}

          </a>
          <a
            href="#ShiekhsList"
            ref={(el) => (linksRef.current[4] = el)}
            style={{ fontFamily: "Tajwal, sans-serif" }}
            className={`py-4 px-3 font-bold ${
              scrolled ? "hover:text-gray-700" : "hover:text-gray-900"
            }`}
          >
              {translations.sheikhs}

          </a>
          <a
            href="#PartnerSection"
            ref={(el) => (linksRef.current[5] = el)}
            style={{ fontFamily: "Tajwal, sans-serif" }}
            className={`py-4 px-3 font-bold ${
              scrolled ? "hover:text-gray-700" : "hover:text-gray-900"
            }`}
          >
               {translations.services}
          </a>
          <a
            href="#hero"
            ref={(el) => (linksRef.current[5] = el)}
            style={{ fontFamily: "Tajwal, sans-serif" }}
            className={`py-4 px-3 font-bold ${
              scrolled ? "hover:text-gray-700" : "hover:text-gray-900"
            }`}
          >
               {translations.home}
               </a>
        </div>

        {/* الصورة والنص في اليمين */}
        <div className="flex items-center space-x-2">
          <span
            className={`text-lg sm:text-sm md:text-lg lg:text-xl font-bold font-tajwal ml-7 mr-7 ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            
            {translations.quranComplex}
          </span>
          <img
             src={scrolled ? logo1 : logo} // تغيير الصورة بناءً على حالة التمرير            alt="Logo"
            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 ${
              scrolled ? "" : ""
            }`}
          />
        </div>
      </div>

       
    {/* القائمة الجانبية (Mobile Dropdown) */}
    {isOpen && (
      <div className="absolute top-14 sm:top-16 md:top-20 left-0 w-full bg-white shadow-md flex flex-col space-y-2 px-4 py-2 text-xs sm:text-sm" >
        <a
          href="#hero"
          style={{ fontFamily: "Tajwal, sans-serif" }}
          className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
          onClick={() => setIsOpen(false)} // إغلاق القائمة عند الضغط
        >
            {translations.home}
            </a>
        <a
            href="#PartnerSection"
            style={{ fontFamily: "Tajwal, sans-serif" }}
          className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
          onClick={() => setIsOpen(false)} // إغلاق القائمة عند الضغط
        >
                      {translations.services}
        </a>
        <a
          href="#ShiekhsList"
          style={{ fontFamily: "Tajwal, sans-serif" }}
          className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
          onClick={() => setIsOpen(false)} // إغلاق القائمة عند الضغط
        >
           {translations.sheikhs}
        </a>
        <a
          href="#contact"
          style={{ fontFamily: "Tajwal, sans-serif" }}
          className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
          onClick={() => setIsOpen(false)} // إغلاق القائمة عند الضغط
        >
           {translations.contactUs}
        </a>
        {isLoggedIn ? (
          <a
            href="#"
            style={{ fontFamily: "Tajwal, sans-serif" }}
            className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
            onClick={() => setIsOpen(false)} // إغلاق القائمة عند الضغط
          >
                       {translations.account}

          </a>
        ) : (
          <>
            <a
              href="#"
              style={{ fontFamily: "Tajwal, sans-serif" }}
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => {
                handleRegisterRedirect();
                setIsOpen(false); // إغلاق القائمة عند الضغط
              }}
            >
               {translations.register}
            </a>
            <a
              href="#"
              style={{ fontFamily: "Tajwal, sans-serif" }}
              className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => {
                handleLogin();
                setIsOpen(false); // إغلاق القائمة عند الضغط
              }}
            >
               {translations.login}
            </a>
          </>
        )}
      </div>
    )}
    </nav>
  );
};

export default Navbar;
