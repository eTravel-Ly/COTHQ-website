import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../helper/Baseurl";
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات

const MyCoursesButton = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to generate image URL
  const generateImageUrl = (coverImageUrl) => {
    const baseImageUrl = `${baseurl}uploads/file/download/`;
    return coverImageUrl
      ? `${baseImageUrl}${coverImageUrl}`
      : "default-image-path"; // Replace with a path to a default image if necessary
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${baseurl}my-courses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const validCourses = response.data.filter(
          (course) => course && course.coverImageUrl && course.progressPercentage !== 100
        );

        const updatedCourses = validCourses.map((course) => ({
          ...course,
          imageUrl: generateImageUrl(course.coverImageUrl),
        }));

        setCourses(updatedCourses);
      } catch (error) {
        console.error("Error fetching courses data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const openShowcourse = (courseId) => {
    navigate(`/Showcourse/${courseId}`);
  };

  // Split courses into rows of 4
  const rows = [];
  for (let i = 0; i < courses.length; i += 4) {
    rows.push(courses.slice(i, i + 4));
  }

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
          لا يوجد دورات مسجل بها حاليا. قم بالاشتراك في الدورات
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {rows.map((row, index) => (
        <div key={index} className="flex flex-wrap mb-4">
          {row.map((course, idx) => (
            <div
              key={idx}
              className="w-1/4 p-2"
              onClick={() => openShowcourse(course.id)}
            >
              <div className="bg-white rounded-lg shadow-md p-3">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
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
                <div className="flex items-center mb-2">
                  <FaRegUserCircle
                    className="text-gray-600 ml-4"
                    style={{ marginRight: "4px" }}
                  />
                  <p
                    className="text-xs text-gray-600"
                    style={{ fontFamily: "Tajwal, sans-serif" }}
                  >
                    {course.createdBy}
                  </p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>تقدم الدورة</span>
                  <span>{course.progressPercentage || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-custom-orange h-2.5 rounded-full"
                    style={{ width: `${course.progressPercentage || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyCoursesButton;
