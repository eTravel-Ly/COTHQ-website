import React from "react";
import CourseImage from "../assets/images/ContinueWatchingSection1.png"; // Replace with your actual image import
import { FaStar, FaRegUserCircle } from "react-icons/fa"; // Import the star icon from react-icons
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { PiUsersThreeLight } from "react-icons/pi";

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
  // Add more courses if needed
];

const WishlistButton = () => {
  const rows = [];
  for (let i = 0; i < courses.length; i += 4) {
    rows.push(courses.slice(i, i + 4));
  }

  return (
    <div className="p-2">
      {rows.map((row, index) => (
        <div key={index} className="flex flex-wrap mb-4">
          {row.map((course, idx) => (
            <div key={idx} className="w-1/4 p-2">
              <div className="bg-white rounded-lg shadow-md p-3">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="text-md font-semibold mb-1">{course.title}</h3>

                <p className="text-xs text-gray-500 mb-2">{course.description}</p>
                <div className="flex items-center mt-1 mb-2">
                  <FaRegUserCircle
                    className="text-gray-600 ml-2"
                  />
                  <p className="text-xs text-gray-600" style={{ fontFamily: "Tajwal, sans-serif" }}>
                    {course.instructor}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <FaStar className="text-yellow-500 mr-1" />
                  <p className="text-xs mr-1">{course.rating}</p>
                </div>
                <div className="flex items-center text-xs text-gray-600 justify-between" style={{ fontFamily: "Tajwal, sans-serif" }}>
                  <div className="flex items-center ml-2">
                    <MdOutlineLibraryBooks className="text-gray-600 ml-2" />
                    <p>{course.lessons}</p>
                  </div>
                  <div className="flex items-center ml-2">
                    <IoIosTimer className="text-gray-600 ml-2" />
                    <p>{course.duration}</p>
                  </div>
                  <div className="flex items-center">
                    <PiUsersThreeLight className="text-gray-600 ml-2" />
                    <p>{course.students}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WishlistButton;
