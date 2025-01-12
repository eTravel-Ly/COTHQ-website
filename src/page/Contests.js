import React, { useState, useEffect } from 'react';
import AllContests from "../component/AllContests";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import TrainingCourses from "../component/TrainingCourses";

const Contests = () => {
  const [selectedSection, setSelectedSection] = useState("allContests");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showContests = () => setSelectedSection("allContests");
  const showTrainingCourses = () => setSelectedSection("TrainingCourses");

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
      <div>
        <div className={`flex ${isArabic ? 'flex-col md:flex-row' : 'flex-col-reverse md:flex-row-reverse'} pt-16 w-full`}>
          <div className={`fixed top-0 z-10 transition-all duration-300 w-full lg:w-[calc(100%-20%)]`}>
            <NavbarLogin
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
          <div
            className="container px-4 sm:px-6 lg:px-8 mt-10"
            style={{
              direction: isArabic ? "rtl" : "ltr", 
              textAlign: isArabic ? "right" : "left",
              fontFamily: "Tajwal, sans-serif"
            }}
          >
            <div className="text-right border-b pb-4 mb-4">
            <h2
                className="text-lg sm:text-xl font-bold"
                style={{
                  direction: isArabic ? "rtl" : "ltr", 
                  textAlign: isArabic ? "right" : "left"
                }}
              >
                {isArabic ? "المسابقات و الدورات التدريبية" : "Contests and Training Courses"}
              </h2>

            </div>
            <div className="flex mt-4">
              <button
                className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                  selectedSection === "allContests" ? "bg-custom-orange text-white" : ""
                }`}
                onClick={showContests}
              >
                {isArabic ? "جميع المسابقات" : "All Contests"}
              </button>
              <button
                className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                  selectedSection === "TrainingCourses" ? "bg-custom-orange text-white" : ""
                }`}
                onClick={showTrainingCourses}
              >
                {isArabic ? "الدورات التدريبية" : "Training Courses"}
              </button>
            </div>
            {selectedSection === "allContests" && <AllContests />}
            {selectedSection === "TrainingCourses" && <TrainingCourses />}
          </div>
          <div
            className={`transition-all duration-300 ${isSidebarOpen ? "w-1/4" : "w-0"} ${
              isArabic ? "md:w-[20%] mr-auto" : "md:w-[20%] ml-auto"
            } h-full`}
          >
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contests;
