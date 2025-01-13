import React, { useState, useEffect } from 'react';
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import MySeminars from "../component/MySeminars";
import MyContests from "../component/MyContests";
import MyTrainingCourses from "../component/MyTrainingCourses";
import MyConferences from "../component/MyConferences";
import { useTranslation } from "../context/TranslationContext"; 

export default function MyActivity() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("myContests");
  const showMyContests = () => setSelectedSection("myContests");
  const showMyTrainingCourses = () => setSelectedSection("myTrainingCourses");
  const showmyConferences = () => setSelectedSection("myConferences");
  const showMySeminars = () => setSelectedSection("mySeminars");

  const { translations , language} = useTranslation(); 
  const isArabic = language === "ar";

  return (
    <>
      <div className={`flex ${isArabic ? 'flex-col md:flex-row' : 'flex-col-reverse md:flex-row-reverse '} pt-16 w-full`}>
        <div
          className={`fixed top-0 z-10 transition-all duration-300 w-full lg:w-[calc(100%-20%)]`}
        >
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
          <h2 className="text-xl font-bold mb-1">
          {translations.titleActivity}
          </h2>
          <h4 className="text-l font-bold text-gray-500 mb-4">
          {translations.descriptionActivity}
          </h4>
          <div className="flex flex-wrap justify-center md:justify-start mt-4 gap-2">
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "myContests" ? "bg-custom-orange" : ""
              }`}
              onClick={showMyContests}
            >
             {translations.contestsButton}
            </button>
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "myTrainingCourses" ? "bg-custom-orange" : ""
              }`}
              onClick={showMyTrainingCourses}
            >
                 {translations.trainingCoursesButton}
            </button>
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "myConferences" ? "bg-custom-orange" : ""
              }`}
              onClick={showmyConferences}
            >
                 {translations.conferencesButton}
            </button>
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "mySeminars" ? "bg-custom-orange" : ""
              }`}
              onClick={showMySeminars}
            >
               {translations.seminarsButton}
            </button>
          </div>
          <div className="mt-4">
            {selectedSection === "myContests" && <MyContests />}
            {selectedSection === "myTrainingCourses" && <MyTrainingCourses />}
            {selectedSection === "myConferences" && <MyConferences />}
            {selectedSection === "mySeminars" && <MySeminars />}
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
}
