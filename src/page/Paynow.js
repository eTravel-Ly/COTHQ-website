import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { useLocation } from "react-router-dom";
import { baseurl } from "../helper/Baseurl";
import axios from "axios";
import logo from "../assets/images/pay.png";
import otp1 from "../assets/images/otp.png";

function Paynow() {
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const location = useLocation();
  const { orderId } = location.state || {}; // جلب الـ orderId من الـ state
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null); // لتخزين بيانات الطلب
  const [birthYear, setBirthYear] = useState(""); // لتخزين سنة الميلاد
  const [phoneNumber, setPhoneNumber] = useState(""); // لتخزين رقم الهاتف
  const [errors, setErrors] = useState({}); // لتخزين الأخطاء
  const [loading1, setLoading1] = useState(false);
  const [otpCode, setOtpCode] = useState(""); // لتخزين رمز التأكيد

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
    const timer = setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
    }, 10000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [orderId]);

  const handleNextStep = async () => {
    if (currentStep === 1) {
      const newErrors = {};

      if (!birthYear) newErrors.birthYear = "سنة الميلاد مطلوبة";
      if (!phoneNumber) newErrors.phoneNumber = "رقم الهاتف مطلوب";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        setLoading1(true);

        // إرسال البيانات إلى الـ API
        const response = await axios.post(
           baseurl+"pay-sadad/confirm-payment",
          {
            birthYear, // سنة الميلاد
            phoneNumber, // رقم الهاتف
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // التحقق من نجاح العملية
        if (response.status === 201) {
          setCurrentStep(currentStep + 1);

        }
      } catch (error) {
        console.error("Error sending payment details:", error);
      } finally {
        setLoading1(false);
      }
    } else if (currentStep === 2) {
      if (!otpCode) {
        setErrors({ otpCode: "رمز التأكيد مطلوب" });
        return;
      }
  
      try {
        setLoading1(true);
  
        // إرسال رمز التأكيد إلى الـ API
        const response = await axios.post(
          `${baseurl}pay-sadad/request-otp`,
          {sadadReference: otpCode }, // رمز التأكيد
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        // التحقق من نجاح العملية
        if (response.status === 200) {
          setCurrentStep(currentStep + 1); // الانتقال إلى الخطوة التالية
        }
      } catch (error) {
        console.error("Error verifying OTP code:", error);
      } finally {
        setLoading1(false);
      }
      setCurrentStep(currentStep + 1);
    } else  if (currentStep === 3) {
      setLoading(true);
      // Simulate payment processing with a timeout
      setTimeout(() => {
        setLoading(false);
        setPaymentSuccess(true); // Set payment as successful after loading
      }, 6000); // 3 seconds delay for simulation
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <img src={logo} alt="Payment Method" className="mb-4 h-42 w-40" />
            <h3 className="text-lg font-bold mb-2">ادفع طلبك الآن</h3>
            <h3 className="text-lg font-bold mb-2 text-custom-green">
              طريقة الدفع {orderData ? orderData.paymentType : "غير متوفر"}
            </h3>

            <div className="flex justify-center w-full  px-4">
              <p className="mb-4 ml-10">
                رقم الطلب: {orderData ? orderData.orderNo : "غير متوفر"}
              </p>
              <p className="mb-4">
                اجمالي الطلب: {orderData ? orderData.total : "غير متوفر"} دينار
              </p>
            </div>

            <p className="mb-2">
              {orderData ? orderData.learner.firstName : "غير متوفر"}{" "}
              {orderData ? orderData.learner.lastName : "غير متوفر"}
            </p>

            <div className="mb-4 w-3/4">
            <label>ادخل سنة الميلاد</label>
            <input
              type="text"
              className="p-2 border rounded-2xl w-full mt-2 bg-gray-100"
              placeholder="أدخل سنة الميلاد (مثال: 1990)"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              maxLength="4"
              pattern="\d{4}" // يتيح فقط 4 أرقام
            />
            {errors.birthYear && (
              <p className="text-red-500">{errors.birthYear}</p>
            )}
          </div>


            <div className="mb-4 w-3/4">
              <label>ادخل رقم الهاتف</label>
              <input
                type="text"
                className="p-2 border rounded-2xl w-full mt-2 bg-gray-100"
                placeholder="رقم الهاتف"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="mb-4 w-3/4">
              <button
                onClick={handleNextStep}
                className="bg-custom-orange text-white py-2 w-full px-6 rounded-xl"
                disabled={loading1}
              >
                {loading1 ? "جاري الإرسال..." : "ارسال"}
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            <img src={otp1} className="mb-4 h-48 w-48" />
            <div className="mb-4 w-3/4">
            <label>ادخل رمز التأكيد</label>
            <input
              type="text"
              className="p-2 border rounded-2xl w-full mt-2 bg-gray-100"
              placeholder="ادخل رمز التأكيد "
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
            {errors.otpCode && (
              <p className="text-red-500">{errors.otpCode}</p>
            )}
          </div>

            <div className="mb-4 w-3/4">
              <button
                onClick={handleNextStep}
                className="bg-custom-orange text-white py-2 w-full px-6 rounded-xl"
              >
                {loading1 ? "جاري تأكيد الدفع..." : "تأكيد الدفع"}
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center">
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="loader mb-4 border-t-4 border-blue-500 border-solid rounded-full h-16 w-16 animate-spin"></div>
                <p>جاري دفع الطلب...</p>
              </div>
            ) : paymentSuccess ? (
              <div className="flex flex-col items-center">
                <div className="text-green-500 text-9xl mb-4">✔</div>
                <p className="text-lg font-bold mb-4">تم دفع الطلب بنجاح!</p>
                {/*
                <a href="/order-summary" className="text-blue-500 underline">
                  عرض الطلب
                </a>
                */}
              </div>
            ) : null}
          </div>
        );
      default:
        return <div></div>;
    }
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
          {/* Step Progress Indicator */}
          <div className="flex justify-center items-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step <= currentStep
                      ? "border-custom-orange bg-custom-orange text-white"
                      : "border-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step !== 3 && (
                  <div
                    className={`w-52 h-1 ${
                      step < currentStep ? "bg-custom-orange" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Step Form Content */}
          <div className="p-8  rounded-lg shadow">{renderStepContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Paynow;
