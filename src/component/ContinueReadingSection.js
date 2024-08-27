import React, { useRef, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../helper/Baseurl';
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات

const ContinueReadingSection = () => {
  const [mybooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const openBook = (bookId) => {
    navigate(`/ReadBooks/${bookId}`);
  };

  const showMyBooks = async () => {
    try {
      const response = await axios.get(
        baseurl + "my-books",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        const booksData = response.data.filter(book => book !== null);
        return booksData;
      }
    } catch (error) {
      console.error('Error fetching my books:', error);
      return [];
    }
  };

  const showpicbooks = async (fileName) => {
    try {
      const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
      return imageUrl;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const booksData = await showMyBooks();
      if (booksData.length === 0) {
        setMyBooks([]);
        setLoading(false);
        return;
      }

      const updatedBooks = await Promise.all(booksData.map(async (book) => {
        const imageUrl = await showpicbooks(book.coverImageUrl);
        return { ...book, coverImageUrl: imageUrl };
      }));

      // Filter books where progressPercentage is less than 100%
      const filteredBooks = updatedBooks.filter(book => book.progressPercentage < 100);

      setMyBooks(filteredBooks);
      setLoading(false);
    };
    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-md">
      <div className="relative">
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
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-50 p-2 text-2xl rounded-full shadow-md"
          aria-label="Scroll left"
        >
          &#8249;
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-50 p-2 text-2xl rounded-full shadow-md"
          aria-label="Scroll right"
        >
          &#8250;
        </button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide justify-end mx-5"
          style={{ scrollBehavior: "smooth", overflowX: "hidden" }}
          {...handlers}
        >
          {mybooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full text-center p-4 mt-0">
            <img
              src={noCoursesImage}
              alt="No courses available"
              className="w-48 h-48 object-cover"
            />
            <p className="text-lg text-gray-700" 
               style={{
                fontFamily: "Tajwal, sans-serif",
              }}>
              لا يوجد كتب قمت بشراءها .. قم بالاشراء الان
            </p>
          </div>
          
          ) : (
            mybooks.map((book, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-2 w-80 flex-shrink-0 flex items-center text-right"
                style={{ direction: "rtl" }}
                onClick={() => openBook(book.id)}
              >
                <img
                  src={book.coverImageUrl}
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
                      {book.progressPercentage}%
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
                      className="bg-custom-orange h-2 rounded-full mt-6"
                      style={{ width: `${book.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContinueReadingSection;
