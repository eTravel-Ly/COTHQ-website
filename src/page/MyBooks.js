import React, { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import MyBookButton from "../component/MyBookButton";
import WishlistButton from "../component/WishlistBookButton";
import ArchiveButton from "../component/ArchiveBookButton";
import { useTranslation } from "../context/TranslationContext"; 

function MyBooks() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("myBooks");
  const { translations , language} = useTranslation(); 
  const isArabic = language === "ar";
  const showMyBooks = () => setSelectedSection("myBooks");
  const showWishlist = () => setSelectedSection("wishlist");
  const showArchive = () => setSelectedSection("archive");

  return (
    <>
      <div
        className={`flex ${
          isArabic
            ? "flex-col md:flex-row"
            : "flex-col-reverse md:flex-row-reverse "
        } pt-16 w-full`}
      >
        <div
          className={`fixed top-0 z-10 transition-all duration-300 w-full lg:w-[calc(100%-20%)]`}
        >
          <NavbarLogin
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        <div
          className="p-4 flex-1"
          style={{
            fontFamily: "Tajwal, sans-serif",
            direction: isArabic ? "rtl" : "ltr",
            textAlign: isArabic ? "right" : "left",
          }}
        >
          <h2 className="text-xl font-bold mb-1">{translations.libraryTitle}</h2>
          <h4 className="text-l font-bold text-gray-500">
            {translations.continueReading}
          </h4>

          <div className="flex flex-wrap justify-center md:justify-start mt-4 gap-2">
            <button
              className={`flex items-center px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "myBooks"
                  ? "bg-custom-orange text-white"
                  : ""
              }`}
              onClick={showMyBooks}
            >
              {translations.myBooks}
            </button>
            <button
              className={`flex items-center px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "wishlist"
                  ? "bg-custom-orange text-white"
                  : ""
              }`}
              onClick={showWishlist}
            >
              {translations.wishlist}
            </button>
            <button
              className={`flex items-center px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                selectedSection === "archive"
                  ? "bg-custom-orange text-white"
                  : ""
              }`}
              onClick={showArchive}
            >
              {translations.archive}
            </button>
          </div>

          <div className="mt-4">
            {selectedSection === "myBooks" && <MyBookButton />}
            {selectedSection === "wishlist" && <WishlistButton />}
            {selectedSection === "archive" && <ArchiveButton />}
          </div>
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
}

export default MyBooks;
