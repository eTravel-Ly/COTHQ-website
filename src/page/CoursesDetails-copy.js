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
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

const CoursesDetails = () => {
  const [courseData, setCourseData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { courseId } = useParams();

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
        toast.success("تم إضافة الدورة إلى سلة التسوق بنجاح");
      } else {
        toast.error("حدث خطأ أثناء إضافة الدورة إلى سلة التسوق");
      }
    } catch (error) {
      console.error("Error adding course to cart:", error);
      toast.error("حدث خطأ أثناء إضافة الدورة إلى سلة التسوق");
    }
  };

  if (!courseData) {
    // Display a loading state or placeholder while fetching data
    return <div>Loading...</div>;
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
                className="rounded-md"
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
                      <FaMinus />
                    </button>
                    <span className="px-4 py-2 text-gray-700 font-tajwal">
                      {quantity}
                    </span>
                    <button
                      className="px-4 py-2 border-l border-gray-300 bg-white text-gray-700 font-tajwal"
                      onClick={handleIncrement}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 font-tajwal"
                  onClick={handleAddToCart}
                >
                  <CiShoppingCart className="ml-1" />
                  أضف إلى سلة التسوق
                </button>

                <button className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 font-tajwal">
                  <FaRegHeart className="ml-1" />
                  أضف إلى قائمة الرغبات
                </button>
              </div>
            </div>
          </div>

          {/* Related Videos Section */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4 font-tajwal">
              فيديوهات ذات صلة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <img
                    src={video.coverImageUrl}
                    alt="Related Video"
                    className="rounded-md mb-2"
                  />
                  <h3 className="text-md font-bold mb-2 font-tajwal">
                    {video.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaPlayCircle className="ml-1" />
                    <span className="font-tajwal">{video.overallRating}</span>
                  </div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 font-tajwal">
                    إشترك الآن
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesDetails;
