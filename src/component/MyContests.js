import React, { useState, useEffect } from "react";
import allContests from "../assets/images/allContests.jpg";
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات

const MyContests = () => {
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState([]);

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      // هنا يمكنك استبدال البيانات الثابتة بالبيانات التي تأتي من API
      setContests([
        {
          id: 1,
          title: "مسابقة حفظ القرآن الكريم",
          description: "تنافس في حفظ أجزاء من القرآن الكريم وتقديمها.",
          image: allContests,
          result: "المرتبة الأولى",
        },
        {
          id: 2,
          title: "مسابقة السيرة النبوية",
          description: "اختبر معلوماتك حول حياة النبي محمد صلى الله عليه وسلم.",
          image: allContests,
          result: "المرتبة الثانية",
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
  if (contests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
        <img
          src={noCoursesImage}
          alt="No courses available"
          className="w-60 h-60 object-cover "
        />
        <p className="text-lg text-gray-700 mt-0">
         لا يوجد مسابقات تمت اضافتها في الوقت الحالى ..
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap -mx-4">
        {contests.map((contest) => (
          <div key={contest.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col h-full">
              {/* Contest Image */}
              <img
                src={contest.image}
                alt={contest.title}
                className="h-24 w-24 object-cover rounded-lg mb-4 mx-auto"
              />
              {/* Contest Information */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">
                  {contest.title}
                </h3>
                <p className="text-sm text-gray-700 mb-4 text-center">
                  {contest.description}
                </p>
                <p className="text-sm text-gray-500 text-center">
                  <strong className="font-bold">نتيجة المسابقة:</strong> {contest.result}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyContests;
