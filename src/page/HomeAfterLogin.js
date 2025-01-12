import React, { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import ContinueReadingSection from "../component/ContinueReadingSection";
import ContinueWatchingSection from "../component/ContinueWatchingSection";
import NewCoursesSection from "../component/NewCoursesSection";

function HomeAfterLogin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      {/* Navbar */}
   

      {/* Content and Sidebar */}
      <div
        className={`flex flex-col ${isArabic ? "md:flex-row-reverse" : "md:flex-row"} pt-16 w-full`}
      >
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-1/4" : "w-0"
          } ${isArabic ? "md:w-[20%] mr-auto" : "md:w-[10%] ml-auto"} h-full`}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        {/* Main content */}
        <div className={`flex-1 p-4 ${isArabic ? "ml-0" : "ml-0 md:ml-20"}`}>
        <div
        className={`fixed top-0 z-10 transition-all duration-300 w-full lg:w-[calc(100%-20%)]`}
      >
        <NavbarLogin
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isArabic={isArabic} // Pass the language state to NavbarLogin
        />
      </div>
          <ContinueReadingSection />
          <ContinueWatchingSection />
          <NewCoursesSection />
        </div>
      </div>
    </>
  );
}

export default HomeAfterLogin;
