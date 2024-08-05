import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../helper/Baseurl';

const Allbooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedType, setSelectedType] = useState('كل الأنواع');
  const [likedBooks, setLikedBooks] = useState({});
  const navigate = useNavigate();
  const handleLikeClick = async (id) => {
    try {
      const response = await axios.post(
        `${baseurl}toggle-favorite`,
        {
          type: "BOOK",
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isFavorite !== undefined) {
        setLikedBooks((prev) => ({
          ...prev,
          [id]: response.data.isFavorite,
        }));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
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
      } catch (error) {
        console.error('Error fetching books:', error);
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

  const filteredBooks = selectedType === 'كل الأنواع'
    ? books
    : books.filter(book => book.genre === selectedType);

  const rows = [];
  for (let i = 0; i < filteredBooks.length; i += 4) {
    rows.push(filteredBooks.slice(i, i + 4));
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
      <div className="flex h-screen">
        <div>
          <div className="mb-4">
            <select
              id="book-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border p-2 rounded w-60"
              style={{ fontFamily: "Tajwal, sans-serif", marginRight: "1235px" }}
            >
              <option value="كل الأنواع">كل الأنواع</option>
              <option value="الفقه">الفقه</option>
              <option value="دين">دين</option>
            </select>
          </div>

          <div className="p-4">
            {rows.map((row, index) => (
              <div key={index} className="flex flex-wrap -mx-2 mb-4">
                {row.map((book) => {
                  const availabilityStyle = getAvailabilityStyle(book.bookAvailability);
                  return (
                    <div key={book.id} className="w-1/4 px-2">
                      <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                        <img
                          src={book.imageUrl}
                          alt={book.title}
                          className="w-1/3 h-30 ml-4 object-cover rounded-lg"
                        />
                        <div className="w-2/3 pl-4 flex flex-col justify-between">
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
                              className={`bg-custom-orange text-white px-4 py-2 rounded-3xl ${availabilityStyle.btnDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                              onClick={() => openBookDetails(book.id)}
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
                                stroke={likedBooks[book.id] ? "#ff3f52" : "currentColor"}
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Allbooks;
