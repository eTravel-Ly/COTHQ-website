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

const menuItems = [
  {
    path: "/HomeAfterLogin",
    label: "الصفحة الرئيسية",
    icon: <IoHomeOutline />,
  },
  { path: "/MyActivity", label: "نشاطاتى", icon: <MdOutlineLocalActivity /> },
  {
    path: "/Contests",
    label: "المسابقـــات و دورات تدريبية",
    icon: <GiTargetPrize />,
  },
  { path: "/Seminars", label: "الندوات و مؤتمرات", icon: <FaPeopleLine /> },
  { path: "/Shop", label: "المتجر", icon: <CiShop /> },
  { path: "/OrderHistory", label: "عمليات الشراء", icon: <CiShop /> },
  { path: "/borrowsHistory", label: "طلبات الاستعارة", icon: <CiShop /> },
  { path: "/settings", label: "الاعدادات", icon: <IoSettingsOutline /> },
];

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();

  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
 // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLinkClick = (path) => {
    setActiveLink(path);
    navigate(path);
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const toggleMenu = (setter) => {
    setter((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
   
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 bg-white h-full shadow-lg transform transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col items-center p-2 border-b w-full">
          <img src={logo} alt="Logo" className="h-16" />
        </div>
        <nav className="flex flex-col w-full">
          {menuItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => handleLinkClick(path)}
              className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg ${
                activeLink === path
                  ? "text-custom-orange bg-blues"
                  : "text-gray-700"
              }`}
              style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
            >
              {icon && <span className="mr-2 ml-2 text-sm">{icon}</span>}
              {label}
            </Link>
          ))}

          {/* Library Dropdown */}
          <div>
            <button
              onClick={() => toggleMenu(setIsLibraryOpen)}
              className={`flex items-center p-3 text-sm w-full hover:bg-blues hover:text-custom-orange hover:rounded-lg ${
                activeLink.includes("/MyBooks")
                  ? "text-custom-orange bg-blues"
                  : "text-gray-700"
              }`}
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
                  onClick={() => handleLinkClick("/MyBooks")}
                  className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg mr-10 ${
                    activeLink === "/MyBooks"
                      ? "text-custom-orange bg-blues"
                      : "text-gray-700"
                  }`}
                  style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
                >
                  مكتبة رقمية
                </Link>
                <Link
                  to="/Myborrow"
                  onClick={() => handleLinkClick("/Myborrow")}
                  className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg mr-10 ${
                    activeLink === "/Myborrow"
                      ? "text-custom-orange bg-blues"
                      : "text-gray-700"
                  }`}
                  style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
                >
                  مكتبة محلية
                </Link>
              </div>
            )}
          </div>

          {/* Courses Dropdown */}
          <div>
            <button
              onClick={() => toggleMenu(setIsCoursesOpen)}
              className={`flex items-center p-3 text-sm w-full hover:bg-blues hover:text-custom-orange hover:rounded-lg ${
                activeLink.includes("/MyCourses")
                  ? "text-custom-orange bg-blues"
                  : "text-gray-700"
              }`}
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
                  onClick={() => handleLinkClick("/MyCourses")}
                  className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg mr-10 ${
                    activeLink === "/MyCourses"
                      ? "text-custom-orange bg-blues"
                      : "text-gray-700"
                  }`}
                  style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
                >
                  محاضرات مسجلة
                </Link>
              </div>
            )}
          </div>

          {/* Help Center */}
          <Link
            to="/HelpCenter"
            onClick={() => handleLinkClick("/HelpCenter")}
            className={`flex items-center p-3 text-sm hover:bg-blues hover:text-custom-orange hover:rounded-lg ${
              activeLink === "/HelpCenter"
                ? "text-custom-orange bg-blues"
                : "text-gray-700"
            }`}
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            <FiAlertCircle className="mr-2 ml-2 text-sm" />
            مركز المساعدة
          </Link>
        </nav>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
