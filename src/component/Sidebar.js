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
import { useTranslation } from "../context/TranslationContext";

const menuItems = [
  { path: "/HomeAfterLogin", labelKey: "home", icon: <IoHomeOutline /> },
  { path: "/MyActivity", labelKey: "myActivity", icon: <MdOutlineLocalActivity /> },
  { path: "/Contests", labelKey: "contests", icon: <GiTargetPrize /> },
  { path: "/Seminars", labelKey: "seminars", icon: <FaPeopleLine /> },
  { path: "/Shop", labelKey: "shop", icon: <CiShop /> },
  { path: "/OrderHistory", labelKey: "orderHistory", icon: <CiShop /> },
  { path: "/borrowsHistory", labelKey: "borrowHistory", icon: <CiShop /> },
  { path: "/settings", labelKey: "settings", icon: <IoSettingsOutline /> },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { translations, language } = useTranslation();
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const sessionLanguage = sessionStorage.getItem("language") || "ar";

  const handleLinkClick = (path) => {
    setActiveLink(path);
    navigate(path);
    setIsSidebarOpen(false);
  };

  const toggleMenu = (setter) => {
    setter((prev) => !prev);
  };

  return (
    <>
      <div
        className={`fixed top-0 ${
          sessionLanguage === "ar" ? "right-0" : "left-0"
        } w-64 bg-white h-full shadow-lg transform transition-transform duration-300 z-40 ${
          isSidebarOpen
            ? sessionLanguage === "ar"
              ? "translate-x-0"
              : "translate-x-0"
            : sessionLanguage === "ar"
            ? "translate-x-full"
            : "-translate-x-full"
        } lg:translate-x-0`}
        style={{ fontSize: "18px" }}
      >
        {/* Sidebar Header */}
        <div className="flex flex-col items-center p-4 border-b w-full">
          <img src={logo} alt="Logo" className="h-20" />
        </div>

        {/* Sidebar Menu */}
        <nav className="flex flex-col w-full">
          {menuItems.map(({ path, labelKey, icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => handleLinkClick(path)}
              className={`flex items-center p-4 text-lg hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
                activeLink === path
                  ? "text-custom-orange bg-blues1"
                  : "text-gray-700"
              }`}
              style={{
                fontFamily: "Tajwal, sans-serif",
                direction: sessionLanguage === "ar" ? "rtl" : "ltr",
              }}
            >
              <span
                className={`${
                  sessionLanguage === "ar" ? "mr-3 ml-3" : "ml-3 mr-3"
                } text-xl`}
              >
                {icon}
              </span>
              {translations[labelKey]}
            </Link>
          ))}

          {/* Library Dropdown */}
          <div>
            <button
              onClick={() => toggleMenu(setIsLibraryOpen)}
              className={`flex items-center p-4 text-lg w-full hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
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
                  sessionLanguage === "ar" ? "mr-3 ml-3" : "ml-3 mr-3"
                } text-xl`}
              />
              {translations.library}
              {isLibraryOpen ? (
                <IoChevronDownOutline className="mr-auto text-xl" />
              ) : (
                <IoChevronForwardOutline className="mr-auto text-xl" />
              )}
            </button>
            {isLibraryOpen && (
              <div
                className={`flex flex-col bg-white ${
                  sessionLanguage === "ar" ? "pl-16" : "pr-16"
                }`}
              >
                <Link
                  to="/MyBooks"
                  onClick={() => handleLinkClick("/MyBooks")}
                  className={`flex items-center p-4 text-lg hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
                    activeLink === "/MyBooks"
                      ? "text-custom-orange bg-blues1"
                      : "text-gray-700"
                  }`}
                  style={{
                    fontFamily: "Tajwal, sans-serif",
                  }}
                >
                  {translations.digitalLibrary}
                </Link>
                <Link
                  to="/Myborrow"
                  onClick={() => handleLinkClick("/Myborrow")}
                  className={`flex items-center p-4 text-lg hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
                    activeLink === "/Myborrow"
                      ? "text-custom-orange bg-blues1"
                      : "text-gray-700"
                  }`}
                  style={{
                    fontFamily: "Tajwal, sans-serif",
                  }}
                >
                  {translations.localLibrary}
                </Link>
              </div>
            )}
          </div>

          {/* Courses Dropdown */}
          <div>
            <button
              onClick={() => toggleMenu(setIsCoursesOpen)}
              className={`flex items-center p-4 text-lg w-full hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
                activeLink.includes("/MyCourses")
                  ? "text-custom-orange bg-blues1"
                  : "text-gray-700"
              }`}
              style={{
                fontFamily: "Tajwal, sans-serif",
                direction: sessionLanguage === "ar" ? "rtl" : "ltr",
              }}
            >
              <CiLaptop className="mr-3 ml-3 text-xl" />
              {translations.courses}
              {isCoursesOpen ? (
                <IoChevronDownOutline className="mr-auto text-xl" />
              ) : (
                <IoChevronForwardOutline className="mr-auto text-xl" />
              )}
            </button>
            {isCoursesOpen && (
              <div
                className={`flex flex-col bg-white ${
                  sessionLanguage === "ar" ? "pl-16" : "pr-16"
                }`}
              >
                <Link
                  to="/MyCourses"
                  onClick={() => handleLinkClick("/MyCourses")}
                  className={`flex items-center p-4 text-lg hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
                    activeLink === "/MyCourses"
                      ? "text-custom-orange bg-blues1"
                      : "text-gray-700"
                  }`}
                  style={{
                    fontFamily: "Tajwal, sans-serif",
                  }}
                >
                  {translations.recordedLectures}
                </Link>
              </div>
            )}
          </div>

          {/* Help Center */}
          <Link
            to="/HelpCenter"
            onClick={() => handleLinkClick("/HelpCenter")}
            className={`flex items-center p-4 text-lg hover:bg-blues1 hover:text-custom-orange hover:rounded-lg ${
              activeLink === "/HelpCenter"
                ? "text-custom-orange bg-blues1"
                : "text-gray-700"
            }`}
            style={{
              fontFamily: "Tajwal, sans-serif",
              direction: sessionLanguage === "ar" ? "rtl" : "ltr",
            }}
          >
            <FiAlertCircle className="mr-3 ml-3 text-xl" />
            {translations.helpCenter}
          </Link>
        </nav>
      </div>

      {/* Overlay */}
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
