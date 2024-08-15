import React, { useRef, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { FaHeart } from "react-icons/fa"; // Use FaHeart from react-icons
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../helper/Baseurl";

const NewCoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [likedCourses, setLikedCourses] = useState({});

  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

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

  useEffect(() => {
    const fetchCourses = async () => {
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
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => scrollRight(),
    onSwipedRight: () => scrollLeft(),
  });

  const openCoursesDetails = () => {
    navigate("/CoursesDetails");
  };

  return (
    <div className="p-4" {...handlers}>
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
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-50 p-2 text-2xl rounded-full shadow-md"
          aria-label="Scroll left"
        >
          &#8249;
        </button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide justify-end mx-5"
          style={{ scrollBehavior: "smooth", overflowX: "hidden" }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-lg rounded-lg p-2 w-64 flex-shrink-0 text-right"
              style={{ direction: "rtl" }}
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="h-24  w-96  object-cover rounded mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              />
              <div className="flex items-center mb-2">
                <h3
                  className="text-md font-bold mr-2"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  {course.title}
                </h3>
                <p
                  className="text-xs font-bold mr-10 text-custom-orange"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
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
                  className="bg-custom-orange text-white px-3 py-1.5 rounded-3xl text-sm"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                  onClick={openCoursesDetails}
                >
                  اشتر الآن
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-50 p-2 text-2xl rounded-full shadow-md"
          aria-label="Scroll right"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default NewCoursesSection;
