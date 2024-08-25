import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { FaPlayCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const CoursesDetails = () => {
  const [courseData, setCourseData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { courseId } = useParams();
const navigate = useNavigate();
  const showpicbooks = (fileName) => {
    try {
      const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
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
        const courseData = response.data;
        courseData.coverImageUrl = showpicbooks(courseData.coverImageUrl);
        setCourseData(courseData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    const fetchRelatedVideos = async () => {
      try {
        const response = await axios.get(`${baseurl}all-courses?search=%20`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const relatedVideosData = response.data.map((video) => {
          video.coverImageUrl = showpicbooks(video.coverImageUrl);
          return video;
        });
        setRelatedVideos(relatedVideosData);
      } catch (error) {
        console.error("Error fetching related videos data:", error);
      }
    };

    fetchCourse();
    fetchRelatedVideos();
  }, [courseId]);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };
    const handleAddToCart = async () => {
      try {
        const response = await axios.post(
          `${baseurl}add-to-cart`,
          {
            type: "COURSE",
            id: courseData.id,
            quantity: quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 201) {
          window.dispatchEvent(new Event('cartUpdated'));
          toast.success("تم إضافة الدورة إلى سلة التسوق بنجاح");
        } else {
          toast.error("حدث خطأ أثناء إضافة الدورة إلى سلة التسوق");
        }
      } catch (error) {
        console.error("Error adding course to cart:", error);
        toast.error("حدث خطأ أثناء إضافة الدورة إلى سلة التسوق");
      }
    };
 const openCoursesDetails = (courseId) => {
   navigate(`/CoursesDetails/${courseId}`);
 };
  if (!courseData) {
    // Display a loading state or placeholder while fetching data
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const originalPrice = courseData.price;
  const studentPrice = courseData.studentsPrice;
  const discountPercentage =
    ((originalPrice - studentPrice) / originalPrice) * 100;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div className="container mx-auto p-4" dir="rtl">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4">
            {/* Course Image */}
            <div className="md:w-1/4 p-4 relative">
              <img
                src={courseData.coverImageUrl}
                alt="Course"
                className="  rounded-md"
              />
            </div>

            {/* Course Information */}
            <div className="md:w-2/3 p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold font-tajwal">
                  {courseData.title}
                </h1>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center ml-2">
                  {Array(Math.round(courseData.overallRating))
                    .fill("")
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.192c.969 0 1.371 1.24.588 1.81l-3.396 2.47a1 1 0 00-.364 1.118l1.287 3.958c.3.921-.755 1.688-1.538 1.118l-3.396-2.47a1 1 0 00-1.176 0l-3.396 2.47c-.783.57-1.838-.197-1.538-1.118l1.287-3.958a1 1 0 00-.364-1.118l-3.396-2.47c-.783-.57-.381-1.81.588-1.81h4.192a1 1 0 00.95-.69l1.286-3.959z" />
                      </svg>
                    ))}
                </div>
                <div className="text-orange-500">
                  <span className="text-lg">{courseData.overallRating}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center font-bold font-tajwal">
                    <FaRegUserCircle className="ml-1" /> يعطي بواسطة
                  </span>
                  <span className="flex items-center font-bold font-tajwal">
                    عدد الساعات
                  </span>
                  <span className="flex items-center font-bold font-tajwal">
                    عدد الفيديوات
                  </span>
                </div>
                <div className="flex justify-between text-gray-700 mt-1">
                  <span className="flex items-center font-tajwal">
                    {courseData.comments[0]?.learner.firstName}{" "}
                    {courseData.comments[0]?.learner.lastName}
                  </span>
                  <span className="flex items-center font-tajwal">
                    {courseData.comments[0]?.course.durationInSeconds / 3600}{" "}
                  </span>
                  <span className="flex items-center font-tajwal">
                    {courseData.videos.length} فيديو
                  </span>
                </div>
              </div>

              <p
                className="mb-4"
                style={{
                  fontFamily: "Tajwal, sans-serif",
                  textAlign: "justify",
                  lineHeight: "1.5",
                  marginBottom: "8px",
                }}
              >
                {courseData.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-xl text-red_aa font-tajwal">
                    {studentPrice} دينار
                  </span>
                  <span className="line-through text-gray-500 ml-3 mr-3 font-tajwal">
                    {originalPrice} دينار
                  </span>
                  <span className="ml-2 bg-red_aa text-white px-2 py-1 text-sm rounded font-tajwal">
                    خصم {discountPercentage.toFixed(0)}%
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center border rounded">
                    <button
                      className="px-4 py-2 border-r border-gray-300 bg-white text-gray-700 font-tajwal"
                      onClick={handleDecrement}
                    >
                      <FaMinus size={12} className="text-custom-orange" />
                    </button>
                    <input
                      type="text"
                      className="border-0 p-2 w-8 text-center font-tajwal"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="px-4 py-2 border-l border-gray-300 font-tajwal bg-white text-gray-700"
                      onClick={handleIncrement}
                    >
                      <FaPlus size={12} className="text-custom-orange" />
                    </button>
                  </div>
                  <button
                    className="bg-custom-orange text-white mr-2 font-tajwal px-4 py-2 rounded ml-4 flex items-center"
                    onClick={handleAddToCart}
                  >
                    <CiShoppingCart className="mr-2 ml-3" />
                    أضف إلى سلة التسوق
                  </button>

                  <button className="bg-white border border-gray-300 rounded p-2 ml-2 flex items-center justify-center">
                    <FaRegHeart size={19} className="text-custom-orange" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4 mt-4">
            {/* Product Details */}
            <div className="md:w-2/3">
              <table className="w-full border">
                <tbody className="space-y-2">
                  <tr className="border-t border-b">
                    <td className="p-4 font-tajwal font-bold">
                      عنوان الدورة التدريبية
                    </td>
                    <td className="p-4 font-tajwal">{courseData.title}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold">الاستاذ</td>
                    <td className="p-4 font-tajwal">
                      {courseData.comments[0]?.learner.firstName}{" "}
                      {courseData.comments[0]?.learner.lastName}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold">عدد الساعات</td>
                    <td className="p-4 font-tajwal">
                      {courseData.comments[0]?.course.durationInSeconds / 3600}{" "}
                      ساعة
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold">
                      عدد الفيديوهات
                    </td>
                    <td className="p-4 font-tajwal">
                      {courseData.videos.length} فيديو
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Related Videos */}
            <div className="md:w-1/3">
              <h2 className="text-xl font-bold mb-2 font-tajwal">
                الفيديوهات ذات الصلة
              </h2>
              <div className="flex flex-col space-y-4">
                {relatedVideos.map((video) => (
                  <div key={video.id} className="flex items-center p-2 border">
                    <img
                      src={video.coverImageUrl}
                      alt={video.title}
                      className="w-16 h-25 ml-10"
                    />
                    <div className="ml-4">
                      <h3 className="font-bold font-tajwal">{video.title}</h3>
                      <p className="font-tajwal">{video.price} دينار</p>
                      <button
                        className="bg-white text-black px-2 py-1 flex rounded mt-2 font-tajwal border border-custom-orange"
                        onClick={() => openCoursesDetails(video.id)}
                      >
                        <a
                          href={video.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          اشتري الان{" "}
                        </a>
                        <CiShoppingCart className="mr-2 ml-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default CoursesDetails;
