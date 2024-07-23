import React from 'react';
import { MdOutlineDescription, MdCheckCircle } from "react-icons/md";
import pic1 from '../assets/images/pic1.png';
import pic2 from '../assets/images/pic2.png';

const SecondSection = () => {
  return (
    <section className="py-16 bg-white  mt-10">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 text-right rtl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ fontFamily: 'Tajwal, sans-serif' }}>
          إنشاء مسارات للنجاح من خلال التعليم
        </h2>
        <div className="space-y-6">
          <div className="flex items-start justify-end">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Tajwal, sans-serif' }}>Lorem Ipsum Dolor</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Tajwal, sans-serif' }}>
                لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة المتمثلة في إدانة اللذة وتمجيد الألم، وسأقدم لك وصفاً كاملاً للنظام.
              </p>
            </div>
            <MdOutlineDescription className="text-orange-500 text-xl mr-4 mt-1" />
          </div>
          <div className="flex items-start justify-end">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Tajwal, sans-serif' }}>Lorem Ipsum Dolor</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Tajwal, sans-serif' }}>
                لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة المتمثلة في إدانة اللذة وتمجيد الألم، وسأقدم لك وصفاً كاملاً للنظام.
              </p>
            </div>
            <MdOutlineDescription className="text-green-500 text-xl mr-4 mt-1" />
          </div>
          <div className="flex items-start justify-end">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Tajwal, sans-serif' }}>Lorem Ipsum Dolor</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Tajwal, sans-serif' }}>
                لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة المتمثلة في إدانة اللذة وتمجيد الألم، وسأقدم لك وصفاً كاملاً للنظام.
              </p>
            </div>
            <MdOutlineDescription className="text-yellow-500 text-xl mr-4 mt-1" />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col lg:flex-row items-center justify-center lg:justify-end relative">
      <div className="w-full lg:w-1/2 flex justify-center">
        <img src={pic1} alt="Study Image 1" className="rounded-lg shadow-lg mb-8 lg:mb-0 lg:mr-0" style={{ width: '70%', height: 'auto' }} />
      </div>
      <div className="w-full lg:w-1/2 flex justify-center" style={{ marginTop: '-150px' , marginLeft:'-70px' }}>
        <img src={pic2} alt="Study Image 2" className="rounded-lg shadow-lg" style={{ width: '70%', height: 'auto' }} />
      </div>
      <div className="absolute  text-white p-4 rounded-lg flex items-center" style={{ backgroundColor: '#229575' ,
        marginTop:'250px',
        marginRight:'45px'
       }}>
        <div className="text-right">
          <h3 className="text-xl font-semibold" style={{ fontFamily: 'Tajwal, sans-serif' }}>128</h3>
          <p className="mt-2" style={{ fontFamily: 'Tajwal, sans-serif' }}>النشاط الطلابي لدينا الدورة التدريبية</p>
        </div>
      </div>
    </div>


      </div>
    </section>
  );
};

export default SecondSection;
