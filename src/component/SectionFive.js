import React, { useState, useEffect } from "react";
import pic2 from '../assets/images/bg.webp';

function SectionFive() {
  const quotes = [
    {
      text: "من تعلم العلم ثم عمل به وأوصله إلى الناس فقد أتم النعمة، ومن عمل بالعلم ولم يعلم فقد ضلّ الطريق.",
      author: "الإمام مالك بن أنس",
    },
    {
      text: "تعلموا العلم وعلموه الناس، وتعلموا الوقار والسكون.",
      author: "عمر بن الخطاب",
    },
    {
      text: "العلم ما كان نافعا، والنافع ما يُقرب إلى الله.",
      author: "ابن تيمية",
    },
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true); // حالة للتحكم بالأنيميشن

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFade(true); 
      }, 800); 
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-64 md:h-96 flex items-center justify-center"
      style={{
        backgroundImage: `url(${pic2})`,
      }}
    >
      <div className="absolute inset-0 bg-blues bg-opacity-50"></div>

      <div className={`relative z-10 text-center transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`} dir="rtl">
        <h1
          className="text-xl md:text-3xl lg:text-5xl text-white font-bold"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          {quotes[currentQuoteIndex].text}
        </h1>
        <p
          className="text-sm md:text-base lg:text-lg text-white mt-2"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          {quotes[currentQuoteIndex].author}
        </p>
      </div>
    </section>
  );
}

export default SectionFive;
