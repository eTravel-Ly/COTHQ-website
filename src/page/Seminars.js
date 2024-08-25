import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { FaRegUserCircle } from "react-icons/fa";
import cover from "../assets/images/test1.png";
import { CiCalendarDate } from "react-icons/ci";
import cover1 from "../assets/images/test2.png";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

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
  const navigate = useNavigate();

  // حالة لتخزين البيانات المعروضة
  const [displayedData, setDisplayedData] = useState(seminarsData);
  // حالة لتخزين الزر النشط
  const [activeButton, setActiveButton] = useState("all");

  // دالة لعرض جميع الندوات
  const handleAllSeminars = () => {
    setDisplayedData(seminarsData);
    setActiveButton("all");
  };
  const openSeminarsDetails = (Id) => {
    navigate(`/SeminarsDetails/${Id}`);
  };
  // دالة لعرض جميع المؤتمرات
  const handleAllConferences = () => {
    setDisplayedData(conferencesData);
    setActiveButton("conferences");
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);
  const openConferenceModal = (conference) => {
    setSelectedConference(conference);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedConference(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("تم التسجيل بنجاح!");
    closeModal();
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
              className={`py-2 px-4 rounded mr-2 ml-4 ${
                activeButton === "all"
                  ? "bg-custom-green text-white"
                  : "bg-gray-400 text-white hover:bg-custom-green"
              }`}
              onClick={handleAllSeminars}
            >
              عرض جميع الندوات
            </button>

            <button
              className={`py-2 px-4 rounded ${
                activeButton === "conferences"
                  ? "bg-custom-green text-white"
                  : "bg-gray-400 text-white hover:bg-custom-green"
              }`}
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
                  <h2 className="text-sm font-bold mb-2 text-right">
                    {item.title}
                  </h2>
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
                      <button
                        className="bg-custom-green text-white py-2 px-4 rounded"
                        onClick={() => openSeminarsDetails(1)}
                      >
                        تفاصيل الندوة
                      </button>
                    ) : (
                      <button
                        className="bg-custom-green text-white py-2 px-4 rounded"
                        onClick={() => openConferenceModal(item)}
                      >
                        تسجيل في المؤتمر
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="bg-white rounded-lg p-8 w-[90vw] max-w-md mx-auto"
          overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
          style={{ direction: "rtl", fontFamily: "Tajwal, sans-serif" }}
        >
          <h2
            className="text-xl font-bold mb-4 text-center"
            style={{ fontFamily: "Tajwal, sans-serif" }}
          >
            تسجيل في المؤتمر
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-end">
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                اسمك
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col items-end">
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                العنوان
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col items-end">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col items-end">
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-1"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                رقم الهاتف
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                required
                className="block w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col-reverse mt-4 gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded w-full"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-custom-green text-white py-2 px-4 rounded w-full"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                تأكيد التسجيل
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Seminars;
