import React, { useEffect, useState } from "react";
import CourseImage from "../assets/images/ContinueWatchingSection1.png"; // Replace with your actual image import
import { FaStar, FaRegUserCircle } from "react-icons/fa"; // Import the star icon from react-icons
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { PiUsersThreeLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";

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

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [likedCourses, setLikedCourses] = useState({});
  const navigate = useNavigate();

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
      }
    };

    fetchCourses();
  }, []);

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

  const rows = [];
  for (let i = 0; i < courses.length; i += 4) {
    rows.push(courses.slice(i, i + 4));
  }

  const openCoursesDetails = () => {
    navigate("/CoursesDetails");
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="p-4">
          {rows.map((row, index) => (
            <div key={index} className="flex flex-wrap mb-4">
              {row.map((course, idx) => (
                <div key={idx} className="w-1/4 p-2">
                  <div className="bg-white rounded-lg shadow-md p-3">
                    <img
                      src={course.imageUrl || CourseImage}
                      alt={course.title}
                      className="object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-md font-semibold mb-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {course.description}
                    </p>
                    <div className="flex items-center mt-1 mb-2">
                      <FaRegUserCircle className="text-gray-600 ml-2" />
                      <p
                        className="text-xs text-gray-600"
                        style={{ fontFamily: "Tajwal, sans-serif" }}
                      >
                        {course.createdBy}
                      </p>
                    </div>
                    {/* <div className="flex items-center mb-2">
                      <FaStar className="text-yellow-500 mr-1" />
                      <p className="text-xs mr-1">{course.rating}</p>
                    </div>
                    <div
                      className="flex items-center text-xs text-gray-600 justify-between"
                      style={{ fontFamily: "Tajwal, sans-serif" }}
                    >
                      <div className="flex items-center ml-2">
                        <MdOutlineLibraryBooks className="text-gray-600 ml-2" />
                        <p>{course.lessons}</p>
                      </div>
                      <div className="flex items-center ml-2">
                        <IoIosTimer className="text-gray-600 ml-2" />
                        <p>{course.duration}</p>
                      </div>
                      <div className="flex items-center">
                        <PiUsersThreeLight className="text-gray-600 ml-2" />
                        <p>{course.students}</p>
                      </div>
                    </div> */}
                    <div className="flex items-center justify-between mt-2">
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
                        onClick={openCoursesDetails}
                      >
                        اشتر الآن
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
