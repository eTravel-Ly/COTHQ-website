import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "../context/TranslationContext"; 
function OrderConfirmation() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [userData, setUserData] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const { cartItems } = useParams();
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { translations , language} = useTranslation(); 
  const isArabic = language === "ar";
  const showPicPayment = async (fileName) => {
    try {
      const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
      console.log("Fetched image URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
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

    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(`${baseurl}public/payment-methods`);
        const paymentMethodsWithImages = await Promise.all(
          response.data.map(async (method) => {
            const imageUrl = await showPicPayment(method.imageFileUrl);
            return { ...method, imageUrl };
          })
        );
        setPaymentMethods(paymentMethodsWithImages);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchUserProfile();
    fetchPaymentMethods();
  }, []);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCreateOrder = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        baseurl + "checkout",
        {
          paymentType: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      const orderId = response.data.id; 
      toast.success(
        translations.createOrderSuccess 
      );
      navigate('/Paytheorder', { state: { orderId } }); 
  
    } catch (error) {
      console.error("Error creating order:", error);
      toast.warning(translations.createOrderFailure );
    } finally {
      setIsLoading(false); 
    }
  };
  

  return (
    <>
 <div
        className={`flex ${
          isArabic
            ? "flex-col md:flex-row "
            : "flex-col-reverse md:flex-row-reverse  "
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
          {/* Order Confirmation Header */}
          <div className="text-right border-b pb-4 mb-4">
            <h2 className="text-lg sm:text-xl font-bold">     {translations.orderConfirmation}</h2>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Order Summary Section */}
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-md sm:text-lg font-semibold mb-3 sm:mb-4">
              {translations.orderSummary}
              </h3>
              <div className="flex justify-between items-center border-b pb-2 mb-3 sm:mb-4">
                <span className="text-gray-700 text-sm sm:text-base">
                {cartItems === 0
              ? translations.noItems
              : `${cartItems} ${
                  cartItems === 1
                    ? translations.oneItem
                    : translations.multipleItems
                }`}
                </span>

                <span className="font-bold text-md sm:text-lg">
                  {totalPrice.toFixed(2)}   {translations.denar}
                </span>
              </div>
              <div className="mb-3 sm:mb-4">
                <h4 className="font-medium text-gray-600 text-sm sm:text-base">
                {translations.deliveryInfo}
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
                      <p>{translations.loadingDeliveryInfo}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options Section */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-md sm:text-lg font-semibold mb-3 sm:mb-4">
              {translations.paymentMethod}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`payment-${method.id}`}
                        name="payment-method"
                        value={method.paymentType}
                        checked={paymentMethod === method.paymentType}
                        onChange={handlePaymentChange}
                        className="form-radio h-4 w-4 sm:h-5 sm:w-5"
                      />
                      <label
                        htmlFor={`payment-${method.id}`}
                        className="mr-3 flex items-center text-sm sm:text-base"
                      >
                        <img
                          src={method.imageUrl}
                          alt={method.nameEn}
                          className="ml-2 h-6 w-6 sm:h-8 sm:w-8"
                        />
                        {method.nameAr}
                      </label>
                    </div>
                    {method.paymentType === "MOAMALAT" && (
                      <span className="text-gray-500 text-xs sm:text-sm">
                        {method.details}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleCreateOrder}
              disabled={isLoading} // Disable button while loading
              className={`bg-custom-orange text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full font-semibold text-base sm:text-lg w-full md:w-auto ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
             {isLoading ? (
          <span>{translations.creatingOrder}</span>
        ) : (
          <span>{translations.createOrder}</span>
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
   
      <ToastContainer />
    </>
  );
}

export default OrderConfirmation;
