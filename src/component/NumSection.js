import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper"; // استيراد Navigation و Pagination من swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "../context/TranslationContext"; 
export default function NumSection() {
  const swiperRef = useRef(null);
  const { translations } = useTranslation(); // استخدام الترجمة

  const data = [
    {
      image: "https://i.pinimg.com/736x/6d/65/f2/6d65f2639fb51d71a31c4569bb01aaee.jpg",
      title: translations.titles[0].title ,
      count: 50,
    },
    {
      image: "https://i.pinimg.com/736x/58/42/f8/5842f8849b887dddf5c16ded032ffe2d.jpg",
      title: translations.titles[1].title ,
      count: 100,
    },
    {
      image: "https://i.pinimg.com/736x/3c/96/9d/3c969d4031eabeb596fe59920aef73f7.jpg",
      title: translations.titles[2].title ,
      count: 500,
    },
    {
      image: "https://i.pinimg.com/736x/bc/6a/76/bc6a76788f8acd7bd4c034b04f2b3cef.jpg",
      title: translations.titles[3].title ,
      count: 200,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideNext();
      }
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <Swiper
      ref={swiperRef}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      navigation={false}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative bg-cover bg-center bg-no-repeat h-64 md:h-96 flex items-center justify-center rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <div className="absolute inset-0 bg-blues bg-opacity-50"></div>
            <div className="relative z-10 text-center text-white" dir="rtl">
              <h1
                className="text-xl md:text-3xl lg:text-4xl font-bold"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                {item.title}
              </h1>
              <br />
              <h2
                className="text-3xl md:text-5xl font-extrabold"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                {item.count}
              </h2>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
