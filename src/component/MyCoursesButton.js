import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../helper/Baseurl";

const MyCoursesButton = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Function to generate image URL
  const generateImageUrl = (coverImageUrl) => {
    const baseImageUrl = "http://160.19.99.6:8989/api/uploads/file/download/";
    return coverImageUrl
      ? `${baseImageUrl}${coverImageUrl}`
      : "default-image-path"; // Replace with a path to a default image if necessary
  };

  useEffect(() => {
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

    fetchCourses();
  }, []);

  const openShowcourse = () => {
    navigate("/Showcourse");
  };

  // Split courses into rows of 4
  const rows = [];
  for (let i = 0; i < courses.length; i += 4) {
    rows.push(courses.slice(i, i + 4));
  }

  return (
    <div className="p-4" onClick={openShowcourse}>
      {rows.map((row, index) => (
        <div key={index} className="flex flex-wrap mb-4">
          {row.map((course, idx) => (
            <div key={idx} className="w-1/4 p-2">
              <div className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p
                  className="text-sm text-gray-500 mb-2"
                  style={{
                    fontFamily: "Tajwal, sans-serif",
                    textAlign: "justify",
                    lineHeight: "1.5",
                    marginBottom: "8px",
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
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Tajwal, sans-serif" }}
                  >
                    {course.instructor || "Unknown Instructor"}
                  </p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>تقدم الدورة</span>
                  <span>{course.progress || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-custom-orange h-2.5 rounded-full"
                    style={{ width: `${course.progress || 0}%` }}
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
