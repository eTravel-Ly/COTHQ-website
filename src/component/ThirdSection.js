import React from 'react'
import group from '../assets/images/Group.png';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
function ThirdSection() {
  return (
    <div className="w-full bg-white py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold" style={{ fontFamily: 'Tajwal, sans-serif' }}>
          اكشف الدورة
        </h2>
        <p className="text-gray-500" style={{ fontFamily: 'Tajwal, sans-serif' }}>
          طريقك إلى الاكتشاف والنمو
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="text-center mx-4">
          <p className="text-lg font-semibold text-green-500" style={{ fontFamily: 'Tajwal, sans-serif' }}>
            128 ك
          </p>
          <p className="text-gray-500" style={{ fontFamily: 'Tajwal, sans-serif' }}>
            Ipsum Dolor
          </p>
        </div>
        <div className="text-center mx-4">
          <p className="text-lg font-semibold text-green-500" style={{ fontFamily: 'Tajwal, sans-serif' }}>
            12.8 ك
          </p>
          <p className="text-gray-500" style={{ fontFamily: 'Tajwal, sans-serif' }}>
            Lorem Ipsum
          </p>
        </div>
        <div className="text-center mx-4">
          <p className="text-lg font-semibold text-green-500" style={{ fontFamily: 'Tajwal, sans-serif' }}>
            8.9 م
          </p>
          <p className="text-gray-500" style={{ fontFamily: 'Tajwal, sans-serif' }}>
            Lorem Sit
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 p-2 mb-4 rounded-full bg-white border border-gray-200">
      <button className="px-4 py-2 bg-white rounded-full relative hover:bg-custom-orange hover:text-white" style={{ fontFamily: 'Tajwal, sans-serif' }}>
      <FaArrowAltCircleLeft size={20} />

        </button>
        <button className="px-4 py-2 bg-gray-50 rounded-full relative hover:bg-custom-orange hover:text-white border border-gray-200" style={{ fontFamily: 'Tajwal, sans-serif' }}>
            الصفحة الرئيسية
        </button>
        <button className="px-4 py-2 bg-gray-50 rounded-full relative hover:bg-custom-orange hover:text-white border border-gray-200" style={{ fontFamily: 'Tajwal, sans-serif' }}>
            الصفحة الثانية
        </button>
        <button className="px-4 py-2 bg-gray-50 rounded-full relative hover:bg-custom-orange hover:text-white border border-gray-200" style={{ fontFamily: 'Tajwal, sans-serif' }}>
            الصفحة الثالثة
        </button>
        <button className="px-4 py-2 bg-gray-50 rounded-full relative hover:bg-custom-orange hover:text-white border border-gray-200" style={{ fontFamily: 'Tajwal, sans-serif' }}>
            الصفحة الرابعة
        </button>
        <button className="px-4 py-2 bg-gray-50 rounded-full relative hover:bg-custom-orange hover:text-white border border-gray-200" style={{ fontFamily: 'Tajwal, sans-serif' }}>
            الصفحة الخامسة  
        </button>
        <button className="px-4 py-2 bg-gray-50 rounded-full relative hover:bg-custom-orange hover:text-white border border-gray-200" style={{ fontFamily: 'Tajwal, sans-serif' }}>
            الصفحة الحالية
        </button>
        <button className="px-4 py-2 bg-white rounded-full relative hover:bg-custom-orange hover:text-white " style={{ fontFamily: 'Tajwal, sans-serif' }}>
        <FaArrowAltCircleRight size={20}  />
        </button>
        </div>



      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8">
        {Array(8).fill().map((_, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={group} alt="Course" className="w-full h-50 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Tajwal, sans-serif' , direction:'rtl'}}>
                خريطة الطريق الخاصة بك إلى الارتقاء والنجاح.
              </h3>
              <p className="text-gray-500 mb-4" style={{ fontFamily: 'Tajwal, sans-serif' , direction:'rtl' }}>
                انطلق في رحلتك إلى التميز والتفوق مع هذا البرنامج التدريبي المميز.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-black-500 font-bold" style={{ fontFamily: 'Tajwal, sans-serif' , direction:'rtl' }}>89.7 دينار</span>
                <button className=" text-white px-4 py-2 rounded-lg bg-custom-orange" style={{ fontFamily: 'Tajwal, sans-serif'
                }}>سجل الآن</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default ThirdSection