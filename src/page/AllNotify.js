import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { FaSpinner } from 'react-icons/fa'; // لأيقونة التحميل
import noNotificationImage from "../assets/images/New.png"; // تأكد من إضافة صورة "لا يوجد إشعارات"

export default function AllNotify() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // حالة اللودينق

  useEffect(() => {
    axios
      .get(baseurl + "my-notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setNotifications(response.data[0]);
        setLoading(false); // إيقاف اللودينق عند استلام البيانات
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        setLoading(false); // إيقاف اللودينق في حال وجود خطأ
      });
  }, []);

  return (
    <>
      <div className="flex h-screen font-tajwal">
        <Sidebar />
        <div className="flex flex-col w-[80%] mt-2 ml-1">
          <NavbarLogin />
          <div className="container mx-auto p-4" dir="rtl">
            <h3
              className="text-lg font-bold mb-4 text-right"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              الإشعارات
            </h3>

            {loading ? ( // إظهار أيقونة اللودينق أثناء التحميل
             <div className="flex items-center justify-center h-screen">
             <FaSpinner className="text-4xl animate-spin" />
           </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-[70vh]">
                <img
                  src={noNotificationImage}
                  alt="No Notifications"
                  className="w-52 h-52 mb-4"
                />
                <p
                  className="text-sm mb-5"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  لا يوجد إشعارات بعد ...
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start mb-4 text-right border rounded-sm shadow-md ml-8 ${
                    !notification.isRead ? "bg-blue" : ""
                  } p-2 rounded-md`} // لون الخلفية بناءً على حالة القراءة
                >
                  {!notification.isRead && (
                    <div className="flex-shrink-0">
                      <img
                        src="https://img.icons8.com/ios/50/000000/new.png"
                        alt="New Notification"
                        className="h-3 w-3"
                      />
                    </div>
                  )}
                  <div className="flex-shrink-0">
                    <img
                      src="https://img.icons8.com/ios/50/000000/appointment-reminders--v2.png"
                      alt="Notification Bell"
                      className="h-6 w-6 rounded-full ml-5 mt-1"
                    />
                  </div>
                  <div className="ml-3 flex-1" dir="rtl">
                    <p
                      className="text-lg font-bold"
                      style={{ fontFamily: "Tajwal, sans-serif" }}
                    >
                      {notification.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <p
                        className="text-sm text-blue-500"
                        style={{ fontFamily: "Tajwal, sans-serif" }}
                      >
                        {notification.details}
                      </p>
                      <p
                        className="text-xs text-gray-500"
                        style={{ fontFamily: "Tajwal, sans-serif" }}
                      >
                        {new Date(
                          notification.createdDate
                        ).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
