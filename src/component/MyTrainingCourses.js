import React, { useState, useEffect } from "react";
import cover from "../assets/images/cover.png";
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons from react-icons

const MyTrainingCourses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setcourses] = useState([]);
  const fetchImageUrl = async (fileName) => {
    try {
      if (!fileName) {
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
  useEffect(() => {
    fetchCoursesData();
  }, []);

  const fetchCoursesData = async () => {
    try {
      const response = await axios.get(baseurl + "my-events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await Promise.all(
        response.data.COURSE.map(async (course) => {
          const imageUrl = await fetchImageUrl(course.event.imageSrc);

          return {
            id: course.id,
            title: course.event.title,
            organizer: course.event.organizer || "غير معروف",
            address: course.event.address || "غير محدد",
            description: course.event.description || "لا يوجد وصف",
            eventStartDate: course.event.eventStartDate || "غير محدد",
            eventEndDate: course.event.eventEndDate || "غير محدد",
            participationType: course.event.participationType || "غير محدد",
            contactMobile: course.event.contactMobile || "غير محدد",
            contactWhatsApp: course.event.contactWhatsApp || "غير محدد",
            imageUrl: imageUrl,
          };
        })
      );

      setcourses(data);
      console.log`Courses data fetched successfully: ${data}`;
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course data:", error);
      setLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const coursesPerPage = 8;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);
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
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
        <img
          src={noCoursesImage}
          alt="No courses available"
          className="w-60 h-60 object-cover "
        />
        <p className="text-lg text-gray-700 mt-0">
          لا يوجد دورات تدريبية تمت اضافتها في الوقت الحالى ..
        </p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCourses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-100 shadow-lg rounded-lg p-2 mb-6 flex flex-col items-center"
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-50 object-cover rounded-lg mb-4"
            />
            <div className="w-full text-center">
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {course.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 ">
                <p className="text-sm text-gray-700 ">
                  <strong>المنظم:</strong> {course.organizer}
                </p>
                <p
                  className="text-sm text-gray-700 "
                  style={{
                    fontFamily: "Tajwal, sans-serif",
                    textAlign: "justify",
                    lineHeight: "1.5",
                    marginBottom: "8px",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    overflow: "hidden", // إخفاء النص الزائد
                    display: "-webkit-box", // استخدام box للنص
                    WebkitBoxOrient: "vertical", // اتجاه الصندوق عموديًا
                    WebkitLineClamp: 1, // عرض 4 أسطر فقط
                  }}
                >
                  <strong>الوصف:</strong> {course.description}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>تاريخ البدء:</strong> {course.eventStartDate}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>تاريخ الانتهاء:</strong> {course.eventEndDate}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 ">
              <p className=" text-xs text-gray-500">
                <strong>الهاتف :</strong> {course.contactMobile}
              </p>
              <p className=" text-xs text-gray-500">
                <strong className=" text-xs">واتساب:</strong>{" "}
                {course.contactWhatsApp}
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
};

export default MyTrainingCourses;
