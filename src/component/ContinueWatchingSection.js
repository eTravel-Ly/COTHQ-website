import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { baseurl } from "../helper/Baseurl";

// Replace this with the actual path to your no courses image
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات

const ContinueWatchingSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // Function to generate image URL
  const generateImageUrl = (coverImageUrl) => {
    const baseImageUrl = `${baseurl}uploads/file/download/`;
    return coverImageUrl
      ? `${baseImageUrl}${coverImageUrl}`
      : "default-image-path"; // Replace with a path to a default image if necessary
  };

  const fetchCourses = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get(baseurl + "my-courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Filter courses with progressPercentage not equal to 100
      const validCourses = response.data.filter(
        (course) => course && course.coverImageUrl && course.progressPercentage < 100
      );

      const updatedCourses = validCourses.map((course) => ({
        ...course,
        imageUrl: generateImageUrl(course.coverImageUrl),
      }));

      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error fetching courses data", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollInterval;

    if (scrollContainer) {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollWidth !== scrollContainer.clientWidth) {
          scrollContainer.scrollLeft += 1;
          if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 20); // Adjust the interval time as needed
    }

    return () => clearInterval(scrollInterval); // Cleanup interval on unmount
  }, [courses]);

  const openShowcourse = (courseId) => {
    navigate(`/Showcourse/${courseId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4" style={{ direction: "rtl" }}>
      <h2
        className="text-xl font-bold mb-4"
        style={{
          fontFamily: "Tajwal, sans-serif",
          textAlign: "right",
        }}
      >
        الاستمرار في المشاهدة
      </h2>
      <h4
        className="text-l font-bold text-gray-400 mb-4"
        style={{
          fontFamily: "Tajwal, sans-serif",
          textAlign: "right",
        }}
      >
        استمر في مشاهدة الدورات التي بدأت مشاهدتها بالفعل
      </h4>
      <div
        ref={scrollContainerRef}
        className="relative overflow-hidden"
        style={{ height: "280px" }}
      >
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full text-center p-4 mt-0">
            <img
              src={noCoursesImage}
              alt="No courses available"
              className="w-48 h-48 object-cover"
            />
            <p className="text-lg text-gray-700" 
               style={{
                fontFamily: "Tajwal, sans-serif",
              }}>
              لا يوجد دورات قمت بشراءها .. قم بالشراء الآن
            </p>
          </div>
        ) : (
          <div
            className="flex space-x-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-3 w-56 flex-shrink-0 text-right transform transition-transform duration-300 hover:translate-x-4"
                style={{ height: "100%" }}
                onClick={() => openShowcourse(course.id)}
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
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    overflow: "hidden",            // إخفاء النص الزائد
                    display: "-webkit-box",         // استخدام box للنص
                    WebkitBoxOrient: "vertical",    // اتجاه الصندوق عموديًا
                    WebkitLineClamp: 4,             // عرض 4 أسطر فقط
                  }}
                >
                  {course.description}
                </p>
                <div className="mt-2 relative">
                  <div
                    className="absolute right-0 text-xs text-gray-700"
                    style={{ fontFamily: "Tajwal, sans-serif" }}
                  >
                    {course.progressPercentage}%
                  </div>
                  <div
                    className="absolute left-0 text-xs text-gray-700"
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
        )}
      </div>
    </div>
  );
};

export default ContinueWatchingSection;
