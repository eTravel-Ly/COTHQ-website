import React, { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import noCoursesImage from "../assets/images/Search.png"; // Image for no conferences
import { baseurl } from "../helper/Baseurl";
import axios from "axios";
import cover1 from "../assets/images/test2.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons from react-icons

export default function Myconferences() {
  const [loading, setLoading] = useState(true);
  const [conferences, setConferences] = useState([]);
const fetchImageUrl = async (fileName) => {
  try {
    if (!fileName) {
      // Return a default image path if no fileName is provided
      return cover1;
    }
    const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
    console.log("Fetched image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    // Return a default image path if there is an error fetching the image
    return cover1;
  }
};
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(baseurl + "my-events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await Promise.all(
        response.data.CONFERENCE.map(async (conference) => {
          const event = conference.event;

          // Check if the event and coverImageUrl exist before fetching the image
          const imageUrl =
            event && event.coverImageUrl
              ? await fetchImageUrl(event.coverImageUrl)
              : cover1; // Use a default image if coverImageUrl is not provided

          return {
            id: conference.id,
            title: event.title,
            description: event.description,
            startDate: event.eventStartDate,
            endDate: event.eventEndDate,
            applyStartDate: event.applyStartDate,
            applyEndDate: event.applyEndDate,
            abstractApplyEndDate: event.abstractApplyEndDate,
            papersReplayDate: event.papersReplayDate,
            enrollmentEndDate: event.enrollmentEndDate,
            contactMobile: event.contactMobile,
            contactWhatsApp: event.contactWhatsApp,
            contactWebsite: event.contactWebsite,
            contactEmail: event.contactEmail,
            conditions: event.conditions,
            organizer: event.organizer,
            address: event.address,
            createdBy: event.createdBy,
            createdDate: event.createdDate,
            lastModifiedBy: event.lastModifiedBy,
            lastModifiedDate: event.lastModifiedDate,
            imageSrc: imageUrl,
            attended: conference.subscriptionStatus === "ACCEPTED",
          };
        })
      );

      setConferences(data);
    } catch (error) {
      console.error("Error fetching conferences:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

   const [currentPage, setCurrentPage] = useState(1); // Current page state
   const coursesPerPage = 8;
   const indexOfLastCourse = currentPage * coursesPerPage;
   const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
   const currentCourses = conferences.slice(
     indexOfFirstCourse,
     indexOfLastCourse
   );
   const totalPages = Math.ceil(conferences.length / coursesPerPage);
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

  if (conferences.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <img
          src={noCoursesImage}
          alt="No conferences available"
          className="w-60 h-60 object-cover"
        />
        <p className="text-lg text-gray-700 mt-4">
          لا يوجد مؤتمرات قمت بالتسجيل فيها .. سجل الان
        </p>
      </div>
    );
  }
return (
  <div className="p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {currentCourses.map((item) => (
        <div
          key={item.id}
          className="bg-gray-100 shadow-lg rounded-lg p-2 flex flex-col"
        >
          <img
            src={item.imageSrc}
            alt={item.title}
            className="object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg sm:text-xl font-bold  text-center mb-2">
            {item.title}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1  ">
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
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
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
