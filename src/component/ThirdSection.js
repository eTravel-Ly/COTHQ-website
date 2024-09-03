import React, { useEffect, useState } from "react";
import axios from "axios";
import group from "../assets/images/Group.png";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { baseurl } from "../helper/Baseurl";

function ThirdSection() {
  const [courses, setCourses] = useState([]);
  const [courseImages, setCourseImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLocalStorageValue, setIsLocalStorageValue] = useState(false); // state for localStorage value
  const coursesPerPage = 8;

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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${baseurl}all-courses`, {
        /*  headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },*/
        });
        setCourses(response.data);
        setTotalPages(Math.ceil(response.data.length / coursesPerPage));
        response.data.forEach(async (course) => {
          const imageUrl = await showPicCourses(course.coverImageUrl);
          setCourseImages((prevImages) => ({
            ...prevImages,
            [course.id]: imageUrl,
          }));
        });
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();

    // Check localStorage value on component mount
    const value = localStorage.getItem("token"); // Change "someKey" to your actual key
    setIsLocalStorageValue(!!value); // Update state based on the localStorage value
  }, []);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div id="courses" className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-semibold"
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            اكتشف دورتك
          </h2>
          <p
            className="text-gray-500"
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          >
            طريقك إلى الاكتشاف والنمو
          </p>
        </div>

        <div className="flex justify-center mb-8">
          {/* Your statistics */}
        </div>

        <div className="flex items-center justify-center space-x-4 p-2 mb-4 rounded-full bg-white border border-gray-200">
          <button
            className="px-4 py-2 bg-white rounded-full relative hover:bg-custom-orange hover:text-white"
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaArrowAltCircleLeft size={20} />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full ${currentPage === index + 1 ? 'bg-custom-orange text-white' : 'bg-gray-50 text-black'} hover:bg-custom-orange hover:text-white border border-gray-200`}
              style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
              onClick={() => handlePageChange(index + 1)}
            >
               {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-white rounded-full relative hover:bg-custom-orange hover:text-white"
            style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaArrowAltCircleRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8" style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}>
          {currentCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
            >
              <img
                src={courseImages[course.id] || group}
                alt="Course"
                className="w-full h-50 object-cover"
              />
              <div className="p-4 text-right">
                <h3
                  className="text-lg font-semibold mb-2"
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
                    overflow: "hidden",            
                    display: "-webkit-box",         
                    WebkitBoxOrient: "vertical",    
                    WebkitLineClamp: 4,             
                  }}
                >
                  {course.description}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className="text-black-500 font-bold"
                    style={{ fontFamily: "Tajwal, sans-serif" }}
                  >
                    {course.price} دينار
                  </span>
                  <button
                    className={`text-white px-4 py-2 rounded-lg ${isLocalStorageValue ? 'bg-custom-orange' : 'bg-custom-orange'}`}
                    style={{ fontFamily: "Tajwal, sans-serif" }}
                  >
                    {isLocalStorageValue ? 'اشتر الآن' : 'سجل الآن'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThirdSection;
