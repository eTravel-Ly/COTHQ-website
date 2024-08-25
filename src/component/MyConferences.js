import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import cover1 from "../assets/images/test2.png";

const conferencesData = [
  {
    imageSrc: cover1,
    title: "مؤتمر عن الذكاء الاصطناعي",
    startDate: "20/09/2024",
    speaker: "سارة حسين",
    type: "conference",
    attended: true, // Indicates if the user attended the conference
  },
  {
    imageSrc: cover1,
    title: "مؤتمر عن التغير المناخي",
    startDate: "25/09/2024",
    speaker: "أحمد علي",
    type: "conference",
    attended: false, // Indicates if the user attended the conference
  },
  {
    imageSrc: cover1,
    title: "مؤتمر عن التغير المناخي",
    startDate: "25/09/2024",
    speaker: "أحمد علي",
    type: "conference",
    attended: false, // Indicates if the user attended the conference
  },
  {
    imageSrc: cover1,
    title: "مؤتمر عن التغير المناخي",
    startDate: "25/09/2024",
    speaker: "أحمد علي",
    type: "conference",
    attended: false, // Indicates if the user attended the conference
  },
];

export default function Myconferences() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {conferencesData.map((item, index) => (
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
              {item.attended ? "تم حضور المؤتمر" : "لم يتم حضور المؤتمر"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
