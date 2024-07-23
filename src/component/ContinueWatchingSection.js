import React, { useRef } from "react";
import { useSwipeable } from "react-swipeable";
import ContinueWatchingSection1 from "../assets/images/ContinueWatchingSection1.png";
import { useNavigate } from 'react-router-dom';

const ContinueWatchingSection = () => {
  const shows = [
    {
      title: "شرح متن الآجرومية",
      description:
        "متن مشهور في النحو لأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بـابن آجروم؛ وقد تلقاها العلماء بالقبول، وقد جرت عادة العلماء في شتَّى البلاد على الاعتناء بها؛ شرحاً وحفظاً وتحفيظاً",
      image: ContinueWatchingSection1,
      progress: 80,
    },
    {
      title: "شرح متن الآجرومية",
      description:
        "متن مشهور في النحو لأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بـابن آجروم؛ وقد تلقاها العلماء بالقبول، وقد جرت عادة العلماء في شتَّى البلاد على الاعتناء بها؛ شرحاً وحفظاً وتحفيظاً",
      image: ContinueWatchingSection1,
      progress: 60,
    },
    // يمكن إضافة المزيد من الدورات إذا لزم الأمر
  ];
  const navigate = useNavigate();
  const openShowcourse = () => {
    navigate('/Showcourse');
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
    <div className="p-4" {...handlers}>
      <h2
        className="text-xl font-bold mb-4"
        style={{
          fontFamily: "Tajwal, sans-serif",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        الاستمرار في المشاهدة
      </h2>
      <h4
        className="text-l font-bold text-gray-400 mb-4"
        style={{
          fontFamily: "Tajwal, sans-serif",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        استمر في مشاهدة الدورات الذي بدأت قراءتها بالفعل
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
          style={{ scrollBehavior: "smooth", height: "280px" }}
        >
          {shows.map((show, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-3 w-60 flex-shrink-0 text-right"
              style={{ direction: "rtl", height: "100%" }}
              onClick={openShowcourse}
            >
              <img
                src={show.image}
                alt={show.title}
                className="h-24 object-cover rounded"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              />
              <h3
                className="text-md font-bold mt-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                {show.title}
              </h3>
              <p
              className="text-gray-600 text-xs"
              style={{
                fontFamily: "Tajwal, sans-serif",
                textAlign: "justify", // توزيع النص لتملأ العرض
                lineHeight: "1.5", // لضبط المسافة بين الأسطر
                marginBottom: "8px" // المسافة بين الفقرات
              }}
            >
              {show.description}
            </p>

              <div className="mt-2 relative">
                <div
                  className="absolute left-0 text-xs text-gray-700"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  {show.progress}%
                </div>
                <div
                  className="absolute right-0 text-xs text-gray-700"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  تقدم الدورة
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
                <div
                  className="bg-custom-orange h-2 rounded-full"
                  style={{ width: `${show.progress}%` }}
                ></div>
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

export default ContinueWatchingSection;
