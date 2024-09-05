import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { useLocation } from "react-router-dom";
import { baseurl } from "../helper/Baseurl";
import axios from "axios";
import logo from "../assets/images/yusr.png";
import otp1 from "../assets/images/otp.png";

function Paynow() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [userData, setUserData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [otp, setOtp] = useState(new Array(5).fill("")); // For OTP input
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };

  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // Simulate loading for 30 seconds
    const timer = setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
    }, 10000); // 30 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleNextStep = () => {
    if (currentStep === 3) {
      setLoading(true);
      // Simulate payment processing with a timeout
      setTimeout(() => {
        setLoading(false);
        setPaymentSuccess(true); // Set payment as successful after loading
      }, 3000); // 3 seconds delay for simulation
    } else {
      setCurrentStep(currentStep + 1); // Move to next step
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return; // Only allow numbers
    const otpArray = [...otp];
    otpArray[index] = element.value;
    setOtp(otpArray);

    // Focus next input automatically
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
            <div className="flex flex-col items-center">
            <img src={logo} alt="Payment Method" className="mb-4 h-20 w-20" />
            <h3 className="text-lg font-bold mb-2">ادفع طلبك الآن</h3>
            
            {/* رقم الطلب وإجمالي الطلب في نفس الصف */}
            <div className="flex justify-center w-full  px-4">
              <p className="mb-4 ml-10">رقم الطلب: 123456</p>
              <p className="mb-4">اجمالي الطلب: 100د</p>
            </div>
            
            <p className="mb-2">تهاني راغب الفيتوري</p>
            
            <div className="mb-4 w-3/4"> {/* زيادة عرض الحقل */}
              <label>ادخل سنة الميلاد</label>
              <input
                type="date"
                className="p-2 border rounded-2xl w-full mt-2 bg-gray-100" // w-full يجعل الحقل بعرض كامل
                placeholder="سنة الميلاد"
              />
            </div>
            
            <div className="mb-4 w-3/4"> {/* زيادة عرض الحقل */}
              <label>ادخل رقم الهاتف</label>
              <input
                type="text"
                className="p-2 border rounded-2xl w-full mt-2 bg-gray-100" // w-full لجعل الحقل بعرض كامل
                placeholder="رقم الهاتف"
              />
            </div>
            <div className="mb-4 w-3/4"> {/* زيادة عرض الحقل */}
            <button
              onClick={handleNextStep}
              className="bg-custom-orange text-white py-2 w-full px-6 rounded-xl"
            >
              ارسال
            </button>
            </div>
          </div>
          
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
           <img src={otp1}  className="mb-4 h-48 w-48" />
           <div className="mb-4 w-3/4"> {/* زيادة عرض الحقل */}
              <label>ادخل رمز التأكيد</label>
              <input
                type="text"
                className="p-2 border rounded-2xl w-full mt-2 bg-gray-100" // w-full يجعل الحقل بعرض كامل
                placeholder="ادخل رمز التأكيد "
              />
            </div>
            <div className="mb-4 w-3/4"> {/* زيادة عرض الحقل */}
            <button
              onClick={handleNextStep}
              className="bg-custom-orange text-white py-2 w-full px-6 rounded-xl"
            >
              تأكيد الدفع
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
                <a href="/order-summary" className="text-blue-500 underline">
                  عرض الطلب
                </a>
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 rtl" style={{ direction: "rtl" }}>
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
          <div className="p-8  rounded-lg shadow">
            {renderStepContent()}
          </div>

       
        </div>
      </div>
    </div>
  );
}

export default Paynow;
