import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import shiek1 from "../assets/images/shiek.png";

const ShiekSection = () => {
  const [shieks, setShieks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 const fetchShieks = async () => {
   try {
     const response = await axios.get(baseurl + "sheikhs", {
       headers: {
         accept: "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
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
  return (
    <section
      id="PromoSection"
      className="relative top-10 text-white rounded-lg flex justify-center items-center overflow-hidden"
      style={{
        height: "300px",
        width: "95%",
      }}
    >
      <div className="flex items-center gap-4 animate-scrollLeftRight ">
        {shieks.map((shiek) => (
          <div
            key={shiek.id}
            className="bg-white text-black rounded-lg shadow-lg p-4 flex flex-col items-center w-40"
          >
            <img
              src={shiek1}
              alt={`${shiek.firstName} ${shiek.lastName}`}
              className="w-36 h-36 object-cover rounded-lg mb-2"
            />
            <h3 className="text-center text-lg font-semibold">
              {shiek.firstName} {shiek.lastName}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShiekSection;
