import React, { useState } from "react";
import AllContests from "../component/AllContests";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import TrainingCourses from "../component/TrainingCourses";

const Contests = () => {
  const [selectedSection, setSelectedSection] = useState("allContests");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showContests = () => setSelectedSection("allContests");
  const showTrainingCourses = () => setSelectedSection("TrainingCourses");

  return (
    <>
      <div
        className={`fixed top-0 z-10 transition-all duration-300 sm:w-full md:w-full lg:w-[calc(100%-20%)]`}
      >
        <NavbarLogin
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className="flex flex-col md:flex-row pt-16 w-full">
        <div
          className="p-4 flex-1"
          style={{
            fontFamily: "Tajwal, sans-serif",
            direction: "rtl",
            textAlign: "right",
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold">
            {" "}
            المسابقات و الدورات التدريبية
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start mt-4 gap-2">
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "allContests"
                  ? "bg-custom-orange text-white"
                  : ""
              }`}
              onClick={showContests}
            >
              جميع المسابقات
            </button>
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "TrainingCourses"
                  ? "bg-custom-orange text-white"
                  : ""
              }`}
              onClick={showTrainingCourses}
            >
              الدورات التدريبية
            </button>
          </div>
        </div>
        <div className="mt-4">
          {selectedSection === "allContests" && <AllContests />}
          {selectedSection === "TrainingCourses" && <TrainingCourses />}
        </div>
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-full md:w-1/4" : "w-0"
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
};

export default Contests;
