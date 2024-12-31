import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import shiek1 from "../assets/images/shiek.png";
import Banner from '../assets/images/Banner.png';
const ShiekSection = () => {
  const [shieks, setShieks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 const fetchShieks = async () => {
   try {
     const response = await axios.get(baseurl + "public/sheikh", {
     });

  
     setShieks(response.data);
   } catch (error) {
     console.error("Error fetching data:", error);
   } finally {
     setLoading(false);
   }
 };

    fetchShieks(); 
  }, []); 

  if (loading) {
    return <div>جاري تحميل البيانات...</div>; 
  }
  if (shieks.length === 0) {
    return <div>لا توجد بيانات بعد.</div>;
  }

  return (
    <>
        <section
      id="PromoSection"
      className="relative bg-cover bg-center top-10 text-white rounded-lg flex justify-center items-center"
      style={{
        backgroundImage: `url(${Banner})`,
        height: '100px',
        width: '95%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginBottom: '30px',
      }}
    >
      <div className="absolute inset-0"></div>
      <div className="relative text-center z-10">
        <h2
          className="text-l md:text-3xl lg:text-4xl font-bold mb-4"
          style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
        >
اكتشف معنا مشايخ المنصة        </h2>
      </div>
    </section>
      <div className="relative  top-10 w-full flex flex-col items-center">
  
  <section
    id="PromoSection"
    className="bg-gray-100 text-gray-900 rounded-2xl shadow-lg flex justify-center items-center overflow-hidden"
    style={{
      height: "300px",
      width: "95%",
    }}
  >
    
<div
        className={`flex items-center gap-4 ${
          shieks.length > 6 ? "animate-scrollLeftRight" : ""
        }`}
      >        {shieks.map((shiek) => (
        <div
          key={shiek.id}
          className="bg-white text-black rounded-lg shadow-lg p-4 flex flex-col items-center w-40"
        >
          <img
            src={shiek1}
            alt={`${shiek.firstName} ${shiek.lastName}`}
            className="w-36 h-36 object-cover rounded-lg mb-2"
          />
          <h3 className="text-center text-lg font-semibold ">
            
         {shiek.firstName} {shiek.lastName}  
          </h3>
        </div>
      ))}
    </div>
  </section>
</div>
    </>
  
  
  );
};

export default ShiekSection;
