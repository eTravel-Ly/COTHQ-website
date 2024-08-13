import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../helper/Baseurl';
import axios from 'axios';

const MyBookButton = () => {
  const navigate = useNavigate();
  const openBook = () => {
    navigate('/ReadBooks');
  };

  const [mybooks, setMyBooks] = useState([]);

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
      const booksData = await showMyBooks();
      if (booksData.length === 0) return; 

      const updatedBooks = await Promise.all(booksData.map(async (book) => {
        const imageUrl = await showpicbooks(book.coverImageUrl); 
        return { ...book, coverImageUrl: imageUrl };
      }));

      console.log("Updated books with images:", updatedBooks);
      setMyBooks(updatedBooks);
    };
    fetchData();
  }, []);

  // تقسيم الكتب إلى صفوف من 4
  const rows = [];
  for (let i = 0; i < mybooks.length; i += 3) {
    rows.push(mybooks.slice(i, i + 3));
  }

  return (
    <div className="p-4" onClick={openBook}>
      {rows.map((row, index) => (
        <div key={index} className="flex flex-wrap mb-4">
          {row.map((book, idx) => (
            <div key={idx} className="w-1/3 p-2">
              <div className="bg-white shadow-lg rounded-lg p-3 w-80 flex-shrink-0 flex items-center text-right">
                <img
                  src={book.coverImageUrl} 
                  alt={book.title}
                  className="h-32 object-cover rounded-lg ml-4"
                />
                <div
                  className="flex-1"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                  <p className="text-sm text-gray-500">{book.description}</p>

                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">نسبة التقدم</p>
                    <p className="text-sm text-custom-orange font-bold">
                      {book.progressPercentage || 0}%
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-custom-orange h-2.5 rounded-full"
                      style={{ width: `${book.progressPercentage || 0}%` }}
                    ></div>
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

export default MyBookButton;
