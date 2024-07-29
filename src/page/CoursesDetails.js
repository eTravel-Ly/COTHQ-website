import React from 'react';
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import CourseImage from "../assets/images/cover.png"; // Replace with your actual image import
import { FaPlayCircle } from "react-icons/fa";
import {  FaRegUserCircle } from "react-icons/fa"; // Import the star icon from react-icons
import { CiShoppingCart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const CoursesDetails = () => {
 

    const [quantity, setQuantity] = React.useState(1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  return (
<div className="flex h-screen">
<Sidebar />
<div className="flex flex-col w-[80%] mt-2 ml-1">
  <NavbarLogin />
  <div className="container mx-auto p-4" dir="rtl">
  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4">
        {/* Book Image */}
        <div className="md:w-1/4 p-4 relative">
            <img src={CourseImage} alt="Book" className="w-70" />
            <FaPlayCircle className="absolute top-24 left-36 m-2 text-gray-300 text-7xl"/>
            </div>


        {/* Book Information */}
        <div className="md:w-2/3 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold font-tajwal">كورس شرح متن الآجرومية</h1>
          </div>
          <div className="flex items-center mb-4">
          <div className="flex items-center ml-2">
              {Array(5).fill('').map((_, i) => (
                <svg key={i} className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.192c.969 0 1.371 1.24.588 1.81l-3.396 2.47a1 1 0 00-.364 1.118l1.287 3.958c.3.921-.755 1.688-1.538 1.118l-3.396-2.47a1 1 0 00-1.176 0l-3.396 2.47c-.783.57-1.838-.197-1.538-1.118l1.287-3.958a1 1 0 00-.364-1.118l-3.396-2.47c-.783-.57-.381-1.81.588-1.81h4.192a1 1 0 00.95-.69l1.286-3.959z" />
                </svg>
              ))}
            </div>
            <div className="text-orange-500">
              <span className="text-lg">4.0</span>
              <span className="ml-1 text-gray-500"></span>
            </div>
            
          </div>
         
          <div className="mb-4">
            <div className="flex  text-gray-700">
              <span className="flex items-center   ml-60 font-bold font-tajwal">
                <FaRegUserCircle className="ml-1" /> يعطي بواسطة
              </span>
              <span className=" flex items-center ml-40 font-bold font-tajwal">عدد الساعات </span>
              <span className=" flex items-center mr-20 font-bold font-tajwal">عدد الفيديوات</span>
            </div>
            <div className="flex  text-gray-700 mt-1">
              <span className="flex items-center ml-52 font-tajwal" >محمد بن صالح العثيمين</span>
              <span className="flex items-center -mr-5 ml-40 font-tajwal" > 32 ســـــــــــــــاعــــــــــة</span>
              <span className="flex items-center  mr-16  font-tajwal">23 فيـــــــــــديو </span>
            </div>
          </div>


          <p className="mb-4" style={{
                  fontFamily: "Tajwal, sans-serif",
                  textAlign: "justify", // توزيع النص لتملأ العرض
                  lineHeight: "1.5", // لضبط المسافة بين الأسطر
                  marginBottom: "8px" // المسافة بين الفقرات
                }}>
            شرح ثلاثة الأصول للشيخ محمد بن صالح العثيمين. وهذا شرح لكتاب ثلاثة الأصول
            للشيخ محمد بن عبد الوهاب رحمه الله، الذي ألفه ليبلغ كل مسلم ما يجب عليه معرفته،
            بل "المبادئ الثلاثة" مبنية على الأسئلة الثلاثة التي سنطرحها علينا جميعا في قبورنا.
            وعلى هذا النحو سيكون هذا الكتاب مفيدًا للجميع. يتضمن النص العربي الأصلي.
          </p>

        <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
            <span className="text-xl text-red_aa font-tajwal">15,63 دينار</span>
            <span className="line-through text-gray-500 ml-2 font-tajwal">16,90 دينار</span>
            <span className="ml-2 bg-red_aa text-white px-2 py-1 text-sm rounded font-tajwal">خصم 7%</span>
        </div>

            
        <div className="flex items-center">
        <div className="flex items-center border rounded">
            <button 
            className="px-4 py-2 border-r border-gray-300 bg-white text-gray-700 font-tajwal " 
            onClick={() => handleDecrement()}
            >
            <FaMinus size={12} className='text-custom-orange'/>
            </button>
            <input 
            type="text" 
            className="border-0 p-2 w-8 text-center font-tajwal" 
            value={quantity} 
            readOnly
            />
            <button 
            className="px-4 py-2 border-l border-gray-300  font-tajwal  bg-white text-gray-700 " 
            onClick={() => handleIncrement()}
            >
           <FaPlus size={12} className='text-custom-orange' />
            </button>
        </div>
        <button className="bg-custom-orange text-white mr-2 font-tajwal px-4 py-2 rounded ml-4 flex items-center">
            <CiShoppingCart className="mr-2 ml-3" />
            أضف إلى سلة التسوق
            </button>

        <button className="bg-white border border-gray-300 rounded p-2 ml-2 flex items-center justify-center ">
        <FaRegHeart size={19} className='text-custom-orange'/>

        </button>
        </div>


        </div>

        </div>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4 mt-4">
        {/* Product Details */}
        <div className="md:w-2/3">
          <h2 className="text-xl font-bold mb-2 font-tajwal">تفاصيل المنتج</h2>
          <table className="w-full text-right">
            <tbody className="space-y-2">
              <tr className="border-t border-b">
                <td className="p-4 font-tajwal font-bold">عنوان الدورة التدريبية</td>
                <td className="p-4 font-tajwal">شرح ثلاثة الأصول</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-tajwal font-bold">الاستاذ</td>
                <td className="p-4 font-tajwal">محمد بن صالح العثيمين</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-tajwal font-bold">عدد الساعات</td>
                <td className="p-4 font-tajwal">32 ساعة </td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-tajwal font-bold">عدد الفيديوهات </td>
                <td className="p-4 font-tajwal"> 23 فيديو</td>
              </tr>
              <tr className="border-b">
                <td className="p-5 font-tajwal font-bold">عدد المشاركين في الدورة التدريبية</td>
                <td className="p-5 font-tajwal">450</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Related Books */}
        <div className="md:w-1/3">
          <h2 className="text-xl font-bold mb-2 font-tajwal">الدورات ذات الصلة</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center p-2 border">
              <img src={CourseImage} alt="Related Book" className="w-28 h-24 ml-10" />
              <div className="ml-4">
                <h3 className="font-bold font-tajwal">صحيح البخاري</h3>
                <p className='font-tajwal'>45.4 دينار</p>
                <button className="bg-white text-black px-2 py-1 flex rounded mt-2 font-tajwal border border-custom-orange">أضف إلى سلة التسوق
                <CiShoppingCart className="mr-2 ml-3" />
                </button>
              </div>
            </div>
            <div className="flex items-center p-2 border">
              <img src={CourseImage} alt="Related Book" className="w-28 h-24 ml-10" />
              <div className="ml-4">
                <h3 className="font-bold font-tajwal">شرح صحيح البخاري</h3>
                <p className='font-tajwal'>25.3 دينار</p>
                <button className="bg-white text-black px-2  flex py-1 rounded mt-2 font-tajwal border border-custom-orange">أضف إلى سلة التسوق
                <CiShoppingCart className="mr-2 ml-3" />
                </button>
              </div>
            </div>
            <div className="flex items-center p-2 border">
              <img src={CourseImage} alt="Related Book" className="w-28 h-24 ml-10" />
              <div className="ml-4">
                <h3 className="font-bold font-tajwal">تحقيق في صحيح البخاري</h3>
                <p className='font-tajwal'>20.0 دينار</p>
                <button className="bg-white text-black px-2 py-1 flex rounded mt-2 font-tajwal border border-custom-orange">أضف إلى سلة التسوق
                <CiShoppingCart className="mr-2 ml-3" />
                </button>
              </div>
            </div>
          </div>
       </div>
    </div>
</div>
</div>

</div>
  );
};

export default CoursesDetails;
