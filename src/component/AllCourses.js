import React, { useEffect, useState } from "react";
import CourseImage from "../assets/images/ContinueWatchingSection1.png"; // Replace with your actual image import
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات
import { FaRegUserCircle, FaSpinner, FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons from react-icons
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";

export default function AllCourses() {
  const showPicCourses = async (fileName) => {
    try {
      const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
      console.log("Fetched image URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const [courses, setCourses] = useState([]);
  const [likedCourses, setLikedCourses] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const coursesPerPage = 8; // Number of courses per page

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${baseurl}all-courses`, {
        
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
         
        });
        const courseData = await Promise.all(
          response.data.map(async (course) => {
            const imageUrl = await showPicCourses(course.coverImageUrl);
            return { ...course, imageUrl };
          })
        );
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

 const handleLikeClick = async (id) => {
   // Toggle the favorite state optimistically
   setLikedCourses((prev) => ({
     ...prev,
     [id]: !prev[id], // Toggle the favorite status
   }));

   try {
     const response = await axios.post(
       `${baseurl}toggle-favorite`,
       {
         type: "COURSE",
         id: id,
       },
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
           "Content-Type": "application/json",
         },
       }
     );

     // Check if the response data matches the expected structure
     if (response.data.isFavorite !== undefined) {
       setLikedCourses((prev) => ({
         ...prev,
         [id]: response.data.isFavorite,
       }));
     }
   } catch (error) {
     console.error("Error toggling favorite:", error);
     // Revert the local state if there was an error
     setLikedCourses((prev) => ({
       ...prev,
       [id]: !prev[id], // Toggle back if there was an error
     }));
   }
 };

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openCoursesDetails = (courseId) => {
    navigate(`/CoursesDetails/${courseId}`);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <FaSpinner className="text-4xl animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
          <img
            src={noCoursesImage}
            alt="No courses available"
            className="w-60 h-60 object-cover"
          />
          <p className="text-lg text-gray-700 mt-0">
            لا يوجد دورات تدريبية متاحة في الوقت الحالى ..
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center p-4">
          <div className="flex flex-wrap justify-center">
            {currentCourses.map((course, idx) => (
              <div key={idx} className="w-full md:w-1/4 p-2">
                <div className="bg-white rounded-lg shadow-md p-3 h-auto flex flex-col justify-between">
                  <img
                    src={course.imageUrl || CourseImage}
                    alt={course.title}
                    className="rounded-lg mb-3 h-40"
                  />
                  <div className="flex items-center mt-1 mb-2">
                    <div className="flex-grow">
                      <h3 className="text-md font-semibold mb-1 truncate">
                        {course.title}
                      </h3>
                      <p
                        className="text-gray-600 text-xs"
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
                          WebkitLineClamp: 4,
                        }}
                      >
                        {course.description}
                      </p>
                      <div className="flex items-center mt-1 mb-2">
                        <FaRegUserCircle className="text-gray-600 " />
                        <p
                          className="text-xs text-gray-600 mr-2"
                          style={{ fontFamily: "Tajwal, sans-serif" }}
                        >
                          {course.createdBy}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={likedCourses[course.id] ? "#ff3f52" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke={
                          likedCourses[course.id] ? "#ff3f52" : "currentColor"
                        }
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => handleLikeClick(course.id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                      </svg>
                    </div>
                    <button
                      className="bg-custom-orange text-white px-4 py-2 rounded-3xl"
                      style={{ fontFamily: "Tajwal, sans-serif" }}
                      onClick={() => openCoursesDetails(course.id)}
                    >
                      اشتر الآن
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
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
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                >
                  <FaArrowLeft />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
