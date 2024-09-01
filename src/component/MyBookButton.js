import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../helper/Baseurl';
import axios from 'axios';
import { FaRegUserCircle, FaSpinner, FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons from react-icons

import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات

const MyBookButton = () => {
  const navigate = useNavigate();
    const [mybooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const coursesPerPage = 9; 
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = mybooks.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(mybooks.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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
      try {
        const booksData = await showMyBooks();
        if (booksData.length === 0) return; 
  
        // Filter books where progressPercentage is not 100
        const filteredBooks = booksData.filter((book) => book.progressPercentage !== 100);
  
        const updatedBooks = await Promise.all(filteredBooks.map(async (book) => {
          const imageUrl = await showpicbooks(book.coverImageUrl); 
          return { ...book, coverImageUrl: imageUrl };
        }));
  
        console.log("Updated books with images:", updatedBooks);
        setMyBooks(updatedBooks);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  

  // تقسيم الكتب إلى صفوف من 4
  const groupedCourses = [];
  for (let i = 0; i < currentCourses.length; i += 3) {
    groupedCourses.push(currentCourses.slice(i, i + 3));
  }
 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (mybooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
        <img
          src={noCoursesImage}
          alt="No courses available"
          className="w-60 h-60 object-cover mb-10"
        />
        <p className="text-lg text-gray-700 mt-0"   style={{ fontFamily: "Tajwal, sans-serif" }}>
        لا يوجد كتب قمت بشراءها .. قم بالاشراء الان
        </p>
      </div>
    );
  }
  return (
    <div className="p-4">
      {groupedCourses.map((row, index) => (
        <div key={index} className="flex flex-wrap mb-4">
          {row.map((book, idx) => (
            <div
              key={idx}
              className="w-1/3 p-2"
              onClick={() => openBook(book.id)}
            >
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
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              <FaArrowLeft />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MyBookButton;
