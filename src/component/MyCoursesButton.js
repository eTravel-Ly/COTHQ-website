import React from "react";
import CourseImage from "../assets/images/ContinueWatchingSection1.png"; // Replace with your actual image import
import { FaRegUserCircle } from "react-icons/fa"; // Import the user circle icon from react-icons
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: CourseImage,
    progress: 90,
  },
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: CourseImage,
    progress: 75,
  },
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: CourseImage,
    progress: 20,
  },
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: CourseImage,
    progress: 30,
  },
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: CourseImage,
    progress: 100,
  },
  // Add more courses as needed
];

const MyCoursesButton = () => {
  const navigate = useNavigate();
  const openShowcourse = () => {
    navigate('/Showcourse');
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
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-4" // Adjusted size
                />
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-2"  style={{
                  fontFamily: "Tajwal, sans-serif",
                  textAlign: "justify", // توزيع النص لتملأ العرض
                  lineHeight: "1.5", // لضبط المسافة بين الأسطر
                  marginBottom: "8px" // المسافة بين الفقرات
                }}>{course.description}</p>
                <div className="flex items-center mb-2">
                  <FaRegUserCircle className="text-gray-600 ml-4" style={{ marginRight: "4px" }} />
                  <p className="text-sm text-gray-600" style={{ fontFamily: "Tajwal, sans-serif" }}>
                    {course.instructor}
                  </p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>تقدم الدورة</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-custom-orange h-2.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
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
