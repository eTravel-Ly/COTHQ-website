import React, { useState } from 'react';
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import MySeminars from "../component/MySeminars";
import MyContests from "../component/MyContests";
import MyTrainingCourses from "../component/MyTrainingCourses";
import MyConferences from "../component/MyConferences";


export default function MyActivity() {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("myContests");
  const showMyContests = () => setSelectedSection("myContests");
  const showMyTrainingCourses = () => setSelectedSection("myTrainingCourses");
  const showmyConferences = () => setSelectedSection("myConferences");
  const showMySeminars = () => setSelectedSection("mySeminars");
return (
  <>
    <div
      className={`fixed top-0 z-10 transition-all duration-300 w-full  lg:w-[calc(100%-20%)]`}
    >
      <NavbarLogin
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
    <div className="flex flex-col md:flex-row pt-16 w-full">
      <div className="border-t"></div>

      <div
        className="p-4 flex-1"
        style={{
          fontFamily: "Tajwal, sans-serif",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        <h2 className="text-xl font-bold mb-1">نشاطاتي</h2>
        <h4 className="text-l font-bold text-gray-500 mb-4">
          من خلال هذه الصفحة يمكنك عرض جميع النشاطات الخاصة بك
        </h4>
        <div className="flex flex-wrap justify-center md:justify-start mt-4 gap-2">
          <button
            className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
              selectedSection === "MyContests" ? "bg-custom-orange" : ""
            }`}
            onClick={showMyContests}
          >
            المسابقات
          </button>
          <button
            className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
              selectedSection === "myTrainingCourses" ? "bg-custom-orange" : ""
            }`}
            onClick={showMyTrainingCourses}
          >
            الدورات التدريبية
          </button>
          <button
            className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
              selectedSection === "myConferences" ? "bg-custom-orange" : ""
            }`}
            onClick={showmyConferences}
          >
            المؤتمرات
          </button>
          <button
            className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
              selectedSection === "mySeminars" ? "bg-custom-orange" : ""
            }`}
            onClick={showMySeminars}
          >
            الندوات
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
