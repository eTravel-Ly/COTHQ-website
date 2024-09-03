import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { useParams, useLocation } from "react-router-dom";
import { baseurl } from "../helper/Baseurl";
import axios from "axios";

function Paytheorder() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const { orderId } = location.state || {};
  const { totalPrice } = location.state || { totalPrice: 0 };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
                const response = await axios.get(`${baseurl}my-profile`, {

       
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="flex h-screen font-tajwal">
      <Sidebar />
      <div className="flex flex-col w-full lg:w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 rtl"
          style={{ direction: "rtl" }}
        >
          {/* Order Confirmation Header */}
          <div className="text-right border-b pb-4 mb-4">
            <h2 className="text-lg sm:text-xl font-bold">دفع الطلب  </h2>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">

            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow">
              
              <h3 className="text-md sm:text-lg font-semibold mb-3 sm:mb-4">
                ملخص الطلب
              </h3>
              <div className="flex justify-between items-center border-b pb-2 mb-3 sm:mb-4">
                

                {/*
                <span className="text-gray-700 text-sm sm:text-base">
                  {cartItems === 0
                    ? "لا يوجد عناصر"
                    : `${cartItems} ${cartItems === 1 ? "عنصر واحد" : "عناصر"}`}
                </span>
                <span className="font-bold text-md sm:text-lg">
                  {totalPrice.toFixed(2)} د.ل
                </span>
                
                */}


              </div>
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

          {/* Order Button */}
          <div className="mt-6 text-center">
            <button className="bg-custom-green text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full font-semibold text-base sm:text-lg w-full md:w-auto">
             ادفع الان 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paytheorder;
