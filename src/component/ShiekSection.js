import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from '../helper/Baseurl';
import shiekh from "../assets/images/shiek.webp";
import shiekh2 from "../assets/images/shiekh.webp";
import sh1 from "../assets/images/sh1.jpg";
import sh2 from "../assets/images/sh2.jpg";
import sh3 from "../assets/images/sh3.webp";
import sh4 from "../assets/images/sh4.jpeg";
import sh5 from "../assets/images/sh5.webp";
import { FaArrowLeft , FaUser, FaPhone,FaInfoCircle} from 'react-icons/fa'
import { useTranslation } from "../context/TranslationContext"; // استيراد هوك الترجمة


function ShiekhsList() {
      const { translations,  language } = useTranslation(); // استخدام الترجمة

  // const [shieks, setShieks] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchShieks = async () => {
  //     try {
  //       const response = await axios.get(baseurl + "public/sheikh");
  //       setShieks(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchShieks();
  // }, []);
  // const images = [shiekh, shiekh2];
  // const randomImage = images[Math.floor(Math.random() * images.length)];

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const sheikhs = [
    {
      id: 1,
      firstName: translations.shiekh1.firstName,
      lastName: translations.shiekh1.lastName,
      phoneNumber: translations.shiekh1.phoneNumber,
      description: translations.shiekh1.description,
      image: sh1,
    },
    {
      id: 2,
      firstName: translations.shiekh2.firstName,
      lastName: translations.shiekh2.lastName,
      phoneNumber: translations.shiekh2.phoneNumber,
      description: translations.shiekh2.description,
      image: sh2,
    },
    {
      id: 3,
      firstName: translations.shiekh3.firstName,
      lastName: translations.shiekh3.lastName,
      phoneNumber: translations.shiekh3.phoneNumber,
      description: translations.shiekh3.description,
      image: sh3,
    },
    {
      id: 4,
      firstName: translations.shiekh4.firstName,
      lastName: translations.shiekh4.lastName,
      phoneNumber: translations.shiekh4.phoneNumber,
      description: translations.shiekh4.description,
      image: sh4,
    },
    {
      id: 5,
      firstName: translations.shiekh5.firstName,
      lastName: translations.shiekh5.lastName,
      phoneNumber: translations.shiekh5.phoneNumber,
      description: translations.shiekh5.description,
      image: sh5,
    },
  ];

  return (
    <section className="text-center py-20 bg-gray-50 " style={{ fontFamily: "Tajwal" }}  id="ShiekhsList">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-500 mb-8" style={{ fontFamily: "Tajwal, sans-serif" }}>
        {translations.shiekhsListTitle}
        </h2>
 <div dir="rtl" className="grid grid-cols-1 p-8 md:grid-cols-5 gap-8 text-center">
      {sheikhs.map((shiek) => (
        <div
          key={shiek.id}
          className="text-center shadow-md hover:shadow-lg border rounded-md p-5 border-gray-200 transform hover:scale-105 transition-transform duration-300"
        >
          <div className="w-36 h-36 mx-auto mb-4">
            <img
              src={shiek.image}
              alt={`${shiek.firstName} ${shiek.lastName}`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div className="flex items-center mb-4 justify-center">
            <FaUser className="ml-2 text-gray-700 text-md" />
            <p className="text-gray-600 font-bold">
              {shiek.firstName} {shiek.lastName}
            </p>
          </div>

          <div className="flex items-center mb-4 justify-center">
            <FaPhone className="ml-2 text-gray-700 text-md" />
            <p className="text-gray-600">{shiek.phoneNumber}</p>
          </div>

          <div className="flex items-center justify-center mb-4">
            <p className="text-gray-600">{shiek.description}</p>
          </div>
        </div>
      ))}
    </div>
    <div  className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2 text-center">
    <button className="flex items-center justify-center text-lg ml-10 text-gray-700 hover:text-gray-900">
    <div className="flex items-center justify-center w-8 h-8 rounded-full mr-3 border border-gray-700ml-2">
        <FaArrowLeft className="text-gray-700" />
      </div>
      {translations.viewMoreButton}

    </button>
  </div>
  </section>
  
  
  );
}

export default ShiekhsList;
