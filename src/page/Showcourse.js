import React, { useState } from "react";
import pdf from "../assets/images/Noor-Book.pdf";
import { FaShareAlt, FaCheck } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import video1 from "../assets/images/1.mp4";
import user from "../assets/images/4EyBa.png";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { PiInstagramLogoLight } from "react-icons/pi";
import ShareModels from "../models/ShareModels"; // تأكد من مسار الاستيراد الصحيح


const Showcourse = () => {

  const [isModalOpen, setIsModalOpen] = useState(false); // حالة المودال
  const handleTogglePopup = () => {
    setIsModalOpen(!isModalOpen);
  };
    const navigate = useNavigate();
    const backpage = () => {
      navigate('/HomeAfterLogin');
    };
    const [note, setNote] = useState('');

    const handleSave = () => {
      // Implement your save logic here
      console.log('Note saved:', note);
    };
  
    const handleCancel = () => {
      setNote('');
    };

    const [activeButton, setActiveButton] = useState('نظرة عامة');
    return (
        <div className="bg-white font-tajwal min-h-screen" dir="rtl">
            {/* Navbar */}
            <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
                {/* Right side: Arrow and Home Text */}
                <div className="flex items-center">
                    <button className="text-gray-700 hover:text-gray-900" onClick={backpage}>
                        <IoIosArrowForward className="w-6 h-6" />
                    </button>
                    <span className="mr-2 text-gray-700" onClick={backpage}>العودة إلى الصفحة الرئيسية</span>
                </div>

                {/* Left side: Progress Bar */}
                <div className="flex items-center">
                    <span className="text-gray-700 ml-2">تقدم الدورة</span>
                    <div className="w-48 bg-gray-200 rounded-full h-2 relative">
                        <div className="bg-custom-orange h-full rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="ml-2 text-gray-700">70%</span>
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-4 pt-20">
            <div className="flex flex-grow"> 
              {/* Video Player */}
              <div className="w-3/4 p-4">
                <div className="relative">
                  <video controls className="w-full rounded-lg">
                    <source src={video1} type="video/mp4" />
                  
                  </video>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-4">
                <button
                      className={`mx-1 px-4 py-2 rounded-3xl text-lg text-gray-900 focus:outline-none ${
                        activeButton === 'نظرة عامة' ? 'bg-custom-orange text-blue' : 'bg-blue hover:bg-custom-orange hover:text-blue'
                      }`}
                      onClick={() => setActiveButton('نظرة عامة')}
                    >
                      نظرة عامة
                    </button>
                    <button
                      className={`mx-1 px-4 py-2 rounded-3xl text-lg text-gray-900 focus:outline-none ${
                        activeButton === 'مراجعات' ? 'bg-custom-orange text-blue' : 'bg-blue hover:bg-custom-orange hover:text-blue'
                      }`}
                      onClick={() => setActiveButton('مراجعات')}
                    >
                      مراجعات
                    </button>
                    <button
                      className={`mx-1 px-4 py-2 rounded-3xl text-lg text-gray-900 focus:outline-none ${
                        activeButton === 'ملاحظات' ? 'bg-custom-orange text-blue' : 'bg-blue hover:bg-custom-orange hover:text-blue'
                      }`}
                      onClick={() => setActiveButton('ملاحظات')}
                    >
                      ملاحظات
                    </button>
            
              
                  </div>
                  
                  <div className="flex items-center space-x-4">
                            <button className="bg-white text-gray-400 px-4 py-2 rounded ml-5 flex items-center "
                             onClick={handleTogglePopup}
                            >
                                <FaShareAlt className="w-5 h-5 ml-2 text-gray-400" />
                                مشاركة
                            </button>
                            <button className="bg-white text-gray-400 px-4 py-2 rounded flex items-center">
                                <FaCheck className="w-5 h-5 ml-2 text-gray-400" />
                                ضع علامة على أنها تمت قراءة
                            </button>
                  </div>
              
                </div>
                  {/* Overview Box */}
                {activeButton === 'نظرة عامة' && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-md " >
                  <h3 className="text-green-800 bg-green-100 text-sm font-bold mb-2 h-10 w-24 rounded-xl flex items-center justify-center">أعلى تقييما</h3>
                  <h4 className="text-2xl font-semibold mb-2">مقدمة منهجية</h4>
                  <p className="text-gray-700 mb-4 p-4 rounded-md  bg-white text-right" style={{
                        fontFamily: "Tajwal, sans-serif",
                        textAlign: "justify", // توزيع النص لتملأ العرض
                        lineHeight: "1.5", // لضبط المسافة بين الأسطر
                        marginBottom: "8px" // المسافة بين الفقرات
                      }}>
                  "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم.
                  متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...
                  متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...
                  متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم..."
                  "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم.
                  متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...
                  متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...
                  متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم..."
                  "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم.
                  متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...
                  متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...
                  متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم..."
                </p>


                    <hr className="border-gray-200 mb-4" />
                    <h4 className="text-lg font-semibold mb-2">حول المؤلفين</h4>
                    <div className="flex items-center p-4 border border-gray-300 rounded-lg w-72 h-24">
                      <img src={user} alt="Author" className="w-12 h-12 rounded-full mr-1" />
                      <div className="flex-1 mr-5">
                        <h5 className="text-sm font-semibold">أحمد السيد</h5>
                        <p className="text-gray-600 text-sm">أصول الفقه</p>
                        <div className="flex space-x-2 mt-2">
                          <CiFacebook className=" text-gray-600"/>
                          <CiTwitter className=" text-gray-600"/>
                        <PiInstagramLogoLight className=" text-gray-600"/>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 font-bold text-custom-orange rounded-full">متابعة</button>
                    </div>
                  </div>
                )}

                {activeButton === 'مراجعات' && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-md " >
                  <div >
                    {/* Header for Reviews */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-gray-700 font-semibold">المراجعات (145)</span>
                        <div className="flex items-center ml-4">
                          <span className="text-yellow-500">⭐</span>
                          <span className="ml-1 text-gray-700">4.5</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        مراجعات
                      </button>
                    </div>

                    {/* Input and Select Elements */}
                    <div className="flex items-center mb-4">
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
                      {/* Single Comment */}
                      <div className="flex items-start mb-4 p-4 border-b">
                        <img
                          src={user}
                          alt="User"
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="font-semibold mr-2">اروى ابوزقية </span>
                            <div className="flex items-center">
                              <span className="text-yellow-500">⭐</span>
                              <span className="ml-1 text-gray-700">4.0</span>
                            </div>
                          </div>
                          <p className="text-gray-700">
                            هذا هو نص التعليق. يمكن أن يكون طويلًا قليلاً ولكن سيتم اقتصاصه تلقائيًا إذا كان هناك الكثير من النص.
                          </p>
                        </div>

                      </div>
                      <div className="flex items-start mb-4 p-4 border-b">
                        <img
                          src={user}
                          alt="User"
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="font-semibold mr-2">اروى ابوزقية </span>
                            <div className="flex items-center">
                              <span className="text-yellow-500">⭐</span>
                              <span className="ml-1 text-gray-700">4.0</span>
                            </div>
                          </div>
                          <p className="text-gray-700">
                            هذا هو نص التعليق. يمكن أن يكون طويلًا قليلاً ولكن سيتم اقتصاصه تلقائيًا إذا كان هناك الكثير من النص.
                          </p>
                        </div>
                        
                      </div>
                      <div className="flex items-start mb-4 p-4 border-b">
                        <img
                          src={user}
                          alt="User"
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="font-semibold mr-2">اروى ابوزقية </span>
                            <div className="flex items-center">
                              <span className="text-yellow-500">⭐</span>
                              <span className="ml-1 text-gray-700">4.0</span>
                            </div>
                          </div>
                          <p className="text-gray-700">
                            هذا هو نص التعليق. يمكن أن يكون طويلًا قليلاً ولكن سيتم اقتصاصه تلقائيًا إذا كان هناك الكثير من النص.
                          </p>
                        </div>
                        
                      </div>
                      <div className="flex items-start mb-4 p-4 border-b">
                        <img
                          src={user}
                          alt="User"
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="font-semibold mr-2">اروى ابوزقية </span>
                            <div className="flex items-center">
                              <span className="text-yellow-500">⭐</span>
                              <span className="ml-1 text-gray-700">4.0</span>
                            </div>
                          </div>
                          <p className="text-gray-700">
                            هذا هو نص التعليق. يمكن أن يكون طويلًا قليلاً ولكن سيتم اقتصاصه تلقائيًا إذا كان هناك الكثير من النص.
                          </p>
                        </div>
                        
                      </div>
                      {/* Repeat the comment block for each review */}
                    </div>
                  </div>
                  </div>
                )}

               {activeButton === 'ملاحظات' && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-md " >
                    <div>
                  <h3 className="text-lg font-semibold mb-2">كتابة ملاحظاتك:</h3>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows="4"
                    className="w-full p-2 border rounded-md mb-4 border-custom-orange bg-gray-100"
                    placeholder="اكتب ملاحظاتك هنا..."
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md ml-4"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-custom-orange text-white rounded-md"
                    >
                      حفظ ملاحظة
                    </button>
                  </div>
                  </div>
                  </div>
                )}
                </div>
              {/* Sidebar */}
              <div className="w-1/4 border rounded-2xl p-4 max-h-screen overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">محتوى الدورة</h2>
                <ul>
                  {[
                    { title: 'مقدمات منهجية', duration: '49 دقيقة و 16 ثانية' },
                    { title: 'سنة إهلاك المكذبين والظالمين', duration: '58 دقيقة' },
                    { title: 'موجبات حلول سنة الإهلاك', duration: '1 ساعة 50 دقيقة و 17 ثانية' },
                    { title: 'مقاصد سنة الإهلاك', duration: '1 ساعة 24 دقيقة و 8 ثانية' },
                    { title: 'سنة التدافع بين الحق والباطل', duration: '1 ساعة 11 دقيقة و 17 ثانية' },
                    { title: 'سنة المعاناة', duration: '1 ساعة 3 دقائق و 30 ثانية' },
                    { title: 'سنة النصر والتمكين', duration: '1 ساعة 45 دقيقة و 19 ثانية' },

                  ].map((item, index) => (
                    <li key={index} className="mb-4 p-4 border rounded-md flex justify-between items-center">
                      
                      <div className="flex flex-col">
                        <span className="font-semibold">{index + 1}. {item.title}</span>
                        <span className="text-gray-500">{item.duration}</span>
                      </div>
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600"/>

                    </li>
                  ))}
                </ul>
              </div>
            </div>
        

            </main>
  
            {isModalOpen && <ShareModels handleTogglePopup={handleTogglePopup} />}
        </div>
        
    );
};

export default Showcourse;
