import React from "react";
import cover from "../assets/images/cover.png";

// Sample data for courses with image URL and completion status
const courses = [
  {
    id: 1,
    title: "دورة تفسير القرآن الكريم",
    description: "تعلم تفسير آيات القرآن الكريم وأحكامها.",
    date: "2024-10-01",
    imageUrl: cover,
    completed: true, // Indicates if the course is completed
  },
  {
    id: 2,
    title: "دورة السيرة النبوية",
    description: "استكشاف حياة النبي محمد صلى الله عليه وسلم وأحداث السيرة.",
    date: "2024-11-01",
    imageUrl: cover,
    completed: false, // Indicates if the course is completed
  },
  {
    id: 3,
    title: "دورة الفقه الإسلامي",
    description: "تعلم قواعد وأحكام الفقه الإسلامي وتطبيقاتها.",
    date: "2024-12-01",
    imageUrl: cover,
    completed: false, // Indicates if the course is completed
  },
];

const MyTrainingCourses = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-100 shadow-lg rounded-lg p-6 mb-6 flex flex-col items-center"
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-50 object-cover rounded-lg mb-4"
            />
            <div className="w-full text-center">
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-700 mb-4">{course.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                تاريخ الدورة: {course.date}
              </p>
              <p
                className={`text-sm font-semibold ${
                  course.completed ? "text-green-500" : "text-red-500"
                }`}
              >
                {course.completed ? "تم اجتياز الدورة" : "لم يتم اجتياز الدورة"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTrainingCourses;
