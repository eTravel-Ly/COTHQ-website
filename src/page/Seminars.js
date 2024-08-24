import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { FaRegUserCircle } from "react-icons/fa";
import cover from "../assets/images/test1.png";
import { CiCalendarDate } from "react-icons/ci";

// بيانات الندوات
const seminarsData = [
  {
    imageSrc: cover,
    title: "ندوة عن الأخلاق الحميدة",
    startDate: "01/09/2024",
    speaker: "أروى أبوزقية",
  },
  {
    imageSrc: cover,
    title: "ندوة عن التنمية الذاتية",
    startDate: "05/09/2024",
    speaker: "علي الصغير",
  },
  {
    imageSrc: cover,
    title: "ندوة عن التكنولوجيا الحديثة",
    startDate: "10/09/2024",
    speaker: "فاطمة عبد الله",
  },
  {
    imageSrc: cover,
    title: "ندوة عن الصحة النفسية",
    startDate: "15/09/2024",
    speaker: "محمد الأحمد",
  },
];

const Seminars = () => {
  // حالة لتخزين الندوات المعروضة
  const [displayedSeminars, setDisplayedSeminars] = useState(seminarsData);
  // حالة لتخزين الزر النشط
  const [activeButton, setActiveButton] = useState("all");

  // دالة لتصفية الندوات بناءً على تاريخ اليوم
  const handleTodaySeminars = () => {
    const today = new Date().toISOString().split('T')[0]; // الحصول على تاريخ اليوم بصيغة YYYY-MM-DD
    setDisplayedSeminars(
      seminarsData.filter(seminar => seminar.startDate === today)
    );
    setActiveButton("today");
  };

  // دالة لعرض جميع الندوات
  const handleAllSeminars = () => {
    setDisplayedSeminars(seminarsData);
    setActiveButton("all");
  };

  return (
    <div className="flex h-screen rtl">
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 mr-1">
        <NavbarLogin />
        <div
          className="p-4"
          style={{
            fontFamily: "Tajwal, sans-serif",
            direction: "rtl",
            textAlign: "right",
          }}
        >
          <h2 className="text-xl font-bold mb-1">ندواتي</h2>
          <h4 className="text-l font-bold text-gray-500">
            مواصلة مشاهدة الندوات
          </h4>

          {/* أزرار التصفية */}
          <div className="mb-4">
            <button
              className={`py-2 px-4 rounded mr-2 ml-4 ${activeButton === "all" ? "bg-custom-green text-white" : "bg-gray-400 text-white hover:bg-custom-green"}`}
              onClick={handleAllSeminars}
            >
              عرض جميع الندوات
            </button>
            <button
              className={`py-2 px-4 rounded ${activeButton === "today" ? "bg-custom-green text-white" : "bg-gray-400 text-white hover:bg-custom-green"}`}
              onClick={handleTodaySeminars}
            >
              عرض ندوات اليوم
            </button>
          </div>

          {/* استخدام grid لعرض العناصر في أربعة أعمدة */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedSeminars.map((seminar, index) => (
              <div key={index} className="p-2">
                <div className="bg-white rounded-lg shadow-md p-3 flex flex-col">
                  <img
                    src={seminar.imageSrc}
                    alt={seminar.title}
                    className=" object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2 text-right">{seminar.title}</h3>
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
                      تاريخ بدء الندوة: {seminar.startDate}
                    </p>
                  </div>
                 
                  <div className="flex items-center mb-2">
                    <FaRegUserCircle className="text-gray-600 mr-2 ml-2" />
                    <p
                      className="text-xs text-gray-600 text-right"
                      style={{ fontFamily: "Tajwal, sans-serif" }}
                    >
                      ملقي الندوة: {seminar.speaker}
                    </p>
                  </div>
                  <div className="flex justify-end items-center text-sm text-gray-600">
                    <button className="bg-custom-green text-white py-2 px-4 rounded ">
                      مشاهدة الندوة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seminars;
