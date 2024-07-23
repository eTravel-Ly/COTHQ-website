import React from "react";
import CourseImage from "../assets/images/ContinueWatchingSection1.png"; // Replace with your actual image import
import { FaRegUserCircle } from "react-icons/fa"; // Import the user circle icon from react-icons

const courses = [
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: CourseImage,
  },
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: CourseImage,
  },
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: CourseImage,
  },
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    image: CourseImage,
  },
  // Add more courses as needed
];

const ArchiveButton = () => {
  // Split courses into rows of 4
  const rows = [];
  for (let i = 0; i < courses.length; i += 4) {
    rows.push(courses.slice(i, i + 4));
  }

  return (
    <div className="p-4">
      {rows.map((row, index) => (
        <div key={index} className="flex flex-wrap mb-4">
          {row.map((course, idx) => (
            <div key={idx} className="w-1/4 p-2">
              <div className="bg-white rounded-lg shadow-md p-3">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-3" // Adjusted size
                />
                <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-2"  style={{
                  fontFamily: "Tajwal, sans-serif",
                  textAlign: "justify", // توزيع النص لتملأ العرض
                  lineHeight: "1.5", // لضبط المسافة بين الأسطر
                  marginBottom: "8px" // المسافة بين الفقرات
                }}>{course.description}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <FaRegUserCircle className="text-gray-600 ml-2" />
                  <p className="text-sm" style={{ fontFamily: "Tajwal, sans-serif" }}>
                    {course.instructor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ArchiveButton;
