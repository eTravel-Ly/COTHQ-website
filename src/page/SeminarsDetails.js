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
import cover1 from "../assets/images/test2.png"; // Add import for conference cover
import { baseurl } from '../helper/Baseurl';

const SeminarsDetails = () => {
  const { Id } = useParams(); // Using useParams to get the parameter
  const [event, setEvent] = useState(null);
  const [eventType, setEventType] = useState(""); // State to store event type

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${baseurl}public/event/${Id}`, {
          headers: {
            'accept': 'application/json',
          },
        });

        // Set event type based on the response
        const eventType = response.data.eventType;
        setEventType(eventType);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details", error);
      }
    };

    fetchEventDetails();
  }, [Id]); // Adding Id as a dependency for useEffect

  const token = localStorage.getItem('token'); // Check for the token

  if (!event) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  const isConference = eventType === "CONFERENCE"; // Determine if the event is a conference

  // Define image style based on event type
  const imageStyle = isConference ? "w-[50%] h-auto mb-4 rounded-lg" : "w-[80%] h-auto mb-4 rounded-lg";

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
              <h2 className="text-xl font-bold mb-1 text-custom-orange mr-11">
                تفاصيل {isConference ? "المؤتمر" : "الندوة"}
              </h2>
              <h4 className="text-l font-bold text-gray-500 mr-11">
                يمكنك الاطلاع على تفاصيل {isConference ? "المؤتمر" : "الندوة"} أدناه ..
              </h4>
              <div className="flex">
                {/* Right Side - Event Details */}
                <div className="w-1/2 pr-4">
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={isConference ? cover1 : cover} // Use cover1 for conferences or cover for seminars
                      alt={isConference ? "مؤتمر" : "ندوة"}
                      className={imageStyle} // Apply conditional styling here
                    />
                    <h2 className="text-xl font-bold mb-2 text-center">{event.title}</h2>
                    <div className="flex items-center mb-2 justify-center">
                      <CiCalendarDate className="text-gray-600 mr-2 ml-2" />
                      <p className="text-xs text-gray-500 mb-2 text-center" style={{ lineHeight: "1.5", marginBottom: "8px" }}>
                        تاريخ البدء: {event.eventStartDate}
                      </p>
                    </div>
                    <p className="mb-2 text-center">عدد الأشخاص المسجلين: {event.participantsCount || 'غير محدد'}</p>
                    <p className="mb-2 text-center">المنظم: {event.organizer}</p>
                  </div>
                </div>
                {/* Left Side - Event Details */}
                <div className="w-1/2 pl-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">تفاصيل {isConference ? "المؤتمر" : "الندوة"}</h3>
                    <p><strong>المنظم:</strong> {event.organizer}</p>
                    <p><strong>العنوان:</strong> {event.address}</p>
                    <p><strong>الوصف:</strong> {event.description}</p>
                    <p><strong>تاريخ بدء التسجيل:</strong> {event.applyStartDate}</p>
                    <p><strong>تاريخ نهاية التسجيل:</strong> {event.applyEndDate}</p>
                    <p><strong>تاريخ نهاية تقديم الموجز:</strong> {event.abstractApplyEndDate}</p>
                    <p><strong>تاريخ مراجعة الأوراق:</strong> {event.papersReplayDate}</p>
                    <p><strong>تاريخ انتهاء التسجيل:</strong> {event.enrollmentEndDate}</p>
                    <p><strong>رقم الهاتف:</strong> {event.contactMobile}</p>
                    <p><strong>واتساب:</strong> {event.contactWhatsApp}</p>
                    <p><strong>البريد الإلكتروني:</strong> {event.contactEmail}</p>
                    <p><strong>الموقع الإلكتروني:</strong> <a href={event.contactWebsite} className="text-blue-500" target="_blank" rel="noopener noreferrer">{event.contactWebsite}</a></p>
                    <p><strong>الشروط:</strong> {event.conditions}</p>
                    <p><strong>ملاحظات:</strong> {event.notes}</p>
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
          }}
        >
          <Navbar />
          <div className="flex-1 p-4" style={{
            direction: 'rtl', // Ensure RTL direction
          }}>
            <h2 className="text-xl font-bold mb-1 text-custom-orange text-right">
              تفاصيل {isConference ? "المؤتمر" : "الندوة"}
            </h2>
            <h4 className="text-l font-bold text-gray-500 text-right">
              يمكنك الاطلاع على تفاصيل {isConference ? "المؤتمر" : "الندوة"} أدناه
            </h4>
            <div className="flex flex-row-reverse"> {/* Adjust flex direction for RTL */}
              <div className="w-1/2 pl-4"> {/* Swap padding for RTL */}
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={isConference ? cover1 : cover} // Use cover1 for conferences or cover for seminars
                    alt={isConference ? "مؤتمر" : "ندوة"}
                    className={imageStyle} // Apply conditional styling here
                  />
                  <h2 className="text-xl font-bold mb-2 text-center">{event.title}</h2>
                  <div className="flex items-center mb-2 justify-center">
                    <CiCalendarDate className="text-gray-600 mr-2 ml-2" />
                    <p className="text-xs text-gray-500 mb-2 text-center" style={{ lineHeight: "1.5", marginBottom: "8px" }}>
                      تاريخ البدء: {event.eventStartDate}
                    </p>
                  </div>
                  <p className="mb-2 text-center">المنظم: {event.organizer}</p>
                </div>
              </div>
              <div className="w-1/2 pr-4"> {/* Swap padding for RTL */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">تفاصيل {isConference ? "المؤتمر" : "الندوة"}</h3>
                  <p><strong>المنظم:</strong> {event.organizer}</p>
                  <p><strong>العنوان:</strong> {event.address}</p>
                  <p><strong>الوصف:</strong> {event.description}</p>
                  <p><strong>تاريخ بدء التسجيل:</strong> {event.applyStartDate}</p>
                  <p><strong>تاريخ نهاية التسجيل:</strong> {event.applyEndDate}</p>
                  <p><strong>تاريخ نهاية تقديم الموجز:</strong> {event.abstractApplyEndDate}</p>
                  <p><strong>تاريخ مراجعة الأوراق:</strong> {event.papersReplayDate}</p>
                  <p><strong>تاريخ انتهاء التسجيل:</strong> {event.enrollmentEndDate}</p>
                  <p><strong>رقم الهاتف:</strong> {event.contactMobile}</p>
                  <p><strong>واتساب:</strong> {event.contactWhatsApp}</p>
                  <p><strong>البريد الإلكتروني:</strong> {event.contactEmail}</p>
                  <p><strong>الموقع الإلكتروني:</strong> <a href={event.contactWebsite} className="text-blue-500" target="_blank" rel="noopener noreferrer">{event.contactWebsite}</a></p>
                  <p><strong>الشروط:</strong> {event.conditions}</p>
                  <p><strong>ملاحظات:</strong> {event.notes}</p>
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
