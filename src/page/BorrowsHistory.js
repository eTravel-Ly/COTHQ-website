import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'; 
import { useNavigate } from 'react-router-dom';
import noCoursesImage from "../assets/images/Search.png"; 
import { FaSpinner } from 'react-icons/fa'; 
import { useTranslation } from "../context/TranslationContext"; 

Modal.setAppElement('#root'); 

function BorrowsHistory() {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { translations } = useTranslation(); 

  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

   const [language, setLanguage] = useState("ar");
    const isArabic = language === "ar";
  
    useEffect(() => {
      const savedLanguage = sessionStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    }, []);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseurl + "my-book-borrows", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setOrders(response.data[0]); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching borrow requests:", error);
        setLoading(false);

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
        toast.success(translations.cancelSuccessMessage);
        setTimeout(() => {
          navigate('/BorrowsHistory');
        }, 3000);
      })
      .catch((error) => {
        toast.warning(translations.cancelErrorMessage);
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
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="text-4xl animate-spin" />
      </div>
    );
  }
  return (
    <>
      <div className={`flex ${isArabic ? 'flex-col md:flex-row' : 'flex-col-reverse md:flex-row-reverse '} pt-16 w-full`}>

      <div
        className={`fixed top-0 z-10 transition-all duration-300 w-full  lg:w-[calc(100%-20%)]`}
      >
        <NavbarLogin
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

    
        <div  className="p-4 flex-1"
          style={{
            fontFamily: "Tajwal, sans-serif",
            direction: isArabic ? "rtl" : "ltr",
            textAlign: isArabic ? "right" : "left",
          }}>
          <h1 className="text-xl font-bold mb-4  font-tajwal">
          {translations.title}
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
              {translations.noOrdersMessage}
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="border rounded-md p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold">  {translations.borrowRequestStatus}
                  </h2>
                  <span
                    className={`text-white px-2 py-1 rounded ${getStatusColor(
                      order.bookBorrowRequestStatus
                    )}`}
                  >
                    {order.bookBorrowRequestStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">
                  {translations.bookName} {order.book.title}
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-4 ">
                    <p className="font-semibold ">
                    {translations.borrowDate}  {formatDate(order.requestDate)}
                    </p>
                    <p className="font-semibold">
                    {translations.collectDate}  {formatDate(order.collectDate)}
                    </p>
                    <p className="font-semibold">
                    {translations.returnDate}  {formatDate(order.returnDate)}
                    </p>
                  </div>
                </div>
                {/* Conditionally render the button */}
                {order.bookBorrowRequestStatus === "PENDING" && (
                  <button
                    onClick={() => openModal(order.id)}
                    className="bg-custom-orange text-white px-2 py-2 text-sm rounded mt-4"
                  >
                      {translations.cancelRequest}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-full md:w-1/4" : "w-0"
          } md:w-[20%] h-full`}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </div>
    



      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  className="modal"
  style={{
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex", // لضمان أن المودال يتمركز
      justifyContent: "center", // لضمان أن المودال يتمركز
      alignItems: "center", // لضمان أن المودال يتمركز
      position: "fixed", // لضمان تغطية الصفحة بالكامل
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999, // وضع قيمة عالية لـ z-index
    },
    content: {
      backgroundColor: "white", // إضافة خلفية بيضاء
      width: "400px", // تحديد العرض المناسب
      height: "200px", // تحديد الارتفاع المناسب
      padding: "20px",
      borderRadius: "8px", // إضافة زوايا مستديرة للمربع
      margin: "auto",
      textAlign: "right",
      direction: "rtl",
      fontFamily: "Tajwal, sans-serif",
      position: "relative", // لضمان أن المودال في المنتصف
      zIndex: 10000, // وضع قيمة أعلى لـ z-index بالنسبة للمحتوى
    },
  }}
>
  <div className="p-6 text-center">
    <h2 className="text-lg font-bold mb-4"
    >
    {translations.modalTitle}
    </h2>
    <div className="flex justify-center space-x-4">
      <button
        onClick={confirmCancelOrder}
        className="bg-red-600 text-white px-4 py-2 rounded ml-2"
      >
            {translations.yes}

      </button>
      <button
        onClick={closeModal}
        className="bg-gray-300 text-black px-4 py-2 rounded"
      >
            {translations.no}

      </button>
    </div>
  </div>
</Modal>


      <ToastContainer />
    </>
  );
}

export default BorrowsHistory;
