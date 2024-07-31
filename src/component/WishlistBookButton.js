import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../helper/Baseurl';
import axios from 'axios';

const WishlistBookButton = () => {
  const navigate = useNavigate();
  const [mybooks, setMyBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState({});
  const [selectedType, setSelectedType] = useState("all");

  const showMyBooks = async () => {
    try {
      const response = await axios.get(
        `${baseurl}my-favorites`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        const booksData = response.data[0].map(favorite => favorite.book);
        console.log("Fetched books data:", booksData);
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
      console.log("Fetched image URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const booksData = await showMyBooks();
      if (booksData.length === 0) return;

      const updatedBooks = await Promise.all(booksData.map(async (book) => {
        const imageUrl = await showpicbooks(book.coverImageUrl);
        return { 
          title: book.title,
          author: book.author,
          price: book.price,
          coverImageUrl: imageUrl 
        };
      }));

      console.log("Updated books with images:", updatedBooks);
      setMyBooks(updatedBooks);
    };
    fetchData();
  }, []);

  const handleHeartClick = (index) => {
    setLikedBooks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const openBookDetails = () => {
    navigate('/BookDetails');
  };

  const filteredBooks = selectedType === "all" ? mybooks : mybooks.filter(book => book.genre === selectedType);

  const rows = [];
  for (let i = 0; i < filteredBooks.length; i += 4) {
    rows.push(filteredBooks.slice(i, i + 4));
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="p-2 border rounded-md w-60 border-gray-300 outline-none"
          style={{ fontFamily: "Tajwal, sans-serif", marginRight: "1225px" }}
        >
          <option value="all">كل الأنواع</option>
          <option value="RELIGIOUS">دين</option>
          <option value="FIQH">الفقه</option>
          {/* يمكنك إضافة المزيد من الخيارات هنا بناءً على الأنواع المتاحة */}
        </select>
      </div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap mb-4">
          {row.map((book, index) => (
            <div key={index} className="w-1/4 p-2">
              <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  className="w-1/4 h-30 ml-4 rounded-lg"
                />
                <div className="w-3/4 pl-4 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-lg font-bold mb-2 text-custom-orange"
                      style={{ fontFamily: "Tajwal, sans-serif" }}
                    >
                      {book.title}
                    </h3>
                    <div className="text-sm mb-2 text-gray-600 font-bold" style={{ fontFamily: "Tajwal, sans-serif" }}>
                      {book.author}
                    </div>
                    <div className="text-lg font-bold mb-2">
                      {book.price} دينار
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      className="bg-custom-orange text-white px-4 py-2 rounded-3xl"
                      style={{ fontFamily: "Tajwal, sans-serif" }}
                      onClick={openBookDetails}
                    >
                      اشترِ الآن
                    </button>
                    <div
                      className={`text-gray-600 cursor-pointer ${likedBooks[index] ? '#ff3f52' : ''}`}
                      onClick={() => handleHeartClick(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={likedBooks[index] ? '#ff3f52' : 'none'}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
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
          ))}
        </div>
      ))}
    </div>
  );
};

export default WishlistBookButton;
