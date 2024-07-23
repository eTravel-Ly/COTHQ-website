import React, { useState, useEffect } from "react";
import loginPic from "../assets/images/loginPic.png";
import logo from "../assets/images/logo.png";
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../helper/Baseurl';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const handleClick = async (event) => {
    navigate('/HomeAfterLogin');
   event.preventDefault(); // منع إعادة تحميل الصفحة
 /*   if (!validate()) {
      return;
    }
    try {
      const response = await axios.post(baseurl + 'authenticate', values);
      if (response.status === 200 && response.data.id_token) {
        localStorage.setItem('token', response.data.id_token);
        navigate('/HomeAfterLogin');
        toast.success('مرحبا');
      }
    } catch (error) {
      
      if (error.response.status === 401) {
        toast.warning('كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
      } else {
        toast.error('حدث خطأ أثناء الادخال. الرجاء المحاولة مرة أخرى.');
      }
    }*/
  };

  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick(event); // تمرير الحدث إلى handleClick
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
    let newErrors = { username: '', password: '' };

    if (!values.username) {
      newErrors.username = 'الرجاء إدخال البريد الإلكتروني';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.username)) {
      newErrors.username = 'صيغة البريد الإلكتروني غير صحيحة';
      valid = false;
    }

    if (!values.password) {
      newErrors.password = 'الرجاء إدخال كلمة المرور';
      valid = false;
    } else if (values.password.length < 4) {
      newErrors.password = 'يجب أن تكون كلمة المرور على الأقل 6 أحرف';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };
  const handleRegisterRedirect = () => {
    navigate('/LoginRegister');
  };
  return (
    <div className="flex h-screen">
      {/* Left side image */}
      <div className="w-1/2 h-full">
        <img
          src={loginPic}
          alt="Login"
          className="w-[90%] h-[97%] ml-14 rounded-l m-3"
        />
      </div>

      {/* Right side form */}
      <div className="w-2/3 flex flex-col justify-center items-center">
        <div className="w-2/3 flex flex-col justify-center items-center mr-14">
          <div className="w-full flex justify-end">
            <img src={logo} alt="Logo" className="mb-5 w-[20%]" />
          </div>

          <div className="w-full text-right mb-8">
            <h2 className="text-2xl font-bold font-tajwal mb-2">
              <span role="img" aria-label="wave" className="ml-2">
                👋
              </span>
              مرحبًا بك في المنصة التعليمية
            </h2>
            <p className="text-gray-500 font-tajwal">
              .استمر في مشاهدة الدورات التدريبية التي بدأت مشاهدتها بالفعل
            </p>
          </div>
          <form className="w-full max-w-sm ml-28">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-tajwal text-lg font-bold mb-2 text-right"
                htmlFor="username"
              >
                عنوان البريد الإلكتروني
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                className="shadow appearance-none font-tajwal text-right border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="email@example.com"
              />
              {errors.username && <p className="text-red-500 text-xs mx-1 mt-1 ml-10 text-right" style={{ fontFamily: 'Tajwal, sans-serif' }}>{errors.username}</p>}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-tajwal text-lg font-bold mb-2 text-right"
                htmlFor="password"
              >
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className="shadow appearance-none font-tajwal border text-right rounded w-full text-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="********"
              />
              {errors.password && <p className="text-red-500 text-xs mx-1 mt-1 ml-14 text-right" style={{ fontFamily: 'Tajwal, sans-serif' }}>{errors.password}</p>}
            </div>
            <div className="w-full text-right mb-8">
              <button
                onClick={handleClick}
                className="bg-custom-orange w-full text-lg font-tajwal text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              >
                تسجيل
              </button>
              <p className="text-custom-orange text-center mt-2 font-tajwal">
                {" "}
                <a href="#">
                  هل نسيت كلمة المرور ؟
                </a>
              </p>
            </div>
          </form>
          <p className="mt-4 ml-16 font-tajwal">
            لديك حساب؟{" "}
            <a href="#" className="text-custom-orange ml-16 font-tajwal" onClick={handleRegisterRedirect}>
              قم بتسجيل الدخول الآن
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
