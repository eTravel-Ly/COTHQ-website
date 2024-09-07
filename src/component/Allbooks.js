import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { baseurl } from '../helper/Baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from 'react-icons/fa'; // تأكد من استيراد أيقونة التحميل
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات
import { CiHeart } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons from react-icons

const Allbooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedType, setSelectedType] = useState('كل الأنواع');
  const [likedBooks, setLikedBooks] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true); // حالة تحميل جديدة
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const coursesPerPage = 9;
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const hasData = books.length > 0;
    const currentCourses = hasData ? books.slice(indexOfFirstCourse, indexOfLastCourse) : [];
    const totalPages = Math.ceil(books.length / coursesPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

 const handleLikeClick = async (id) => {
   // Toggle the favorite state optimistically
   setLikedBooks((prev) => ({
     ...prev,
     [id]: !prev[id], // Toggle the favorite status
   }));

   try {
     const response = await axios.post(
       `${baseurl}toggle-favorite`,
       {
         type: "COURSE",
         id: id,
       },
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
           "Content-Type": "application/json",
         },
       }
     );

     // Check if the response data matches the expected structure
     if (response.data.isFavorite !== undefined) {
       setLikedBooks((prev) => ({
         ...prev,
         [id]: response.data.isFavorite,
       }));
     }
   } catch (error) {
     console.error("Error toggling favorite:", error);
     // Revert the local state if there was an error
     setLikedBooks((prev) => ({
       ...prev,
       [id]: !prev[id], // Toggle back if there was an error
     }));
   }
 };
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(baseurl + 'all-books', {
          headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });

        const booksData = response.data.map(async (book) => {
          const imageUrl = await showpicbooks(book.coverImageUrl);
          return { ...book, imageUrl };
        });
        const booksWithImages = await Promise.all(booksData);

        setBooks(booksWithImages);

        const initialLikedBooks = response.data.reduce((acc, book) => {
          acc[book.id] = book.isFavorite;
          return acc;
        }, {});
        setLikedBooks(initialLikedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false); // تعيين حالة التحميل إلى false بعد الانتهاء
      }
    };
    fetchBooks();
  }, []);

  const showpicbooks = async (fileName) => {
    try {
      const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
      console.log("Fetched image URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const openBookDetails = (bookId) => {
    navigate(`/BookDetails/${bookId}`);
  };

  const openBorrowModal = (bookId) => {
    setBorrowDate(new Date().toISOString().split('T')[0]); // Default to today's date
    setReturnDate('');
    setSelectedBook(bookId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [loading1, setLoading1] = useState(false); // حالة تحميل جديدة


  const handleSaveBorrow = () => {
    if (!selectedBook || !borrowDate || !returnDate) {
      toast.warning('الرجاء ملء جميع الحقول');
      return;
    }

    const borrowData = {
      bookId: selectedBook,
      collectDate: new Date(borrowDate).toISOString(),
      returnDate: new Date(returnDate).toISOString(),
    };

    setLoading1(true); // تعيين حالة التحميل إلى true عند بدء الحفظ

    axios
      .post(baseurl + 'request-book-borrow', borrowData, {
        headers: {
          'accept': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((response) => {
        toast.success('تم إرسال طلب الاستعارة بنجاح');
        setLoading1(false); // تعيين حالة التحميل إلى false بعد الانتهاء
        setTimeout(() => {
          closeModal(); 
        }, 3000);
      })
      .catch((error) => {
        toast.warning('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
        setLoading1(false); // تعيين حالة التحميل إلى false عند حدوث خطأ
      });
  };

  const filteredBooks = selectedType === 'كل الأنواع'
    ? books
    : books.filter(book => book.genre === selectedType);

  const rows = [];
  for (let i = 0; i < filteredBooks.length; i += 3) {
    rows.push(filteredBooks.slice(i, i + 3));
  }

  const getAvailabilityStyle = (availability) => {
    switch (availability) {
      case 'AVAILABLE_BOTH':
        return { text: 'متاح', bgColor: 'bg-green-600', btnText: 'اشترِ الآن', btnDisabled: false };
      case 'AVAILABLE_LIBRARY_ONLY':
        return { text: 'متوفر في المكتبة فقط', bgColor: 'bg-blue-500', btnText: 'استعر الآن', btnDisabled: false };
      case 'AVAILABLE_ONLINE_ONLY':
        return { text: 'متوفر بالانترنت', bgColor: 'bg-blue-500', btnText: 'اشترِ الآن', btnDisabled: false };
      case 'RESERVED':
        return { text: 'محجوز', bgColor: 'bg-yellow-500', btnText: 'استعر الآن', btnDisabled: true };
      case 'UNAVAILABLE':
        return { text: 'غير متاح', bgColor: 'bg-red-500', btnText: 'اشترِ الآن', btnDisabled: true };
      default:
        return { text: '', bgColor: '', btnText: '', btnDisabled: true };
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <FaSpinner className="text-4xl animate-spin" />
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
          <img
            src={noCoursesImage}
            alt="No books available"
            className="w-60 h-60 object-cover "
          />
          <p
            className="text-lg text-gray-700"
            style={{ fontFamily: "Tajwal, sans-serif" }}
          >
            لا توجد كتب متاحة في الوقت الحالي
          </p>
        </div>
      ) : (
        <div>
          <div>
            <div className="p-4">
              <div className="flex flex-wrap -mx-2">
                {currentCourses.map((book, index) => {
                  const availabilityStyle = getAvailabilityStyle(
                    book.bookAvailability
                  );
                  return (
                    <div key={book.id} className="w-1/3 p-2">
                      <div className="bg-white shadow-lg rounded-lg p-3 flex-shrink-0 flex items-center text-right">
                        <img
                          src={book.imageUrl}
                          alt={book.title}
                          className="h-32 object-cover rounded-lg ml-4"
                        />
                        <div className="w-3/4 pl-4 flex flex-col justify-between">
                          <div>
                            <h3
                              className="text-lg font-bold mb-2 text-custom-orange"
                              style={{ fontFamily: "Tajwal, sans-serif" }}
                            >
                              {book.title}
                            </h3>
                            <div
                              className={`text-sm mb-2 text-white px-2 py-1 rounded-lg inline-block ${availabilityStyle.bgColor}`}
                              style={{ fontFamily: "Tajwal, sans-serif" }}
                            >
                              {availabilityStyle.text}
                            </div>
                            <div className="text-lg font-bold mb-2">
                              {book.price} دينار
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <button
                              className={`bg-custom-orange text-white px-4 py-2 rounded-3xl ${
                                availabilityStyle.btnDisabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              onClick={() =>
                                availabilityStyle.btnText === "استعر الآن"
                                  ? openBorrowModal(book.id)
                                  : openBookDetails(book.id)
                              }
                              style={{ fontFamily: "Tajwal, sans-serif" }}
                              disabled={availabilityStyle.btnDisabled}
                            >
                              {availabilityStyle.btnText}
                            </button>

                            <div className="text-gray-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={likedBooks[book.id] ? "#ff3f52" : "none"}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke={
                                  likedBooks[book.id]
                                    ? "#ff3f52"
                                    : "currentColor"
                                }
                                className="w-6 h-6 cursor-pointer"
                                onClick={() => handleLikeClick(book.id)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4">
                <ul className="flex justify-center space-x-2 items-center">
                  <li>
                    <button
                      className="px-3 py-1 rounded-full text-custom-orange"
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                      disabled={currentPage === 1}
                    >
                      <FaArrowRight />
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index}>
                      <button
                        className={`px-3 py-1 rounded-full ${
                          currentPage === index + 1
                            ? "bg-custom-orange text-white"
                            : "text-gray-700"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      className="px-3 py-1 rounded-full text-custom-orange"
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                      disabled={currentPage === totalPages}
                    >
                      <FaArrowLeft />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Modal for borrowing */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Borrow Book Modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.6)", // جعل الخلفية أكثر قتامة
              },
              content: {
                width: "450px", // تقليل العرض لتقليل الفراغات
                height: "260px", // تقليل الارتفاع لتقليل الفراغات
                margin: "auto",
                padding: "20px", // تقليل الهوامش الداخلية لتجنب التمرير
                textAlign: "right",
                direction: "rtl", // تفعيل المحاذاة من اليمين إلى اليسار
                fontFamily: "Tajwal, sans-serif",
              },
            }}
          >
            <h2 className="text-lg font-bold mb-2">استعارة الكتاب</h2>
            <form>
              <div className="mb-3">
                <label className="block mb-1">تاريخ الاستعارة:</label>
                <input
                  type="date"
                  value={borrowDate}
                  readOnly
                  className="border p-1 rounded w-full"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1">تاريخ الإرجاع:</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="border p-1 rounded w-full"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white px-3 py-2 rounded mr-1"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleSaveBorrow}
                  className="bg-green-500 text-white px-3 py-2 mr-2 rounded relative"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                  disabled={loading} // تعطيل الزر أثناء التحميل
                >
                  {loading1 ? (
                    <div className="flex justify-center items-center">
                      <FaSpinner className="w-5 h-5 text-white animate-spin" />{" "}
                      {/* Spinner icon */}
                    </div>
                  ) : (
                    "حفظ"
                  )}
                </button>
              </div>
            </form>
          </Modal>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Allbooks;
