import React, { useRef, useEffect, useState } from "react";
import { BsQuestionSquareFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// تسجيل ScrollTrigger مع gsap
gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null); // لتحديد السؤال المفتوح
  const containerRef = useRef(null); // مرجع لجميع الأسئلة
  const answerRefs = useRef([]); // لتخزين مراجع الإجابات

  const questions = [
    {
      question: "هل يشترط دفع رسوم معينة مقابل التسجيل؟",
      answer: "لا يشترط دفع رسوم للتسجيل. التسجيل مجاني ومتاح للجميع.",
    },
    {
      question: "هل أستطيع أن أحفظ القرآن معكم أم تلاوة فقط؟",
      answer: "نعم، يمكنك حفظ القرآن الكريم معنا أو الاكتفاء بالتلاوة فقط.",
    },
    {
      question: "لم أدرس أحكام التجويد من قبل، فهل يمكنني الالتحاق؟",
      answer: "بالطبع، نوفر دروسًا مبسطة تناسب جميع المستويات.",
    },
    {
      question: "هل مدارسكم مخصصة لأحكام التجويد؟",
      answer: "نعم، جميع مدارسنا تقدم دروسًا متخصصة في أحكام التجويد.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    // إضافة ScrollTrigger لكل إجابة لتفعيل الأنيميشن أثناء التمرير
    answerRefs.current.forEach((el, index) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom", // يبدأ الأنيميشن عندما يظهر العنصر في أسفل الصفحة
        end: "bottom top", // ينتهي الأنيميشن عندما يخرج العنصر من أعلى الصفحة
        onEnter: () => {
          gsap.to(el, {
            scaleY: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            transformOrigin: "top",
          });
        },
        onLeave: () => {
          gsap.to(el, {
            scaleY: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
            transformOrigin: "top",
          });
        },
      });
    });

    // تطبيق الأنيميشن عند فتح الإجابة
    if (activeIndex !== null) {
      gsap.to(answerRefs.current[activeIndex], {
        scaleY: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        transformOrigin: "top",
      });
    } else {
      // عند إغلاق الإجابة
      answerRefs.current.forEach((el) => {
        gsap.to(el, {
          scaleY: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          transformOrigin: "top",
        });
      });
    }
  }, [activeIndex]);

  return (
    <motion.div
      className="container mx-auto p-5 rtl mt-10 mb-5 "
      style={{ fontFamily: "Tajwal, sans-serif" }}
      initial={{ opacity: 0, x: -100 }} // تحديد النقطة الابتدائية للتحريك (من اليسار)
      animate={{ opacity: 1, x: 0 }}  // التحرك إلى وضعه الطبيعي
      transition={{ duration: 0.5 }}  // تحديد مدة الحركة
    >
      <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-500 mb-8">
        الأسئلة الشائعة
      </h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        ref={containerRef} // مرجع للحاوية الرئيسية
      >
        {questions.map((item, index) => (
            <motion.div
            key={index}
            className="border rounded-lg p-6 shadow-lg bg-white text-center"
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <BsQuestionSquareFill className="text-3xl text-custom-orange mb-3" />
              <h3 className="text-lg font-medium">{item.question}</h3>
            </div>
            <div
              ref={(el) => (answerRefs.current[index] = el)}
              className="mt-3 text-gray-600 text-sm overflow-hidden scale-y-0 opacity-0 transform origin-top"
            >
              {activeIndex === index && <p>{item.answer}</p>}
            </div>
            </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQSection;
