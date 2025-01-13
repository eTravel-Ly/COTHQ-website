import React, { useState, useEffect } from "react";
import {FaCheck } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import user from "../assets/images/user.png";
import { IoIosAddCircle } from "react-icons/io";
import { baseurl } from "../helper/Baseurl";
import noCoursesImage from "../assets/images/Search.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "../context/TranslationContext"; 
import { IoIosArrowBack } from "react-icons/io";


const ReadBooks = () => {
    const navigate = useNavigate();
     const { translations , language} = useTranslation(); 
       const isArabic = language === "ar";
     
 
  
  const [note, setNote] = useState("");
  const [stars, setStars] = useState(3); // Default to 5 stars
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("الأحدث");
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      const response = await axios.post(
        baseurl + "add-comment",
        {
          entityType: "BOOK", 
          id: bookId,
          comment: note,
          stars: stars,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

     
      setNote(""); 
      setStars(3); 

      toast.success("تم تسجيل تقييمك بنجاح ");
    } catch (error) {
    toast.error("حدث مشكلة اثناء تسجيل تقيمك ");
      console.error(error);
    }
  };
    const backpage = () => {
      navigate('/HomeAfterLogin');
    };
    const [activeButton, setActiveButton] = useState('نظرة عامة');
    const [book, setBook] = useState(null);
    const { bookId } = useParams();
    const [loading, setLoading] = useState(true);
    
    const handleMarkAsRead = async () => {
      try {
        const response = await axios.post(
          baseurl + 'update-progress',
          {
            id: Number(bookId),  // تأكد من أن bookId يتم تمريره كرقم
            type: 'BOOK',         // النوع دائمًا "BOOK"
            progressStep: Number(100), // دائمًا 100 كعدد وليس نصًا
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        if (response.status === 201) {
          toast.success('تم وضع علامة على أنها تمت قراءتها!');
        }
      } catch (error) {
        console.error('تفاصيل الخطأ:', error.response.data);
        toast.warning('حدث خطأ أثناء وضع علامة على الكتاب كـ "تمت قراءته".');
      }
    };
     const [pageNumber, setPageNumber] = useState(0);

  // تحديث قيمة الإدخال عند تغييره
  const handlePageNumberChange = (e) => {
    setPageNumber(Number(e.target.value)); // التأكد من تخزين القيمة كرقم
  };

  // دالة لتقديم طلب POST
  const handleMarkAsRead1 = async () => {
    try {
      const response = await axios.post(
        baseurl + 'update-progress',
        {
          id: Number(bookId),  // تأكد من أن bookId يتم تمريره كرقم
          type: 'BOOK',         // النوع دائمًا "BOOK"
          progressStep: pageNumber, // القيمة من حقل الإدخال
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success('تم تغيير حالة تقدم القراءة!');
      }
    } catch (error) {
      console.error('تفاصيل الخطأ:', error.response?.data);
      toast.warning('حدث خطأ أثناء وضع علامة على الكتاب كـ "تمت قراءته".');
    }
  };
    const [pdfUrl, setPdfUrl] = useState(null);
  
      const fetchBookAndPdf = async () => {
          try {
              const response = await axios.get(`${baseurl}book/${bookId}`, {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
              });
              setBook(response.data);

              const pdfUrl = await showpicpdf(response.data.bookUrl);
              setPdfUrl(pdfUrl);
          } catch (error) {
              console.error("Error fetching book data:", error);
          } finally {
              setLoading(false);
          }
      };
      useEffect(() => {
        fetchBookAndPdf();
      }, [bookId]);

    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
      if (buttonName === "مراجعات") {
        fetchBookAndPdf(); // Re-fetch course data when "مراجعات" button is clicked
      }
    };




const sortedComments = book?.comments ? [...book.comments] : [];

if (sortedComments.length > 0) {
  if (sortOption === "الأحدث") {
    sortedComments.sort(
      (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
    );
  } else if (sortOption === "الأعلى تقييمًا") {
    sortedComments.sort((a, b) => b.rating - a.rating);
  }
} else {
  console.log("No comments available for sorting.");
}

  const showpicpdf = async (fileName) => {
    try {
        const pdfUrl = `${baseurl}uploads/file/download/${fileName}`;
        return pdfUrl;
    } catch (error) {
        console.error('Error fetching PDF:', error);
        return null;
    }
};
    
      if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        );
      }
       if (!book) {
         return (
          
           <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
        
             <img
               src={noCoursesImage}
               alt="No courses available"
               className="w-60 h-60 object-cover mb-10"
             />
             <p
               className="text-lg text-gray-700 mt-0"
               style={{ fontFamily: "Tajwal, sans-serif" }}
             >
               لا يوجد بيانات لعرضها الان...
             </p>
           </div>
         );
       }

    return (
      <div className={`bg-white font-tajwal min-h-screen ${isArabic ? "rtl" : "ltr"}`}>
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        {/* Right side: Arrow and Home Text */}
        <div className={`flex items-center ${isArabic ? "ml-auto" : "mr-auto"}`}>
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={backpage}
          >
            {isArabic ?  <IoIosArrowForward className="w-6 h-6" /> :  <IoIosArrowBack className="w-6 h-6" />}
           
          </button>
          <span className="mr-2 text-gray-700" onClick={backpage}>
          </span>
        </div>
    
        {/* Left side: Progress Bar */}
        <div className="flex items-center">
          <span className="text-gray-700 ml-2">{translations.Navbar.readingProgress} </span>
          <div className="w-48 bg-gray-200 rounded-full h-2 relative">
            <div
              className="bg-custom-orange h-full rounded-full"
              style={{ width: `${book.progressPercentage || 0}%` }}
            ></div>
          </div>
          <span className="ml-2 text-gray-700">
            {book.progressPercentage || 0}%
          </span>
        </div>
      </nav>
    
      {/* Main Content */}
      <main className="p-4 pt-20">
        <div
          className="pdf-container mb-4 bg-white shadow-md"
          style={{ height: "800px" }}
        >
          {pdfUrl ? (
            <embed
              src={pdfUrl}
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          ) : (
            <p className="text-center text-gray-500">
            {translations.PDF.notFound}
            </p>
          )}
        </div>
    
        {/* Button sections */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          {/* Buttons on the left */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-x-2 md:space-y-0">
            {/* Dropdown for mobile */}
            <div className="block md:hidden">
              <select
                className="px-4 py-2 rounded-3xl text-lg text-gray-900 border border-custom-orange"
                value={activeButton}
                onChange={(e) => setActiveButton(e.target.value)}
              >
                <option value="نظرة عامة">  {translations.Buttons.overview} </option>
                <option value="مراجعات">{translations.Buttons.reviews} </option>
                <option value="ملاحظات">{translations.Buttons.notes} </option>
              </select>
            </div>
    
            {/* Buttons for large screens */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                className={`mx-1 px-4 py-2 rounded-3xl text-lg text-gray-900 focus:outline-none ${
                  activeButton === "نظرة عامة"
                    ? "bg-custom-orange text-blue"
                    : "bg-blue hover:bg-custom-orange hover:text-blue"
                }`}
                onClick={() => setActiveButton("نظرة عامة")}
              >
                {translations.Buttons.overview}
              </button>
              <button
                className={`mx-1 px-4 py-2 rounded-3xl text-lg text-gray-900 focus:outline-none ${
                  activeButton === "مراجعات"
                    ? "bg-custom-orange text-blue"
                    : "bg-blue hover:bg-custom-orange hover:text-blue"
                }`}
                onClick={() => handleButtonClick("مراجعات")}
              >
                {translations.Buttons.reviews}
              </button>
              <button
                className={`mx-1 px-4 py-2 rounded-3xl text-lg text-gray-900 focus:outline-none ${
                  activeButton === "ملاحظات"
                    ? "bg-custom-orange text-blue"
                    : "bg-blue hover:bg-custom-orange hover:text-blue"
                }`}
                onClick={() => setActiveButton("ملاحظات")}
              >
                {translations.Buttons.notes}
              </button>
            </div>
          </div>
    
          {/* Centered buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-2 md:space-y-0 mt-4 md:mt-0">
            <input
              type="number"
              className="bg-white text-black px-4 py-2 rounded ml-2 flex items-center border border-custom-orange w-full md:w-auto"
              min="0"
              placeholder={translations.Buttons.enterPageNumber}
              value={pageNumber}
              onChange={handlePageNumberChange}
            />
            <button
              onClick={handleMarkAsRead1}
              className="bg-custom-green text-white px-4 py-2 rounded flex items-center border border-custom-green "
            >
              <IoIosAddCircle className="w-5 h-5" />
            </button>
            <button
              onClick={handleMarkAsRead}
              className="bg-white text-black px-4 py-2 rounded flex items-center border border-custom-green w-full md:w-auto"
            >
              <FaCheck className="w-5 h-5 ml-2" />
              {translations.Buttons.markAsRead}
             </button>
          </div>
        </div>
    
        {/* Content Sections */}
        <div className="w-full p-4">
          {/* Overview Box */}
          {activeButton === "نظرة عامة" && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <h5 className="text-xl font-semibold mb-2">{book.title}</h5>
              <p
                className="text-gray-700 mb-4 p-4 rounded-md  bg-white text-right"
                style={{
                  fontFamily: "Tajwal, sans-serif",
                  textAlign: isArabic ? "right" : "left",
                  lineHeight: "1.5",
                  marginBottom: "8px",
                }}
              >
                {book.description}
              </p>
            </div>
          )}
    
          {/* Reviews Section */}
          {activeButton === "مراجعات" && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-gray-700 font-semibold">
                  {translations.Buttons.reviews} ({book.comments.length})
                  </span>
                  <div className="flex items-center ml-4">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1 text-gray-700">
                      {book.comments.length > 0
                        ? (
                            book.comments.reduce(
                              (acc, comment) => acc + comment.rating,
                              0
                            ) / book.comments.length
                          ).toFixed(1)
                        : 0}
                    </span>
                  </div>
                </div>
              </div>
    
              {/* Comments Container */}
              <div className="max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="flex justify-center items-center ">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                ) : sortedComments.length === 0 ? (
                  <p className="text-gray-700">
                   {translations.Reviews.noReviews}
                  </p>
                ) : (
                  sortedComments.map((comment) => (
                    <div key={comment.id} className="flex items-start mb-4 p-4 border-b">
                      <img
                        src={user}
                        alt="User"
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="font-semibold mr-2">
                            {comment.learner.firstName}{" "}
                            {comment.learner.lastName}
                          </span>
                          <div className="flex items-center">
                            <span className="text-yellow-500">⭐</span>
                            <span className="ml-1 text-gray-700">
                              {comment.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700">{comment.details}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
    
          {/* Notes Section */}
          {activeButton === "ملاحظات" && (
            <div>
              <h3 className="text-lg font-semibold mr-4">
              {translations.Notes.title}
              </h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="4"
                className="w-full p-2 border rounded-md mb-4 border-custom-orange bg-gray-100"
                placeholder=   {translations.Notes.placeholder}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-custom-orange text-white rounded-md"
                >
                 {translations.Notes.save}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
    
    );
};

export default ReadBooks;
