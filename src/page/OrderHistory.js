import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { FaSpinner } from 'react-icons/fa'; // لأيقونة التحميل
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [language, setLanguage] = useState("ar");
  const isArabic = language === "ar";

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  useEffect(() => {
    axios
      .get(baseurl + "my-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setOrders(response.data[0]);
        setLoading(false); // إيقاف اللودينق بعد جلب البيانات
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // إيقاف اللودينق في حالة حدوث خطأ
      });
  }, []);

  if (loading) {
    // عرض مكون اللودينق في حالة انتظار تحميل البيانات
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="text-4xl animate-spin" />
      </div>
    );
  }

  // دالة لتحديد لون الخلفية بناءً على حالة الطلب
  const getStatusClass = (status) => {
    switch (status) {
      case 'PAYED':
        return 'bg-green-500'; // أخضر
      case 'CANCELLED':
        return 'bg-blue-500'; // أزرق
      case 'FAILED':
        return 'bg-red-500'; // أحمر
      case 'PENDING':
        return 'bg-yellow-500'; // أصفر
      default:
        return 'bg-gray-300'; // لون افتراضي لحالات غير محددة
    }
  };

  const getTranslation = (key) => {
    const translations = {
      ar: {
        title: "قائمة طلباتي",
        noOrders: "لا يوجد طلبات في الوقت الحالي ..",
        orderNumber: "طلب رقم",
        totalOrder: "اجمالي الطلب",
        paymentType: "نوع الدفع",
        discount: "الخصم",
        dinar: "دينار",
      },
      en: {
        title: "My Orders",
        noOrders: "No orders available at the moment..",
        orderNumber: "Order No",
        totalOrder: "Total Order",
        paymentType: "Payment Type",
        discount: "Discount",
        dinar: "Dinar",
      }
    };

    return translations[language][key] || key;
  };

  return (
    <>
      <div className={`flex ${isArabic ? 'flex-col md:flex-row' : 'flex-col-reverse md:flex-row-reverse '} pt-16 w-full`}>
        <div
          className={`fixed top-0 z-10 transition-all duration-300 w-full lg:w-[calc(100%-20%)]`}
        >
          <NavbarLogin
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        <div className="p-4 flex-1"
          style={{
            fontFamily: "Tajwal, sans-serif",
            direction: isArabic ? "rtl" : "ltr",
            textAlign: isArabic ? "right" : "left",
          }}>
          <h1 className="text-3xl font-bold mb-4  font-tajwal">
            {getTranslation('title')}
          </h1>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-5%]">
              <img
                src={noCoursesImage}
                alt="No courses available"
                className="w-60 h-60 object-cover"
              />
              <p className="text-lg text-gray-700 mt-4">
                {getTranslation('noOrders')}
              </p>
            </div>
          ) : (
            orders.map((order, index) => (
              <div key={index} className="border rounded-md p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold">{getTranslation('orderNumber')} {order.orderNo}</h2>
                  <span className="text-gray-600">
                    {new Date(order.createdDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-white px-2 py-1 rounded ${getStatusClass(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                  <span className="text-gray-600">
                  {getTranslation('totalOrder')}: {order.total} {getTranslation('dinar')}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">
                    {getTranslation('paymentType')}: {order.paymentType}
                  </p>
                  <p className="font-semibold">  {getTranslation('discount')}: {order.discount} {getTranslation('dinar')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-1/4" : "w-0"
          } ${isArabic ? "md:w-[20%] mr-auto" : "md:w-[20%] ml-auto"} h-full`}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </div>
    </>
  );
}

export default OrderHistory;
