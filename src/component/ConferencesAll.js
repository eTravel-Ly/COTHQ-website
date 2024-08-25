import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import cover1 from "../assets/images/test2.png";
import { CiCalendarDate } from "react-icons/ci";
import Modal from "react-modal";

// بيانات المؤتمرات
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
    title: "مؤتمر عن التغير المناخي",
    startDate: "25/09/2024",
    speaker: "أحمد علي",
    type: "conference",
  },
  {
    imageSrc: cover1,
    title: "مؤتمر عن التغير المناخي",
    startDate: "25/09/2024",
    speaker: "أحمد علي",
    type: "conference",
  },
  // أضف المزيد من المؤتمرات هنا
];

const ConferencesAll = () => {
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {conferencesData.map((item, index) => (
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
                  onClick={() => openConferenceModal(item)}
                >
                  تسجيل في المؤتمر
                </button>
              </div>
            </div>
          </div>
        ))}
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-custom-green text-white py-2 px-4 rounded w-full"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              إرسال
            </button>
          </div>
        </form>
        <button
          onClick={closeModal}
          className="absolute top-2 left-2 text-white "
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          إغلاق
        </button>
      </Modal>
    </>
  );
};

export default ConferencesAll;
