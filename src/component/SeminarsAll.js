import React, { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import cover from "../assets/images/test1.png";
import Modal from "react-modal";

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
            <div className="flex justify-center items-center text-sm text-gray-600 space-x-4 space-x-reverse">
              <button
                className="bg-custom-green text-white py-2 px-4 rounded"
                onClick={() => openSeminarsDetails(1)}
              >
                تفاصيل الندوة
              </button>
              <button
                className="bg-custom-green text-white py-2 px-4 rounded"
                onClick={() => openConferenceModal(item)}
              >
                سجل الان
              </button>
            </div>

          </div>
        </div>
      ))}
<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  className="bg-white rounded-lg p-6 w-[98vw] max-w-xl mx-auto"
  overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
  style={{ direction: "rtl", fontFamily: "Tajwal, sans-serif" }}
>
  <h2
    className="text-xl font-bold mb-4 text-center"
    style={{ fontFamily: "Tajwal, sans-serif" }}
  >
    تسجيل في الندوة
  </h2>
  <form onSubmit={handleSubmit} className="space-y-3">
    <div className="flex flex-col items-end">
      <label
        htmlFor="nationalId"
        className="block text-sm font-medium mb-1"
        style={{ fontFamily: "Tajwal, sans-serif" }}
      >
        الرقم الوطني
      </label>
      <input
        type="text"
        id="nationalId"
        name="nationalId"
        required
        className="block w-full p-2 border border-gray-300 rounded"
      />
    </div>
    {/* الاسم الكامل والنوع */}
    <div className="flex space-x-4">
      <div className="flex flex-col items-end w-1/2">
        <label
          htmlFor="gender"
          className="block text-sm font-medium mb-1"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          الجنس
        </label>
        <select
          id="gender"
          name="gender"
          required
          className="block w-full p-1.5 border border-gray-300 rounded"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          <option value="">اختر</option>
          <option value="MALE">ذكر</option>
          <option value="FEMALE">أنثى</option>
        </select>
      </div>
      <div className="flex flex-col items-end w-1/2">
        <label
          htmlFor="fullName"
          className="block text-sm font-medium mb-1"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          الاسم الكامل
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          className="block w-full p-1.5 border border-gray-300 rounded"
        />
      </div>
    </div>
    {/* تاريخ الميلاد والبريد الإلكتروني */}
    <div className="flex space-x-4">
      <div className="flex flex-col items-end w-1/2">
        <label
          htmlFor="birthDate"
          className="block text-sm font-medium mb-1"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          تاريخ الميلاد
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          required
          className="block w-full p-1.5 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col items-end w-1/2">
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
          className="block w-full p-1.5 border border-gray-300 rounded"
        />
      </div>
    </div>
    {/* رقم الهاتف والمدينة */}
    <div className="flex space-x-4">
      <div className="flex flex-col items-end w-1/2">
        <label
          htmlFor="mobileNo"
          className="block text-sm font-medium mb-1"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          رقم الهاتف
        </label>
        <input
          type="text"
          id="mobileNo"
          name="mobileNo"
          required
          className="block w-full p-1.5 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col items-end w-1/2">
        <label
          htmlFor="city"
          className="block text-sm font-medium mb-1"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          المدينة
        </label>
        <input
          type="text"
          id="city"
          name="city"
          required
          className="block w-full p-1.5 border border-gray-300 rounded"
        />
      </div>
    </div>
    {/* الجنسية وتحميل الملف */}
    <div >
     
      <div className="flex flex-col items-end">
        <label
          htmlFor="attachmentFile"
          className="block text-sm font-medium mb-1"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          تحميل الملف
        </label>
        <input
          type="file"
          id="attachmentFile"
          name="attachmentFile"
          className="block w-full p-1 border border-gray-300 rounded cursor-pointer file:cursor-pointer file:bg-custom-green file:text-white file:px-3 file:py-1.5 file:border-0 file:mr-2 file:rounded file:text-sm"
/>
      </div>
    </div>
    {/* ملاحظات */}
    <div className="flex flex-col items-end">
      <label
        htmlFor="subscriberNotes"
        className="block text-sm font-medium mb-1"
        style={{ fontFamily: "Tajwal, sans-serif" }}
      >
        ملاحظات
      </label>
      <textarea
        id="subscriberNotes"
        name="subscriberNotes"
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
    className="absolute top-2 left-2 text-white"
    style={{ fontFamily: "Tajwal, sans-serif" }}
  >
    إغلاق
  </button>
</Modal>





    </div>
    
  );
};

export default SeminarsAll;