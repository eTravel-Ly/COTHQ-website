import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";

function OrderConfirmation() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [userData, setUserData] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { cartItems } = useParams();
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };

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
            <h2 className="text-lg sm:text-xl font-bold">تأكيد الطلب</h2>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Order Summary Section */}
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-md sm:text-lg font-semibold mb-3 sm:mb-4">
                ملخص الطلب
              </h3>
              <div className="flex justify-between items-center border-b pb-2 mb-3 sm:mb-4">
                <span className="text-gray-700 text-sm sm:text-base">
                  {cartItems === 0
                    ? "لا يوجد عناصر"
                    : `${cartItems} ${cartItems === 1 ? "عنصر واحد" : "عناصر"}`}
                </span>

                <span className="font-bold text-md sm:text-lg">
                  {totalPrice.toFixed(2)} د.ل
                </span>
              </div>
              <div className="mb-3 sm:mb-4">
                <h4 className="font-medium text-gray-600 text-sm sm:text-base">
                  معلومات التوصيل
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

            {/* Payment Options Section */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <h3 className="text-md sm:text-lg font-semibold mb-3 sm:mb-4">
                طريقة الدفع
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
            <button className="bg-custom-orange text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full font-semibold text-base sm:text-lg w-full md:w-auto">
              إنشاء طلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
