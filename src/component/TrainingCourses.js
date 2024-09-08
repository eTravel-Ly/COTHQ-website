import React, { useState, useEffect } from "react";
import cover from "../assets/images/cover.png";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from 'react-icons/fa'; // لأيقونة التحميل
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons from react-icons

Modal.setAppElement("#root"); // لتجنب تحذيرات الوصول
const TrainingCourses = () => {
  const [course, setcourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const coursesPerPage = 8;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const hasData = course.length > 0;
  const currentCourses = hasData ? course.slice(indexOfFirstCourse, indexOfLastCourse) : [];
 // const currentCourses = course.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(course.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [loading1, setLoading1] = useState(true); // حالة تحميل جديدة

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading1(true); // بدء تحميل البيانات
        const response = await axios.get(baseurl + "public/events/active", {});
        const Course = response.data.COURSE.map((course) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          date: course.eventStartDate,
          image: course.coverImageUrl, // Placeholder image for all contests
        }));
        setcourse(Course);
      } catch (error) {
        console.error("Error fetching contests:", error);
        toast.error("حدث خطأ أثناء جلب بيانات المسابقات."); // عرض رسالة خطأ باستخدام التوست
      } finally {
        setLoading1(false); // تعيين حالة التحميل إلى false بعد الانتهاء
      }
    };

    fetchContests();
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
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
    eventId: "",
  });
  const initialFormData = {
    fullName: "",
    gender: "",
    birthDate: "",
    email: "",
    mobileNo: "",
    city: "",
    nationalityCode: "",
    subscriberNotes: "",
    attachmentFile: null,
    eventId: 0,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Create an object to send in JSON format
    const dataToSend = { ...formData };
    if (dataToSend.attachmentFile) {
      // Convert file to base64 if needed for JSON
      const reader = new FileReader();
      reader.readAsDataURL(dataToSend.attachmentFile);
      reader.onloadend = async () => {
        dataToSend.attachmentFile = reader.result;
        try {
          await axios.post(baseurl + 'public/event/register', dataToSend, {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json', // Use application/json
            },
          });
          toast.success('تم التسجيل بنجاح!');
          setFormData(initialFormData); // Reset the form data
          closeModal();
        } catch (error) {
          handleErrorResponse(error);
        } finally {
          setLoading(false);
        }
      };
    } else {
      // No file to send
      try {
        await axios.post(baseurl + 'public/event/register', dataToSend, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        toast.success('تم التسجيل بنجاح!');
        setFormData(initialFormData); // Reset the form data
        closeModal();
      } catch (error) {
        handleErrorResponse(error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleErrorResponse = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.message === "Learner has already registered for this event.") {
        toast.warning('لقد قمت بالتسجيل مسبقًا!');
      } else {
        toast.warning('فشل التسجيل. يرجى المحاولة مرة أخرى.');
      }
    } else {
      console.error('Error submitting form:', error);
      toast.warning('فشل التسجيل. يرجى المحاولة مرة أخرى.');
    }
  };
  

  const openModal = (Course) => {
    setSelectedSeminar(Course);
    setFormData((prevData) => ({
      ...prevData,
      eventId: course.id,
    }));
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedSeminar(null);
    setFormData({
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
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const opencourseDetails = (id) => {
    navigate(`/TrainingCoursesDtails/${id}`);
  };

  if (loading1) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="text-4xl animate-spin" />
      </div>
    );
  }

  if (course.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
        <img
          src={noCoursesImage}
          alt="No courses available"
          className="w-60 h-60 object-cover "
        />
        <p className="text-lg text-gray-700 mt-0">
         لا يوجد دورات تدريبية تمت اضافتها في الوقت الحالى ..
        </p>
      </div>
    );
  }
  const getImageUrl = (fileName) => {
    return fileName ? `${baseurl}uploads/file/download/${fileName}` : "";
  };
  console.log(currentCourses)
  return (
    <div className="p-4">
   
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentCourses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col items-center"
            >
              <img
                  src={getImageUrl(course.image)}
                alt={course.title}
                className="w-full h-50 object-cover rounded-lg mb-4"
              />
              <div className="w-full text-center">
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-700 mb-4" style={{
                  fontFamily: "Tajwal, sans-serif",
                  textAlign: "justify",
                  lineHeight: "1.5",
                  marginBottom: "8px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  overflow: "hidden",            // إخفاء النص الزائد
                  display: "-webkit-box",         // استخدام box للنص
                  WebkitBoxOrient: "vertical",    // اتجاه الصندوق عموديًا
                  WebkitLineClamp: 3,             // عرض 4 أسطر فقط
                }}>
                  {course.description}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  تاريخ الدورة: {course.date}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-600 space-x-4 space-x-reverse">
                  <button
                    onClick={() => openModal(course)}
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
    
      <div className="mt-4">
        <ul className="flex justify-center space-x-2 items-center">
          <li>
            <button
              className="px-3 py-1 rounded-full text-custom-orange"
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              disabled={currentPage === 1}
            >
              <FaArrowRight />
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                className={`px-3 py-1 rounded-full ${
                  currentPage === index + 1
                    ? "bg-custom-orange text-white"
                    : "text-gray-700"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              className="px-3 py-1 rounded-full text-custom-orange"
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              <FaArrowLeft />
            </button>
          </li>
        </ul>
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
          تسجيل في دورة التدريبية
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-2 justify-end items-end">
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
                style={{ fontFamily: "Tajwal, sans-serif" }}
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

          
          </div>
          <div className="flex justify-center">
          <button
            type="submit"
            className="bg-custom-green text-white py-2 px-4 rounded w-full flex items-center justify-center"
            disabled={loading}
            style={{ fontFamily: "Tajwal, sans-serif" }}
          >
            {loading ? (
              <FaSpinner className="animate-spin text-lg" />
            ) : (
              'تسجيل'
            )}
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

export default TrainingCourses;
