import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoHomeOutline,
  IoLibraryOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { CiLaptop, CiShop } from "react-icons/ci";
import { FiAlertCircle } from "react-icons/fi";
import { GiTargetPrize } from "react-icons/gi";
import { FaPeopleLine } from "react-icons/fa6";
import { MdOutlineLocalActivity } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { useTranslation } from "../context/TranslationContext"; 

const menuItems = [
  { path: "/HomeAfterLogin", labelKey: "home", icon: <IoHomeOutline /> },
  { path: "/MyActivity", labelKey: "myActivity", icon: <MdOutlineLocalActivity /> },
  { path: "/Contests", labelKey: "contests", icon: <GiTargetPrize /> },
  { path: "/Seminars", labelKey: "seminars", icon: <FaPeopleLine /> },
  { path: "/Shop", labelKey: "shop", icon: <CiShop /> },
  // { path: "/", labelKey: "sheikhs", icon: <FaUsers /> },
  // { path: "/", labelKey: "memorizationCenters", icon: <FaShop /> },
  { path: "/OrderHistory", labelKey: "orderHistory", icon: <CiShop /> },
  { path: "/borrowsHistory", labelKey: "borrowHistory", icon: <CiShop /> },
  { path: "/settings", labelKey: "settings", icon: <IoSettingsOutline /> },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { translations, language } = useTranslation(); // Translations and language from context
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  
  const handleLinkClick = (path) => {
    setActiveLink(path);
    navigate(path);
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const toggleMenu = (setter) => {
    setter((prev) => !prev);
  };

  const sessionLanguage = sessionStorage.getItem('language') || 'ar'; 

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 ${sessionLanguage === "ar" ? "right-0" : "left-0"} w-64 bg-white h-full shadow-lg transform transition-transform duration-300 z-40 ${
          isSidebarOpen
            ? sessionLanguage === "ar"
              ? "translate-x-0"
              : "translate-x-0"
            : sessionLanguage === "ar"
            ? "translate-x-full"
            : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col items-center p-2 border-b w-full">
          <img src={logo} alt="Logo" className="h-16" />
        </div>
        <nav className="flex flex-col w-full">
          {menuItems.map(({ path, labelKey, icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => handleLinkClick(path)}
              className={`flex items-center p-3 text-sm hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
                activeLink === path
                  ? "text-custom-orange bg-blues1"
                  : "text-gray-700"
              }`}
              style={{
                fontFamily: "Tajwal, sans-serif",
                direction: sessionLanguage === "ar" ? "rtl" : "ltr",
              }}
            >
              {icon && (
                <span
                  className={`${
                    sessionLanguage === "ar" ? "mr-2 ml-2" : "ml-2 mr-2"
                  } text-sm`}
                >
                  {icon}
                </span>
              )}
              {translations[labelKey]} {/* Dynamically load label */}
            </Link>
          ))}

          {/* Library Dropdown */}
          <div>
            <button
              onClick={() => toggleMenu(setIsLibraryOpen)}
              className={`flex items-center p-3 text-sm w-full hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
                activeLink.includes("/MyBooks")
                  ? "text-custom-orange bg-blues1"
                  : "text-gray-700"
              }`}
              style={{
                fontFamily: "Tajwal, sans-serif",
                direction: sessionLanguage === "ar" ? "rtl" : "ltr",
              }}
            >
              <IoLibraryOutline
                className={`${
                  sessionLanguage === "ar" ? "mr-2 ml-2" : "ml-2 mr-2"
                } text-sm`}
              />
              {translations.library} {/* Dynamically load label */}
              {isLibraryOpen ? (
                <IoChevronDownOutline className="mr-auto text-sm" />
              ) : (
                <IoChevronForwardOutline className="mr-auto text-sm" />
              )}
            </button>
            {isLibraryOpen && (
              <div
                className={`flex flex-col bg-white ${
                  sessionLanguage === "ar" ? "pl-12" : "pr-12"
                }`}
              >
                <Link
                  to="/MyBooks"
                  onClick={() => handleLinkClick("/MyBooks")}
                  className={`flex items-center p-3 text-sm hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
                    activeLink === "/MyBooks"
                      ? "text-custom-orange bg-blues1"
                      : "text-gray-700"
                  }`}
                  style={{
                    fontFamily: "Tajwal, sans-serif",
                  }}
                >
                  {translations.digitalLibrary} {/* Dynamically load label */}
                </Link>
                <Link
                  to="/Myborrow"
                  onClick={() => handleLinkClick("/Myborrow")}
                  className={`flex items-center p-3 text-sm hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
                    activeLink === "/Myborrow"
                      ? "text-custom-orange bg-blues1"
                      : "text-gray-700"
                  }`}
                  style={{
                    fontFamily: "Tajwal, sans-serif",
                  }}
                >
                  {translations.localLibrary} {/* Dynamically load label */}
                </Link>
              </div>
            )}
          </div>

          {/* Courses Dropdown */}
          <div>
            <button
              onClick={() => toggleMenu(setIsCoursesOpen)}
              className={`flex items-center p-3 text-sm w-full hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
                activeLink.includes("/MyCourses")
                  ? "text-custom-orange bg-blues1"
                  : "text-gray-700"
              }`}
              style={{
                fontFamily: "Tajwal, sans-serif",
                direction: sessionLanguage === "ar" ? "rtl" : "ltr",
              }}
            >
              <CiLaptop className="mr-2 ml-2 text-sm" />
              {translations.courses} {/* Dynamically load label */}
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
                  onClick={() => handleLinkClick("/MyCourses")}
                  className={`flex items-center p-3 text-sm hover:bg-blues1 hover:text-custom-orange hover:rounded-lg mr-10 ${
                    activeLink === "/MyCourses"
                      ? "text-custom-orange bg-blues1"
                      : "text-gray-700"
                  }`}
                  style={{
                    fontFamily: "Tajwal, sans-serif",
                  }}
                >
                  {translations.recordedLectures} {/* Dynamically load label */}
                </Link>
              </div>
            )}
          </div>

          {/* Help Center */}
          <Link
            to="/HelpCenter"
            onClick={() => handleLinkClick("/HelpCenter")}
            className={`flex items-center p-3 text-sm hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
              activeLink === "/HelpCenter"
                ? "text-custom-orange bg-blues1"
                : "text-gray-700"
            }`}
            style={{
              fontFamily: "Tajwal, sans-serif",
              direction: sessionLanguage === "ar" ? "rtl" : "ltr",
            }}
          >
            <FiAlertCircle className="mr-2 ml-2 text-sm" />
            {translations.helpCenter} {/* Dynamically load label */}
          </Link>
        </nav>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
