import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import Navbar from "../component/Navbar"; // Import the Navbar component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiCalendarDate } from "react-icons/ci";
import axios from "axios";
import cover from "../assets/images/allContests.jpg";
import { baseurl } from "../helper/Baseurl";
import { useTranslation } from "../context/TranslationContext"; 


export default function ContestsDetails() {

  const { translations , language} = useTranslation(); 
  const isArabic = language === "ar";

  const [conditions, setConditions] = useState([]);
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { Id } = useParams(); 
      const [contests, setContests] = useState(null);

      const generateImageUrl = (coverImageUrl) => {
        const baseImageUrl = `${baseurl}uploads/file/download/`;
        return coverImageUrl
          ? `${baseImageUrl}${coverImageUrl}`
          : ""; // Replace with a path to a default image if necessary
      };

       useEffect(() => {
         const fetchcontestsDetails = async () => {
           try {
             const response = await axios.get(baseurl + `public/event/${Id}`, {
               headers: {
                 accept: "application/json",
               },
             });
             const conditionsText = response.data.conditions;
             const conditionsArray = conditionsText.split('\r\n\r\n');
             const imageUrl = generateImageUrl(response.data.coverImageUrl);

             setConditions(conditionsArray);
             setContests({
              ...response.data,
              imageUrl, // Include the generated image URL
            });
         
           } catch (error) {
             console.error("Error fetching contests details", error);
           }
         };

         fetchcontestsDetails();
       }, [Id]); 
        const token = localStorage.getItem("token");
         if (!contests)
           return (
             <div className="flex justify-center items-center h-screen">
               <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
             </div>
           );
           
  return (
    <>
      {token ? (
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
          <div
  className="p-4 flex-1"
  style={{
    fontFamily: "Tajwal, sans-serif",
    direction: isArabic ? "rtl" : "ltr",
    textAlign: isArabic ? "right" : "left",
  }}
>
  <div className={`flex flex-col md:flex-row ${isArabic ? "md:space-x-reverse" : ""} space-y-4 md:space-y-0 md:space-x-4`}>
    <div className="md:w-1/4 p-4">
      <img src={contests.imageUrl} alt="Book" className="w-60" />
    </div>
    <div className="md:w-2/3 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold font-tajwal">
          {contests.title}
        </h1>
      </div>
      <div className="flex items-center mb-4">
        <div className="text-orange-500">
          <span className="text-lg">{contests.category}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex text-gray-700">
          <span className={`flex items-center ${isArabic ? "ml-60" : "mr-60"} font-bold font-tajwal`}>
            <strong>{translations.organizer}</strong>
          </span>
          <span className={`flex items-center ${isArabic ? "ml-10" : "mr-10"} font-bold font-tajwal`}>
            <strong>{translations.address}</strong>
          </span>
          <span className={`flex items-center ${isArabic ? "mr-28" : "ml-28"} font-bold font-tajwal`}>
            <strong>{translations.applyStartDate}</strong>
          </span>
        </div>
        <div className="flex text-gray-700 mt-1">
          <span className={`flex items-center ${isArabic ? "ml-64" : "mr-64"} font-tajwal`}>
            {contests.organizer}
          </span>
          <span className={`flex items-center ${isArabic ? "ml-14" : "mr-14"} font-tajwal`}>
            {contests.address}
          </span>
          <span className={`flex items-center ${isArabic ? "mr-28" : "ml-28"} font-tajwal`}>
            {contests.applyStartDate}
          </span>
        </div>
      </div>

      <p
        className="mb-4"
        style={{
          fontFamily: "Tajwal, sans-serif",
          textAlign: "justify",
          lineHeight: "1.5",
        }}
      >
        {contests.description}
      </p>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-xl text-red_aa font-tajwal">
          {translations.applyEndDate}: {contests.applyEndDate}
          </span>
          <span className="text-gray-500 mr-7 font-tajwal">
          {translations.papersReplayDate}: {contests.papersReplayDate}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div className={`flex flex-col md:flex-row ${isArabic ? "md:space-x-reverse" : ""} space-y-4 md:space-y-0 md:space-x-4 mt-4`}>
    <div className="md:w-2/3">
      <h2 className="text-xl font-bold mb-2 font-tajwal">
      {translations.detailsTitle}
      </h2>
      <table className="w-full text-right">
        <tbody className="space-y-2">
          <tr className="border-t border-b">
            <td className="p-4 font-tajwal font-bold">  {translations.address}</td>
            <td className="p-4 font-tajwal">{contests.address}</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 font-tajwal font-bold">
            {translations.enrollmentEndDate}
            </td>
            <td className="p-4 font-tajwal">{contests.enrollmentEndDate}</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 font-tajwal font-bold"> {translations.contactMobile}</td>
            <td className="p-4 font-tajwal">{contests.contactMobile}</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 font-tajwal font-bold">
            {translations.contactEmail}
            </td>
            <td className="p-4 font-tajwal">{contests.contactEmail}</td>
          </tr>
          <tr className="border-b">
            <td className="p-4 font-tajwal font-bold">{translations.notes}</td>
            <td className="p-4 font-tajwal">{contests.notes}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="md:w-1/3">
      <h2 className="text-xl font-bold mb-2 font-tajwal">
      {translations.conditionsTitle}
      </h2>
      <div className="flex flex-col space-y-4 max-h-96 overflow-y-auto">
        {conditions.map((condition, index) => (
          <div key={index} className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
            <p className="font-semibold">{`${index + 1}. ${condition}`}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
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
      ) : (
        <div
          className="bg-gray-10 py-10 px-6 rounded-lg"
          style={{
            marginTop: "50px",
            width: "95%",
          }}
        >
          <Navbar />
          <div className="container mx-auto p-4" dir="rtl">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4">
              <div className="md:w-1/4 p-4">
                <img src={contests.imageUrl} alt="Book" className="w-60" />
              </div>
              <div className="md:w-2/3 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold font-tajwal"></h1>
                </div>
                <div className="flex items-center mb-4">
                  <div className="text-orange-500">
                    <span className="text-lg"></span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex text-gray-700">
                    <span className="flex items-center ml-60 font-bold font-tajwal">
                      <strong>المنظم:</strong>
                    </span>
                    <span className="flex items-center ml-10 font-bold font-tajwal">
                      <strong>العنوان:</strong>
                    </span>
                    <span className="flex items-center mr-28 font-bold font-tajwal">
                      <strong>تاريخ بدء التسجيل:</strong>
                    </span>
                  </div>
                  <div className="flex text-gray-700 mt-1">
                    <span className="flex items-center ml-64 font-tajwal">
                      {contests.organizer}
                    </span>
                    <span className="flex items-center  ml-14 font-tajwal">
                      {contests.address}
                    </span>
                    <span className="flex items-center mr-28 font-tajwal">
                      {contests.applyStartDate}
                    </span>
                  </div>
                </div>

                <p
                  className="mb-4"
                  style={{
                    fontFamily: "Tajwal, sans-serif",
                    textAlign: "justify",
                    lineHeight: "1.5",
                    marginBottom: "8px",
                  }}
                >
                  {contests.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-xl text-red_aa font-tajwal">
                      تاريخ الانتهاء
                      {contests.applyEndDate}
                    </span>
                    <span className=" text-gray-500 mr-7 font-tajwal">
                      تاريخ مراجعة الاوراق
                      {contests.papersReplayDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4 mt-4">
              <div className="md:w-2/3">
                <h2 className="text-xl font-bold mb-2 font-tajwal">
                  تفاصيل المسابقة
                </h2>
                <table className="w-full text-right">
                  <tbody className="space-y-2">
                    <tr className="border-t border-b">
                      <td className="p-4 font-tajwal font-bold">عنوان </td>
                      <td className="p-4 font-tajwal"> {contests.address} </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-tajwal font-bold">
                        تاريخ انتهاء التسجيل
                      </td>
                      <td className="p-4 font-tajwal">
                        {" "}
                        {contests.enrollmentEndDate}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-tajwal font-bold">رقم الهاتف</td>
                      <td className="p-4 font-tajwal">
                        {contests.contactMobile}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-tajwal font-bold">
                        <strong>البريد الإلكتروني:</strong>{" "}
                      </td>
                      <td className="p-4 font-tajwal">
                        {" "}
                        {contests.contactEmail}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-tajwal font-bold">
                        <strong>ملاحظات:</strong>{" "}
                      </td>
                      <td className="p-4 font-tajwal">{contests.notes}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="md:w-1/3">
                <div>
                  <h2 className="text-xl font-bold mb-2 font-tajwal">
                    شروط المسابقة
                  </h2>
                  <div className="flex flex-col space-y-4 max-h-96 overflow-y-auto">
                    {conditions.map((condition, index) => {
                      const parts = condition.split(":");
                      if (parts.length === 2) {
                        // Ensure the condition splits into two parts
                        return (
                          <div
                            key={index}
                            className="bg-white p-4 border border-gray-200 rounded-md shadow-sm"
                          >
                            <p className="font-semibold">{`${index + 1}. ${
                              parts[0]
                            }:`}</p>
                            <p>{parts[1]}</p>
                          </div>
                        );
                      } else {
                        console.error(`Invalid condition format: ${condition}`);
                        return null; // Skip invalid conditions
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
