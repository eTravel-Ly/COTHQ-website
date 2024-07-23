import React, { useRef } from "react";
import { useSwipeable } from "react-swipeable";
import CourseImage from "../assets/images/ContinueWatchingSection1.png"; // Replace with actual path to course images
import { FaStar, FaRegUserCircle } from "react-icons/fa"; // Import the star icon from react-icons
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { PiUsersThreeLight } from "react-icons/pi";

const NewCoursesSection = () => {
  const courses = [
    {
      title: "شرح متن الآجرومية",
      instructor: "شامي بن مطاعن آل شيبة القرشي",
      price: "14.99 دينار",
      rating: 4.5,
      description:
        "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
      lessons: 23,
      duration: "32 س",
      students: 2949,
      image: CourseImage,
    },
    // Add more courses as needed
  ];

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
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-2 w-64 flex-shrink-0 text-right"
              style={{ direction: "rtl" }}
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-24 object-cover rounded mb-2"
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
                  {course.price}
                </p>
              </div>
              <p
                className="text-gray-600 text-xs"
                  style={{
                fontFamily: "Tajwal, sans-serif",
                textAlign: "justify", // توزيع النص لتملأ العرض
                lineHeight: "1.5", // لضبط المسافة بين الأسطر
                marginBottom: "8px" // المسافة بين الفقرات
              }}
              >
                {course.description}
              </p>

              <div className="flex items-center mt-2">
                <FaStar style={{ color: "#FFA500", marginRight: "4px" }} />
                <p className="text-xs mr-1">{course.rating}</p>
              </div>
              <div className="flex items-center mt-2">
                <FaRegUserCircle
                  className="text-gray-600"
                  style={{ marginRight: "4px" }}
                />
                <p
                  className="text-xs mr-1 text-gray-600 "
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  {course.instructor}
                </p>
              </div>
              <div className="flex items-center mt-2 justify-between ">
                <div className="flex">
                  <MdOutlineLibraryBooks
                    className="text-gray-600"
                    style={{ marginRight: "4px" }}
                  />
                  <p
                    className="text-xs mr-1 text-gray-600 "
                    style={{ fontFamily: "Tajwal, sans-serif" }}
                  >
                    {course.lessons}
                  </p>
                </div>
                <div className="flex">
                  <IoIosTimer
                    className="text-gray-600"
                    style={{ marginRight: "4px" }}
                  />
                  <p
                    className="text-xs mr-1 text-gray-600 "
                    style={{ fontFamily: "Tajwal, sans-serif" }}
                  >
                    {course.duration}
                  </p>
                </div>
                <div className="flex">
                  <PiUsersThreeLight
                    className="text-gray-600"
                    style={{ marginRight: "4px" }}
                  />
                  <p
                    className="text-xs mr-1 text-gray-600 "
                    style={{ fontFamily: "Tajwal, sans-serif" }}
                  >
                    {course.students}
                  </p>
                </div>
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
