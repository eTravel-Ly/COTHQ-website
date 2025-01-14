import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { useLocation } from "react-router-dom";
import { baseurl } from "../helper/Baseurl";
import axios from "axios";
import logo from "../assets/images/pay.png";
import otp1 from "../assets/images/otp.png";
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from "../context/TranslationContext"; 
function Paynow() {
  const [currentStep, setCurrentStep] = useState(1); 
  const location = useLocation();
  const { orderId } = location.state || {}; 
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null); 
  const [birthYear, setBirthYear] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [errors, setErrors] = useState({});
  const [loading1, setLoading1] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 1024px)' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { translations , language} = useTranslation(); 
    const isArabic = language === "ar";
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
    const timer = setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
    }, 10000);

    return () => clearTimeout(timer); 
  }, [orderId]);

  const handleNextStep = async () => {
    if (currentStep === 1) {
      const newErrors = {};

      if (!birthYear) newErrors.birthYear =  translations.birthYearRequired ;
      if (!phoneNumber) newErrors.phoneNumber = translations.phoneNumberRequired;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        setLoading1(true);

      
        const response = await axios.post(
           baseurl+"pay-sadad/confirm-payment",
          {
            birthYear, 
            phoneNumber, 
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

      
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
  
       
        const response = await axios.post(
          `${baseurl}pay-sadad/request-otp`,
          {sadadReference: otpCode },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
       
        if (response.status === 200) {
          setCurrentStep(currentStep + 1);
        }
      } catch (error) {
        console.error("Error verifying OTP code:", error);
      } finally {
        setLoading1(false);
      }
      setCurrentStep(currentStep + 1);
    } else  if (currentStep === 3) {
      setLoading(true);
     
      setTimeout(() => {
        setLoading(false);
        setPaymentSuccess(true); 
      }, 6000); 
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <img src={logo} alt="Payment Method" className="mb-4 h-42 w-40" />
            <h3 className="text-lg font-bold mb-2">{translations.payOrderNow}  </h3>
            <h3 className="text-lg font-bold mb-2 text-custom-green">
            {translations.paymentMethod} {orderData ? orderData.paymentType : "غير متوفر"}
            </h3>

            <div className="flex justify-center w-full  px-4">
              <p className="mb-4 ml-10">
              {translations.orderNumber}: {orderData ? orderData.orderNo : "غير متوفر"}
              </p>
              <p className="mb-4">
              {translations.totalOrder }: {orderData ? orderData.total : "غير متوفر"}   {translations.dinar }
              </p>
            </div>

            <p className="mb-2">
              {orderData ? orderData.learner.firstName : "غير متوفر"}{" "}
              {orderData ? orderData.learner.lastName : "غير متوفر"}
            </p>

            <div className="mb-4 w-3/4">
            <label> {translations.enterBirthYear}  </label>
            <input
              type="text"
              className="p-2 border rounded-2xl w-full mt-2 bg-gray-100"
              placeholder={translations.birthYearPlaceholder}
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              maxLength="4"
              pattern="\d{4}" 

              
            />
            {errors.birthYear && (
              <p className="text-red-500">{errors.birthYear}</p>
            )}
          </div>


            <div className="mb-4 w-3/4">
              <label> {translations.enterPhoneNumber} </label>
              <input
                type="text"
                className="p-2 border rounded-2xl w-full mt-2 bg-gray-100"
                placeholder={translations.phoneNumberPlaceholder}
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
                {loading1 ? translations.sending : translations.submit}

              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            <img src={otp1} className="mb-4 h-48 w-48" />
            <div className="mb-4 w-3/4">
            <label> {translations.enterOtpCode}</label>
            <input
              type="text"
              className="p-2 border rounded-2xl w-full mt-2 bg-gray-100"
              placeholder={translations.otpCodePlaceholder}
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
                {loading1 ? translations.confirmingPayment : translations.confirmPayment}
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
                <p className="text-lg font-bold mb-4">{translations.paymentSuccessful}</p>
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
    <>
        <div
        className={`flex ${
          isArabic
            ? "flex-col md:flex-row"
            : "flex-col-reverse md:flex-row-reverse "
        } pt-16 w-full`}
      >
<div
        className={`fixed top-0 z-10 transition-all duration-300 w-full lg:w-[calc(100%-20%)]`}
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
      {/* Step Progress Indicator */}
      <div className="flex justify-center items-center mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex items-center justify-center ${
                isSmallScreen ? 'w-6 h-6' : isMediumScreen ? 'w-7 h-7' : 'w-8 h-8'
              } rounded-full border-2 ${
                step <= currentStep
                  ? "border-custom-orange bg-custom-orange text-white"
                  : "border-gray-500"
              }`}
            >
              {step}
            </div>
            {step !== 3 && (
              <div
                className={`${
                  isSmallScreen ? 'w-24' : isMediumScreen ? 'w-40' : 'w-52'
                } h-1 ${
                  step < currentStep ? "bg-custom-orange" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Form Content */}
      <div className="p-8 rounded-lg shadow">{renderStepContent()}</div>
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

export default Paynow;
