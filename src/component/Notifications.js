import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";

const Notifications = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get(baseurl + "my-notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // Filter the notifications to only include those with is_read = false
        const unreadNotifications = response.data[0].filter(
          (notification) => notification.isRead === false
        );
        setNotifications(unreadNotifications);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  return (
    <div
      className={`bg-white border border-gray-200 rounded-md shadow-lg  p-4 w-80 absolute left-4 mt-2`}
    >
      <h3
        className="text-lg font-bold mb-4 text-right"
        style={{ fontFamily: "Tajwal, sans-serif" }}
      >
        الإشعارات
      </h3>
      {notifications.length === 0 ? (
        <p
          className="text-sm mb-5"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          لا يوجد إشعارات بعد
        </p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start mb-4 text-right"
          >
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
                  {new Date(notification.createdDate).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img
                src="https://img.icons8.com/ios/50/000000/appointment-reminders--v2.png"
                alt="Notification Bell"
                className="h-6 w-6 rounded-full ml-5 mt-1"
              />
            </div>
          </div>
        ))
      )}
      <button
        className="text-sm text-blue-500 hover:underline mt-2"
        onClick={() => navigate("/AllNotify")}
        style={{ fontFamily: "Tajwal, sans-serif" }}
      >
        عرض كل الإشعارات
      </button>
    </div>
  );
};

export default Notifications;
