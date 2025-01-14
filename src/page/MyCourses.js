import React, { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import MyCoursesButton from "../component/MyCoursesButton";
import WishlistButton from "../component/WishlistButton";
import ArchiveButton from "../component/ArchiveButton";
import { useTranslation } from "../context/TranslationContext"; 

function MyCourses() {
  const [selectedSection, setSelectedSection] = useState("myCourses");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showMyCourses = () => setSelectedSection("myCourses");
  const showWishlist = () => setSelectedSection("wishlist");
  const showArchive = () => setSelectedSection("archive");

 const { translations , language} = useTranslation(); 
  const isArabic = language === "ar";

  return (
    <>
      <div
        className={`flex ${
          isArabic
            ? "flex-col md:flex-row"
            : "flex-col-reverse md:flex-row-reverse "
        } pt-16 w-full`}
      >
        <div
          className={`fixed top-0 z-10 transition-all duration-300 w-full lg:w-[calc(100%-20%)]`}
        >
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
          <h2 className="text-xl font-bold mb-1">      {translations.MyCourses}</h2>
          <h4 className="text-l font-bold text-gray-500">
          {translations.continueReadingCourses}
          </h4>

          <div className="flex flex-wrap justify-center md:justify-start mt-4 gap-2">
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "myCourses"
                  ? "bg-custom-orange text-white"
                  : ""
              }`}
              onClick={showMyCourses}
            >
              {translations.MyCourses}
            </button>
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "wishlist"
                  ? "bg-custom-orange text-white"
                  : ""
              }`}
              onClick={showWishlist}
            >
                         {translations.wishlist}

            </button>
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "archive"
                  ? "bg-custom-orange text-white"
                  : ""
              }`}
              onClick={showArchive}
            >
             {translations.archive}
            </button>
          </div>

          {selectedSection === "myCourses" && <MyCoursesButton />}
          {selectedSection === "wishlist" && <WishlistButton />}
          {selectedSection === "archive" && <ArchiveButton />}
        </div>
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-1/4" : "w-0"
          } md:w-[20%] h-full`}
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

export default MyCourses;
