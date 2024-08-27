import React, { useState, useEffect } from "react";
import cover from "../assets/images/test1.png";
import { FaRegUserCircle } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات

export default function MySeminars() {
  const [loading, setLoading] = useState(true);
  const [seminarsData, setseminarsData] = useState([]);

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      // هنا يمكنك استبدال البيانات الثابتة بالبيانات التي تأتي من API
      setseminarsData([
        {
          imageSrc: cover,
          title: "ندوة عن الأخلاق الحميدة",
          startDate: "01/09/2024",
          speaker: "أروى أبوزقية",
          attended: false,
        },
        {
          imageSrc: cover,
          title: "ندوة عن التنمية الذاتية",
          startDate: "05/09/2024",
          speaker: "علي الصغير",
          attended: true,
        },
        {
          imageSrc: cover,
          title: "ندوة عن التكنولوجيا الحديثة",
          startDate: "10/09/2024",
          speaker: "فاطمة عبد الله",
          attended: false,
        },
        {
          imageSrc: cover,
          title: "ندوة عن الصحة النفسية",
          startDate: "15/09/2024",
          speaker: "محمد الأحمد",
          attended: true,
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
  if (!seminarsData || seminarsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
        <img
          src={noCoursesImage}
          alt="No courses available"
          className="w-60 h-60 object-cover"
        />
        <p className="text-lg text-gray-700 mt-0">
          لا يوجد ندوات تمت اضافتها في الوقت الحالي..
        </p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {seminarsData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col"
          >
            <img
              src={item.imageSrc}
              alt={item.title}
              className="object-cover rounded-lg mb-4"
            />
            <h2 className="text-sm font-bold mb-2 text-right">{item.title}</h2>
            <div className="flex items-center mb-2">
              <CiCalendarDate className="text-gray-600 mr-2 ml-2" />
              <p
                className="text-xs text-gray-500 mb-2 text-right"
                style={{
                  fontFamily: "Tajwal, sans-serif",
                  textAlign: "justify",
                  lineHeight: "1.5",
                  marginBottom: "8px",
                }}
              >
                تاريخ بدء: {item.startDate}
              </p>
            </div>

            <div className="flex items-center mb-2">
              <FaRegUserCircle className="text-gray-600 mr-2 ml-2" />
              <p
                className="text-xs text-gray-600 text-right"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                المتحدث: {item.speaker}
              </p>
            </div>

            {/* Display attendance status */}
            <p
              className={`text-sm font-semibold ${
                item.attended ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.attended ? "تم حضور الندوة" : "لم يتم حضور الندوة"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
