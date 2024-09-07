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

  return (
    <div className="flex h-screen font-tajwal">
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div className="container mx-auto p-4" dir="rtl">
          <h1 className="text-3xl font-bold mb-4 text-right font-tajwal">
            قائمة طلباتي
          </h1>
          {orders.length === 0 ? (
            // عرض رسالة "لا يوجد طلبات" ضمن محتوى الصفحة
            <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-5%]">
              <img
                src={noCoursesImage}
                alt="No courses available"
                className="w-60 h-60 object-cover"
              />
              <p className="text-lg text-gray-700 mt-4">
                لا يوجد طلبات في الوقت الحالي ..
              </p>
            </div>
          ) : (
            // عرض قائمة الطلبات إذا كانت موجودة
            orders.map((order, index) => (
              <div key={index} className="border rounded-md p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold">طلب رقم {order.orderNo}</h2>
                  <span className="text-gray-600">
                    {new Date(order.createdDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-white px-2 py-1 rounded ${getStatusClass(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                  <span className="text-gray-600">
                    اجمالي الطلب: {order.total} دينار
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">نوع الدفع: {order.paymentType}</p>
                  <p className="font-semibold">الخصم: {order.discount} دينار</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
