import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../helper/Baseurl";
import noCoursesImage from "../assets/images/Search.png"; // Replace with the path to your no courses image
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const NewCoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [likedCourses, setLikedCourses] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 4; // Updated to 4
  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get(`${baseurl}all-courses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const coursesData = response.data.map(async (course) => {
        const imageUrl = `${baseurl}uploads/file/download/${course.coverImageUrl}`;
        return { ...course, imageUrl };
      });
      const coursesWithImages = await Promise.all(coursesData);

      setCourses(coursesWithImages);

      // Initialize likedCourses state
      const initialLikedCourses = response.data.reduce((acc, course) => {
        acc[course.id] = course.isFavorite;
        return acc;
      }, {});
      setLikedCourses(initialLikedCourses);

      // Calculate total pages
      setTotalPages(Math.ceil(coursesWithImages.length / coursesPerPage));
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const currentCourses = courses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openCoursesDetails = (courseId) => {
    navigate(`/CoursesDetails/${courseId}`);
  };

  const handleLikeClick = async (id) => {
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

      if (response.data.isFavorite !== undefined) {
        setLikedCourses((prev) => ({
          ...prev,
          [id]: response.data.isFavorite,
        }));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2
        className="text-xl font-bold mb-4"
        style={{
          fontFamily: "Tajwal, sans-serif",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        الدورات التدريبية الجديدة
      </h2>
      <h4
        className="text-l font-bold text-gray-400 mb-4"
        style={{
          fontFamily: "Tajwal, sans-serif",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        شاهد الدورات التدريبية الجديدة التي تمت إضافتها.
      </h4>
      <div className="relative">
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full text-center p-4 mt-0">
            <img
              src={noCoursesImage}
              alt="No courses available"
              className="w-48 h-48 object-cover"
            />
            <p
              className="text-lg text-gray-700"
              style={{
                fontFamily: "Tajwal, sans-serif",
              }}
            >
              لا يوجد دورات تدريبية تمت اضافتها ..
            </p>
          </div>
        ) : (
          <>
           <div className="flex items-center justify-center space-x-4 p-2 mb-2 rounded-full bg-white border border-gray-200">
          <button
            className="px-4 py-2 bg-white rounded-full relative hover:bg-custom-orange hover:text-white text-custom-orange"
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaArrowAltCircleLeft size={20} />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full ${currentPage === index + 1 ? 'bg-custom-orange text-white' : 'bg-gray-50 text-black'} hover:bg-custom-orange hover:text-white border border-gray-200`}
              style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
              onClick={() => handlePageChange(index + 1)}
            >
               {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-white rounded-full relative hover:bg-custom-orange hover:text-white text-custom-orange"
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaArrowAltCircleRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6" style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}>
  {currentCourses.map((course) => (
    <div
      key={course.id}
      className="bg-white shadow-lg rounded-lg overflow-hidden p-4"
      style={{ direction: "rtl", fontSize: '14px' }} // تصغير الحجم
    >
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-full h-40 object-cover rounded-lg mb-2"
        style={{ fontFamily: "Tajwal, sans-serif" }}
      />
      <div className="flex items-center mb-2 justify-between  ">
        <h3
          className="text-xs font-bold"
          style={{ fontFamily: "Tajwal, sans-serif", fontSize: '16px' }}
        >
          {course.title}
        </h3>
        <p
          className="text-xsfont-semibold mb-2"
          style={{ fontFamily: "Tajwal, sans-serif", color: '#4A4A4A' }}
        >
          {course.price} دينار
        </p>
      </div>
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
      <div className="flex items-center justify-between mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={likedCourses[course.id] ? "#ff3f52" : "none"}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke={likedCourses[course.id] ? "#ff3f52" : "currentColor"}
          className="w-6 h-6 cursor-pointer"
          onClick={() => handleLikeClick(course.id)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
        <button
          onClick={() => openCoursesDetails(course.id)}
          className="bg-custom-orange text-white px-4 py-2 rounded-lg"
          style={{ fontFamily: "Tajwal, sans-serif", fontSize: '14px' }}
        >
          اشتر الآن
        </button>
      </div>
    </div>
  ))}
</div>

          </>
        )}
      </div>
    </div>
  );
};

export default NewCoursesSection;
