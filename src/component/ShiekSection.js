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
function ShiekhsList() {
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

  return (
    <section className="text-center py-20 bg-gray-50 " style={{ fontFamily: "Tajwal" }} >
    <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2" >
      قائمة المشايخ
    </h2>
    <div dir="rtl" className="grid grid-cols-1   p-8 md:grid-cols-5 gap-8 text-center">
    {[
  { 
    id: 1, 
    firstName: "الصادق ", 
    lastName: "الغرياني", 
    phoneNumber: "0912345678", 
    description: 'عالم دين متخصص في الفقه والشريعة الإسلامية، وله دراسات معمقة في العلوم الشرعية. ',
    image: sh1
  },
  { 
    id: 2, 
    firstName: "أحمد", 
    lastName: "الطيب", 
    phoneNumber: "0923456789", 
    description: "أحد أكبر علماء الأزهر الشريف ورجال الدين البارزين في العالم العربي.",
    image: sh2
  },
  { 
    id: 3, 
    firstName: "محمد بن صالح ", 
    lastName: "العثيمين", 
    phoneNumber: "0934567890", 
    description: "من كبار العلماء في السعودية وواحد من أبرز العلماء في مجال الفقه الإسلامي",
    image: sh3
  },
  { 
    id: 4, 
    firstName: "عبد الله بن عبد العزيز", 
    lastName: "بن باز", 
    phoneNumber: "0945678901", 
    description: " كان مفتي المملكة العربية السعودية لعدة سنوات وله العديد من الفتاوى",
    image: sh4
  },
  { 
    id: 5, 
    firstName: "صالح بن فوزان ", 
    lastName: "الفوزان", 
    phoneNumber: "0956789012", 
    description: "هو عالم إسلامي سعودي وله العديد من الكتب في الفقه وأصول الدين",
    image: sh5
  }
].map((shiek) => (
  <div key={shiek.id} className="text-center shadow-md hover:shadow-lg transition-shadow border rounded-md p-5 border-gray-200">
  <div className="w-36 h-36 mx-auto mb-4">
    <img
       src={shiek.image} 
      alt={`${shiek.firstName} ${shiek.lastName}`}
      className="w-full h-full rounded-full object-cover"
    />
  </div>
  
  {/* العنوان والوصف */}
  <div className="flex items-center mb-4 justify-center">
    <FaUser className="ml-4 text-gray-700 text-xl" />
    <p className="text-gray-600 font-bold">
      {shiek.firstName} {shiek.lastName}
    </p>
  </div>

  {/* رقم الشيخ */}
  <div className="flex items-center mb-4 justify-center">
    <FaPhone className="ml-4 text-gray-700 text-xl" />
    <p className="text-gray-600">
      {shiek.phoneNumber}
    </p>
  </div>

  {/* الوصف */}
  <div className="flex items-center justify-center mb-4">
  <FaInfoCircle className="ml-4 text-gray-700 text-4xl" />
    <p className="text-gray-600">
      {shiek.description}
    </p>
  </div>
</div>

))}
    </div>
    <div  className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2 text-center">
    <button className="flex items-center justify-center text-lg ml-10 text-gray-700 hover:text-gray-900">
    <div className="flex items-center justify-center w-8 h-8 rounded-full mr-3 border border-gray-700ml-2">
        <FaArrowLeft className="text-gray-700" />
      </div>
      عرض المزيد

    </button>
  </div>
  </section>
  
  
  );
}

export default ShiekhsList;
