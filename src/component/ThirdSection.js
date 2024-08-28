import React, { useEffect, useState } from "react";
import axios from "axios";
import group from "../assets/images/Group.png";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { baseurl } from "../helper/Baseurl";
function ThirdSection() {
  const [courses, setCourses] = useState([]);
 const [courseImages, setCourseImages] = useState({});
  const showPicCourses = async (fileName) => {
    try {
      const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
      console.log("Fetched image URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  useEffect(() => {
    axios
      .get(baseurl + "all-courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCourses(response.data);
        response.data.forEach(async (course) => {
          const imageUrl = await showPicCourses(course.coverImageUrl);
          setCourseImages((prevImages) => ({
            ...prevImages,
            [course.id]: imageUrl,
          }));
        });
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

 return (
   <div id="courses" className="w-full bg-white py-16">
     <div className="container mx-auto px-4">
       <div className="text-center mb-12">
         <h2
           className="text-3xl font-semibold"
           style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
         >
         اكتشف دورتك
         </h2>
         <p
           className="text-gray-500"
           style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
         >
           طريقك إلى الاكتشاف والنمو
         </p>
       </div>

       <div className="flex justify-center mb-8">
         <div className="text-center mx-4">
           <p
             className="text-lg font-semibold text-green-500"
             style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
           >
             128 ك
           </p>
           <p
             className="text-gray-500"
             style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
           >
             Ipsum Dolor
           </p>
         </div>
         <div className="text-center mx-4">
           <p
             className="text-lg font-semibold text-green-500"
             style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
           >
             12.8 ك
           </p>
           <p
             className="text-gray-500"
             style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
           >
             Lorem Ipsum
           </p>
         </div>
         <div className="text-center mx-4">
           <p
             className="text-lg font-semibold text-green-500"
             style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
           >
             8.9 م
           </p>
           <p
             className="text-gray-500"
             style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
           >
             Lorem Sit
           </p>
         </div>
       </div>

       <div className="flex items-center justify-center space-x-4 p-2 mb-4 rounded-full bg-white border border-gray-200">
         <button
           className="px-4 py-2 bg-white rounded-full relative hover:bg-custom-orange hover:text-white"
           style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
         >
           <FaArrowAltCircleLeft size={20} />
         </button>
         <button
           className="px-4 py-2 bg-gray-50 rounded-full relative hover:bg-custom-orange hover:text-white border border-gray-200"
           style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
         >
           الصفحة الرئيسية
         </button>
         <button
           className="px-4 py-2 bg-gray-50 rounded-full relative hover:bg-custom-orange hover:text-white border border-gray-200"
           style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
         >
           الصفحة الثانية
         </button>
         <button
           className="px-4 py-2 bg-gray-50 rounded-full relative hover:bg-custom-orange hover:text-white border border-gray-200"
           style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
         >
           الصفحة الثالثة
         </button>
         <button
           className="px-4 py-2 bg-gray-50 rounded-full relative hover:bg-custom-orange hover:text-white border border-gray-200"
           style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
         >
           الصفحة الرابعة
         </button>
         <button
           className="px-4 py-2 bg-gray-50 rounded-full relative hover:bg-custom-orange hover:text-white border border-gray-200"
           style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
         >
           الصفحة الخامسة
         </button>
         <button
           className="px-4 py-2 bg-gray-50 rounded-full relative hover:bg-custom-orange hover:text-white border border-gray-200"
           style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
         >
           الصفحة الحالية
         </button>
         <button
           className="px-4 py-2 bg-white rounded-full relative hover:bg-custom-orange hover:text-white "
           style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
         >
           <FaArrowAltCircleRight size={20} />
         </button>
       </div>

       <div
         className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8 justify-items-center"
         style={{ direction: "rtl" }}
       >
         {courses.map((course, index) => (
           <div
             key={index}
             className="bg-white shadow-lg rounded-lg overflow-hidden"
             style={{ direction: "rtl" }}
           >
             <img
               src={courseImages[course.id] || group}
               alt="Course"
               className="w-full h-50 object-cover"
             />
             <div className="p-4 text-right">
               <h3
                 className="text-lg font-semibold mb-2"
                 style={{ fontFamily: "Tajwal, sans-serif" }}
               >
                 {course.title}
               </h3>
               <p
                 className="text-gray-500 mb-4"
                 style={{ fontFamily: "Tajwal, sans-serif" }}
               >
                 {course.description}
               </p>
               <div className="flex justify-between items-center">
                 <span
                   className="text-black-500 font-bold"
                   style={{ fontFamily: "Tajwal, sans-serif" }}
                 >
                   {course.price} دينار
                 </span>
                 <button
                   className="text-white px-4 py-2 rounded-lg bg-custom-orange"
                   style={{ fontFamily: "Tajwal, sans-serif" }}
                 >
                   سجل الآن
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
}

export default ThirdSection;
