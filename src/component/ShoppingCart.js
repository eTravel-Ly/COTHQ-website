import React from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { FaStar, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { PiUsersThreeLight } from "react-icons/pi";
import CourseImage from "../assets/images/ContinueWatchingSection1.png"; // Replace with actual path to course images
import BookImage from "../assets/images/Books-1.png";
import {  FaBook } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
const courses = [
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    price: "14.99 دينار",
    rating: 4.5,
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    lessons: 23,
    duration: "32 س",
    students: 2949,
    image: CourseImage,
  },
  // Add more courses as needed
];

const books = [
  {
    title: "شرح متن الآجرومية",
    author: "محمد بن صالح العثيمين",
    publisher: "دار النشر ثريا",
    edition: "الطبعة الرابعة 24-1-2024",
    type: "الفقه",
    price: "14.99 دينار",
    image: BookImage,
  },
  // Add more books as needed
];

function ShoppingCart() {
  const renderItem = (item, type) => (
    <div
      key={item.title}
      className="bg-white shadow-lg rounded-lg p-4 my-1 flex items-center text-right"
      style={{ direction: "rtl" }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-30 w-24  rounded mb-2 ml-4"
        style={{ fontFamily: "Tajwal, sans-serif" }}
      />
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3
            className="text-md font-bold mr-2"
            style={{ fontFamily: "Tajwal, sans-serif" }}
          >
            {item.title}
          </h3>
        </div>
        {type === "course" && (
          <>
            <p
              className="text-gray-600 text-xs"
              style={{
                fontFamily: "Tajwal, sans-serif",
                textAlign: "justify",
                lineHeight: "1.5",
                marginBottom: "8px",
              }}
            >
              {item.description}
            </p>
            <div className="flex items-center mt-2 mb-2">
              <FaRegUserCircle
                className="text-gray-600 "
                style={{ marginRight: "4px" }}
              />
              <p
                className="text-xs mr-1 text-gray-600"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                {item.instructor}
              </p>
              <p className="text-xs mr-10">{item.rating}</p>
              <FaStar style={{ color: "#FFA500", marginRight: "4px" }} />
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <MdOutlineLibraryBooks
                  className="text-gray-600"
                  style={{ marginRight: "4px" }}
                />
                <p
                  className="text-xs mr-1 text-gray-600"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  {item.lessons}
                </p>
              </div>
              <div className="flex items-center">
                <IoIosTimer
                  className="text-gray-600"
                  style={{ marginRight: "4px" }}
                />
                <p
                  className="text-xs mr-1 text-gray-600"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  {item.duration}
                </p>
              </div>
              <div className="flex items-center">
                <PiUsersThreeLight
                  className="text-gray-600"
                  style={{ marginRight: "4px" }}
                />
                <p
                  className="text-xs mr-1 text-gray-600"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  {item.students}
                </p>
              </div>
            </div>
          </>
        )}
        {type === "book" && (
          <>
            <div className="flex text-gray-700 mt-1 text-sm">
              <div className="flex items-center  font-tajwal">
                <FaRegUserCircle
                  className="text-gray-600 ml-2"
                  style={{ marginRight: "4px" }}
                />
                <span>{item.author}</span>{" "}
              </div>
            </div>

            <div className="flex text-gray-700 mt-1 text-sm justify-between">
              <div className="flex items-center ">
             
                <span className="font-bold mx-2">دار النشر</span>
                <span>{item.publisher}</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold  mx-2">الطبعة</span>
                <span>{item.edition}</span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col items-end mr-10 text-right">
        <button className="text-custom-orange mb-2">إزالة</button>
        <p className="text-lg font-bold text-custom-orange">{item.price}</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div className="border-t"></div>
        <div className="flex flex-col lg:flex-row justify-between container mx-auto mt-10 rtl">
          <div className="lg:w-1/3 rounded-lg p-6 mt-6 lg:mt-0">
            <h2 className="text-2xl font-bold mb-4 text-right">الإجمالي</h2>
            <div className="flex justify-between mb-4">
              <p className="font-bold text-lg">47.98 دينار</p>
              <p className="font-bold text-lg">الإجمالي</p>
            </div>
            <button className="bg-custom-orange text-white w-full py-2 rounded">
              إتمام الشراء
            </button>
          </div>
          <div className="lg:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4 text-right font-tajwal">
              عربة الشراء
            </h1>
            {courses.map((course) => renderItem(course, "course"))}
            {books.map((book) => renderItem(book, "book"))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
