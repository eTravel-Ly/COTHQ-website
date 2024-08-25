import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cover from "../assets/images/cover.png"; // Update with competition cover image
import { CiCalendarDate } from "react-icons/ci";

const CompetitionsDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to send data to the server here
    toast.success("تم التسجيل بنجاح!");
  };

  return (
    <div
      className="flex h-screen rtl"
      style={{ fontFamily: "Tajwal, sans-serif" }}
    >
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div
          className="p-4"
          style={{
            fontFamily: "Tajwal, sans-serif",
            direction: "rtl",
            textAlign: "right",
          }}
        >
          <h2 className="text-xl font-bold mb-1 text-custom-orange">
            تفاصيل المسابقة
          </h2>
          <h4 className="text-l font-bold text-gray-500">
            يمكنك الاطلاع على التفاصيل والتسجيل في المسابقة اذا كنت ترغب في
            التسجيل
          </h4>
          <div className="container mx-auto p-4 flex">
            {/* جهة اليمين - نموذج التسجيل */}
            <div className="w-1/2 pr-4 text-right">
              <h2 className="text-xl font-bold mb-4">
                املأ بياناتك هنا للتسجيل
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    ادخل اسمك
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    ادخل رقم الهاتف
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-1"
                  >
                    العنوان
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="block w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-custom-orange text-white py-2 px-4 rounded w-full"
                >
                  تأكيد التسجيل
                </button>
              </form>
            </div>
            <div className="w-[2px] bg-gray-200 mx-4 mr-20"></div>
            {/* جهة اليسار - تفاصيل المسابقة */}
            <div className="w-1/2 pl-4 mr-32 flex flex-col items-center">
              <img
                src={cover} // Make sure to use the appropriate image for the religious competition
                alt="مسابقة دينية"
                className="w-[80%] h-auto mb-4 rounded-lg"
              />
              <h2 className="text-xl font-bold mb-2 text-center">
                مسابقة حفظ القرآن الكريم
              </h2>
              <div className="flex items-center mb-2 justify-center">
                <CiCalendarDate className="text-gray-600 mr-2 ml-2" />
                <p
                  className="text-xs text-gray-500 mb-2 text-center"
                  style={{ lineHeight: "1.5", marginBottom: "8px" }}
                >
                  تاريخ بدء: 01/11/2024
                </p>
              </div>
              <p className="mb-2 text-center">عدد الأشخاص المسجلين: 150</p>
             
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CompetitionsDetails;
