import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import Forgotpassword from "../assets/images/Forgotpassword.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseurl } from "../helper/Baseurl";
import { FaSpinner } from "react-icons/fa"; // أيقونة لودينق
import { useTranslation } from "../context/TranslationContext"; 

const Settings = () => {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
       const { translations } = useTranslation(); 
     
 const [language, setLanguage] = useState("ar");
  const isArabic = language === "ar";

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    learnerType: "",
    studentId: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false); // حالة التحميل

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(baseurl + "my-profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error(translations.errorFetchProfile);
      }
    };
    fetchProfile();
  }, []);
  const handleProfileSubmit = async () => {
    setLoading(true); 
    try {
      const response = await axios.post(
        baseurl + "update-my-profile",
        {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          mobileNo: profileData.mobileNo,
          learnerType: profileData.learnerType,
          studentId: profileData.studentId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success(translations.profileUpdatedSuccess);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(translations.profileUpdateError);
    } finally {
      setLoading(false); 
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("Please select an image file.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  
  const handleSubmit = async () => {
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      toast.warning(translations.warningFillAllFields);
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.warning(translations.warningPasswordsMismatch);
      return;
    }

    setLoading(true); 
    try {
      const response = await axios.post(
        baseurl + "account/change-password",
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(translations.passwordChangedSuccess);
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تغيير كلمة المرور.");
    } finally {
      setLoading(false); // إيقاف عملية التحميل
    }
  };
  return (
    <>
     <div className={`flex ${isArabic ? 'flex-col md:flex-row' : 'flex-col-reverse md:flex-row-reverse '} pt-16 w-full`}>

     <div
        className={`fixed top-0 z-10 transition-all duration-300 w-full  lg:w-[calc(100%-20%)]`}
      >
        <NavbarLogin
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

        <div className="flex flex-1">
          <div className="flex-1 p-8">
            <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white shadow rounded-lg p-2 w-full h-70">
                <div className="flex flex-col items-center mb-4">
                  <h2
                    className="text-lg font-semibold mb-4"
                    style={{ fontFamily: "Tajwal, sans-serif" }}
                  >
                   {translations.editProfile}
                  </h2>
                  <div className="w-full lg:w-5/6">
                    <div className="flex flex-col mb-3">
                      <div className="bg-gray-100 p-2 flex rounded-full items-center justify-center mb-2 mx-auto w-24 h-24">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full rounded-full"
                          />
                        ) : (
                          <label
                            htmlFor="profile-upload"
                            className="cursor-pointer flex justify-center items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-12 w-12 text-gray-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </label>
                        )}
                        <input
                          type="file"
                          id="profile-upload"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                      <div className="flex justify-between mb-3 mx-10">
                        <input
                          type="text"
                          placeholder=   {translations.enterLastName}
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleProfileChange}
                          style={{
                            fontFamily: "Tajwal, sans-serif",
                            direction: "rtl",
                          }}
                          className="bg-gray-100 h-10 p-2 rounded-2xl w-1/2 text-custom-blue outline-none text-l ml-2"
                        />
                        <input
                          type="text"
                          placeholder={translations.enterFirstName}
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleProfileChange}
                          style={{
                            fontFamily: "Tajwal, sans-serif",
                            direction: "rtl",
                          }}
                          className="bg-gray-100 h-10 p-2 rounded-2xl w-1/2 text-custom-blue outline-none text-l"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder={translations.enterMobileNo}
                        name="mobileNo"
                        value={profileData.mobileNo}
                        onChange={handleProfileChange}
                        style={{
                          fontFamily: "Tajwal, sans-serif",
                          direction: "rtl",
                        }}
                        className="bg-gray-100 h-10 p-2 rounded-2xl items-center mb-2 mx-10 text-custom-blue outline-none text-l"
                      />
                      <input
                        type="text"
                        placeholder={translations.enterStudentId}
                        name="studentId"
                        value={profileData.studentId}
                        onChange={handleProfileChange}
                        style={{
                          fontFamily: "Tajwal, sans-serif",
                          direction: "rtl",
                        }}
                        className="bg-gray-100 h-10 p-2 rounded-2xl items-center mb-2 mx-10 text-custom-blue outline-none text-l"
                      />
                      <input
                        type="email"
                        placeholder={translations.enterEmail}
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        style={{
                          fontFamily: "Tajwal, sans-serif",
                          direction: "rtl",
                        }}
                        className="bg-gray-100 h-10 p-2 rounded-2xl items-center mb-2 mx-10 text-custom-blue outline-none text-l"
                      />
                    </div>
                    <div className="flex flex-col mt-2 mb-1">
                      <div className="mt-1 px-20 text-center flex justify-center">
                        <button
                          onClick={handleProfileSubmit}
                          disabled={loading}
                          style={{
                            borderRadius: "10px",
                            width: "80%",
                            fontSize: "16px",
                            fontWeight: "bold",
                            fontFamily: "Tajwal, sans-serif",
                          }}
                          className={`w-1/2 bg-custom-orange  text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center ${
                            loading && "cursor-not-allowed opacity-50"
                          }`}
                        >
                          {loading ? (
                            <FaSpinner className="animate-spin mr-2" />
                          ) : (
                           `${translations.saveChanges}` 
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-2 w-full h-70">
                <div className="flex flex-col items-center mb-4">
                  <h2
                    className="text-lg font-semibold mb-4"
                    style={{
                      fontFamily: "Tajwal, sans-serif",
                      direction: "rtl",
                    }}
                  >
                   {translations.passwordChange}
                  </h2>
                  <div className="w-full lg:w-5/6">
                    <div className="flex flex-col mb-3">
                      <div className="flex items-center justify-center">
                        <img
                          width={150}
                          height={150}
                          src={Forgotpassword}
                          alt="Forgot Password"
                        />
                      </div>
                      <input
                        type="password"
                        placeholder={translations.enterCurrentPassword}
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handleChange}
                        style={{
                          fontFamily: "Tajwal, sans-serif",
                          direction: "rtl",
                        }}
                        className="bg-gray-100 h-10 p-2 rounded-2xl items-center mb-2 mx-10 text-custom-blue outline-none text-l"
                      />
                      <input
                        type="password"
                        placeholder={translations.enterNewPassword}
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        style={{
                          fontFamily: "Tajwal, sans-serif",
                          direction: "rtl",
                        }}
                        className="bg-gray-100 h-10 p-2 rounded-2xl items-center mb-2 mx-10 text-custom-blue outline-none text-l"
                      />
                      <input
                        type="password"
                        placeholder={translations.confirmNewPassword}
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        style={{
                          fontFamily: "Tajwal, sans-serif",
                          direction: "rtl",
                        }}
                        className="bg-gray-100 h-10 p-2 rounded-2xl items-center mb-2 mx-10 text-custom-blue outline-none text-l"
                      />
                    </div>
                    <div className="flex flex-col mt-2 mb-1">
                      <div className="mt-1 px-20 text-center flex justify-center">
                        <button
                          onClick={handleSubmit}
                          disabled={loading}
                          className={`w-1/2 bg-custom-orange  text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center ${
                            loading && "cursor-not-allowed opacity-50"
                          }`}
                          style={{
                            borderRadius: "10px",
                            width: "80%",
                            fontSize: "16px",
                            fontWeight: "bold",
                            fontFamily: "Tajwal, sans-serif",
                          }}
                        >
                          {loading ? (
                            <FaSpinner className="animate-spin mr-2" />
                          ) : (
                            `${translations.saveChanges}` 
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer position="bottom-left" />
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

export default Settings;
