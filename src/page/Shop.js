import React, { useState } from 'react';
import ContinueReadingSection1 from "../assets/images/2.png";
import ContinueReadingSection2 from "../assets/images/3.png";
import ContinueReadingSection3 from "../assets/images/Books-1.png";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { useNavigate } from 'react-router-dom';

const allBooks = [
  { id: 1, title: "شرح متن الآجرومية", instructor: "الفقه", image: ContinueReadingSection1, price: "14.99 دينار", type: "الفقه" },
  { id: 2, title: "شرح متن الآجرومية", instructor: "الفقه", image: ContinueReadingSection2, price: "14.99 دينار", type: "دين" },
  { id: 3, title: "شرح متن الآجرومية", instructor: "الفقه", image: ContinueReadingSection3, price: "14.99 دينار", type: "الفقه" },
  { id: 4, title: "شرح متن الآجرومية", instructor: "الفقه", image: ContinueReadingSection2, price: "14.99 دينار", type: "دين" },
  { id: 5, title: "شرح متن الآجرومية", instructor: "الفقه", image: ContinueReadingSection3, price: "14.99 دينار", type: "الفقه" },
  { id: 6, title: "شرح متن الآجرومية", instructor: "الفقه", image: ContinueReadingSection1, price: "14.99 دينار", type: "الفقه" },
  { id: 7, title: "شرح متن الآجرومية", instructor: "الفقه", image: ContinueReadingSection2, price: "14.99 دينار", type: "دين" },
];

export default function Shop() {
  const [selectedType, setSelectedType] = useState('كل الأنواع');
  const [likedBooks, setLikedBooks] = useState({});
  const navigate = useNavigate();
  const openBookDetails = () => {
    navigate('/BookDetails');
  };
  const filteredBooks = selectedType === 'كل الأنواع'
    ? allBooks
    : allBooks.filter(book => book.type === selectedType);

  const rows = [];
  for (let i = 0; i < filteredBooks.length; i += 4) {
    rows.push(filteredBooks.slice(i, i + 4));
  }

  const handleLikeClick = (bookId) => {
    setLikedBooks(prevState => ({
      ...prevState,
      [bookId]: !prevState[bookId]
    }));
  };

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-[80%] mt-2 ml-1">
          <NavbarLogin />
          <div className="border-t"></div>

          <div
            className="p-4"
            style={{
              fontFamily: "Tajwal, sans-serif",
              direction: "rtl",
              textAlign: "right",
            }}
          >
            <h2 className="text-xl font-bold mb-1">المتجر</h2>
            <h4 className="text-l font-bold text-gray-500 mb-4">
              من خلال هذه الصفحة يمكنك شراء الكتب
            </h4>
            
            <div className="mb-4">
              <select
                id="book-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border p-2 rounded w-60"
                style={{ fontFamily: "Tajwal, sans-serif" ,
                  marginRight:"1235px"
     
                }}
              >
                <option value="كل الأنواع">كل الأنواع</option>
                <option value="الفقه">الفقه</option>
                <option value="دين">دين</option>
              </select>
            </div>

            <div className="p-4">
              {rows.map((row, index) => (
                <div key={index} className="flex flex-wrap -mx-2 mb-4">
                  {row.map((book) => (
                    <div key={book.id} className="w-1/4 px-2">
                      <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                        <img
                          src={book.image}
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
                            <div className="text-sm mb-2 text-gray-600" style={{ fontFamily: "Tajwal, sans-serif" }}>
                              {book.type}
                            </div>
                            <div className="text-lg font-bold mb-2">
                              {book.price}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <button
                              className="bg-custom-orange text-white px-4 py-2 rounded-3xl"
                              onClick={openBookDetails}
                              style={{ fontFamily: "Tajwal, sans-serif" }}
                            >
                              اشترِ الآن
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
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
