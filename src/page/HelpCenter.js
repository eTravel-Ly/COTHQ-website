import React, { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";

const HelpCenter = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [language, setLanguage] = useState("ar");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isArabic = language === "ar";

  // استرداد اللغة المحفوظة من الجلسة
  useEffect(() => {
    const savedLanguage = sessionStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqData = {
    ar: [
      {
        question: "كيف يمكنني الحصول على نسخة من القرآن الكريم؟",
        answer:
          "يمكنك الحصول على نسخة من القرآن الكريم من خلال زيارة أحد فروع مجمع القرآن الكريم أو تحميل نسخة رقمية من الموقع الرسمي.",
      },
      {
        question: "ما هي الخدمات التي يقدمها مجمع القرآن الكريم؟",
        answer:
          "يقدم مجمع القرآن الكريم العديد من الخدمات مثل توزيع المصاحف، تعليم القرآن الكريم، تنظيم المسابقات القرآنية، والنشر الإلكتروني.",
      },
      {
        question: "كيف يمكنني التسجيل في المسابقات القرآنية؟",
        answer:
          "للتسجيل في المسابقات القرآنية، يمكنك زيارة الموقع الرسمي والاطلاع على شروط المسابقات والتسجيل عبر النموذج الإلكتروني المتاح.",
      },
      {
        question: "ما هي أوقات العمل في مجمع القرآن الكريم؟",
        answer:
          "يعمل مجمع القرآن الكريم من الأحد إلى الخميس من الساعة 8 صباحًا حتى 4 مساءً.",
      },
      {
        question: "كيف يمكنني التبرع لدعم مجمع القرآن الكريم؟",
        answer:
          "يمكنك التبرع لدعم مجمع القرآن الكريم من خلال زيارة صفحة التبرعات في الموقع الرسمي واتباع الإرشادات الخاصة بالتبرع الإلكتروني.",
      },
      {
        question: "هل يوفر المجمع برامج لتعليم القرآن عن بُعد؟",
        answer:
          "نعم، يوفر مجمع القرآن الكريم برامج تعليم القرآن الكريم عن بُعد، ويمكنك التسجيل في البرامج المتاحة عبر الموقع الإلكتروني.",
      },
    ],
    en: [
      {
        question: "How can I get a copy of the Quran?",
        answer:
          "You can get a copy of the Quran by visiting one of the branches of the Quran Complex or downloading a digital version from the official website.",
      },
      {
        question: "What services does the Quran Complex offer?",
        answer:
          "The Quran Complex offers many services such as distributing Qurans, teaching Quran, organizing Quran competitions, and electronic publishing.",
      },
      {
        question: "How can I register for Quran competitions?",
        answer:
          "To register for Quran competitions, you can visit the official website, check the competition terms, and register using the available online form.",
      },
      {
        question: "What are the working hours of the Quran Complex?",
        answer:
          "The Quran Complex operates from Sunday to Thursday, from 8 AM to 4 PM.",
      },
      {
        question: "How can I donate to support the Quran Complex?",
        answer:
          "You can donate to support the Quran Complex by visiting the donation page on the official website and following the instructions for online donations.",
      },
      {
        question: "Does the Complex offer remote Quran learning programs?",
        answer:
          "Yes, the Quran Complex offers remote Quran learning programs, and you can register for the available programs through the website.",
      },
    ],
  };

  return (
    <div
      className={`flex ${
        isArabic ? "flex-col md:flex-row" : "flex-col-reverse md:flex-row-reverse"
      } pt-16 w-full`}
    >
      {/* Navbar */}
      <div
        className={`fixed top-0 z-10 transition-all duration-300 w-full lg:w-[calc(100%-20%)]`}
      >
        <NavbarLogin
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Main Content */}
      <div
        className={`container mx-auto p-6 ${
          isArabic ? "text-right" : "text-left"
        }`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <h1
          className="text-4xl font-bold mb-8 text-center text-custom-orange"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
          {isArabic
            ? "مركز المساعدة - مجمع القرآن الكريم"
            : "Help Center - Quran Complex"}
        </h1>
        <div className="space-y-4">
          {faqData[language].map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <h2
                  className="text-lg font-semibold text-custom-green"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  {item.question}
                </h2>
                <span
                  className={`transform text-custom-green ${
                    activeQuestion === index ? "rotate-180" : ""
                  }`}
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  &#x25BC;
                </span>
              </div>
              {activeQuestion === index && (
                <p
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                  className="mt-4 text-gray-600"
                >
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-full md:w-1/4" : "w-0"
        } md:w-[20%] h-full`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </div>
  );
};

export default HelpCenter;
