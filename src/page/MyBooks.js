import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import MyBookButton from "../component/MyBookButton";
import WishlistButton from "../component/WishlistBookButton";
import ArchiveButton from "../component/ArchiveBookButton";


function MyBooks() {
  const [selectedSection, setSelectedSection] = useState("myBooks");

  const showMyBooks = () => setSelectedSection("myBooks");
  const showWishlist = () => setSelectedSection("wishlist");
  const showArchive = () => setSelectedSection("archive");

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
            <h2 className="text-xl font-bold mb-1">مكتبتي</h2>
            <h4 className="text-l  font-bold text-gray-500">مواصلـــة  قراءة الكــتــب</h4>

            <div className="flex mt-4">
            <button
                className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l  font-bold text-gray-900  hover:bg-custom-orange hover:text-blue focus:outline-none ${
                  selectedSection === "myBooks" ? "bg-custom-orange" : ""
                }`}
                onClick={showMyBooks}
              >
                كتبي
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

            {selectedSection === "myBooks" && <MyBookButton/>}
            {selectedSection === "wishlist" && <WishlistButton />}
            {selectedSection === "archive" && <ArchiveButton />}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBooks;
