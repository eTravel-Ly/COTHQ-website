import { useState } from 'react';
import Sidebar from '../component/Sidebar';
import NavbarLogin from '../component/NavbarLogin';

const HelpCenter = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: 'كيف يمكنني الحصول على نسخة من القرآن الكريم؟',
      answer: 'يمكنك الحصول على نسخة من القرآن الكريم من خلال زيارة أحد فروع مجمع القرآن الكريم أو تحميل نسخة رقمية من الموقع الرسمي.',
    },
    {
      question: 'ما هي الخدمات التي يقدمها مجمع القرآن الكريم؟',
      answer: 'يقدم مجمع القرآن الكريم العديد من الخدمات مثل توزيع المصاحف، تعليم القرآن الكريم، تنظيم المسابقات القرآنية، والنشر الإلكتروني.',
    },
    {
      question: 'كيف يمكنني التسجيل في المسابقات القرآنية؟',
      answer: 'للتسجيل في المسابقات القرآنية، يمكنك زيارة الموقع الرسمي والاطلاع على شروط المسابقات والتسجيل عبر النموذج الإلكتروني المتاح.',
    },
    {
      question: 'ما هي أوقات العمل في مجمع القرآن الكريم؟',
      answer: 'يعمل مجمع القرآن الكريم من الأحد إلى الخميس من الساعة 8 صباحًا حتى 4 مساءً.',
    },
    {
      question: 'كيف يمكنني التبرع لدعم مجمع القرآن الكريم؟',
      answer: 'يمكنك التبرع لدعم مجمع القرآن الكريم من خلال زيارة صفحة التبرعات في الموقع الرسمي واتباع الإرشادات الخاصة بالتبرع الإلكتروني.',
    },
    {
      question: 'هل يوفر المجمع برامج لتعليم القرآن عن بُعد؟',
      answer: 'نعم، يوفر مجمع القرآن الكريم برامج تعليم القرآن الكريم عن بُعد، ويمكنك التسجيل في البرامج المتاحة عبر الموقع الإلكتروني.',
    },
  ];
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed top-0 z-10 transition-all duration-300 w-full  lg:w-[calc(100%-20%)]`}
      >
        <NavbarLogin
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className="flex flex-col md:flex-row pt-16 w-full">
        <div className="container mx-auto p-6 text-right" dir="rtl">
          <h1
            className="text-4xl font-bold mb-8 text-center text-custom-orange"
            style={{ fontFamily: "Tajwal, sans-serif" }}
          >
            مركز المساعدة - مجمع القرآن الكريم
          </h1>
          <div className="space-y-4">
            {faqData.map((item, index) => (
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
    </>
  );
};

export default HelpCenter;
