import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../helper/Baseurl";
import axios from "axios";

function Paytheorder() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState(null); // لتخزين بيانات الطلب
  const location = useLocation();
  const { orderId } = location.state || {}; // جلب الـ orderId من الـ state

  const [isLoading, setIsLoading] = useState(false); // State for loading

  // دالة التنقل للدفع
  const Paynow = () => {
    if (orderId) {
      navigate('/Paynow', { state: { orderId } }); // Navigate with order ID in state
    } else {
      console.error('Order ID is not available.');
    }

  };

  // جلب معلومات المستخدم
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${baseurl}my-profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  // جلب بيانات الطلب بناءً على orderId
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (orderId) {
          const response = await axios.get(`${baseurl}order/${orderId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setOrderData(response.data); // تخزين بيانات الطلب
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  
  return (
    <div className="flex h-screen font-tajwal">
      <Sidebar />
      <div className="flex flex-col w-full lg:w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 rtl"
          style={{ direction: "rtl" }}
        >
          {/* عنوان تأكيد الطلب */}
          <div className="text-right border-b pb-4 mb-4">
            <h2 className="text-lg sm:text-xl font-bold">دفع الطلب</h2>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-md sm:text-lg font-semibold mb-3 sm:mb-4">
                ملخص الطلب
              </h3>
            
              <div className="mb-3 sm:mb-4">
                <h4 className="font-medium text-gray-600 text-sm sm:text-base">
                  معلومات المستخدم
                </h4>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm sm:text-base">
                    {userData ? (
                      <>
                        <p>
                          {userData.address}, {userData.city}
                        </p>
                        <p>
                          {userData.firstName} {userData.lastName}
                        </p>
                        <p>{userData.mobileNo}</p>
                      </>
                    ) : (
                      <p>جاري تحميل معلومات التوصيل...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {orderData ? (
                <div>
                  <div key={orderData.id} className="border rounded-md p-4 mb-4 mt-5">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-bold">
                        طلب رقم {orderData.orderNo}
                      </h2>
                      <span className="text-gray-600">
                        {new Date(orderData.createdDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded">
                        {orderData.orderStatus}
                      </span>
                      <span className="text-gray-600">
                        إجمالي الطلب: {orderData.total} دينار
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">
                        نوع الدفع: {orderData.paymentType}
                      </p>
                      <p className="font-semibold">
                        الخصم: {orderData.discount} دينار
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p>جاري تحميل تفاصيل الطلب...</p>
              )}
              
          {/* زر الدفع */}
          <div className="mt-6 text-center">
            <button
              onClick={Paynow}
              className="bg-custom-green  text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full font-semibold text-base sm:text-lg w-full md:w-auto"
            >
               {isLoading ? (
                <span>جارٍ ادفع الان ...</span> 
              ) : (
                <span>  ادفع الان </span>
              )}
            
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paytheorder;
