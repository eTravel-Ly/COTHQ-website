import React, { useRef } from "react";
import { useSwipeable } from "react-swipeable";
import ContinueReadingSection1 from "../assets/images/ContinueReadingSection1.png";
import {FaRegUserCircle } from "react-icons/fa"; // Import the star icon from react-icons
import { useNavigate } from 'react-router-dom';

const ContinueReadingSection = () => {
  const books = [
    {
      title: "التعليق على الكافي في فقه",
      description: "يمتاز 'الكافي' بسلاسه ووضوحه في عرض المسائل الفقهية...",
      image: ContinueReadingSection1,
      progress: 85,

    },
    {
     title: "التعليق على الكافي في فقه",
      description: "يمتاز 'الكافي' بسلاسه ووضوحه في عرض المسائل الفقهية...",
      image: ContinueReadingSection1,
      progress: 85,

    },
    {
      title: "التعليق على الكافي في فقه",
      description: "يمتاز 'الكافي' بسلاسه ووضوحه في عرض المسائل الفقهية...",
      image: ContinueReadingSection1,
      progress: 85,

    },
    // يمكن إضافة المزيد من الكتب إذا لزم الأمر
  ];
  const navigate = useNavigate();
  const openBook = () => {
    navigate('/ReadBooks');
  };

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => scrollRight(),
    onSwipedRight: () => scrollLeft(),
  });

  return (
    <div className="p-4 rounded-md" {...handlers}>
      <h2
        className="text-xl font-bold mb-4"
        style={{
          fontFamily: "Tajwal, sans-serif",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        الاستمرار في القراءة
      </h2>
      <h4
        className="text-l font-bold text-gray-400 mb-4"
        style={{
          fontFamily: "Tajwal, sans-serif",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        استمر في قراءة الكتب الذي بدأت قرأتها بالفعل
      </h4>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-50 p-2 text-2xl rounded-full shadow-md"
          aria-label="Scroll left"
        >
          &#8249;
        </button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide justify-end mx-5"
          style={{ scrollBehavior: "smooth", overflowX: "hidden" }}
        >
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-2 w-80 flex-shrink-0 flex items-center text-right"
              style={{ direction: "rtl" }}
              onClick={openBook}
            >
              <img
                src={book.image}
                alt={book.title}
                className="object-cover rounded w-20 h-30 ml-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              />
              <div className="flex-1">
                <h3
                  className="text-md font-bold mb-2"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  {book.title}
                </h3>
                <p
                  className="text-gray-600 text-xs mb-2"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  {book.description}
                </p>
               
                <div className="mt-0 relative">
                <div
                  className="absolute left-0 text-xs text-gray-700"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  {book.progress}%
                </div>
                <div
                  className="absolute right-0 text-xs text-gray-700"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  تقدم الدورة
                </div>
              </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-custom-orange h-2 rounded-full  mt-6 "
                    style={{ width: `${book.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-50 p-2 text-2xl rounded-full shadow-md"
          aria-label="Scroll right"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default ContinueReadingSection;
