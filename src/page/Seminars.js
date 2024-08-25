import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { FaRegUserCircle } from "react-icons/fa";
import cover from "../assets/images/test1.png";
import { CiCalendarDate } from "react-icons/ci";
import cover1 from "../assets/images/test2.png";

// بيانات الندوات والمؤتمرات
const seminarsData = [
  {
    imageSrc: cover,
    title: "ندوة عن الأخلاق الحميدة",
    startDate: "01/09/2024",
    speaker: "أروى أبوزقية",
    type: "seminar",
  },
  {
    imageSrc: cover,
    title: "ندوة عن التنمية الذاتية",
    startDate: "05/09/2024",
    speaker: "علي الصغير",
    type: "seminar",
  },
  {
    imageSrc: cover,
    title: "ندوة عن التكنولوجيا الحديثة",
    startDate: "10/09/2024",
    speaker: "فاطمة عبد الله",
    type: "seminar",
  },
  {
    imageSrc: cover,
    title: "ندوة عن الصحة النفسية",
    startDate: "15/09/2024",
    speaker: "محمد الأحمد",
    type: "seminar",
  },
];

const conferencesData = [
  {
    imageSrc: cover1,
    title: "مؤتمر عن الذكاء الاصطناعي",
    startDate: "20/09/2024",
    speaker: "سارة حسين",
    type: "conference",
  },
  {
    imageSrc: cover1,
    title: "مؤتمر عن التغير المناخي",
    startDate: "25/09/2024",
    speaker: "أحمد علي",
    type: "conference",
  },
  {
    imageSrc: cover1,
    title: "مؤتمر عن التطوير التكنولوجي",
    startDate: "30/09/2024",
    speaker: "ليلى عبد الرحمن",
    type: "conference",
  },
];

const Seminars = () => {
  // حالة لتخزين البيانات المعروضة
  const [displayedData, setDisplayedData] = useState(seminarsData);
  // حالة لتخزين الزر النشط
  const [activeButton, setActiveButton] = useState("all");

  // دالة لعرض جميع الندوات
  const handleAllSeminars = () => {
    setDisplayedData(seminarsData);
    setActiveButton("all");
  };

  // دالة لعرض جميع المؤتمرات
  const handleAllConferences = () => {
    setDisplayedData(conferencesData);
    setActiveButton("conferences");
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
            مواصلة مشاهدة الندوات والمؤتمرات
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
              className={`py-2 px-4 rounded ${activeButton === "conferences" ? "bg-custom-green text-white" : "bg-gray-400 text-white hover:bg-custom-green"}`}
              onClick={handleAllConferences}
            >
              عرض جميع المؤتمرات
            </button>
          </div>

          {/* استخدام grid لعرض العناصر في أربعة أعمدة */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedData.map((item, index) => (
              <div key={index} className="p-2">
                <div className="bg-white rounded-lg shadow-md p-3 flex flex-col">
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
                  
                  <div className="flex justify-end items-center text-sm text-gray-600">
                    {item.type === "seminar" ? (
                      <button className="bg-custom-green text-white py-2 px-4 rounded">
                        تفاصيل الندوة
                      </button>
                    ) : (
                      <button className="bg-custom-green text-white py-2 px-4 rounded">
                        تسجيل في المؤتمر
                      </button>
                    )}
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
