import React, { useState } from 'react';
import logo from "../assets/images/logo.png";
import { IoHomeOutline, IoLibraryOutline, IoSettingsOutline, IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5";
import { CiLaptop, CiShop } from "react-icons/ci";
import { FiAlertCircle } from "react-icons/fi";
import { GiTargetPrize } from "react-icons/gi";
import { FaPeopleLine } from "react-icons/fa6";
import { MdOutlineLocalActivity } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(''); // State to track the active link

  const toggleCoursesMenu = () => {
    navigate('/MyCourses');
    setIsCoursesOpen(!isCoursesOpen);
    setActiveLink('/MyCourses'); // Set the active link
  };

  const toggleLibraryMenu = () => {
    navigate('/MyBooks');
    setIsLibraryOpen(!isLibraryOpen);
    setActiveLink('/MyBooks'); // Set the active link
  };

  const handleLinkClick = (path) => {
    setActiveLink(path); // Set the active link
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white shadow-lg fixed right-0 top-0 h-full overflow-y-auto">
        <div className="flex flex-col items-center p-2 border-b w-full">
          <img src={logo} alt="Logo" className="h-16" />
        </div>
        <nav className="flex flex-col w-full">
          <Link
            to="/HomeAfterLogin"
            onClick={() => handleLinkClick('/HomeAfterLogin')}
            className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg ${activeLink === '/HomeAfterLogin' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <IoHomeOutline className="mr-2 ml-2 text-sm" />
            الصفحة الرئيسية
          </Link>

          <div>
            <div>
              <button
                onClick={toggleLibraryMenu}
                className={`flex items-center p-3 text-sm w-full hover:bg-blues hover:text-custom-orange hover:rounded-lg ${activeLink === '/MyBooks' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
                style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
              >
                <IoLibraryOutline className="mr-2 ml-2 text-sm" />
                المكتبة
                {isLibraryOpen ? (
                  <IoChevronDownOutline className="mr-auto text-sm" />
                ) : (
                  <IoChevronForwardOutline className="mr-auto text-sm" />
                )}
              </button>
              {isLibraryOpen && (
                <div className="flex flex-col bg-white pl-12">
                  <Link
                    to="/MyBooks"
                    onClick={() => handleLinkClick('/MyBooks')}
                    className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg mr-10 ${activeLink === '/MyBooks' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
                    style={{
                      fontFamily: "Tajwal, sans-serif",
                      direction: "rtl",
                    }}
                  >
                    مكتبة رقمية
                  </Link>
                  <Link
                    to="/Myborrow"
                    onClick={() => handleLinkClick('/Myborrow')}
                    className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg mr-10 ${activeLink === '/Myborrow' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
                    style={{
                      fontFamily: "Tajwal, sans-serif",
                      direction: "rtl",
                    }}
                  >
                    مكتبة محلية
                  </Link>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={toggleCoursesMenu}
                className={`flex items-center p-3 text-sm w-full hover:bg-blues hover:text-custom-orange hover:rounded-lg ${activeLink === '/MyCourses' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
                style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
              >
                <CiLaptop className="mr-2 ml-2 text-sm" />
                الدورات
                {isCoursesOpen ? (
                  <IoChevronDownOutline className="mr-auto text-sm" />
                ) : (
                  <IoChevronForwardOutline className="mr-auto text-sm" />
                )}
              </button>
              {isCoursesOpen && (
                <div className="flex flex-col bg-white pl-12">
                  <Link
                    to="/MyCourses"
                    onClick={() => handleLinkClick('/MyCourses')}
                    className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg mr-10 ${activeLink === '#' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
                    style={{
                      fontFamily: "Tajwal, sans-serif",
                      direction: "rtl",
                    }}
                  >
                    محاضرات مسجلة
                  </Link>
                 {/*
                  <Link
                    to="#"
                    onClick={() => handleLinkClick('#')}
                    className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg mr-10 ${activeLink === '#' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
                    style={{
                      fontFamily: "Tajwal, sans-serif",
                      direction: "rtl",
                    }}
                  >
                    محاضرات مغلقة
                  </Link>
                 */}
                </div>
              )}
            </div>
          </div>

          <Link
            to="/MyActivity"
            onClick={() => handleLinkClick('/MyActivity')}
            className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg ${activeLink === '/MyActivity' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <MdOutlineLocalActivity className="mr-2 ml-2 text-sm" />
            نشاطاتى
          </Link>
          <Link
            to="/Contests"
            onClick={() => handleLinkClick('/Contests')}
            className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg ${activeLink === '/Contests' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <GiTargetPrize className="mr-2 ml-2 text-sm" />
            المسابقـــات و دورات تدريبية
          </Link>
          <Link
            to="/Seminars"
            onClick={() => handleLinkClick('/Seminars')}
            className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg ${activeLink === '/Seminars' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <FaPeopleLine className="mr-2 ml-2 text-sm" />
            الندوات و مؤتمرات
          </Link>
          <Link
            to="/Shop"
            onClick={() => handleLinkClick('/Shop')}
            className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg ${activeLink === '/Shop' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <CiShop className="mr-2 ml-2 text-sm" />
            المتجر
          </Link>

          <div className="flex flex-col items-center mt-auto p-1 bg-white w-full justify-center border-t"></div>
          <Link
            to="#"
            onClick={() => handleLinkClick('#')}
            className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg ${activeLink === '#' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <FiAlertCircle className="mr-2 ml-2 text-sm" />
            مركز المساعدة
          </Link>
          <Link
            to="/settings"
            onClick={() => handleLinkClick('/settings')}
            className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg ${activeLink === '#' ? 'text-custom-orange bg-blues' : 'text-gray-700'}`}
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <IoSettingsOutline className="mr-2 ml-2 text-sm" />
            الاعدادات
          </Link>
        </nav>
       {/*
        <div className="flex flex-col items-center mt-auto p-2 mb-16">
          <div className="p-2 bg-blues rounded-lg w-full text-center">
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
       */}
      </div>
    </div>
  );
};

export default Sidebar;
