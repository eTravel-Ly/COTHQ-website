import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcMoneyTransfer } from "react-icons/fc";
import { baseurl } from "../helper/Baseurl";
import noCoursesImage from "../assets/images/favorites.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const WishlistButton = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;
  const navigate = useNavigate();

  const showMyCourses = async () => {
    try {
      const response = await axios.get(`${baseurl}my-favorites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data) {
        const booksData = response.data.books;
        const coursesData = response.data.courses;
        return { books: booksData, courses: coursesData };
      }
    } catch (error) {
      console.error("Error fetching my favorites:", error);
      return { books: [], courses: [] };
    }
  };

  const showPicCourses = async (fileName) => {
    try {
      const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const toggleFavorite = async (id) => {
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
          },
        }
      );
      return response.data.isFavorite;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { courses } = await showMyCourses();
        if (courses.length === 0) return;

        const updatedCourses = await Promise.all(
          courses.map(async (course) => {
            const imageUrl = await showPicCourses(course.coverImageUrl);
            return {
              id: course.id,
              title: course.title,
              description: course.description,
              price: course.price,
              coverImageUrl: imageUrl,
              isFavorite: true,
            };
          })
        );

        setCourses(updatedCourses);
      } catch (error) {
        console.error("Error fetching courses data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openCoursesDetails = (courseId) => {
    navigate(`/CoursesDetails/${courseId}`);
  };

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleHeartClick = async (idx, courseId) => {
    const isFavorite = await toggleFavorite(courseId);
    if (isFavorite === false) {
      const updatedCourses = courses.filter((_, index) => index !== idx);
      setCourses(updatedCourses);
    }
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
          className="w-60 h-60 object-cover mb-10"
        />
        <p className="text-lg text-gray-700 mt-0">
          لا يوجد دورات قمت بالاعجاب بها ..
        </p>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="flex flex-wrap mb-4">
        {currentCourses.map((course, idx) => (
          <div key={idx} className="w-1/4 p-2">
            <div className="bg-white rounded-lg shadow-md p-3">
              <img
                src={course.coverImageUrl}
                alt={course.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="text-md font-semibold mb-1">{course.title}</h3>
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
                <FcMoneyTransfer className="text-gray-600 ml-2" />
                <p
                  className="text-xs text-gray-600"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  {course.price} دينار
                </p>
              </div>
              <div
                className="flex items-center text-xs text-gray-600 justify-between"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => handleHeartClick(idx, course.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={course.isFavorite ? "#ff3f52" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#ff3f52"
                    className="w-6 h-6"
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

export default WishlistButton;
