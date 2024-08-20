import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function BorrowsHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(baseurl + "my-book-borrows", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setOrders(response.data[0]); // Adjusted based on API response structure
      })
      .catch((error) => {
        console.error("Error fetching borrow requests:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500';
      case 'APPROVED':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleCancelOrder = (orderId) => {
    // Implement the logic for cancelling the order here
    axios
      .delete(`${baseurl}cancel-book-borrow/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        toast.success('تم الغاء طلب الاستعارة بنجاح');
        setTimeout(() => {
            navigate('/BorrowsHistory');
          }, 3000);
      })
      .catch((error) => {
        toast.warning('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      });
  };

  return (
    <div className="flex h-screen font-tajwal">
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div className="container mx-auto p-4" dir="rtl">
          <h1 className="text-xl font-bold mb-4 text-right font-tajwal">
            قائمة طلبات الاستعارة الخاصة بي
          </h1>
          {orders.map((order) => (
            <div key={order.id} className="border rounded-md p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">حالة الطلب:</h2>
                <span className={`text-white px-2 py-1 rounded ${getStatusColor(order.bookBorrowRequestStatus)}`}>
                  {order.bookBorrowRequestStatus}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">
                  اسم الكتاب: {order.book.title}
                </span>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-4 ml-7">
                  <p className="font-semibold ml-7">تاريخ الاستعارة: {formatDate(order.requestDate)}</p>
                  <p className="font-semibold">تاريخ الاستلام: {formatDate(order.collectDate)}</p>
                  <p className="font-semibold">تاريخ الإرجاع: {formatDate(order.returnDate)}</p>
                </div>
              </div>
              {/* Conditionally render the button */}
              {order.bookBorrowRequestStatus === 'PENDING' && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="bg-custom-orange text-white px-2 py-2 text-sm rounded mt-4"
                >
                  إلغاء الطلب
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      
      <ToastContainer />

    </div>
  );
}

export default BorrowsHistory;
