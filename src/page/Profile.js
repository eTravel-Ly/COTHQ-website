import React, { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import user from "../assets/images/user.png";
import MyCoursesButton from "../component/MyCoursesButton";
import MyBookButton from "../component/MyBookButton";
import { baseurl } from "../helper/Baseurl";
import axios from "axios";
import { FaSpinner } from 'react-icons/fa'; // لأيقونة التحميل

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState("MyBookButton");
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    learnerType: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(baseurl + "my-profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setProfileData(response.data);
        setLoading(false); // إيقاف اللودينق بعد جلب البيانات
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false); // إيقاف اللودينق في حالة حدوث خطأ
      });
  }, []);

  const showbooks = () => setSelectedSection("MyBookButton");
  const showallCourses = () => setSelectedSection("MyCoursesButton");

  if (loading) {
    // عرض مكون اللودينق في حالة انتظار تحميل البيانات
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="text-4xl animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div className="flex flex-1 flex-col" dir="rtl">
          <div
            className="flex flex-col md:flex-row items-center bg-white p-6 shadow-sm rounded-md mb-4 mr-20"
            style={{
              width: "800px",
            }}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mr-20">
              <img
                src={user}
                className="w-full h-full object-cover"
                alt="User"
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 mr-24">
              <p
                className="text-gray-700 font-bold"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                اسم المستخدم
              </p>
              <p
                className="text-gray-700"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                {profileData.firstName} {profileData.lastName}
              </p>

              <p
                className="text-gray-700 font-bold"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                البريد الالكتروني
              </p>
              <p
                className="text-gray-700"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                {profileData.email}
              </p>

              <p
                className="text-gray-700 font-bold"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                رقم الهاتف
              </p>
              <p
                className="text-gray-700"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                {profileData.mobileNo}
              </p>

              <p
                className="text-gray-700 font-bold"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                نوع الحساب
              </p>
              <p
                className="text-gray-700"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                {profileData.learnerType}
              </p>
            </div>
          </div>

          <div className="flex flex-col bg-white p-6 rounded-md">
            <p
              className="text-gray-700 mb-4 font-bold text-2xl"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              الكتب والدورات الخاصة بالطالب {profileData.firstName}{" "}
              {profileData.lastName}:
            </p>
            <div className="flex mt-4">
              <button
                style={{ fontFamily: "Tajwal, sans-serif" }}
                className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                  selectedSection === "MyBookButton" ? "bg-custom-orange" : ""
                }`}
                onClick={showbooks}
              >
                الكتب الخاصة بك
              </button>
              <button
                style={{ fontFamily: "Tajwal, sans-serif" }}
                className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                  selectedSection === "MyCoursesButton"
                    ? "bg-custom-orange"
                    : ""
                }`}
                onClick={showallCourses}
              >
                الكورسات الخاصة بك
              </button>
            </div>
          </div>

          {selectedSection === "MyCoursesButton" && <MyCoursesButton />}
          {selectedSection === "MyBookButton" && <MyBookButton />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
