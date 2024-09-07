import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import Navbar from '../component/Navbar'; // Import the Navbar component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import cover from "../assets/images/test1.png";
import { baseurl } from '../helper/Baseurl';

const SeminarsDetails = () => {
  const { Id } = useParams(); // Using useParams to get the parameter
  const [event, setEvent] = useState(null);
  const [eventType, setEventType] = useState(""); // State to store event type
  const [conditions, setConditions] = useState([]);
// Function to generate image URL
const generateImageUrl = (coverImageUrl) => {
  const baseImageUrl = `${baseurl}uploads/file/download/`;
  return coverImageUrl
    ? `${baseImageUrl}${coverImageUrl}`
    : ""; // Replace with a path to a default image if necessary
};

useEffect(() => {
  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`${baseurl}public/event/${Id}`, {
        headers: {
          'accept': 'application/json',
        },
      });

      // Set event type based on the response
      const eventType = response.data.eventType;
      const conditionsText = response.data.conditions;
      const conditionsArray = conditionsText.split('\r\n\r\n');
      
      // Generate the image URL for the event
      const imageUrl = generateImageUrl(response.data.coverImageUrl);
   
      setConditions(conditionsArray);
      setEventType(eventType);

      // Update event data to include the generated image URL
      setEvent({
        ...response.data,
        imageUrl, // Include the generated image URL
      });
    } catch (error) {
      console.error("Error fetching event details", error);
    }
  };

  fetchEventDetails();
}, [Id]); // Adding Id as a dependency for useEffect


  const token = localStorage.getItem('token'); // Check for the token

  if (!event) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  const isConference = eventType === "CONFERENCE"; // Determine if the event is a conference

  // Define image style based on event type
  const imageStyle = isConference ? "w-[50%] h-auto mb-4 rounded-lg" : "w-[80%] h-auto mb-4 rounded-lg";

  return (
    <div className="flex h-screen rtl" style={{ fontFamily: "Tajwal, sans-serif" }}>
      {token ? (
        <>
          <Sidebar />
          <div className="flex flex-col w-[80%] mt-2 ml-1">
            <NavbarLogin />
            
            <div className="container mx-auto p-4" dir="rtl">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4">
            <div className="md:w-1/4 p-4">
              <img   src={event.imageUrl }  alt="Book" className="w-60" />
            </div>
            <div className="md:w-2/3 p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold font-tajwal">
                </h1>
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
                  {event.organizer}
                  </span>
                  <span className="flex items-center  ml-14 font-tajwal">
                  {event.address}
                  </span>
                  <span className="flex items-center mr-28 font-tajwal">
                  {event.applyStartDate}
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
                {event.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-xl text-red_aa font-tajwal">
                    تاريخ الانتهاء
                  {event.applyEndDate}
                  </span>
                  <span className=" text-gray-500 mr-7 font-tajwal">
                    تاريخ مراجعة الاوراق 
                  {event.papersReplayDate}
                  </span>
                </div>

               
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4 mt-4">
            <div className="md:w-2/3">
              <h2 className="text-xl font-bold mb-2 font-tajwal">
               تفاصيل الندوة او المؤتمر
              </h2>
              <table className="w-full text-right">
                <tbody className="space-y-2">
                  <tr className="border-t border-b">
                    <td className="p-4 font-tajwal font-bold">عنوان </td>
                    <td className="p-4 font-tajwal"> {event.address} </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold">تاريخ انتهاء التسجيل</td>
                    <td className="p-4 font-tajwal"> {event.enrollmentEndDate}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold">رقم الهاتف</td>
                    <td className="p-4 font-tajwal">{event.contactMobile}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold"><strong>البريد الإلكتروني:</strong> </td>
                    <td className="p-4 font-tajwal"> {event.contactEmail}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold"><strong>ملاحظات:</strong> </td>
                    <td className="p-4 font-tajwal">
                    {event.notes}
                    </td>
                  </tr>
                </tbody>
              </table>
          
            </div>
            <div className="md:w-1/3">
  <div>
    <h2 className="text-xl font-bold mb-2 font-tajwal">
    شروط الندوة او المؤتمر

    </h2>
    <div className="flex flex-col space-y-4 max-h-96 overflow-y-auto">
    {conditions.map((condition, index) => {
      const parts = condition.split(':');
      if (parts.length === 2) { // Ensure the condition splits into two parts
        return (
          <div key={index} className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
            <p className="font-semibold">{`${index + 1}. ${parts[0]}:`}</p>
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
        </>
      ) : (
        <div className="bg-gray-10 py-10 px-6 rounded-lg"
          style={{
            marginTop: '50px',
            width: '95%',
          }}
        >
          <Navbar />
          <div className="container mx-auto p-4" dir="rtl">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4">
            <div className="md:w-1/4 p-4">
              <img src={event.imageUrl } alt="Book" className="w-60" />
            </div>
            <div className="md:w-2/3 p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold font-tajwal">
                </h1>
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
                  {event.organizer}
                  </span>
                  <span className="flex items-center  ml-14 font-tajwal">
                  {event.address}
                  </span>
                  <span className="flex items-center mr-28 font-tajwal">
                  {event.applyStartDate}
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
                {event.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-xl text-red_aa font-tajwal">
                    تاريخ الانتهاء
                  {event.applyEndDate}
                  </span>
                  <span className=" text-gray-500 mr-7 font-tajwal">
                    تاريخ مراجعة الاوراق 
                  {event.papersReplayDate}
                  </span>
                </div>

               
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4 mt-4">
            <div className="md:w-2/3">
              <h2 className="text-xl font-bold mb-2 font-tajwal">
تفاصيل الندوة او المؤتمر
              </h2>
              <table className="w-full text-right">
                <tbody className="space-y-2">
                  <tr className="border-t border-b">
                    <td className="p-4 font-tajwal font-bold">عنوان </td>
                    <td className="p-4 font-tajwal"> {event.address} </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold">تاريخ انتهاء التسجيل</td>
                    <td className="p-4 font-tajwal"> {event.enrollmentEndDate}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold">رقم الهاتف</td>
                    <td className="p-4 font-tajwal">{event.contactMobile}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold"><strong>البريد الإلكتروني:</strong> </td>
                    <td className="p-4 font-tajwal"> {event.contactEmail}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold"><strong>ملاحظات:</strong> </td>
                    <td className="p-4 font-tajwal">
                    {event.notes}
                    </td>
                  </tr>
                </tbody>
              </table>
          
            </div>
            <div className="md:w-1/3">
  <div>
    <h2 className="text-xl font-bold mb-2 font-tajwal">
  شروط الندوة او المؤتمر
    </h2>
    <div className="flex flex-col space-y-4 max-h-96 overflow-y-auto">
    {conditions.map((condition, index) => {
      const parts = condition.split(':');
      if (parts.length === 2) { // Ensure the condition splits into two parts
        return (
          <div key={index} className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
            <p className="font-semibold">{`${index + 1}. ${parts[0]}:`}</p>
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
      <ToastContainer />
    </div>
  );
};

export default SeminarsDetails;
