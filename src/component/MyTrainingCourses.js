import React, { useState, useEffect } from "react";
import cover from "../assets/images/cover.png";
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات



const MyTrainingCourses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setcourses] = useState([]);

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      // هنا يمكنك استبدال البيانات الثابتة بالبيانات التي تأتي من API
      setcourses([
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
        // يمكنك إضافة المزيد من المسابقات هنا
      ]);
      setLoading(false);
    }, 2000); // تعيين الوقت لمحاكاة تحميل البيانات (2 ثانية في هذه الحالة)
  }, []);
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
          className="w-60 h-60 object-cover "
        />
        <p className="text-lg text-gray-700 mt-0">
         لا يوجد دورات تدريبية تمت اضافتها في الوقت الحالى ..
        </p>
      </div>
    );
  }
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
