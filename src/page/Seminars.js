import React, { useState, useEffect } from 'react';
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import SeminarsAll from "../component/SeminarsAll";
import ConferencesAll from "../component/ConferencesAll";
import { useTranslation } from "../context/TranslationContext"; 

const Seminars = () => {
  const [selectedSection, setSelectedSection] = useState("allSeminars");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSeminars = () => setSelectedSection("allSeminars");
  const showConferences = () => setSelectedSection("allConferences");

  const { translations , language} = useTranslation(); 
  const isArabic = language === "ar";



  return (
    <>
      <div className={`flex ${isArabic ? 'flex-col md:flex-row' : 'flex-col-reverse md:flex-row-reverse '} pt-16 w-full`}>
        <div className={`fixed top-0 z-10 transition-all duration-300 w-full lg:w-[calc(100%-20%)]`}>
          <NavbarLogin
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
        <div className="border-t"></div>


        <div
          className="p-4 flex-1"
          style={{
            fontFamily: "Tajwal, sans-serif",
            direction: isArabic ? "rtl" : "ltr",
            textAlign: isArabic ? "right" : "left",
          }}
        >
          <h2 className="text-xl font-bold mb-1">{translations.seminarsAndConferences}</h2>
          <h4 className="text-l font-bold text-gray-500">
          {translations.continueWatching}
          </h4>

          <div className="flex flex-wrap justify-center md:justify-start mt-4 gap-2">
            <button
              className={`py-2 px-4 rounded mr-2 ml-4 ${
                selectedSection === "allSeminars"
                  ? "bg-custom-green text-white"
                  : "bg-gray-400 text-white hover:bg-custom-green"
              }`}
              onClick={showSeminars}
            >
             {translations.viewAllSeminars}
            </button>

            <button
              className={`py-2 px-4 rounded ${
                selectedSection === "allConferences"
                  ? "bg-custom-green text-white"
                  : "bg-gray-400 text-white hover:bg-custom-green"
              }`}
              onClick={showConferences}
            >
             {translations.viewAllConferences}
            </button>
          </div>

          <div className="mt-4">
            {selectedSection === "allSeminars" && <SeminarsAll />}
            {selectedSection === "allConferences" && <ConferencesAll />}
          </div>
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
};

export default Seminars;