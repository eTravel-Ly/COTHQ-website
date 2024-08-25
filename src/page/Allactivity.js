import React, { useState } from 'react';
import Navbar from "../component/Navbar";
import AllContests from "../component/AllContests";
import TrainingCourses from "../component/TrainingCourses";
import SeminarsAll from "../component/SeminarsAll";
import ConferencesAll from "../component/ConferencesAll";
export default function Allactivity() {
  const [selectedSection, setSelectedSection] = useState("allContests");
  const showMyContests = () => setSelectedSection("allContests");
  const showMyTrainingCourses = () => setSelectedSection("TrainingCourses");
  const showSeminars = () => setSelectedSection("allSeminars");
  const showConferences = () => setSelectedSection("allConferences");
return (
  <>
    <div className="flex h-screen">
      <div className="flex flex-col w-full mt-2 ml-1">
        <Navbar/>
      

        <div
          className="p-4"
          style={{
            fontFamily: "Tajwal, sans-serif",
            direction: "rtl",
            textAlign: "right",
          }}
        >
        
          <div className="flex mt-28 mr-8">
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-white focus:outline-none ${
                selectedSection === "allContests" ? "bg-custom-orange text-white" : "bg-gray-200"
              }`}
              onClick={showMyContests}
            >
              المسابقات
            </button>
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-white focus:outline-none ${
                selectedSection === "TrainingCourses"
                  ? "bg-custom-orange text-white"
                  : "bg-gray-200"
              }`}
              onClick={showMyTrainingCourses}

            >
              الدورات التدريبية
            </button>
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-white focus:outline-none ${
                selectedSection === "allConferences" ? "bg-custom-orange" : "bg-gray-200"
              }`}
              onClick={showConferences}

            >
                
              المؤتمرات
            </button>
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-white focus:outline-none ${
                selectedSection === "allSeminars" ? "bg-custom-orange" : "bg-gray-200"
              }`}
              onClick={showSeminars}

            >
              الندوات
            </button>
          </div>
          {selectedSection === "allContests" && <AllContests />}
          {selectedSection === "TrainingCourses" && <TrainingCourses />}
          {selectedSection === "allSeminars" && <SeminarsAll/>}
          {selectedSection === "allConferences" && <ConferencesAll/>}
        </div>
      </div>
    </div>
  </>
);
}
