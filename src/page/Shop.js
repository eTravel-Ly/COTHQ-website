import React, { useState } from 'react';
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import Allbooks from "../component/Allbooks"
import AllCourses from "../component/AllCourses";


export default function Shop() {

  const [selectedSection, setSelectedSection] = useState("allbooks");

  const showbooks = () => setSelectedSection("allbooks");
  const showallCourses = () => setSelectedSection("allCourses");

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-[80%] mt-2 ml-1">
          <NavbarLogin />
          <div className="border-t"></div>

          <div
            className="p-4"
            style={{
              fontFamily: "Tajwal, sans-serif",
              direction: "rtl",
              textAlign: "right",
            }}
          >
            <h2 className="text-xl font-bold mb-1">المتجر</h2>
            <h4 className="text-l font-bold text-gray-500 mb-4">
              من خلال هذه الصفحة يمكنك شراء الكتب و الدروات
            </h4>
            <div className="flex mt-4">
            <button
                className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
                  selectedSection === "allbooks" ? "bg-custom-orange" : ""
                }`}
                onClick={showbooks}

              >
                الكتب المتاحة
              </button>
              <button
                className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
                  selectedSection === "allCourses" ? "bg-custom-orange" : ""
                }`}
                onClick={showallCourses}

              >
                الدورات المتاحة 
              </button>

            </div>

            {selectedSection === "allbooks" && <Allbooks/>}
            {selectedSection === "allCourses" && <AllCourses />}



          </div>
        </div>
      </div>
    </>
  );
}
