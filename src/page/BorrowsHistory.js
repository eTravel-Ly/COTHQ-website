import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'; // استيراد المودال
import { useNavigate } from 'react-router-dom';
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات
import { FaSpinner } from 'react-icons/fa'; // لأيقونة التحميل

Modal.setAppElement('#root'); // لتفادي تحذير عند استخدام المودال

function BorrowsHistory() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false); // إيقاف اللودينق بعد جلب البيانات

      })
      .catch((error) => {
        console.error("Error fetching borrow requests:", error);
        setLoading(false); // إيقاف اللودينق بعد جلب البيانات

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

  const openModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  const confirmCancelOrder = () => {
    if (selectedOrderId) {
      handleCancelOrder(selectedOrderId);
    }
    closeModal();
  };
  if (loading) {
    // عرض مكون اللودينق في حالة انتظار تحميل البيانات
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="text-4xl animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex h-screen font-tajwal">
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div className="container mx-auto p-4" dir="rtl">
          <h1 className="text-xl font-bold mb-4 text-right font-tajwal">
            قائمة طلبات الاستعارة الخاصة بي
          </h1>
          {orders.length === 0 ? (
            // عرض رسالة "لا يوجد طلبات" ضمن محتوى الصفحة
            <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-5%]">
              <img
                src={noCoursesImage}
                alt="No courses available"
                className="w-60 h-60 object-cover"
              />
              <p className="text-lg text-gray-700 ">
                لا يوجد طلبات استعارة في الوقت الحالي ..
              </p>
            </div>
          ) : (
          orders.map((order) => (
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
                  onClick={() => openModal(order.id)}
                  className="bg-custom-orange text-white px-2 py-2 text-sm rounded mt-4"
                >
                  إلغاء الطلب
                </button>
              )}
            </div>
          )
        ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  className="modal"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex', // لضمان أن المودال يتمركز
      justifyContent: 'center', // لضمان أن المودال يتمركز
      alignItems: 'center', // لضمان أن المودال يتمركز
    },
    content: {
      backgroundColor: 'white', // إضافة خلفية بيضاء
      width: '400px', // تحديد العرض المناسب
      height: '150px', // تحديد الارتفاع المناسب
      padding: '20px',
      borderRadius: '8px', // إضافة زوايا مستديرة للمربع
      margin: 'auto',
      textAlign: 'right',
      direction: 'rtl',
      fontFamily: 'Tajwal, sans-serif',
      position: 'relative', // لضمان أن المودال في المنتصف
    },
  }}
>
  <div className="p-6 text-center">
    <h2 className="text-lg font-bold mb-4">هل أنت متأكد من إلغاء طلب الاستعارة؟</h2>
    <div className="flex justify-center space-x-4">
      <button
        onClick={confirmCancelOrder}
        className="bg-red-600 text-white px-4 py-2 rounded ml-2"
      >
        نعم
      </button>
      <button
        onClick={closeModal}
        className="bg-gray-300 text-black px-4 py-2 rounded"
      >
        لا
      </button>
    </div>
  </div>
</Modal>


      <ToastContainer />
    </div>
  );
}

export default BorrowsHistory;
