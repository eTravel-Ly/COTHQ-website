import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../helper/Baseurl";
import axios from "axios";
import noCoursesImage from "../assets/images/favorites.png"; // صورة تعبيرية عند عدم وجود دورات
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons from react-icons

const WishlistBookButton = () => {
  const navigate = useNavigate();
  const [mybooks, setMyBooks] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
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
  const showMyFavorites = async () => {
    try {
      const response = await axios.get(`${baseurl}my-favorites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data) {
        const booksData = response.data.books;
        const coursesData = response.data.courses;
        console.log("Fetched books data:", booksData);
        console.log("Fetched courses data:", coursesData);
        return { books: booksData, courses: coursesData };
      }
    } catch (error) {
      console.error("Error fetching my favorites:", error);
      return { books: [], courses: [] };
    }
  };

  const toggleFavorite = async (id) => {
    try {
      const response = await axios.post(
        `${baseurl}toggle-favorite`,
        {
          type:"BOOK",
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.isFavorite;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return null;
    }
  };

  const handleHeartClick = async (idx, bookId) => {
    const isFavorite = await toggleFavorite(bookId);
    console.log(isFavorite)
    if (isFavorite === false) {
      const updatedbook = mybooks.filter((mybooks, index) => index !== idx);
      setMyBooks(updatedbook);
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
      const { books } = await showMyFavorites();
      if (books.length === 0) return;

      const updatedBooks = await Promise.all(
        books.map(async (book) => {
          const imageUrl = await showpicbooks(book.coverImageUrl);
          return {
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            genre: book.genre,
            coverImageUrl: imageUrl,
            isFavorite: true, // Assuming all fetched courses are favorites initially

          };
        })
      );

      console.log("Updated books with images:", updatedBooks);
      setMyBooks(updatedBooks);
    } catch (error) {
      console.error("Error fetching  data", error);
    } finally {
      setLoading(false);
    }
    };
    fetchData();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };


  const openBookDetails = (bookId) => {
    navigate(`/BookDetails/${bookId}`);
  };

  const filteredBooks =
    selectedType === "all"
      ? mybooks
      : mybooks.filter((book) => book.genre === selectedType);

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
        <p className="text-lg text-gray-700 mt-0">
        لا يوجد كتب قمت بالاعجاب بها .. 
        </p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="mb-4">
        {/*
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="p-2 border rounded-md w-60 border-gray-300 outline-none"
          style={{ fontFamily: "Tajwal, sans-serif", marginRight: "1225px" }}
        >
          <option value="all">كل الأنواع</option>
          <option value="RELIGIOUS">دين</option>
          <option value="FIQH">الفقه</option>
         
        </select>
      */}
      </div>
      {groupedCourses.map((row, index) => (
        <div key={index} className="flex flex-wrap mb-4">
          {row.map((book, idx) => (
            <div key={idx} className="w-1/3 p-2">
              <div className="bg-white shadow-lg rounded-lg p-3  flex-shrink-0 flex items-center text-right ">
                <img
                  src={book.coverImageUrl}
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
                      className="text-sm mb-2 text-gray-600 font-bold"
                      style={{ fontFamily: "Tajwal, sans-serif" }}
                    >
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
                      onClick={() => openBookDetails(book.id)}
                    >
                      اشترِ الآن
                    </button>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleHeartClick(idx, book.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={book.isFavorite ? "#ff3f52" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ff3f52"
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

export default WishlistBookButton;
