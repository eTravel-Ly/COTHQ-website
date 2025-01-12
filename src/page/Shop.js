import React, { useState, useEffect } from 'react';
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import Allbooks from "../component/Allbooks";
import AllCourses from "../component/AllCourses";

export default function Shop() {
  const [selectedSection, setSelectedSection] = useState("allbooks");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showbooks = () => setSelectedSection("allbooks");
  const showallCourses = () => setSelectedSection("allCourses");

  const [language, setLanguage] = useState("ar");
  const isArabic = language === "ar";

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <>
      <div className={`flex ${isArabic ? 'flex-col md:flex-row' : 'flex-col-reverse md:flex-row-reverse '} pt-16 w-full`}>
        <div className={`fixed top-0 z-10 transition-all duration-300 w-full lg:w-[calc(100%-20%)]`}>
          <NavbarLogin
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        <div
          className="p-4 flex-1"
          style={{
            fontFamily: "Tajwal, sans-serif",
            direction: isArabic ? "rtl" : "ltr",
            textAlign: isArabic ? "right" : "left",
          }}
        >
          <h2 className="text-xl font-bold mb-1">{isArabic ? "المتجر" : "Shop"}</h2>
          <h4 className="text-l font-bold text-gray-500 mb-4">
            {isArabic
              ? "من خلال هذه الصفحة يمكنك شراء الكتب والدورات"
              : "On this page, you can purchase books and courses"}
          </h4>
          <div className="flex mt-4">
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "allbooks" ? "bg-custom-orange" : ""
              }`}
              onClick={showbooks}
            >
              {isArabic ? "الكتب المتاحة" : "Available Books"}
            </button>
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "allCourses" ? "bg-custom-orange" : ""
              }`}
              onClick={showallCourses}
            >
              {isArabic ? "الدورات المتاحة" : "Available Courses"}
            </button>
          </div>

          {selectedSection === "allbooks" && <Allbooks />}
          {selectedSection === "allCourses" && <AllCourses />}
        </div>

        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-1/4" : "w-0"
          } ${isArabic ? "md:w-[20%] mr-auto" : "md:w-[20%] ml-auto"} h-full`}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </div>
    </>
  );
}
