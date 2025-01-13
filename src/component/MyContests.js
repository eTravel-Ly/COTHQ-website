import React, { useState, useEffect } from "react";
import axios from "axios";
import allContests from "../assets/images/allContests.jpg";
import noCoursesImage from "../assets/images/Search.png"; 
import { baseurl } from "../helper/Baseurl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; 
import { useTranslation } from "../context/TranslationContext"; 

const MyContests = () => {
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState([]);

  const { translations , language} = useTranslation(); 


const fetchImageUrl = async (fileName) => {
  try {
    if (!fileName) {
      return allContests;
    }
    const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
    console.log("Fetched image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return allContests;
  }
};

const fetchData = async () => {
  try {
    const response = await axios.get(baseurl + "my-events", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await Promise.all(
      response.data.COMPETITION.map(async (contest) => {
        const imageUrl = await fetchImageUrl(contest.event.image);
        return {
          id: contest.id,
          title: contest.event.title,
          description: contest.event.description,
          image: imageUrl,
          result: contest.results || "لم يتم تحديد النتيجة بعد",
          organizer: contest.event.organizer || "غير معروف",
          address: contest.event.address || "غير محدد",
          eventStartDate: contest.event.eventStartDate || "غير محدد",
          eventEndDate: contest.event.eventEndDate || "غير محدد",
          contactMobile: contest.event.contactMobile || "غير محدد",
          contactWhatsApp: contest.event.contactWhatsApp || "غير محدد",
          subscriptionStatus: contest.subscriptionStatus || "PENDING", // حالة الاشتراك
          participationType:
            participationTypeMapping[contest.event.participationType] ||
            "غير محدد", // نوع المشاركة
        };
      })
    );

    setContests(data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching contests:", error);
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []);

const statusMapping = {
  PENDING: { text: translations.pending, color: "text-yellow-500" },
  ACCEPTED: { text: translations.accepted, color: "text-green-500" },
  WITHDRAWN: { text: translations.withdrawn, color: "text-gray-500" },
  REJECTED: { text: translations.rejected, color: "text-red-500" },
  CERTIFIED: { text: translations.certified, color: "text-blue-500" },
  ARCHIVED: { text: translations.archived, color: "text-gray-400" },
};

 const participationTypeMapping = {
   WRITING: "كتابة",
   SHARING: "مشاركة",
   ATTENDING: "حضور",
 };

 const [currentPage, setCurrentPage] = useState(1); // Current page state
 const coursesPerPage = 6;
 const indexOfLastCourse = currentPage * coursesPerPage;
 const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
 const currentCourses = contests.slice(indexOfFirstCourse, indexOfLastCourse);
 const totalPages = Math.ceil(contests.length / coursesPerPage);
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

  if (contests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
        <img
          src={noCoursesImage}
          alt="No courses available"
          className="w-60 h-60 object-cover"
        />
       <p className="text-lg text-gray-700 mt-0">
          {translations.noContestsMessage}
        </p>
      </div>
    );
  }

return (
  <div className="p-4">
      <div className="flex flex-wrap -mx-4">
        {currentCourses.map((contest) => (
          <div key={contest.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
            <div className="bg-gray-100 shadow-lg rounded-lg p-2 flex flex-col h-full">
              {/* Contest Image */}
              <img
                src={contest.image}
                alt={contest.title}
                className="h-24 w-24 object-cover rounded-lg mb-4 mx-auto"
              />
              {/* Contest Information */}
              <div className="flex flex-col flex-grow ">
                <h3 className="text-lg sm:text-xl font-bold  text-center">
                  {contest.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 ">
                  <p className="text-sm text-gray-700">
                    <strong>{translations.organizer}:</strong> {contest.organizer}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>{translations.address}:</strong> {contest.address}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>{translations.startDate}:</strong> {contest.eventStartDate}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>{translations.endDate}:</strong> {contest.eventEndDate}
                  </p>
                  <p className="text-sm text-gray-700 ">
                    <strong>{translations.participationType}:</strong> {contest.participationType}
                  </p>
                  <p
                    className="text-sm text-gray-700"
                    style={{
                      fontFamily: "Tajwal, sans-serif",
                      textAlign: "justify",
                      lineHeight: "1.5",
                      marginBottom: "8px",
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                      overflow: "hidden", 
                      display: "-webkit-box", 
                      WebkitBoxOrient: "vertical", 
                      WebkitLineClamp: 1, 
                    }}
                  >
                    <strong>{translations.description}:</strong> {contest.description}
                  </p>
                </div>

                <p
                  className={`text-lg text-center font-bold my-4 ${
                    statusMapping[contest.subscriptionStatus].color
                  }`}
                >
                  <strong className="text-black"> {translations.subscriptionStatus} :</strong>{" "}
                  {statusMapping[contest.subscriptionStatus].text}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                <p className=" text-xs text-gray-500">
                  <strong>{translations.phone} :</strong> {contest.contactMobile}
                </p>
                <p className=" text-xs text-gray-500">
                  <strong className=" text-xs">{translations.whatsapp}:</strong>{" "}
                  {contest.contactWhatsApp}
                </p>
              </div>
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

};

export default MyContests;
