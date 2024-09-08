import React , {useState, useEffect } from "react";
import LoginPic2 from "../assets/images/LoginPic2.png";
import logo from "../assets/images/logo.png";
import { baseurl } from '../helper/Baseurl';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon

const LoginRegister = () => {
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

  const [loading, setLoading] = useState(false); // Add loading state

  const [showOTP, setShowOTP] = useState(false);
  const handleVerifyClick  = async (event) => {

    event.preventDefault(); 
    const isValid = validate1(); // Validate the form
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
  
    // تعيين حالة التحميل إلى true عند بدء التسجيل
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
      newErrors.email = 'الرجاء إدخال البريد الإلكتروني';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة';
      valid = false;
    }
    if (!values.firstName) {
      newErrors.firstName = 'الرجاء إدخال الاسم';
      valid = false;
    } else if (!nameRegex.test(values.firstName)) {
      newErrors.firstName = 'الاسم يجب أن يحتوي على حروف فقط';
      valid = false;
    }
    if (!values.lastName) {
      newErrors.lastName = 'الرجاء إدخال اللقب';
      valid = false;
    } else if (!nameRegex.test(values.lastName)) {
      newErrors.lastName = 'اللقب يجب أن يحتوي على حروف فقط';
      valid = false;
    }

    if (!values.birthYear) {
      newErrors.birthYear = 'الرجاء إدخال تاريخ الميلاد';
      valid = false;
    } 

    if (!values.learnerType) {
      newErrors.learnerType = 'الرجاء اختيار نوع الحساب  ';
      valid = false;
    } 
   /* if (!values.studentId) {
      newErrors.studentId = 'الرجاء إدخال رقم الطالب';
      valid = false;
    } else if (!idRegex.test(values.studentId)) {
      newErrors.studentId = 'رقم الطالب يجب أن يحتوي على أرقام فقط';
      valid = false;
    }*/

    if (!values.password) {
      newErrors.password = 'الرجاء إدخال كلمة المرور';
      valid = false;
    } else if (values.password.length < 4) {
      newErrors.password = 'يجب أن تكون كلمة المرور على الأقل 6 أحرف';
      valid = false;
    }

    if (!values.mobileNo) {
      newErrors.mobileNo = 'الرجاء إدخال رقم الهاتف';
      valid = false;
    } else if (!mobileRegex.test(values.mobileNo)) {
      newErrors.mobileNo = 'رقم الهاتف غير صحيح ';
      valid = false;
    }

    if (!values.otp) {
      newErrors.otp = 'الرجاء إدخال OTP';
      valid = false;
    } else if (!otpRegex.test(values.otp)) {
      newErrors.otp = 'OTP يجب أن يتكون من 6 أرقام';
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
      newErrors.email = 'الرجاء إدخال البريد الإلكتروني';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة';
      valid = false;
    }
    if (!values.firstName) {
      newErrors.firstName = 'الرجاء إدخال الاسم';
      valid = false;
    } else if (!nameRegex.test(values.firstName)) {
      newErrors.firstName = 'الاسم يجب أن يحتوي على حروف فقط';
      valid = false;
    }
    if (!values.lastName) {
      newErrors.lastName = 'الرجاء إدخال اللقب';
      valid = false;
    } else if (!nameRegex.test(values.lastName)) {
      newErrors.lastName = 'اللقب يجب أن يحتوي على حروف فقط';
      valid = false;
    }

    if (!values.birthYear) {
      newErrors.birthYear = 'الرجاء إدخال تاريخ الميلاد';
      valid = false;
    } 

    if (!values.learnerType) {
      newErrors.learnerType = 'الرجاء اختيار نوع الحساب  ';
      valid = false;
    } 
/*    if (!values.studentId) {
      newErrors.studentId = 'الرجاء إدخال رقم الطالب';
      valid = false;
    } else if (!idRegex.test(values.studentId)) {
      newErrors.studentId = 'رقم الطالب يجب أن يحتوي على أرقام فقط';
      valid = false;
    }*/

    if (!values.password) {
      newErrors.password = 'الرجاء إدخال كلمة المرور';
      valid = false;
    } else if (values.password.length < 4) {
      newErrors.password = 'يجب أن تكون كلمة المرور على الأقل 6 أحرف';
      valid = false;
    }

    if (!values.mobileNo) {
      newErrors.mobileNo = 'الرجاء إدخال رقم الهاتف';
      valid = false;
    } else if (!mobileRegex.test(values.mobileNo)) {
      newErrors.mobileNo = 'رقم الهاتف غير صحيح ';
      valid = false;
    }

  
    setErrors(newErrors);
    return valid;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'mobileNo' && !/^\d*$/.test(value) || name === 'otp' && !/^\d*$/.test(value)  ) {
      return; // Prevent non-numeric input  || name === 'studentId' && !/^\d*$/.test(value)
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
    <div className="flex  h-full ">
      <div className="w-1/2  h-full">
        <img
          src={LoginPic2}
          alt="Login"
          className="w-[80%] h-[90%]  ml-14 rounded-l  m-3"
        />
      </div>


      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="w-2/3 flex flex-col justify-center items-center mr-14">
          <div className="w-full flex justify-end">
            <img src={logo} alt="Logo" className="mb-2 w-[20%]" />
          </div>

          <div className="w-full text-right mb-5">
            <h2 className="text-2xl font-bold font-tajwal mb-2">
              <span role="img" aria-label="wave" className="ml-2">

              </span>
              مرحبًا بك في المنصة التعليمية
            </h2>
            <p className="text-gray-500 font-tajwal">
              .استمر في مشاهدة الدورات التدريبية التي بدأت مشاهدتها بالفعل
            </p>
          </div>

          <form className="w-full max-w-2xl" >
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  className="block text-gray-700 font-tajwal text-lg font-bold mb-2 text-right"
                  htmlFor="lastName"
                >
                  اللقب
                </label>
                <input
                     id="lastName"
                     type="text"
                     name="lastName"
                     value={values.lastName}
                   onChange={handleChange}
                  className="shadow appearance-none font-tajwal text-right border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="اللقب"
                />
                {errors.lastName && <p className="text-red-500 text-xs mx-1 mt-1 ml-10 text-right" style={{ fontFamily: 'Tajwal, sans-serif' }}>{errors.lastName}</p>}

              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  className="block text-gray-700 font-tajwal text-lg font-bold mb-2 text-right"
                  htmlFor="firstName"
                >
                  الاسم
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  className="shadow appearance-none font-tajwal text-right border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="الاسم"
                />
              {errors.firstName && <p className="text-red-500 text-xs mx-1 mt-1 ml-10 text-right" style={{ fontFamily: 'Tajwal, sans-serif' }}>{errors.firstName}</p>}

              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  className="block text-gray-700 font-tajwal text-lg font-bold mb-2 text-right"
                  htmlFor="accountType"
                >
                  نوع الحساب
                </label>
                <select
                  id="accountType"
                  name="learnerType"
                  value={values.learnerType}
                  onChange={handleChange}
                  className="shadow appearance-none font-tajwal text-right border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value=""> اختر نوع الحساب </option>
                  <option value="INTERNAL_STUDENT">طالب داخلي</option>
                  <option value="EXTERNAL_STUDENT">طالب خارجي</option>
                  <option value="PUBLIC">عام</option>
                  <option value="INSTRUCTOR">مدرب</option>
                </select>
                {errors.learnerType && <p className="text-red-500 text-xs mx-1 mt-1 ml-10 text-right" style={{ fontFamily: 'Tajwal, sans-serif' }}>{errors.learnerType}</p>}
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  className="block text-gray-700 font-tajwal text-lg font-bold mb-2 text-right"
                  htmlFor="birthYear"
                >
                  تاريخ الميلاد
                </label>
                <input
                  id="birthYear"
                  name="birthYear"
                  value={values.birthYear}
                  onChange={handleChange}
                  type="date"
                  className="shadow appearance-none font-tajwal text-right border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
               {errors.birthYear && <p className="text-red-500 text-xs mx-1 mt-1 ml-10 text-right" style={{ fontFamily: 'Tajwal, sans-serif' }}>{errors.birthYear}</p>}

              </div>

              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  className="block text-gray-700 font-tajwal text-lg font-bold mb-2 text-right"
                  htmlFor="mobileNo"
                >
                  رقم الهاتف
                </label>
                <input
                  id="mobileNo"
                  type="text"
                  name="mobileNo"
                  value={values.mobileNo}
                  onChange={handleChange}
                  className="shadow appearance-none font-tajwal text-right border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="رقم الهاتف"
                />
               {errors.mobileNo && <p className="text-red-500 text-xs mx-1 mt-1 ml-10 text-right" style={{ fontFamily: 'Tajwal, sans-serif' }}>{errors.mobileNo}</p>}

              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  className="block text-gray-700 font-tajwal text-lg font-bold mb-2 text-right"
                  htmlFor="studentId"
                >
                  رقم القيد
                </label>
                <input
                  id="registrationNumber"
                  type="text"
                  name="studentId"
                  value={values.studentId}
                  onChange={handleChange}
                  className="shadow appearance-none font-tajwal text-right border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="رقم القيد"
                />
               {errors.studentId && <p className="text-red-500 text-xs mx-1 mt-1 ml-10 text-right" style={{ fontFamily: 'Tajwal, sans-serif' }}>{errors.studentId}</p>}

              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label
                  className="block text-gray-700 font-tajwal text-lg font-bold mb-2 text-right"
                  htmlFor="password"
                >
                  كلمة المرور
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="shadow appearance-none font-tajwal text-right border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="********"
                />
                {errors.password && <p className="text-red-500 text-xs mx-1 mt-1 ml-10 text-right" style={{ fontFamily: 'Tajwal, sans-serif' }}>{errors.password}</p>}
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label
                  className="block text-gray-700 font-tajwal text-lg font-bold mb-2 text-right"
                  htmlFor="email"
                >
                  عنوان البريد الإلكتروني
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="shadow appearance-none font-tajwal text-right border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="email@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mx-1 mt-1 ml-10 text-right" style={{ fontFamily: 'Tajwal, sans-serif' }}>{errors.email}</p>}
              </div>
            </div>
            {!showOTP ? (
        <button
          type="button"
          disabled={loading} // Disable button while loading
          className="bg-custom-orange w-full text-lg font-tajwal text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          onClick={handleVerifyClick}
        >
            {loading ? (
                   <div className="flex justify-center items-center">
                   <FaSpinner className="w-5 h-5 text-white animate-spin" /> {/* أيقونة التحميل */}
                 </div>
                ) : (
                  'تحقق'
                )}
        </button>
      ) : (
       
        <div>
           <label
            className="block text-gray-700 font-tajwal text-lg font-bold mb-2 text-right"
            htmlFor="otp"
          >
            رمز التحقق
          </label>
          <div className="flex items-center">
            <input
              type="text"
              name="otp"
              value={values.otp}
              onChange={handleChange}
              className="shadow appearance-none font-tajwal text-right border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="قم بأدخال رمز التحقق الخاص بك"
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
                <FaSpinner className="w-5 h-5 text-white animate-spin" /> {/* أيقونة التحميل */}
              </div>
            ) : (
              '  إعادة إرسال'
            )}
              
              </button>
            )}
          </div>


          <button
            type="submit"
            disabled={loading} // تعطيل الزر أثناء التحميل
            className="bg-custom-orange mt-4 w-full text-lg font-tajwal text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="w-5 h-5 text-white animate-spin" /> {/* أيقونة التحميل */}
              </div>
            ) : (
              'تسجيل'
            )}
          </button>

        </div>
      )}
          </form>

          <p className="mt-4 font-tajwal">
            لديك حساب؟{" "}
            <a href="Login" className="text-custom-orange font-tajwal">
              قم بتسجيل الدخول الآن
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};
export default LoginRegister;
