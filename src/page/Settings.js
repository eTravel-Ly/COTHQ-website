import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import Forgotpassword from "../assets/images/Forgotpassword.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseurl } from "../helper/Baseurl";

const Settings = () => {
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
        toast.error("حدث خطأ أثناء جلب بيانات المستخدم.");
      }
    };
    fetchProfile();
  }, []);
const handleProfileSubmit = async () => {
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
        // Add other fields as necessary
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      toast.success("تم حفظ التغييرات بنجاح.");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error("حدث خطأ أثناء حفظ التغييرات.");
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
    // Check if any field is empty
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      toast.warning("الرجاء ملء جميع الحقول.");
      return;
    }

    // Check if newPassword and confirmPassword match
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.warning(
        "كلمة المرور الجديدة وتأكيد كلمة المرور الجديدة غير متطابقين."
      );
      return;
    }

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
        toast.success("تم تغيير كلمة المرور بنجاح.");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تغيير كلمة المرور.");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div className="flex flex-1">
          <div className="flex-1 p-8">
            <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white shadow rounded-lg p-2 w-full h-70">
                <div className="flex flex-col items-center mb-4">
                  <h2
                    className="text-lg font-semibold mb-4"
                    style={{ fontFamily: "Tajwal, sans-serif" }}
                  >
                    تعديل بيانات المستخدم
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
                          placeholder={"ادخل اللقب"}
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
                          placeholder={"ادخل الاسم الأول"}
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
                        placeholder={"ادخل رقم الهاتف"}
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
                        placeholder={"رقم القيد "}
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
                        placeholder={"ادخل البريد الالكترونى"}
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
                          onClick={handleProfileSubmit} // Attach the save function here
                          className="bg-custom-orange text-white rounded-lg w-32 h-10 text-xl"
                          style={{
                            borderRadius: "10px",
                            width: "80%",
                            fontSize: "16px",
                            fontWeight: "bold",
                            fontFamily: "Tajwal, sans-serif",
                          }}
                        >
                          حـــفــــظ
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
                    تغيير كلمة المرور
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
                        placeholder={"ادخل كلمة المرور القديمة"}
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
                        placeholder={"ادخل كلمة المرور الجديدة"}
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
                        placeholder={"ادخل تأكيد كلمة المرور الجديدة"}
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
                          onClick={handleProfileSubmit}
                          className="bg-custom-orange text-white rounded-lg w-32 h-10 text-xl"
                          style={{
                            borderRadius: "10px",
                            width: "80%",
                            fontSize: "16px",
                            fontWeight: "bold",
                            fontFamily: "Tajwal, sans-serif",
                          }}
                        >
                          حـــفــــظ
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
      </div>
    </div>
  );
};

export default Settings;
