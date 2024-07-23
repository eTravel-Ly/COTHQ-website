import React, { useState } from "react";
import ContinueReadingSection1 from "../assets/images/2.png";
import ContinueReadingSection2 from "../assets/images/3.png";
import ContinueReadingSection3 from "../assets/images/Books-1.png";
import { useNavigate } from 'react-router-dom';

const allBooks = [
  {
    title: "شرح متن الآجرومية",
    type: "الفقه",
    image: ContinueReadingSection1,
    price: "14.99 دينار",

  },
  {
    title: "شرح متن الآجرومية",
    type: "الفقه",
    image: ContinueReadingSection2,
    price: "14.99 دينار",
 
  },
  {
    title: "شرح متن الآجرومية",
    type: "الفقه",
    image: ContinueReadingSection3,
    price: "14.99 دينار",

  },
  {
    title: "شرح متن الآجرومية",
    type: "الفقه",
    image: ContinueReadingSection2,
    price: "14.99 دينار",
 
  },
  {
    title: "شرح متن الآجرومية",
    type: "دين",
    image: ContinueReadingSection3,
    price: "14.99 دينار",
   
  },
  {
    title: "شرح متن الآجرومية",
    type: "دين",
    image: ContinueReadingSection1,
    price: "14.99 دينار",
  
  },
  {
    title: "شرح متن الآجرومية",
    type: "دين",
    image: ContinueReadingSection2,
    price: "14.99 دينار",
 
  },
  // Add more books as needed
];

const WishlistBookButton = () => {
  const navigate = useNavigate();
  const [likedBooks, setLikedBooks] = useState({});
  const [selectedType, setSelectedType] = useState("all");

  // Handle heart icon click
  const handleHeartClick = (index) => {
    setLikedBooks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Handle type change
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  const openBookDetails = () => {
    navigate('/BookDetails');
  };
  // Filter books based on selected type
  const filteredBooks = selectedType === "all" ? allBooks : allBooks.filter(book => book.type === selectedType);

  // Split books into rows of 4
  const rows = [];
  for (let i = 0; i < filteredBooks.length; i += 4) {
    rows.push(filteredBooks.slice(i, i + 4));
  }

  return (
    <div className="p-4">
      <div className="mb-4 ">
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="p-2 border rounded-md w-60 border-gray-300 outline-none"
          style={{ fontFamily: "Tajwal, sans-serif" ,
             marginRight:"1225px"

           }}
        >
          <option value="all">كل الأنواع</option>
          <option value="الفقه">الفقه</option>
          <option value="دين">دين</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap mb-4">
          {row.map((course, index) => (
            <div key={index} className="w-1/4 p-2">
              <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-1/4 h-30 ml-4 rounded-lg"
                />
                <div className="w-3/4 pl-4 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-lg font-bold mb-2 text-custom-orange"
                      style={{ fontFamily: "Tajwal, sans-serif" }}
                    >
                      {course.title}
                    </h3>
                    <div className="text-sm mb-2 text-gray-600  font-bold " style={{ fontFamily: "Tajwal, sans-serif" }}>
                      {course.type}
                    </div>
                    <div className="text-lg font-bold mb-2">
                      {course.price}
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
