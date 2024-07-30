import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
function OrderHistory () {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(baseurl + "my-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setOrders(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="flex h-screen font-tajwal">
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div className="container mx-auto p-4 " dir="rtl">
          <h1 className="text-3xl font-bold mb-4 text-right font-tajwal">
             قائمة طلباتي
          </h1>
          {orders.map((order, index) => (
            <div key={index} className="border rounded-md p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">طلب رقم {order.orderNo}</h2>
                <span className="text-gray-600">
                  {new Date(order.createdDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="bg-custom-orange text-white px-2 py-1 rounded">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
