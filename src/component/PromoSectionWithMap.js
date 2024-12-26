import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Banner from '../assets/images/Banner.png';

const containerStyle = {
  width: '100%',
  height: '400px',
};


const center = {
    lat: 32.8872, 
    lng: 13.1913, 
  };

const PromoSectionWithMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB41wwqZUpq-R_vifyy8X4QpNqlcC5AiSM', 
  });

  if (!isLoaded) {
    return <div>Loading...</div>; 
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
        marginBottom: '100px',
      }}
    >
      <div className="absolute inset-0"></div>
      <div className="relative text-center z-10">
        <h2
          className="text-l md:text-3xl lg:text-4xl font-bold mb-4"
          style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
        >
          اكتشف مراكز التحفيظ و تفاصليها  و اعداد الشيوخ فيها حول ليبيا الآن!
        </h2>
      </div>
    </section>
  
    {/* الخريطة */}
    <GoogleMap
      mapContainerStyle={{
        height: '500px', // نفس ارتفاع قسم الترويج
        width: '95%',
      }}
      center={center}
      zoom={10}
    >
      <Marker position={center} />
    </GoogleMap>
  </>
  
  );
};

export default PromoSectionWithMap;
