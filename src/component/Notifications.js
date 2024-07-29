import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications = ({ currentLanguage }) => {
  const navigate = useNavigate(); // استخدام useNavigate

  const notifications = [
    {
      id: 1,
      action:"تم قبول طلبك" ,
      time: "قبل 2 دقيقة" 
    },
    {
      id: 2,
      action:"تم قبول طلبك" ,
      time: "قبل 2 دقيقة" 
    },
    {
      id: 3,
      action:"تم قبول طلبك" ,
      time: "قبل 2 دقيقة" 
    },
  ];
  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 w-80 absolute left-0 mt-2`}>
      <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Tajwal, sans-serif' }}> الإشعارات</h3>
      {notifications.map(notification => (
        <div key={notification.id} className="flex items-start mb-4">
       
          <div className="ml-3 flex-1">
            <p className="text-sm" style={{ fontFamily: 'Tajwal, sans-serif' }}>
              <span className="font-bold" style={{ fontFamily: 'Tajwal, sans-serif' }}></span> {notification.action} {notification.context && <span className="text-blue-500" style={{ fontFamily: 'Tajwal, sans-serif' }}>{notification.context}</span>}
            </p>
            <p className="text-xs text-gray-500" style={{ fontFamily: 'Tajwal, sans-serif' }}>{notification.time}</p>
  
          </div>
          <div className="flex-shrink-0">
            <img
              src="https://img.icons8.com/ios/50/000000/appointment-reminders--v2.png" 
              alt="Notification Bell"
              className="h-6 w-6 rounded-full ml-5 mt-1"
            />
          </div>
        </div>
      ))}
      <button className="text-sm text-blue-500 hover:underline mt-2"  onClick={() => navigate("/AllNotify")} style={{ fontFamily: 'Tajwal, sans-serif' }}>عرض كل الإشعارات</button>
    </div>
  );
};

export default Notifications;
