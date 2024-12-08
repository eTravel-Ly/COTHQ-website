import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // تحقق من وجود قيمة في localStorage لتحديد حالة تسجيل الدخول
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // تعيين الحالة بناءً على وجود التوكن
  }, []);

  const handleRegisterRedirect = () => {
    navigate("/LoginRegister");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleAccount = () => {
    navigate("/HomeAfterLogin"); // أو أي مسار لحساب المستخدم
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md flex items-center px-4 h-14 sm:h-16 md:h-20 transition-all duration-300">
    {/* الحاوية الرئيسية */}
    <div className="flex justify-between items-center w-full">
      
      {/* القائمة للموبايل */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)} // فتح/إغلاق القائمة عند الضغط
          className="mobile-menu-button text-gray-700 hover:text-gray-900"
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
      </div>
    
      {/* القائمة للشاشات الكبيرة */}
      <div className="hidden md:flex items-center space-x-4 text-xs sm:text-sm lg:text-base">
        {isLoggedIn ? (
          <a
            href="#"
            style={{ fontFamily: "Tajwal, sans-serif" }}
            className="py-2 px-3 bg-custom-orange text-white rounded-full"
            onClick={handleAccount}
          >
            حسابي
          </a>
        ) : (
          <>
            <a
              href="#"
              style={{ fontFamily: "Tajwal, sans-serif" }}
              className="py-2 px-3 bg-custom-orange text-white rounded-full"
              onClick={handleRegisterRedirect}
            >
              الاشتراك
            </a>
            <a
              href="#"
              style={{ fontFamily: "Tajwal, sans-serif" }}
              className="py-2 px-3 border border-gray-500 text-gray-700 rounded-full hover:bg-gray-100"
              onClick={handleLogin}
            >
              تسجيل الدخول
            </a>
          </>
        )}
  
        <a href="#contact" style={{ fontFamily: "Tajwal, sans-serif" }} className="py-4 px-3 text-gray-700 hover:text-gray-900">
          اتصل بنا
        </a>
        <a href="#courses" style={{ fontFamily: "Tajwal, sans-serif" }} className="py-4 px-3 text-gray-700 hover:text-gray-900">
          الدورات
        </a>
        <a href="#PartnerSection" style={{ fontFamily: "Tajwal, sans-serif" }} className="py-4 px-3 text-gray-700 hover:text-gray-900">
          النشاطات
        </a>
        <a href="#hero" style={{ fontFamily: "Tajwal, sans-serif" }} className="py-4 px-3 text-gray-700 hover:text-gray-900">
          الصفحة الرئيسية
        </a>
      </div>
  
      {/* الصورة في اليمين */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
        />
      </div>
    </div>
  
    {/* القائمة الجانبية (Mobile Dropdown) */}
    {isOpen && (
      <div className="absolute top-14 sm:top-16 md:top-20 left-0 w-full bg-white shadow-md flex flex-col space-y-2 px-4 py-2 text-xs sm:text-sm">
        <a
          href="#hero"
          style={{ fontFamily: "Tajwal, sans-serif" }}
          className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
          onClick={() => setIsOpen(false)} // إغلاق القائمة عند الضغط
        >
          الصفحة الرئيسية
        </a>
        <a
          href="#courses"
          style={{ fontFamily: "Tajwal, sans-serif" }}
          className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
          onClick={() => setIsOpen(false)} // إغلاق القائمة عند الضغط
        >
          الدورات
        </a>
        <a
          href="#PartnerSection"
          style={{ fontFamily: "Tajwal, sans-serif" }}
          className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
          onClick={() => setIsOpen(false)} // إغلاق القائمة عند الضغط
        >
          النشاطات
        </a>
        <a
          href="#contact"
          style={{ fontFamily: "Tajwal, sans-serif" }}
          className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
          onClick={() => setIsOpen(false)} // إغلاق القائمة عند الضغط
        >
          اتصل
        </a>
        {isLoggedIn ? (
          <a
            href="#"
            style={{ fontFamily: "Tajwal, sans-serif" }}
            className="block py-2 text-gray-700 hover:bg-gray-100 rounded"
            onClick={() => setIsOpen(false)} // إغلاق القائمة عند الضغط
          >
            حسابي
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
              الاشتراك
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
              تسجيل الدخول
            </a>
          </>
        )}
      </div>
    )}
  </nav>
  
  
  );
};

export default Navbar;
