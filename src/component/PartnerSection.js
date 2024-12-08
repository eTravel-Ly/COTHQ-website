import React, { useState } from 'react';
import AllContests from "../component/AllContests";
import TrainingCourses from "../component/TrainingCourses";
import SeminarsAll from "../component/SeminarsAll";
import ConferencesAll from "../component/ConferencesAll";

const PartnerSection = () => {
  const [selectedSection, setSelectedSection] = useState("allContests");
  const showMyContests = () => setSelectedSection("allContests");
  const showMyTrainingCourses = () => setSelectedSection("TrainingCourses");
  const showSeminars = () => setSelectedSection("allSeminars");
  const showConferences = () => setSelectedSection("allConferences");

  return (
    <section 
      id="PartnerSection" 
      className="bg-gray-10 py-10 px-6 rounded-lg border border-gray-200" 
      style={{ 
        marginTop: '50px',
        width: '95%',
        overflowY: 'auto', // تفعيل التمرير العمودي
      }}
    >
      <div
        className="p-4"
        style={{
          fontFamily: "Tajwal, sans-serif",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        <h1 className="text-xl font-bold mb-1">النشاطات التى تقدمها المنصة</h1>
        <h4 className="text-l font-bold text-gray-500 mr-5">اطلع على النشاطات وشارك الان ..</h4>
  
        {/* عرض الأزرار بشكل افتراضي على الشاشات الأكبر من الموبايل */}
        <div className="hidden sm:flex mt-10 mr-8">
          <button
            className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-white focus:outline-none ${
              selectedSection === "allContests" ? "bg-custom-orange text-white" : "bg-gray-200"
            }`}
            onClick={showMyContests}
          >
            المسابقات
          </button>
          <button
            className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-white focus:outline-none ${
              selectedSection === "TrainingCourses" ? "bg-custom-orange text-white" : "bg-gray-200"
            }`}
            onClick={showMyTrainingCourses}
          >
            الدورات التدريبية
          </button>
          <button
            className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-white focus:outline-none ${
              selectedSection === "allConferences" ? "bg-custom-orange text-white" : "bg-gray-200"
            }`}
            onClick={showConferences}
          >
            المؤتمرات
          </button>
          <button
            className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-white focus:outline-none ${
              selectedSection === "allSeminars" ? "bg-custom-orange text-white" : "bg-gray-200"
            }`}
            onClick={showSeminars}
          >
            الندوات
          </button>
        </div>
  
        {/* عرض قائمة منسدلة على الشاشات الصغيرة */}
        <div className="sm:hidden mt-10 mr-8">
        <select
          className="w-full px-4 py-2 bg-white border border-black rounded-lg text-l font-bold text-black hover:text-black focus:outline-none focus:border-black focus:ring-2 focus:ring-black"
          onChange={(e) => {
            const value = e.target.value;
            if (value === "allContests") showMyContests();
            else if (value === "TrainingCourses") showMyTrainingCourses();
            else if (value === "allConferences") showConferences();
            else if (value === "allSeminars") showSeminars();
          }}
          value={selectedSection}
        >
          <option value="allContests">المسابقات</option>
          <option value="TrainingCourses">الدورات التدريبية</option>
          <option value="allConferences">المؤتمرات</option>
          <option value="allSeminars">الندوات</option>
        </select>

        </div>
  
        {/* محتوى القسم */}
        <div style={{ marginTop: '20px' }}>
          {selectedSection === "allContests" && <AllContests />}
          {selectedSection === "TrainingCourses" && <TrainingCourses />}
          {selectedSection === "allSeminars" && <SeminarsAll />}
          {selectedSection === "allConferences" && <ConferencesAll />}
        </div>
      </div>
    </section>
  );
  
};

export default PartnerSection;
