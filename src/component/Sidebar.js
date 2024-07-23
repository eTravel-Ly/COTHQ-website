import React, { useState } from 'react';
import logo from "../assets/images/logo.png";
import { IoHomeOutline } from "react-icons/io5";
import { IoLibraryOutline } from "react-icons/io5";
import { CiLaptop } from "react-icons/ci";
import { SiGoogleclassroom } from "react-icons/si";
import { CiShop } from "react-icons/ci";
import { PiGraduationCapThin } from "react-icons/pi";
import { FiAlertCircle } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const toggleCoursesMenu = () => {
    navigate('/MyCourses');
    setIsCoursesOpen(!isCoursesOpen);

  };
  const toggleLibraryMenu = () => {
    navigate('/MyBooks');
    setIsLibraryOpen(!isLibraryOpen);

  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white shadow-lg fixed right-0 top-0 h-full overflow-y-auto">
        <div className="flex flex-col items-center p-2 border-b w-full">
          <img src={logo} alt="Logo" className="h-16 " />
        </div>
        <nav className="flex flex-col w-full">
          <Link
            to="/HomeAfterLogin"
            className="flex items-center p-3 text-sm text-gray-700 hover:bg-blue hover:rounded-lg"
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <IoHomeOutline className="mr-2 ml-2 text-sm" />
            الصفحة الرئيسية
          </Link>

          <div>
            <button
              onClick={toggleLibraryMenu}
              className="flex items-center p-3 text-sm text-gray-700 w-full hover:bg-blue hover:rounded-lg"
              style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
            >
              <IoLibraryOutline className="mr-2 ml-2 text-sm" />
              المكتبة
            </button>
            {isLibraryOpen && (
              <div className="flex flex-col bg-white pl-12">
                <a
                  href="#"
                  className="flex items-center p-3 text-sm text-gray-700 hover:bg-blue hover:rounded-lg mr-10"
                  style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
                >
                  مكتبة رقمية
                </a>
                <a
                  href="#"
                  className="flex items-center p-3 text-sm text-gray-700 hover:bg-blue hover:rounded-lg mr-10"
                  style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
                >
                  مكتبة محلية
                </a>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={toggleCoursesMenu}
              className="flex items-center p-3 text-sm text-gray-700 w-full hover:bg-blue hover:rounded-lg"
              style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
            >
              <CiLaptop className="mr-2 ml-2 text-sm" />
              الدورات
            </button>
            {isCoursesOpen && (
              <div className="flex flex-col bg-white pl-12">
                <a
                  href="#"
                  className="flex items-center p-3 text-sm text-gray-700 hover:bg-blue hover:rounded-lg mr-10"
                  style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
                >
                  محاضرات مسجلة
                </a>
                <a
                  href="#"
                  className="flex items-center p-3 text-sm text-gray-700 hover:bg-blue hover:rounded-lg mr-10"
                  style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
                >
                  محاضرات مغلقة
                </a>
              </div>
            )}
          </div>
          <a
            href="#"
            className="flex items-center p-3 text-sm text-gray-700 hover:bg-blue hover:rounded-lg"
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <SiGoogleclassroom className="mr-2 ml-2 text-sm" />
            الفصول الدراسية
          </a>
          <a
            href="#"
            className="flex items-center p-3 text-sm text-gray-700 hover:bg-blue hover:rounded-lg"
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <PiGraduationCapThin className="mr-2 ml-2 text-sm" />
            الموجهون
          </a>
          <Link
            to="/Shop"
            className="flex items-center p-3 text-sm text-gray-700 hover:bg-blue hover:rounded-lg"
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <CiShop className="mr-2 ml-2 text-sm" />
            المتجر
          </Link>
          <div className="flex flex-col items-center mt-auto p-1 bg-white w-full justify-center border-t"></div>
          <a
            href="#"
            className="flex items-center p-3 text-sm text-gray-700 top-0 hover:bg-blue hover:rounded-lg"
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <FiAlertCircle className="mr-2 ml-2 text-sm" />
            مركز المساعدة
          </a>
          <a
            href="#"
            className="flex items-center p-3 text-sm text-gray-700 hover:bg-blue hover:rounded-lg"
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <IoSettingsOutline className="mr-2 ml-2 text-sm" />
            الإعدادات
          </a>
        </nav>

        <div className="flex flex-col items-center mt-auto p-2 mb-16">
          <div className="p-2 bg-blue rounded-lg w-full text-center">
            <h2 className="text-sm font-bold mb-1 font-tajwal">
              ندوة عبر الإنترنت
            </h2>
            <p className="text-xs mb-2 font-tajwal">
              تعلم كيف تصبح معلماً جيداً. انضم إلى ندوتنا التعليمية لتحسين
              مهاراتك.
            </p>
            <button className="bg-custom-orange text-white py-1 px-2 rounded font-tajwal text-xs">
              التسجيل
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
