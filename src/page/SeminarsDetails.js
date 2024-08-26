import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import Navbar from '../component/Navbar'; // Import the Navbar component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiCalendarDate } from "react-icons/ci";
import axios from 'axios';
import cover from "../assets/images/test1.png";
import { baseurl } from '../helper/Baseurl';

const SeminarsDetails = () => {
  const { Id } = useParams(); // استخدام useParams لجلب البراميتر
  const [seminar, setSeminar] = useState(null);

  useEffect(() => {
    const fetchSeminarDetails = async () => {
      try {
        const response = await axios.get(baseurl+`public/event/${Id}`, {
          headers: {
            'accept': 'application/json',
          },
        });
        setSeminar(response.data);
      } catch (error) {
        console.error("Error fetching seminar details", error);
      }
    };

    fetchSeminarDetails();
  }, [Id]); // إضافة Id كـ dependency لـ useEffect

  const token = localStorage.getItem('token'); // Check for the token

  if (!seminar) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex h-screen rtl" style={{ fontFamily: "Tajwal, sans-serif" }}>
      {token ? (
        <>
          <Sidebar />
          <div className="flex flex-col w-[80%] mt-2 ml-1">
            <NavbarLogin />
            <div
              className="p-4"
              style={{
                fontFamily: "Tajwal, sans-serif",
                direction: "rtl",
                textAlign: "right",
              }}
            >
              <h2 className="text-xl font-bold mb-1 text-custom-orange mr-11">تفاصيل الندوة</h2>
              <h4 className="text-l font-bold text-gray-500  mr-11">
                يمكنك الاطلاع على تفاصيل الندوة أدناه ..
              </h4>
              <div className="flex">
                {/* جهة اليمين - تفاصيل الندوة */}
                <div className="w-1/2 pr-4">
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={seminar.coverImageUrl || cover} // Use coverImageUrl from the API or fallback to a default image
                      alt="ندوة"
                      className="w-[80%] h-auto mb-4 rounded-lg"
                    />
                    <h2 className="text-xl font-bold mb-2 text-center">{seminar.title}</h2>
                    <div className="flex items-center mb-2 justify-center">
                      <CiCalendarDate className="text-gray-600 mr-2 ml-2" />
                      <p className="text-xs text-gray-500 mb-2 text-center" style={{ lineHeight: "1.5", marginBottom: "8px" }}>
                        تاريخ البدء: {seminar.eventStartDate}
                      </p>
                    </div>
                    <p className="mb-2 text-center">عدد الأشخاص المسجلين: {seminar.participantsCount || 'غير محدد'}</p>
                    <p className="mb-2 text-center">المنظم: {seminar.organizer}</p>
                  </div>
                </div>
                {/* جهة اليسار - تفاصيل الحدث */}
                <div className="w-1/2 pl-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">تفاصيل الحدث</h3>
                    <p><strong>المنظم:</strong> {seminar.organizer}</p>
                    <p><strong>العنوان:</strong> {seminar.address}</p>
                    <p><strong>الوصف:</strong> {seminar.description}</p>
                    <p><strong>تاريخ بدء التسجيل:</strong> {seminar.applyStartDate}</p>
                    <p><strong>تاريخ نهاية التسجيل:</strong> {seminar.applyEndDate}</p>
                    <p><strong>تاريخ نهاية تقديم الموجز:</strong> {seminar.abstractApplyEndDate}</p>
                    <p><strong>تاريخ مراجعة الأوراق:</strong> {seminar.papersReplayDate}</p>
                    <p><strong>تاريخ انتهاء التسجيل:</strong> {seminar.enrollmentEndDate}</p>
                    <p><strong>رقم الهاتف:</strong> {seminar.contactMobile}</p>
                    <p><strong>واتساب:</strong> {seminar.contactWhatsApp}</p>
                    <p><strong>البريد الإلكتروني:</strong> {seminar.contactEmail}</p>
                    <p><strong>الموقع الإلكتروني:</strong> <a href={seminar.contactWebsite} className="text-blue-500" target="_blank" rel="noopener noreferrer">{seminar.contactWebsite}</a></p>
                    <p><strong>الشروط:</strong> {seminar.conditions}</p>
                    <p><strong>ملاحظات:</strong> {seminar.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-gray-10 py-10 px-6 rounded-lg"
        style={{
          marginTop: '50px',
          width: '95%',
          direction: 'rtl', // Ensure RTL direction
        }}>
     <Navbar />
     <div className="flex-1 p-4">
       <h2 className="text-xl font-bold mb-1 text-custom-orange text-right">تفاصيل الندوة</h2>
       <h4 className="text-l font-bold text-gray-500 text-right">
         يمكنك الاطلاع على تفاصيل الندوة أدناه
       </h4>
   
       <div className="flex flex-row-reverse"> {/* Adjust flex direction for RTL */}
         <div className="w-1/2 pl-4"> {/* Swap padding for RTL */}
           <div className="flex flex-col items-center mb-4">
             <img
               src={seminar.coverImageUrl || cover} // Use coverImageUrl from the API or fallback to a default image
               alt="ندوة"
               className="w-[80%] h-auto mb-4 rounded-lg"
             />
             <h2 className="text-xl font-bold mb-2 text-center">{seminar.title}</h2>
             <div className="flex items-center mb-2 justify-center">
               <CiCalendarDate className="text-gray-600 mr-2 ml-2" />
               <p className="text-xs text-gray-500 mb-2 text-center" style={{ lineHeight: "1.5", marginBottom: "8px" }}>
                 تاريخ البدء: {seminar.eventStartDate}
               </p>
             </div>
             <p className="mb-2 text-center">المنظم: {seminar.organizer}</p>
           </div>
         </div>
         <div className="w-1/2 pr-4"> {/* Swap padding for RTL */}
           <div className="bg-gray-50 p-4 rounded-lg">
             <h3 className="text-lg font-semibold mb-2">تفاصيل الندوة</h3>
             <p><strong>المنظم:</strong> {seminar.organizer}</p>
             <p><strong>العنوان:</strong> {seminar.address}</p>
             <p><strong>الوصف:</strong> {seminar.description}</p>
             <p><strong>تاريخ بدء التسجيل:</strong> {seminar.applyStartDate}</p>
             <p><strong>تاريخ نهاية التسجيل:</strong> {seminar.applyEndDate}</p>
             <p><strong>تاريخ نهاية تقديم الموجز:</strong> {seminar.abstractApplyEndDate}</p>
             <p><strong>تاريخ مراجعة الأوراق:</strong> {seminar.papersReplayDate}</p>
             <p><strong>تاريخ انتهاء التسجيل:</strong> {seminar.enrollmentEndDate}</p>
             <p><strong>رقم الهاتف:</strong> {seminar.contactMobile}</p>
             <p><strong>واتساب:</strong> {seminar.contactWhatsApp}</p>
             <p><strong>البريد الإلكتروني:</strong> {seminar.contactEmail}</p>
             <p><strong>الموقع الإلكتروني:</strong> <a href={seminar.contactWebsite} className="text-blue-500" target="_blank" rel="noopener noreferrer">{seminar.contactWebsite}</a></p>
             <p><strong>الشروط:</strong> {seminar.conditions}</p>
             <p><strong>ملاحظات:</strong> {seminar.notes}</p>
           </div>
         </div>
       </div>
     </div>
   </div>
   

      )}
      <ToastContainer />
    </div>
  );
};

export default SeminarsDetails;
