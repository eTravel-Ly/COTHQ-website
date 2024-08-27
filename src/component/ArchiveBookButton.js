import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { baseurl } from "../helper/Baseurl";
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات


const ArchiveBookButton = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch books
  const showMyBooks = async () => {
    try {
      const response = await axios.get(baseurl + "my-books", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data) {
        const booksData = response.data.filter((book) => book !== null);
        return booksData;
      }
    } catch (error) {
      console.error('Error fetching my books:', error);
      return [];
    }
  };

  // Function to generate image URL
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

        // Filter books where progressPercentage is 100
        const filteredBooks = booksData.filter((book) => book.progressPercentage === 100);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {myBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
        <img
          src={noCoursesImage}
          alt="No courses available"
          className="w-60 h-60 object-cover mb-10"
        />
        <p className="text-lg text-gray-700 mt-0">
      لا يوجد كتب قمت بأكمال قراءتها .. اكمل قراءة كتبك الان
        </p>
      </div>
      ) : (
        myBooks.map((book, index) => (
          <div key={index} className="w-1/3 p-2">
            <div className="bg-white shadow-lg rounded-lg p-3 flex-shrink-0 flex items-center text-right">
              <img
                src={book.coverImageUrl}
                alt={book.title}
                className="h-32 object-cover rounded-lg ml-4"
              />
              <div className="flex-1" style={{ fontFamily: "Tajwal, sans-serif" }}>
                <h3 className="text-md font-bold mb-1">{book.title}</h3>
                <p className="text-xs text-gray-500">{book.description}</p>
                <div className="flex items-center mt-2 justify-between">
                  <div className="flex">
                    <FaRegUserCircle className="text-gray-600 ml-2" />
                    <p className="text-gray-600 text-xs mb-4" style={{ fontFamily: "Tajwal, sans-serif" }}>
                      {book.createdBy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ArchiveBookButton;
