import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import cover from "../assets/images/test1.png";

// بيانات الندوات
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
  // أضف المزيد من الندوات هنا
];

const SeminarsAll = () => {
  const navigate = useNavigate();

  const openSeminarsDetails = (Id) => {
    navigate(`/SeminarsDetails/${Id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {seminarsData.map((item, index) => (
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
              <button
                className="bg-custom-green text-white py-2 px-4 rounded"
                onClick={() => openSeminarsDetails(1)}
              >
                تفاصيل الندوة
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeminarsAll;