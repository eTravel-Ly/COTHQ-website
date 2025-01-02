import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import shiek1 from "../assets/images/shiek.png";
import Banner from '../assets/images/Banner.png';

const ShiekSection = () => {
  const [shieks, setShieks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
            اكتشف معنا مشايخ المنصة
          </h2>
        </div>
      </section>
  
      <div className="relative top-10 w-full flex flex-col items-center">
        {loading ? (
          <div>جاري تحميل البيانات...</div>
        ) : shieks.length === 0 ? (
          <div>لا توجد بيانات بعد.</div>
        ) : (
          <section
            id="PromoSection"
            className="  relative bg-white py-10 px-6 rounded-lg border border-gray-200 " 
            style={{
              
              width: "95%",
              overflowY: 'auto',
            }}
          >
             <div className="container mx-auto px-4 py-6">
             <div
        className="p-4"
        style={{
          fontFamily: "Tajwal, sans-serif",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        <h1 className="text-xl font-bold mb-1">المشايخ الموجودة في المنصة</h1>
        <h4 className="text-l font-bold text-gray-500 mr-5">اطلع على مشايخنا وشارك الان ..</h4>
  
   <div className="hidden sm:flex mt-10 mr-8 mb-4 ">
                <input
                  type="text"
                  placeholder="اكتب اسم الشيخ للبحث   .. "
                  className="p-2 border rounded-md w-full "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                

        </div>
        <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 `}
            >
              {shieks.map((shiek) => (
                <div
                  key={shiek.id}
                  className="bg-slate-50 text-black rounded-lg shadow-md  p-6 border flex flex-col items-center"
                >
                  <img
                    src={shiek.image || shiek1}
                    alt={`${shiek.firstName} ${shiek.lastName}`}
                    className="w-36 h-36 object-cover rounded-lg mb-4"
                  />
                  <div className="text-center mb-2">
                    <h3 className="text-lg font-semibold">
                      {shiek.firstName} {shiek.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{shiek.center}</p>
                  </div>
                  <div className="flex items-center justify-between w-full text-xs text-gray-700 px-10">
                  <p>مركز التحفيظ الحالي: </p>
                  <p className="font-semibold"> راس حسن</p>
                  
                
                  </div>
                </div>
              ))}
            </div>
        </div>
           
           
             </div>
        
          </section>
        )}
      </div>
    </>
  );
  
};

export default ShiekSection;
