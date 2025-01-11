import React , {useState, useEffect } from "react";
import LoginPic2 from "../assets/images/LoginPic2.png";
import logo from "../assets/images/logo.png";
import { baseurl } from '../helper/Baseurl';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { useTranslation } from "../context/TranslationContext"; 

const LoginRegister = () => {
    const { translations,  language, } = useTranslation(); 
    const isRtl = language === "ar";

  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    birthYear: '',
    email: '',
    mobileNo: '',
    learnerType: '',
    studentId:'',
    password:'',
    otp:''
  });

  const [loading, setLoading] = useState(false); 

  const [showOTP, setShowOTP] = useState(false);
  const handleVerifyClick  = async (event) => {

    event.preventDefault(); 
    const isValid = validate1(); 
    if (!isValid) {
      return;
    }
    try {
   
      const response = await axios.post(baseurl + 'public/activation/request-otp',{
        email: values.email 
      });
      if (response.status === 201 ) {
        setShowOTP(true);
        toast.success('تم ارسال رمز التحقق بنجاح');
      
      }
    } catch (error) {
        toast.error('حدث خطأ أثناء الادخال. الرجاء المحاولة مرة أخرى.');
      
    }
  };

  const [otpError, setOtpError] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
  
    setLoading(true);
  
    const year = values.birthYear.substring(0, 4);
    const dataToSend = { ...values, birthYear: year };
  
    try {
      const response = await axios.post(baseurl + 'public/learner/register', dataToSend);
      if (response.status === 201) {
        toast.success('تم تسجيلك بنجاح يمكنك الدخول للنظام الآن.');
  
        // تفريغ القيم بعد التسجيل الناجح
        setValues({
          lastName: '',
          firstName: '',
          learnerType: '',
          birthYear: '',
          mobileNo: '',
          studentId: '',
          password: '',
          email: '',
          otp: ''
        });
  
        // الانتقال إلى صفحة تسجيل الدخول بعد التأخير
        setTimeout(() => {
          navigate('/Login');
        }, 3000);
      }
    } catch (error) {
      // التحقق من رسالة الخطأ من استجابة الـ API
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
  
        // التعامل مع الأخطاء المحددة
        if (errorMessage === 'OTP_ALREADY_USED') {
          setOtpError(true); // إظهار زر إعادة الإرسال
          toast.error('الرمز مستخدم بالفعل قم بالضغط على زر اعادة ارسال');

        } else if (errorMessage === 'Login name already used!') {
          toast.error('هذا المستخدم مسجل بالفعل في النظام.');
        } else if(errorMessage === 'INVALID_OTP') {
          setOtpError(true); // إظهار زر إعادة الإرسال
          toast.error('الرمز   انتهت صلاحيته قم بالضغط على زر اعادة ارسال');
        }else {
          toast.error(errorMessage);

        }

        
      }
    } finally {
      // تعيين حالة التحميل إلى false بعد إتمام العملية
      setLoading(false);
    }
  };
  
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    birthYear: '',
    email: '',
    mobileNo: '',
    learnerType: '',
    studentId:'',
    password:'',
    otp:''
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event); // تمرير الحدث إلى handleClick
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [values]);

  const validate = () => {
    let valid = true;
    let newErrors = { 
    firstName: '',
    lastName: '',
    birthYear: '',
    email: '',
    mobileNo: '',
    learnerType: '',
    studentId:'',
    password:'',
    otp:''
  };
  const idRegex = /^[0-9]+$/;
  const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/; 
  const mobileRegex = /^(091|092|093|094|095)\d{7}$/; 
  const otpRegex = /^\d{6}$/; 

    if (!values.email) {
      newErrors.email = translations.emailError1;
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = translations.emailError;
      valid = false;
    }
    if (!values.firstName) {
      newErrors.firstName = translations.firstNameError;
      valid = false;
    } else if (!nameRegex.test(values.firstName)) {
      newErrors.firstName = translations.firstNamevalid ;
      valid = false;
    }
    if (!values.lastName) {
      newErrors.lastName = translations.lastNameError;
      valid = false;
    } else if (!nameRegex.test(values.lastName)) {
      newErrors.lastName = translations.lastNamevalid;
      valid = false;
    }

    if (!values.birthYear) {
      newErrors.birthYear = translations.birthYearError;
      valid = false;
    } 

    if (!values.learnerType) {
      newErrors.learnerType = translations.learnerTypeError; 
      valid = false;
    } 
  

    if (!values.password) {
      newErrors.password = translations.passwordError  ;
      valid = false;
    } else if (values.password.length < 4) {
      newErrors.password = translations.passwordLengthError   ;
      valid = false;
    }

    if (!values.mobileNo) {
      newErrors.mobileNo = translations.mobileNoError    ;
      valid = false;
    } else if (!mobileRegex.test(values.mobileNo)) {
      newErrors.mobileNo =  translations.mobileNoError ;
      valid = false;
    }

    if (!values.otp) {
      newErrors.otp = translations.otpenter   ;
      valid = false;
    } else if (!otpRegex.test(values.otp)) {
      newErrors.otp = translations.otpError     ;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const validate1 = () => {
    let valid = true;
    let newErrors = { 
    firstName: '',
    lastName: '',
    birthYear: '',
    email: '',
    mobileNo: '',
    learnerType: '',
    studentId:'',
    password:'',
    otp:''
  };
  const idRegex = /^[0-9]+$/;
  const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/; 
  const mobileRegex = /^(091|092|093|094|095)\d{7}$/; 
  const otpRegex = /^\d{6}$/; 

  if (!values.email) {
    newErrors.email = translations.emailError;
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    newErrors.email = translations.emailError;
    valid = false;
  }

  // First Name validation
  if (!values.firstName) {
    newErrors.firstName = translations.firstNameError;
    valid = false;
  } else if (!nameRegex.test(values.firstName)) {
    newErrors.firstName = translations.firstNameError;
    valid = false;
  }

  // Last Name validation
  if (!values.lastName) {
    newErrors.lastName = translations.lastNameError;
    valid = false;
  } else if (!nameRegex.test(values.lastName)) {
    newErrors.lastName = translations.lastNameError;
    valid = false;
  }

  // Birth Year validation
  if (!values.birthYear) {
    newErrors.birthYear = translations.birthYearError;
    valid = false;
  }

  // Account Type validation
  if (!values.learnerType) {
    newErrors.learnerType = translations.learnerTypeError;
    valid = false;
  }

  // Password validation
  if (!values.password) {
    newErrors.password = translations.passwordError;
    valid = false;
  } else if (values.password.length < 6) {
    newErrors.password = translations.passwordLengthError;
    valid = false;
  }

  // Mobile Number validation
  if (!values.mobileNo) {
    newErrors.mobileNo = translations.mobileNoError;
    valid = false;
  } else if (!mobileRegex.test(values.mobileNo)) {
    newErrors.mobileNo = translations.mobileNoError;
    valid = false;
  }

  
    setErrors(newErrors);
    return valid;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'mobileNo' && !/^\d*$/.test(value) || name === 'otp' && !/^\d*$/.test(value)  ) {
      return; 
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  return (
    <div className="flex  h-full " id="LoginRegister">
       {/* صورة جانبية */}
       <div className="hidden md:block w-1/2 h-full">
      <img
        src={LoginPic2}
        alt="Login"
        className="w-[80%] h-[90%] ml-14 rounded-l m-3"
      />
    </div>



    <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 ">
  <div className={`w-full md:w-2/3 flex flex-col justify-center items-center ${isRtl ? 'md:ml-14' : 'md:mr-14'}`}>
    {/* شعار */}
    <div className={`w-full flex justify-center ${isRtl ? 'md:justify-end' : 'md:justify-start '}`}>
      <img src={logo} alt="Logo" className="mb-2 w-[20%] md:w-[20%]" />
    </div>

    <div className={`w-full ${isRtl ? 'text-right' : 'text-left'} mb-5`}>
      <h2 className="text-2xl font-bold font-tajwal mb-2">
        <span role="img" aria-label="wave" className={isRtl ? 'mr-2' : 'ml-2'}></span>
        {translations.platformWelcome}
      </h2>
      <p className="text-gray-500 font-tajwal">
        {translations.continueWatching}
      </p>
    </div>

    <form className="w-full max-w-2xl">
      <div className="flex flex-wrap">
        {/* Last Name */}
        <div className={`w-full md:w-1/2 px-4 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
          <label
            className={`block text-gray-700 font-tajwal text-lg font-bold mb-2 ${isRtl ? 'text-right' : 'text-left'}`}
            htmlFor="lastName"
          >
            {translations.lastName}
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            className={`shadow appearance-none font-tajwal ${isRtl ? 'text-right' : 'text-left'} border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder={translations.lastName}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mx-1 mt-1 ml-10">
              {errors.lastName}
            </p>
          )}
        </div>

        {/* First Name */}
        <div className={`w-full md:w-1/2 px-4 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
          <label
            className={`block text-gray-700 font-tajwal text-lg font-bold mb-2 ${isRtl ? 'text-right' : 'text-left'}`}
            htmlFor="firstName"
          >
            {translations.firstName}
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            className={`shadow appearance-none font-tajwal ${isRtl ? 'text-right' : 'text-left'} border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder={translations.firstName}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mx-1 mt-1 ml-10">
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Account Type */}
        <div className={`w-full md:w-1/2 px-4 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
          <label
            className={`block text-gray-700 font-tajwal text-lg font-bold mb-2 ${isRtl ? 'text-right' : 'text-left'}`}
            htmlFor="accountType"
          >
            {translations.accountType}
          </label>
          <select
            id="accountType"
            name="learnerType"
            value={values.learnerType}
            onChange={handleChange}
            className={`shadow appearance-none font-tajwal ${isRtl ? 'text-right' : 'text-left'} border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          >
            <option value="">{translations.accountType}</option>
            <option value="INTERNAL_STUDENT">{translations.internalStudent}</option>
            <option value="EXTERNAL_STUDENT">{translations.externalStudent}</option>
            <option value="PUBLIC">{translations.public}</option>
            <option value="INSTRUCTOR">{translations.instructor}</option>
          </select>
          {errors.learnerType && (
            <p className="text-red-500 text-xs mx-1 mt-1 ml-10">
              {errors.learnerType}
            </p>
          )}
        </div>

        {/* Birth Year */}
        <div className={`w-full md:w-1/2 px-4 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
          <label
            className={`block text-gray-700 font-tajwal text-lg font-bold mb-2 ${isRtl ? 'text-right' : 'text-left'}`}
            htmlFor="birthYear"
          >
            {translations.birthYear}
          </label>
          <input
            id="birthYear"
            name="birthYear"
            value={values.birthYear}
            onChange={handleChange}
            type="date"
            className={`shadow appearance-none font-tajwal ${isRtl ? 'text-right' : 'text-left'} border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          />
          {errors.birthYear && (
            <p className="text-red-500 text-xs mx-1 mt-1 ml-10">
              {errors.birthYear}
            </p>
          )}
        </div>

        {/* Mobile No */}
        <div className={`w-full md:w-1/2 px-4 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
          <label
            className={`block text-gray-700 font-tajwal text-lg font-bold mb-2 ${isRtl ? 'text-right' : 'text-left'}`}
            htmlFor="mobileNo"
          >
            {translations.mobileNo}
          </label>
          <input
            id="mobileNo"
            type="text"
            name="mobileNo"
            value={values.mobileNo}
            onChange={handleChange}
            className={`shadow appearance-none font-tajwal ${isRtl ? 'text-right' : 'text-left'} border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder={translations.placeholderPhone}
          />
          {errors.mobileNo && (
            <p className="text-red-500 text-xs mx-1 mt-1 ml-10">
              {errors.mobileNo}
            </p>
          )}
        </div>

        {/* Student ID */}
        <div className={`w-full md:w-1/2 px-4 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
          <label
            className={`block text-gray-700 font-tajwal text-lg font-bold mb-2 ${isRtl ? 'text-right' : 'text-left'}`}
            htmlFor="studentId"
          >
            {translations.studentId}
          </label>
          <input
            id="studentId"
            type="text"
            name="studentId"
            value={values.studentId}
            onChange={handleChange}
            className={`shadow appearance-none font-tajwal ${isRtl ? 'text-right' : 'text-left'} border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder={translations.studentId}
          />
          {errors.studentId && (
            <p className="text-red-500 text-xs mx-1 mt-1 ml-10">
              {errors.studentId}
            </p>
          )}
        </div>

        {/* Password */}
        <div className={`w-full md:w-1/2 px-4 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
          <label
            className={`block text-gray-700 font-tajwal text-lg font-bold mb-2 ${isRtl ? 'text-right' : 'text-left'}`}
            htmlFor="password"
          >
            {translations.password}
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className={`shadow appearance-none font-tajwal ${isRtl ? 'text-right' : 'text-left'} border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder={translations.placeholderPassword}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mx-1 mt-1 ml-10">
              {errors.password}
            </p>
          )}
        </div>

        {/* Email */}
        <div className={`w-full md:w-1/2 px-2 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
          <label
            className={`block text-gray-700 font-tajwal text-lg font-bold mb-2 ${isRtl ? 'text-right' : 'text-left'}`}
            htmlFor="email"
          >
            {translations.email}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className={`shadow appearance-none font-tajwal ${isRtl ? 'text-right' : 'text-left'} border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder={translations.placeholderEmail}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mx-1 mt-1 ml-10">
              {errors.email}
            </p>
          )}
        </div>
  
      </div>
      {!showOTP ? (
        <button
          type="button"
          disabled={loading} 
          className="bg-custom-orange w-full text-lg font-tajwal text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          onClick={handleVerifyClick}
        >
            {loading ? (
                   <div className="flex justify-center items-center">
                   <FaSpinner className="w-5 h-5 text-white animate-spin" /> 
                 </div>
                ) : (
                  translations.verifyButton
                )}
        </button>
      ) : (
       
        <div>
           <label
            className="block text-gray-700 font-tajwal text-lg font-bold mb-2 text-right"
            htmlFor="otp"
          >
           {translations.otpLabel}
          </label>
          <div className="flex items-center">
            <input
              type="text"
              name="otp"
              value={values.otp}
              onChange={handleChange}
              className="shadow appearance-none font-tajwal text-right border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={translations.placeholderotpLabel}
            />
            {errors.otp && <p className="text-red-500 text-xs mx-1 mt-1 ml-10 text-right" style={{ fontFamily: 'Tajwal, sans-serif' }}>{errors.otp}</p>}

            {otpError && (
              <button
                onClick={handleVerifyClick}
                className="ml-2 bg-custom-green text-white font-bold py-1 px-3 rounded text-sm"
                style={{ fontFamily: 'Tajwal, sans-serif' }}
              >
              {loading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="w-5 h-5 text-white animate-spin" /> 
              </div>
            ) : (
              translations.resendButton
            )}
              
              </button>
            )}
          </div>


          <button
            type="submit"
            disabled={loading} 
            className="bg-custom-orange mt-4 w-full text-lg font-tajwal text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="w-5 h-5 text-white animate-spin" /> 
              </div>
            ) : (
              translations.submitButton
            )}
          </button>

        </div>
      )}
    </form>
  </div>
</div>

      <ToastContainer />

    </div>
  );
};
export default LoginRegister;
