import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate('/LoginRegister');
  };

  const handleLogin = () => {
    navigate('/Login');
  };

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-20 z-50 bg-white shadow-md rounded-full mx-auto my-4 mb-0 max-w-6xl flex items-center justify-center">
      <div className="w-full max-w-6xl px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a
            href="#"
            style={{ fontFamily: 'Tajwal, sans-serif' }}
            className="py-2 px-3 bg-custom-orange text-white rounded-full"
            onClick={handleRegisterRedirect}
          >
            الاشتراك
          </a>
          <a
            href="#"
            style={{ fontFamily: 'Tajwal, sans-serif' }}
            className="py-2 px-3 border border-gray-500 text-gray-700 rounded-full hover:bg-gray-100"
            onClick={handleLogin}
          >
            تسجيل الدخول
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#"
            style={{ fontFamily: 'Tajwal, sans-serif' }}
            className="py-5 px-3 text-gray-700 hover:text-gray-900"
          >
            من نحن
          </a>
          <a
            href="#"
            style={{ fontFamily: 'Tajwal, sans-serif' }}
            className="py-5 px-3 text-gray-700 hover:text-gray-900"
          >
            اتصل
          </a>
          <a
            href="#"
            style={{ fontFamily: 'Tajwal, sans-serif' }}
            className="py-5 px-3 text-gray-700 hover:text-gray-900"
          >
            الدورة
          </a>
          <a
            href="#"
            style={{ fontFamily: 'Tajwal, sans-serif' }}
            className="py-5 px-3 text-gray-700 hover:text-gray-900"
          >
            الصفحة الرئيسية
          </a>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-button">
            <svg
              className="w-6 h-6"
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
        <div className="flex items-center">
          <a href="#" className="py-5 px-2 text-gray-700 hover:text-gray-900">
            <img src={logo} alt="Logo" width={60} height={60} className="mr-2" />
          </a>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden w-full bg-white shadow-md">
          <a
            href="#"
            style={{ fontFamily: 'Tajwal, sans-serif' }}
            className="block py-2 px-4 text-sm hover:bg-gray-200"
          >
            الصفحة الرئيسية
          </a>
          <a
            href="#"
            style={{ fontFamily: 'Tajwal, sans-serif' }}
            className="block py-2 px-4 text-sm hover:bg-gray-200"
          >
            من نحن
          </a>
          <a
            href="#"
            style={{ fontFamily: 'Tajwal, sans-serif' }}
            className="block py-2 px-4 text-sm hover:bg-gray-200"
          >
            الدورة
          </a>
          <a
            href="#"
            style={{ fontFamily: 'Tajwal, sans-serif' }}
            className="block py-2 px-4 text-sm hover:bg-gray-200"
          >
            اتصل
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
