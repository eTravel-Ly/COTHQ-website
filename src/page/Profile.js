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
    const [language, setLanguage] = useState(sessionStorage.getItem("language"));
  
    const isArabic = language === "ar";

  const [selectedSection, setSelectedSection] = useState("MyBookButton");
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    learnerType: "",
  });
  const [loading, setLoading] = useState(true);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    axios
      .get(baseurl + "my-profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setProfileData(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false); 
      });
  }, []);

  const showbooks = () => setSelectedSection("MyBookButton");
  const showallCourses = () => setSelectedSection("MyCoursesButton");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="text-4xl animate-spin" />
      </div>
    );
  }

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
        <div className="flex flex-1 flex-col" style={{
            fontFamily: "Tajwal, sans-serif",
            direction: isArabic ? "rtl" : "ltr",
            textAlign: isArabic ? "right" : "left",
          }}>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white p-6 shadow-sm rounded-md mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 md:ml-6">
              <img
                src={user}
                className="w-full h-full object-cover"
                alt="User"
              />
            </div>
            <div className={`mt-4 md:mt-0 flex-1  md:${isArabic ? "text-right" : "text-left ml-6"} md:mr-6 `}
            style={{
              direction: isArabic ? "rtl" : "ltr",
            }}>
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
};

export default Profile;
