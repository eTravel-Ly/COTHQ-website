import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../helper/Baseurl";
import axios from "axios";
import { useTranslation } from "../context/TranslationContext"; 
function Paytheorder() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState(null); 
  const location = useLocation();
  const { orderId } = location.state || {}; 

  const [isLoading, setIsLoading] = useState(false); 
    const { translations , language} = useTranslation(); 
    const isArabic = language === "ar";
  
  const Paynow = () => {
    if (orderId) {
      navigate('/Paynow', { state: { orderId } }); 
    } else {
      console.error('Order ID is not available.');
    }

  };

  
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


  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (orderId) {
          const response = await axios.get(`${baseurl}order/${orderId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setOrderData(response.data); 
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

       const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
         <div
        className={`flex ${
          isArabic
            ? "flex-col md:flex-row"
            : "flex-col-reverse md:flex-row-reverse "
        } pt-16 w-full`}
      >
  <div
        className={`fixed top-0 z-10 transition-all duration-300 w-full  lg:w-[calc(100%-20%)]`}
      >
        <NavbarLogin
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      
        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 rtl"
          style={{ direction: language === "ar" ? "rtl" : "ltr" }}
        >
          {/* عنوان تأكيد الطلب */}
          <div className="text-right border-b pb-4 mb-4">
            <h2 className="text-lg sm:text-xl font-bold"> {translations.pageTitle}</h2>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-md sm:text-lg font-semibold mb-3 sm:mb-4">
              { translations.orderSummary }
              </h3>

              <div className="mb-3 sm:mb-4">
                <h4 className="font-medium text-gray-600 text-sm sm:text-base">
                {translations.userInfo}
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
                      <p> {translations.loadingUserInfo}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {orderData ? (
            <div>
              <div
                key={orderData.id}
                className="border rounded-md p-4 mb-4 mt-5"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold">
                  {translations.orderNo} {orderData.orderNo}
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
                  {translations.totalAmount} {orderData.total} {translations.denar} 
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">
                  {translations.paymentType} {orderData.paymentType}
                  </p>
                  <p className="font-semibold">
                  {translations.discount} {orderData.discount}  {translations.denar} 
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>
            {translations.loadingOrderDetails}
          </p>
          )}

          {/* زر الدفع */}
          <div className="mt-6 text-center">
          <button
      onClick={Paynow}
      className="bg-custom-green text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full font-semibold text-base sm:text-lg w-full md:w-auto"
    >
      {isLoading ? (
        <span>
          {translations.payingNow}
        </span>
      ) : (
        <span>
          {translations.payNow}
        </span>
      )}
    </button>
          </div>
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
    

     
    </>
  );
}

export default Paytheorder;
