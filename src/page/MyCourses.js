import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import MyCoursesButton from "../component/MyCoursesButton";
import WishlistButton from "../component/WishlistButton";
import ArchiveButton from "../component/ArchiveButton";

function MyCourses() {
  const [selectedSection, setSelectedSection] = useState("myCourses");

  const showMyCourses = () => setSelectedSection("myCourses");
  const showWishlist = () => setSelectedSection("wishlist");
  const showArchive = () => setSelectedSection("archive");

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-[80%] mt-2 ml-1">
          <NavbarLogin />
          <div
            className="p-4"
            style={{
              fontFamily: "Tajwal, sans-serif",
              direction: "rtl",
              textAlign: "right",
            }}
          >
             <h2 className="text-xl font-bold mb-1">دوراتي</h2>
             <h4 className="text-l  font-bold text-gray-500">مواصلة مشاهدة الدورات</h4>

            <div className="flex mt-4">
              <button
                className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
                  selectedSection === "myCourses" ? "bg-custom-orange" : ""
                }`}
                onClick={showMyCourses}
              >
                دوراتي
              </button>
              <button
                className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
                  selectedSection === "wishlist" ? "bg-custom-orange" : ""
                }`}
                onClick={showWishlist}
              >
                قائمة الرغبات
              </button>
              <button
                className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
                  selectedSection === "archive" ? "bg-custom-orange" : ""
                }`}
                onClick={showArchive}
              >
                الأرشيف
              </button>
            </div>

            {selectedSection === "myCourses" && <MyCoursesButton />}
            {selectedSection === "wishlist" && <WishlistButton />}
            {selectedSection === "archive" && <ArchiveButton />}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCourses;
