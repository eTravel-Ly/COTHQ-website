import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import MyCoursesButton from "../component/MyCoursesButton";
import WishlistButton from "../component/WishlistButton";
import ArchiveButton from "../component/ArchiveButton";


function MyCourses() {
  const [selectedSection, setSelectedSection] = useState("myCourses");
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showMyCourses = () => setSelectedSection("myCourses");
  const showWishlist = () => setSelectedSection("wishlist");
  const showArchive = () => setSelectedSection("archive");



  
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
          <h2 className="text-xl font-bold mb-1">دوراتي</h2>
          <h4 className="text-l font-bold text-gray-500">
            مواصلة مشاهدة الدورات
          </h4>

          <div className="flex flex-wrap justify-center md:justify-start mt-4 gap-2">
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "myCourses"
                  ? "bg-custom-orange text-white"
                  : ""
              }`}
              onClick={showMyCourses}
            >
              دوراتي
            </button>
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "wishlist"
                  ? "bg-custom-orange text-white"
                  : ""
              }`}
              onClick={showWishlist}
            >
              قائمة الرغبات
            </button>
            <button
              className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "archive"
                  ? "bg-custom-orange text-white"
                  : ""
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

export default MyCourses;
