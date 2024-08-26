import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import cover1 from "../assets/images/test2.png";
import { CiCalendarDate } from "react-icons/ci";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root"); // لتجنب تحذيرات الوصول

// بيانات المؤتمرات
const conferencesData = [
  {
    id: 1,
    imageSrc: cover1,
    title: "مؤتمر عن الذكاء الاصطناعي",
    startDate: "20/09/2024",
    speaker: "سارة حسين",
    type: "conference",
  },
  {
    id: 1,
    imageSrc: cover1,
    title: "مؤتمر عن التغير المناخي",
    startDate: "25/09/2024",
    speaker: "أحمد علي",
    type: "conference",
  },
  {
    id: 1,
    imageSrc: cover1,
    title: "مؤتمر عن التغير المناخي",
    startDate: "25/09/2024",
    speaker: "أحمد علي",
    type: "conference",
  },
  {
    id: 1,
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
  const [selectedContest, setSelectedContest] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "MALE",
    birthDate: "",
    email: "",
    mobileNo: "",
    city: "",
    nationalityCode: "",
    subscriberNotes: "",
    attachmentFile: null,
    eventId: 0,
  });
  const navigate = useNavigate();

  const openSeminarsDetails = (Id) => {
    navigate(`/SeminarsDetails/${Id}`);
  };
  const openModal = (conferencesData) => {
    setSelectedContest(conferencesData);
    setFormData((prevData) => ({
      ...prevData,
      eventId: conferencesData.id,
    }));
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedContest(null);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // منطق إرسال البيانات هنا
    console.log(formData);
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
              <div className="flex justify-center items-center text-sm text-gray-600 space-x-4 space-x-reverse">
              <button
                className="bg-custom-green text-white py-2 px-4 rounded"
                onClick={() => openSeminarsDetails(1)}
              >
                تفاصيل المؤتمر
              </button>
              <button
                className="bg-custom-green text-white py-2 px-4 rounded"
                onClick={() => openModal(conferencesData)}
                >
                سجل الآن
              </button>
            </div>

            </div>
          </div>
        ))}
      </div>


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-lg p-4 w-[98vw] max-w-xl mx-auto"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
        style={{ direction: "rtl", fontFamily: "Tajwal, sans-serif" }}
      >
        <h2
          className="text-xl font-bold mb-6 text-center"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          تسجيل في المؤتمر
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-2 justify-end items-end">
            <div className="w-full sm:w-1/2 px-2 mb-4 text-right">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                الاسم الكامل
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
               className="block w-full p-1.5 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full sm:w-1/2 px-2 mb-4 text-right">
              <label
                htmlFor="nationalityCode"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                الرقم الوطني
              </label>
              <input
                type="text"
                id="nationalityCode"
                name="nationalityCode"
                value={formData.nationalityCode}
                onChange={handleChange}
                required
              className="block w-full p-1.5 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full sm:w-1/2 px-2 mb-4 text-right">
              <label
                htmlFor="gender"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                الجنس
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                  className="block w-full p-1.5 border border-gray-300 rounded"
                style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  <option value="">اختر</option>
                  <option value="MALE">ذكر</option>
                  <option value="FEMALE">أنثى</option>
              </select>
            </div>
            <div className="w-full sm:w-1/2 px-2 mb-4 text-right">
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                تاريخ الميلاد
              </label>
              <input
                  type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
              className="block w-full p-1.5 border border-gray-300 rounded"
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-4 text-right">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
               className="block w-full p-1.5 border border-gray-300 rounded"
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-4 text-right">
              <label
                htmlFor="mobileNo"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                رقم الهاتف
              </label>
              <input
                type="text"
                id="mobileNo"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
                className="block w-full p-1.5 border border-gray-300 rounded"
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-4 text-right">
              <label
                htmlFor="attachmentFile"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                ملف مرفق
              </label>
              <input
                type="file"
                id="attachmentFile"
                name="attachmentFile"
                onChange={handleChange}
                className="block w-full p-1 border border-gray-300 rounded cursor-pointer file:cursor-pointer file:bg-custom-green file:text-white file:px-2 file:py-1 file:border-0 file:mr-2 file:rounded file:text-sm"
                />
            </div>
            <div className="w-full sm:w-1/2 px-2 mb-4 text-right">
              <label
                htmlFor="city"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                المدينة
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="block w-full p-1.5 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full px-2 mb-4 text-right">
              <label
                htmlFor="subscriberNotes"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                ملاحظات المشترك
              </label>
              <textarea
                id="subscriberNotes"
                name="subscriberNotes"
                value={formData.subscriberNotes}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded"
                />
            </div>
          </div>

          <div className="flex justify-end">
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

    </>
  );
};

export default ConferencesAll;
