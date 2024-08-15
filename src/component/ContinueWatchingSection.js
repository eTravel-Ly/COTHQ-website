import React, { useRef, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { baseurl } from "../helper/Baseurl";

const ContinueWatchingSection = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Function to generate image URL
  const generateImageUrl = (coverImageUrl) => {
    const baseImageUrl = `${baseurl}uploads/file/download/`;
    return coverImageUrl
      ? `${baseImageUrl}${coverImageUrl}`
      : "default-image-path"; // Replace with a path to a default image if necessary
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(baseurl + "my-courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const validCourses = response.data.filter(
        (course) => course && course.coverImageUrl
      );

      const updatedCourses = validCourses.map((course) => ({
        ...course,
        imageUrl: generateImageUrl(course.coverImageUrl),
      }));

      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error fetching courses data", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const scrollContainerRef = useRef(null);

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

  const openShowcourse = () => {
    navigate('/Showcourse');
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
        الاستمرار في المشاهدة
      </h2>
      <h4
        className="text-l font-bold text-gray-400 mb-4"
        style={{
          fontFamily: "Tajwal, sans-serif",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        استمر في مشاهدة الدورات التي بدأت مشاهدتها بالفعل
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
          style={{ scrollBehavior: "smooth", height: "280px" }}
        >
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-3 w-60 flex-shrink-0 text-right"
              style={{ direction: "rtl", height: "100%" }}
              onClick={openShowcourse}
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="h-24 w-96 object-cover rounded"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              />
              <h3
                className="text-md font-bold mt-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                {course.title}
              </h3>
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
              <div className="mt-2 relative">
                <div
                  className="absolute left-0 text-xs text-gray-700"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  {course.progressPercentage}%
                </div>
                <div
                  className="absolute right-0 text-xs text-gray-700"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  تقدم الدورة
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
                <div
                  className="bg-custom-orange h-2 rounded-full"
                  style={{ width: `${course.progressPercentage}%` }}
                ></div>
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

export default ContinueWatchingSection;
