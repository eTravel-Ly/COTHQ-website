import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import Navbar from "../component/Navbar"; // Import the Navbar component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiCalendarDate } from "react-icons/ci";
import axios from "axios";
import cover from "../assets/images/allContests.jpg";
import { baseurl } from "../helper/Baseurl";
export default function ContestsDetails() {
    const { Id } = useParams(); 
      const [contests, setContests] = useState(null);
       useEffect(() => {
         const fetchcontestsDetails = async () => {
           try {
             const response = await axios.get(baseurl + `public/event/${Id}`, {
               headers: {
                 accept: "application/json",
               },
             });
             setContests(response.data);
           } catch (error) {
             console.error("Error fetching contests details", error);
           }
         };

         fetchcontestsDetails();
       }, [Id]); 
        const token = localStorage.getItem("token");
         if (!contests)
           return (
             <div className="flex justify-center items-center h-screen">
               <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
             </div>
           );
  return (
    <div
      className="flex h-screen rtl"
      style={{ fontFamily: "Tajwal, sans-serif" }}
    >
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
              <h2 className="text-xl font-bold mb-1 text-custom-orange mr-11">
                تفاصيل المسابقة
              </h2>
              <h4 className="text-l font-bold text-gray-500  mr-11">
                يمكنك الاطلاع على تفاصيل المسابقة أدناه ..
              </h4>
              <div className="flex">
                {/* جهة اليمين - تفاصيل المسابقة */}
                <div className="w-1/2 pr-4">
                  <div className="flex flex-col items-center mb-4 mt-10">
                    <img
                      src={contests.coverImageUrl || cover} // Use coverImageUrl from the API or fallback to a default image
                      alt="مسابقة"
                      className="w-[50%] h-auto mb-4 rounded-lg"
                    />
                    <h2 className="text-xl font-bold mb-2 text-center">
                      {contests.title}
                    </h2>
                    <div className="flex items-center mb-2 justify-center">
                      <CiCalendarDate className="text-gray-600 mr-2 ml-2" />
                      <p
                        className="text-xs text-gray-500 mb-2 text-center"
                        style={{ lineHeight: "1.5", marginBottom: "8px" }}
                      >
                        تاريخ البدء: {contests.eventStartDate}
                      </p>
                    </div>
                    <p className="mb-2 text-center">
                      عدد الأشخاص المسجلين:{" "}
                      {contests.participantsCount || "غير محدد"}
                    </p>
                    <p className="mb-2 text-center">
                      المنظم: {contests.organizer}
                    </p>
                  </div>
                </div>
                {/* جهة اليسار - تفاصيل الحدث */}
                <div className="w-1/2 pl-4 mt-10">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">تفاصيل الحدث</h3>
                    <p className="my-1">
                      <strong>المنظم:</strong> {contests.organizer}
                    </p>
                    <p className="my-1">
                      <strong>العنوان:</strong> {contests.address}
                    </p>
                    <p className="my-1">
                      <strong>الوصف:</strong> {contests.description}
                    </p>
                    <p className="my-1">
                      <strong>تاريخ بدء التسجيل:</strong>{" "}
                      {contests.applyStartDate}
                    </p>
                    <p className="my-1">
                      <strong>تاريخ نهاية التسجيل:</strong>{" "}
                      {contests.applyEndDate}
                    </p>
                    <p className="my-1">
                      <strong>تاريخ نهاية تقديم الموجز:</strong>{" "}
                      {contests.abstractApplyEndDate}
                    </p>
                    <p className="my-1">
                      <strong>تاريخ مراجعة الأوراق:</strong>{" "}
                      {contests.papersReplayDate}
                    </p>
                    <p className="my-1">
                      <strong>تاريخ انتهاء التسجيل:</strong>{" "}
                      {contests.enrollmentEndDate}
                    </p>
                    <p className="my-1">
                      <strong>رقم الهاتف:</strong> {contests.contactMobile}
                    </p>
                    <p className="my-1">
                      <strong>واتساب:</strong> {contests.contactWhatsApp}
                    </p>
                    <p className="my-1">
                      <strong>البريد الإلكتروني:</strong>{" "}
                      {contests.contactEmail}
                    </p>
                    <p className="my-1">
                      <strong>الموقع الإلكتروني:</strong>{" "}
                      <a
                        href={contests.contactWebsite}
                        className="text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contests.contactWebsite}
                      </a>
                    </p>
                    <p className="my-1">
                      <strong>الشروط:</strong> {contests.conditions}
                    </p>
                    <p className="my-1">
                      <strong>ملاحظات:</strong> {contests.notes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className="bg-gray-10 py-10 px-6 rounded-lg"
          style={{
            marginTop: "50px",
            width: "95%",
            direction: "rtl", // Ensure RTL direction
          }}
        >
          <Navbar />
          <div className="flex-1 p-4">
            <h2 className="text-xl font-bold mb-1 text-custom-orange text-right">
              تفاصيل المسابقة
            </h2>
            <h4 className="text-l font-bold text-gray-500 text-right">
              يمكنك الاطلاع على تفاصيل لمسابقة أدناه
            </h4>

            <div className="flex flex-row-reverse">
              {" "}
              {/* Adjust flex direction for RTL */}
              <div className="w-1/2 pl-4">
                {" "}
                {/* Swap padding for RTL */}
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={contests.coverImageUrl || cover} // Use coverImageUrl from the API or fallback to a default image
                    alt="مسابقة"
                    className="w-[80%] h-auto mb-4 rounded-lg"
                  />
                  <h2 className="text-xl font-bold mb-2 text-center">
                    {contests.title}
                  </h2>
                  <div className="flex items-center mb-2 justify-center">
                    <CiCalendarDate className="text-gray-600 mr-2 ml-2" />
                    <p
                      className="text-xs text-gray-500 mb-2 text-center"
                      style={{ lineHeight: "1.5", marginBottom: "8px" }}
                    >
                      تاريخ البدء: {contests.eventStartDate}
                    </p>
                  </div>
                  <p className="mb-2 text-center">
                    المنظم: {contests.organizer}
                  </p>
                </div>
              </div>
              <div className="w-1/2 pr-4">
                {" "}
                {/* Swap padding for RTL */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">تفاصيل الندوة</h3>
                  <p>
                    <strong>المنظم:</strong> {contests.organizer}
                  </p>
                  <p>
                    <strong>العنوان:</strong> {contests.address}
                  </p>
                  <p>
                    <strong>الوصف:</strong> {contests.description}
                  </p>
                  <p>
                    <strong>تاريخ بدء التسجيل:</strong>{" "}
                    {contests.applyStartDate}
                  </p>
                  <p>
                    <strong>تاريخ نهاية التسجيل:</strong>{" "}
                    {contests.applyEndDate}
                  </p>
                  <p>
                    <strong>تاريخ نهاية تقديم الموجز:</strong>{" "}
                    {contests.abstractApplyEndDate}
                  </p>
                  <p>
                    <strong>تاريخ مراجعة الأوراق:</strong>{" "}
                    {contests.papersReplayDate}
                  </p>
                  <p>
                    <strong>تاريخ انتهاء التسجيل:</strong>{" "}
                    {contests.enrollmentEndDate}
                  </p>
                  <p>
                    <strong>رقم الهاتف:</strong> {contests.contactMobile}
                  </p>
                  <p>
                    <strong>واتساب:</strong> {contests.contactWhatsApp}
                  </p>
                  <p>
                    <strong>البريد الإلكتروني:</strong> {contests.contactEmail}
                  </p>
                  <p>
                    <strong>الموقع الإلكتروني:</strong>{" "}
                    <a
                      href={contests.contactWebsite}
                      className="text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contests.contactWebsite}
                    </a>
                  </p>
                  <p>
                    <strong>الشروط:</strong> {contests.conditions}
                  </p>
                  <p>
                    <strong>ملاحظات:</strong> {contests.notes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
