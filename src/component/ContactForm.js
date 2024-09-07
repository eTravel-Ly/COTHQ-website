import React, { useState } from 'react';
import Banner from '../assets/images/Rectangle.png'; // تأكد من مسار الصورة الصحيح
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast.success('تم إرسال ملاحظتك بنجاح');
    }, 2000); // Simulate a 2-second loading time
  };

  return (
    <div className="min-h-screen flex flex-col mt-20">
      <section id='contact' className="flex-1 flex justify-center items-center">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}>تواصل معنا</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1" style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}>اسمك</label>
                <input
                  type="text"
                  placeholder="اسمك"
                  className="w-full p-2 border rounded-md"
                  style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
                  required
                />
              </div>
              <div>
                <label className="block mb-1" style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}>البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="w-full p-2 border rounded-md"
                  style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1" style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}>الرسالة</label>
              <textarea
                placeholder="رسالتك"
                className="w-full p-2 border rounded-md h-32"
                style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`bg-custom-orange text-white px-6 py-3 rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ fontFamily: 'Tajwal, sans-serif', direction: 'rtl' }}
                disabled={loading}
              >
                {loading ? 'جاري الإرسال...' : 'سجل الآن'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="relative bg-cover bg-center text-white py-12 px-8 rounded-lg mt-12" style={{ backgroundImage: `url(${Banner})`, width: '1200px', height: '350px' }}>
        <div className="absolute inset-0 opacity-50 rounded-lg"></div>
        <div className="relative text-center z-10 py-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Tajwal, sans-serif' }}>المنصة التعليمية</h2>
          <ul className="flex justify-center gap-6 mb-6">
           
            <li><a href="#" style={{ fontFamily: 'Tajwal, sans-serif' }}>الدورة</a></li>
            <li><a href="#" style={{ fontFamily: 'Tajwal, sans-serif' }}>اتصل</a></li>
            <li><a href="#" style={{ fontFamily: 'Tajwal, sans-serif' }}>من نحن</a></li>
            <li><a href="#" style={{ fontFamily: 'Tajwal, sans-serif' }}>الرئيسية</a></li>
           
          </ul>
          <p className="text-sm" style={{ fontFamily: 'Tajwal, sans-serif' }}>حقوق النشر والنشر © 2024</p>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default ContactPage;
