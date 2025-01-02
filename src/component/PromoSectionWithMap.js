import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Banner from '../assets/images/Banner.png';
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons from react-icons
import { FaUsers, FaChalkboardTeacher, FaPhone } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const containerStyle = {
  width: '100%',
  height: '200px',
};
const defaultCenter = {
  lat: 32.8872, // Latitude for Tripoli, Libya
  lng: 13.1913, // Longitude for Tripoli, Libya
};

const PromoSectionWithMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB41wwqZUpq-R_vifyy8X4QpNqlcC5AiSM',
  });


  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const coursesPerPage = 8; // Number of courses per page
  const [searchTerm, setSearchTerm] = useState("");
    const [filteredcenters, setFilteredcenters] = useState([]);
      const [isActive, setIsActive] = useState(0);

        // Pagination logic
        const indexOfLastCourse = currentPage * coursesPerPage;
        const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
        const currentcenters = filteredcenters.slice(indexOfFirstCourse, indexOfLastCourse);
        const totalPages = Math.ceil(filteredcenters.length / coursesPerPage);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get(baseurl+'public/center', {
        });
        setCenters(response.data);
        setFilteredcenters(response.data);

      } catch (err) {
        setError('حدث خطأ أثناء جلب البيانات.');
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, []);

    useEffect(() => {
      const searchQuery = searchTerm.toLowerCase();
      const filtered = centers.filter((center) =>
        center.name.toLowerCase().includes(searchQuery) ||
      center.address.toLowerCase().includes(searchQuery)
      );
      setFilteredcenters(filtered);
    }, [searchTerm, centers]);
  


 if (!isLoaded || loading) {
    return <div>جاري التحميل...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };


    const handleToggle = () => {
      setIsActive(centers.isActive === 1 ? 0 : 1);
    };
  
    
    
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
          marginBottom: '50px',
        }}
      >
        <div className="absolute inset-0"></div>
        <div className="relative text-center z-10">
          <h2
            className="text-l md:text-3xl lg:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
          >
            اكتشف مراكز التحفيظ وتفاصيلها وعدد الشيوخ فيها حول ليبيا الآن!
          </h2>
        </div>
      </section>
      <section 
      id="PartnerSection" 
      className="bg-gray-10 py-10 px-6 rounded-lg border border-gray-200" 
      style={{ 
        marginTop: '50px',
        width: '95%',
        overflowY: 'auto', // تفعيل التمرير العمودي
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
        <h1 className="text-xl font-bold mb-1">المراكز الموجودة في المنصة</h1>
        <h4 className="text-l font-bold text-gray-500 mr-5">اطلع على المراكز وشارك الان ..</h4>
   {/* عرض الأزرار بشكل افتراضي على الشاشات الأكبر من الموبايل */}
   <div className="hidden sm:flex mt-10 mr-8 mb-4 ">
                <input
                  type="text"
                  placeholder="اكتب العنوان أو اسم مركز التحفيظ  للبحث   .. "
                  className="p-2 border rounded-md w-full "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                

        </div>
  
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" style={{ direction: 'rtl' }}>
          {currentcenters.map((center, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border flex flex-col"
            >
              <h3 className="text-xl font-bold mb-3 text-gray-800 text-center" style={{ fontFamily: "Tajwal, sans-serif" }}>{center.name}</h3>

              <div className="mt-auto">
                <GoogleMap
                  key={`${center.lat}-${center.lng}`}
                  mapContainerStyle={containerStyle}
                  center={{ lat: center.lat, lng: center.lng }}
                  zoom={12}
                  options={{
                    disableDefaultUI: true, // تعطيل واجهة المستخدم الافتراضية
                    zoomControl: false, // إخفاء أزرار التكبير/التصغير
                    mapTypeControl: false, // إخفاء خيار Satellite/Map
                  }}
                >
                  <Marker position={{ lat: center.lat, lng: center.lng }} />
                </GoogleMap>
              </div>
              <div className="flex flex-row-reverse justify-between mb-2 mt-2" dir="rtl">
                <p className="text-sm text-gray-600 flex items-center" style={{ fontFamily: "Tajwal, sans-serif" }}>
                  <FaUsers className="text-gray-600 ml-2" />
                  {center.numberOfStudents}
                </p>
                <p className="text-sm text-gray-600 flex items-center" style={{ fontFamily: "Tajwal, sans-serif" }}>
                <FaPhone className="text-gray-600 ml-2"  />
                {center.phoneNumber}
                </p>
                <p className="text-sm text-gray-600 flex items-center" style={{ fontFamily: "Tajwal, sans-serif" }}>
                  <FaChalkboardTeacher className="text-gray-600 ml-2" />
                  {center.numberOfTeachers}
                </p>
              </div>
              <div className="flex flex-row-reverse justify-between mb-2 mt-2" dir="rtl">
              <label htmlFor="toggle" className="inline-flex relative items-center cursor-pointer">
                  <div
                    className={`w-10 h-6 rounded-full transition-all ${center.isActive == 1 ? 'bg-green-500' : 'bg-red-500'}`}
                  ></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                </label>
              
              <p className="text-sm text-gray-600 flex items-center" style={{ fontFamily: "Tajwal, sans-serif" }}>
                  <IoTime className="text-gray-600 ml-2" />
                  {center.workingHours}
                </p>

               </div>
                 </div>
          ))}
        </div>
        </div>
      </div>
       {/* Pagination */}
      <div className="mt-4">
        <ul className="flex flex-row-reverse justify-center space-x-2 items-center space-x-reverse">
          <li>
            <button
              className="px-3 py-1 rounded-full text-custom-orange"
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
                            <FaArrowRight />

            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                className={`px-3 py-1 rounded-full ${
                  currentPage === index + 1
                    ? "bg-custom-orange text-white"
                    : "text-gray-700"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              className="px-3 py-1 rounded-full text-custom-orange"
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              disabled={currentPage === 1}
            >
                            <FaArrowLeft />

            </button>
          </li>
        </ul>
      </div>
 </section>
    </>
  );
};

export default PromoSectionWithMap;
