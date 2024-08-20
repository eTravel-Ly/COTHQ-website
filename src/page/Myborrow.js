import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import MyborrowButton from "../component/MyborrowButton";


function Myborrow() {
  const [selectedSection, setSelectedSection] = useState("myBooks");

  const showMyBooks = () => setSelectedSection("myBooks");


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
            <h2 className="text-xl font-bold mb-1">مكـــتبــتي</h2>
            <h4 className="text-l  font-bold text-gray-500">  الكــتـب مــحليـــة التى تمت استعارتها</h4>

            <div className="flex mt-4">
            <button
                className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
                  selectedSection === "myBooks" ? "bg-custom-orange" : ""
                }`}
                onClick={showMyBooks}
              >
                كتب المستعارة
              </button>
      
            </div>

            {selectedSection === "myBooks" && <MyborrowButton/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Myborrow;
