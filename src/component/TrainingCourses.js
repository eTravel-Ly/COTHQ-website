import React, { useState, useEffect } from "react";
import cover from "../assets/images/cover.png";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
Modal.setAppElement("#root"); // لتجنب تحذيرات الوصول

const courses = [
  {
    id: 1,
    title: "دورة تفسير القرآن الكريم",
    description: "تعلم تفسير آيات القرآن الكريم وأحكامها.",
    date: "2024-10-01",
    imageUrl: cover,
  },
  {
    id: 2,
    title: "دورة السيرة النبوية",
    description: "استكشاف حياة النبي محمد صلى الله عليه وسلم وأحداث السيرة.",
    date: "2024-11-01",
    imageUrl: cover,
  },
  {
    id: 3,
    title: "دورة الفقه الإسلامي",
    description: "تعلم قواعد وأحكام الفقه الإسلامي وتطبيقاتها.",
    date: "2024-12-01",
    imageUrl: cover,
  },
  {
    id: 4,
    title: "دورة أصول الدين",
    description: "تعرف على أصول الدين وعقيدة الإسلام.",
    date: "2025-01-01",
    imageUrl: cover,
  },
];

const TrainingCourses = () => {
  const [course, setcourse] = useState([]);
  const navigate = useNavigate();
 useEffect(() => {
   const fetchContests = async () => {
     try {
       const response = await axios.get(baseurl + "public/events/active", {});
       const Course = response.data.COURSE.map((course) => ({
         id: course.id,
         title: course.title,
         description: course.description,
         date: course.eventStartDate,
         image: cover, // Placeholder image for all contests
       }));
       setcourse(Course);
     } catch (error) {
       console.error("Error fetching contests:", error);
       toast.error("حدث خطأ أثناء جلب بيانات المسابقات."); // عرض رسالة خطأ باستخدام التوست
     }
   };

   fetchContests();
 }, []);
  
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


  const openModal = (contest) => {
    setSelectedContest(contest);
    setFormData((prevData) => ({
      ...prevData,
      eventId: contest.id,
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
    const opencourseDetails = (id) => {
      navigate(`/TrainingCoursesDtails/${id}`);
    };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {course.map((course) => (
          <div
            key={course.id}
            className="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col items-center"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-50 object-cover rounded-lg mb-4"
            />
            <div className="w-full text-center">
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-700 mb-4">{course.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                تاريخ الدورة: {course.date}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-600 space-x-4 space-x-reverse">
                <button
                  onClick={openModal}
                  className="bg-custom-orange  text-white py-2 px-4 rounded"
                >
                  سجل الان{" "}
                </button>
                <button
                  course
                  onClick={() => opencourseDetails(course.id)}
                  className="bg-custom-orange  text-white py-2 px-4 rounded"
                >
                  تفاصيل الدورة
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
          التسجيل في الدورة التدريبية
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
      </Modal>
    </div>
  );
};

export default TrainingCourses;
