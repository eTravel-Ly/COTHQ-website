import React, { useState } from "react";
import AllContests from "../component/AllContests";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import TrainingCourses from "../component/TrainingCourses";

const Contests = () => {
  const [selectedSection, setSelectedSection] = useState("allContests");

  const showContests = () => setSelectedSection("allContests");
  const showTrainingCourses = () => setSelectedSection("TrainingCourses");

  return (
    <div className="flex h-screen font-tajwal">
      <Sidebar />
      <div className="flex flex-col w-full lg:w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 rtl"
          style={{ direction: "rtl" }}
        >
          <div className="text-right border-b pb-4 mb-4">
            <h2 className="text-lg sm:text-xl font-bold"> المسابقات</h2>
          </div>
          <div className="flex mt-4">
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
              المسابقات الحالية
            </button>
          </div>
          {selectedSection === "allContests" && <AllContests />}
          {selectedSection === "TrainingCourses" && <TrainingCourses />}
        </div>
      </div>
    </div>
  );
};

export default Contests;
