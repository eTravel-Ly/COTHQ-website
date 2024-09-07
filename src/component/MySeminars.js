import React, { useState, useEffect } from "react";
import cover from "../assets/images/test1.png";
import { FaRegUserCircle } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons from react-icons

export default function MySeminars() {
  const [loading, setLoading] = useState(true);
  const [seminarsData, setseminarsData] = useState([]);
const fetchImageUrl = async (fileName) => {
  try {
    if (!fileName) {
      // Return a default image path if no fileName is provided
      return cover;
    }
    const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
    console.log("Fetched image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    // Return a default image path if there is an error fetching the image
    return cover;
  }
};
   const fetchSeminarsData = async () => {
     try {
       const response = await axios.get(`${baseurl}my-events`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       });

       const seminars = response.data.SEMINAR.map(async (seminar) => {
          const imageUrl = await fetchImageUrl(seminar.event.image);
         return {
           id: seminar.id,
           title: seminar.event.title,
           description: seminar.event.description,
           organizer: seminar.event.organizer,
           address: seminar.event.address,
           imageSrc: imageUrl,
           contactMobile: seminar.event.contactMobile || "غير محدد",
           contactWhatsApp: seminar.event.contactWhatsApp || "غير محدد",
           startDate: seminar.event.eventStartDate,
           speaker: seminar.event.contactEmail, // Assuming contactEmail is used as speaker
           attended: seminar.subscriptionStatus === "ATTENDED", // Adjust as needed
         };
       });

       const seminarData = await Promise.all(seminars);
       setseminarsData(seminarData);
     } catch (error) {
       console.error("Error fetching seminars:", error);
     } finally {
       setLoading(false);
     }
   };

   useEffect(() => {
     fetchSeminarsData();
   }, []);


const [currentPage, setCurrentPage] = useState(1); // Current page state
const coursesPerPage = 8;
const indexOfLastCourse = currentPage * coursesPerPage;
const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
const currentCourses = seminarsData.slice(
  indexOfFirstCourse,
  indexOfLastCourse
);
const totalPages = Math.ceil(seminarsData.length / coursesPerPage);
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!seminarsData || seminarsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
        <img
          src={noCoursesImage}
          alt="No courses available"
          className="w-60 h-60 object-cover"
        />
        <p className="text-lg text-gray-700 mt-0">
          لا يوجد ندوات تمت اضافتها في الوقت الحالي..
        </p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCourses.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 shadow-lg rounded-lg p-2 flex flex-col"
          >
            <img
              src={item.imageSrc}
              alt={item.title}
              className="object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg sm:text-xl font-bold  text-center mb-2">
              {item.title}
            </h3>{" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <p className="text-sm text-gray-700">
                <strong>المنظم:</strong> {item.organizer}
              </p>
              <p className="text-sm text-gray-700">
                <strong>العنوان:</strong> {item.address}
              </p>
            </div>
            <p className="text-sm text-gray-700">
              <strong>تاريخ البدء:</strong> {item.startDate}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <p className=" text-xs text-gray-500">
                <strong>الهاتف :</strong> {item.contactMobile}
              </p>
              <p className=" text-xs text-gray-500">
                <strong className=" text-xs">واتساب:</strong>{" "}
                {item.contactWhatsApp}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <ul className="flex justify-center space-x-2 items-center">
          <li>
            <button
              className="px-3 py-1 rounded-full text-custom-orange"
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              disabled={currentPage === 1}
            >
              <FaArrowRight />
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                className={`px-3 py-1 rounded-full ${
                  currentPage === index + 1
                    ? "bg-custom-orange text-white"
                    : "text-gray-700"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              className="px-3 py-1 rounded-full text-custom-orange"
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              <FaArrowLeft />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
