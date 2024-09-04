import React, { useState, useEffect } from "react";
import { FaShareAlt, FaCheck } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import video1 from "../assets/images/1.mp4";
import user from "../assets/images/4EyBa.png";
import noCoursesImage from "../assets/images/Search.png";
import ShareModels from "../models/ShareModels"; // تأكد من مسار الاستيراد الصحيح
import { baseurl } from "../helper/Baseurl";
import axios from "axios";
import { FaExclamationTriangle } from "react-icons/fa"; 
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Showcourse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة المودال
  const [course, setCourse] = useState(null);
  const [activeButton, setActiveButton] = useState("نظرة عامة");
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);

     
  const [note, setNote] = useState("");
  const [stars, setStars] = useState(3); // Default to 5 stars
  const [error, setError] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      const response = await axios.post(
        baseurl + "add-comment",
        {
          entityType: "COURSE",
          id: courseId,
          comment: note,
          stars: stars,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNote("");
      setStars(3);

      toast.success("تم تسجيل تقييمك بنجاح ");
    } catch (error) {
      toast.error("حدث مشكلة اثناء تسجيل تقيمك ");
      console.error(error);
    }
  };

  const handleTogglePopup = () => {
    setIsModalOpen(!isModalOpen);
  };
  const navigate = useNavigate();
  const backpage = () => {
    navigate("/HomeAfterLogin");
  };


  const handleMarkAsRead = async () => {
    try {
      const response = await axios.post(
        baseurl + 'update-progress',
        {
          id: Number(courseId),  // تأكد من أن bookId يتم تمريره كرقم
          type: 'COURSE',         // النوع دائمًا "BOOK"
          progressStep: Number(100), // دائمًا 100 كعدد وليس نصًا
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success('تم وضع علامة على أنها تمت قراءتها!');
      }
    } catch (error) {
      console.error('تفاصيل الخطأ:', error.response.data);
      toast.warning('حدث خطأ أثناء وضع علامة على الدورة كـ "تمت قراءته".');
    }
  };


useEffect(() => {
  const fetchCourse = async () => {
    try {
      const response = await axios.get(`${baseurl}course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCourse();
}, [courseId]);

if (!course || !course.videos || !course.videos.length) {
  return (
    <div className="flex items-center justify-center">
      <FaExclamationTriangle className="text-red-500 text-3xl mr-2" />
      <p>No videos available or there is an issue with the video.</p>
    </div>
  );
}
const videoUrl = `${baseurl}uploads/file/download/${course.videos[0]?.fileUrl}`;

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes} دقيقة${secs > 0 ? ` و ${secs} ثانية` : ""}`;
  };

     if (loading) {
       return (
         <div className="flex justify-center items-center h-screen">
           <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
         </div>
       );
     }
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
        <img
          src={noCoursesImage}
          alt="No courses available"
          className="w-60 h-60 object-cover mb-10"
        />
        <p
          className="text-lg text-gray-700 mt-0"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          لا يوجد بيانات لعرضها الان...
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white font-tajwal min-h-screen" dir="rtl">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        {/* Right side: Arrow and Home Text */}
        <div className="flex items-center">
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={backpage}
          >
            <IoIosArrowForward className="w-6 h-6" />
          </button>
          <span className="mr-2 text-gray-700" onClick={backpage}>
            العودة إلى الصفحة الرئيسية
          </span>
        </div>

        {/* Left side: Progress Bar */}
        <div className="flex items-center">
          <span className="text-gray-700 ml-2">تقدم الدورة</span>
          <div className="w-48 bg-gray-200 rounded-full h-2 relative">
            <div
              className="bg-custom-orange h-full rounded-full"
              style={{ width: `${course.progressPercentage}%` }}
            ></div>
          </div>
          <span className="ml-2 text-gray-700">
            {course.progressPercentage}%
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4 pt-20">
        <div className="flex flex-grow">
          {/* Video Player */}
          <div className="w-3/4 p-4">
            <div className="relative">
              <video controls className="w-full rounded-lg">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  className={`mx-1 px-4 py-2 rounded-3xl text-lg text-gray-900 focus:outline-none ${
                    activeButton === "نظرة عامة"
                      ? "bg-custom-orange text-blue"
                      : "bg-blue hover:bg-custom-orange hover:text-blue"
                  }`}
                  onClick={() => setActiveButton("نظرة عامة")}
                >
                  نظرة عامة
                </button>
                <button
                  className={`mx-1 px-4 py-2 rounded-3xl text-lg text-gray-900 focus:outline-none ${
                    activeButton === "مراجعات"
                      ? "bg-custom-orange text-blue"
                      : "bg-blue hover:bg-custom-orange hover:text-blue"
                  }`}
                  onClick={() => setActiveButton("مراجعات")}
                >
                  مراجعات
                </button>
                <button
                  className={`mx-1 px-4 py-2 rounded-3xl text-lg text-gray-900 focus:outline-none ${
                    activeButton === "ملاحظات"
                      ? "bg-custom-orange text-blue"
                      : "bg-blue hover:bg-custom-orange hover:text-blue"
                  }`}
                  onClick={() => setActiveButton("ملاحظات")}
                >
                  ملاحظات
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  className="bg-white text-gray-400 px-4 py-2 rounded ml-5 flex items-center "
                  onClick={handleTogglePopup}
                >
                  <FaShareAlt className="w-5 h-5 ml-2 text-gray-400" />
                  مشاركة
                </button>
                <button
                  onClick={handleMarkAsRead}
                  className="bg-white text-gray-400 px-4 py-2 rounded flex items-center"
                >
                  <FaCheck className="w-5 h-5 ml-2 text-gray-400" />
                  ضع علامة على أنها تمت قراءة
                </button>
              </div>
            </div>
            {/* Overview Box */}
            {activeButton === "نظرة عامة" && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-md ">
                <h3 className="text-green-800 bg-green-100 text-sm font-bold mb-2 h-10 w-24 rounded-xl flex items-center justify-center">
                  أعلى تقييما
                </h3>
                <h4 className="text-2xl font-semibold mb-2">مقدمة منهجية</h4>
                <p className="text-gray-700 mb-4">{course.description}</p>

                {/* <hr className="border-gray-200 mb-4" />
                <h4 className="text-lg font-semibold mb-2">حول المؤلفين</h4>
                <div className="flex items-center p-4 border border-gray-300 rounded-lg w-72 h-24">
                  <img
                    src={user}
                    alt="Author"
                    className="w-12 h-12 rounded-full mr-1"
                  />
                  <div className="flex-1 mr-5">
                    <h5 className="text-sm font-semibold">أحمد السيد</h5>
                    <p className="text-gray-600 text-sm">أصول الفقه</p>
                    <div className="flex space-x-2 mt-2">
                      <CiFacebook className=" text-gray-600" />
                      <CiTwitter className=" text-gray-600" />
                      <PiInstagramLogoLight className=" text-gray-600" />
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 font-bold text-custom-orange rounded-full">
                    متابعة
                  </button>
                </div> */}
              </div>
            )}

            {activeButton === "مراجعات" && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                <div>
                  {/* Header for Reviews */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-gray-700 font-semibold">
                        المراجعات ({course.comments.length})
                      </span>
                      <div className="flex items-center ml-4">
                        <span className="text-yellow-500">⭐</span>
                        <span className="ml-1 text-gray-700">
                          {(
                            course.comments.reduce(
                              (acc, comment) => acc + comment.rating,
                              0
                            ) / course.comments.length
                          ).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Input and Select Elements */}
                  <div className="flex items-center mb-4 ">
                    <input
                      type="text"
                      placeholder="ابحث عن مراجعة"
                      className="p-2 border rounded-md flex-grow mr-4"
                    />
                    <select className="p-2 border rounded-md mr-2">
                      <option>تصفية حسب</option>
                      <option>الأحدث</option>
                      <option>الأعلى تقييمًا</option>
                    </select>
                    <select className="p-2 border rounded-md">
                      <option>فرز حسب</option>
                      <option>الأحدث</option>
                      <option>الأعلى تقييمًا</option>
                    </select>
                  </div>

                  {/* Comments Container */}
                  <div className="max-h-60 overflow-y-auto">
                    {loading ? (
                      <div className="flex justify-center items-center ">
                        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                    ) : course.comments.length === 0 ? (
                      <p className="text-gray-700">
                        لا توجد مراجعات متاحة، قم بإضافة تعليقك!
                      </p>
                    ) : (
                      course.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex items-start mb-4 p-4 border-b"
                        >
                          <img
                            src={user}
                            alt="User"
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="font-semibold mr-2">
                                {comment.learner.firstName}{" "}
                                {comment.learner.lastName}
                              </span>
                              <div className="flex items-center">
                                <span className="text-yellow-500">⭐</span>
                                <span className="ml-1 text-gray-700">
                                  {comment.rating}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-700">{comment.details}</p>
                            <div className="flex items-center mt-2 text-gray-600">
                              <span className="mr-2">
                                👍 {comment.likesCount}
                              </span>
                              <span>👎 {comment.dislikesCount}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeButton === "ملاحظات" && (
              <>
                <div className="flex items-center mb-4 mt-5">
                  <h3 className="text-lg font-semibold mr-4">
                    صوت واكتب ملاحظاتك :
                  </h3>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        onClick={() => setStars(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-6 h-6 cursor-pointer ${
                          star <= (hoveredStar || stars)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 17.27l5.18 3.09-1.36-5.91L21 9.24l-6.06-.52L12 3 9.06 8.72 3 9.24l4.18 4.24-1.36 5.91L12 17.27z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows="4"
                  className="w-full p-2 border rounded-md mb-4 border-custom-orange bg-gray-100"
                  placeholder="اكتب ملاحظاتك هنا..."
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-custom-orange text-white rounded-md"
                  >
                    حفظ ملاحظة
                  </button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </>
            )}
          </div>
          {/* Sidebar */}
          <div className="w-1/4 border rounded-2xl p-4 max-h-screen overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">محتوى الدورة</h2>
            <ul>
              {course.videos.map((video, index) => (
                <li
                  key={video.id}
                  className="mb-4 p-4 border rounded-md flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {index + 1}. {video.title}
                    </span>
                    <span className="text-gray-500">
                      {formatDuration(video.durationInSeconds)}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <ToastContainer position="bottom-left" />
      {isModalOpen && <ShareModels handleTogglePopup={handleTogglePopup} />}
    </div>
  );
};

export default Showcourse;
