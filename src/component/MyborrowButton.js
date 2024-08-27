import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noCoursesImage from "../assets/images/Search.png"; // صورة تعبيرية عند عدم وجود دورات

const MyborrowButton = () => {
  const navigate = useNavigate();
  const [mybooks, setMyBooks] = useState([]);
  const [notificationShown, setNotificationShown] = useState(false);
  const [loading, setLoading] = useState(true);

  const showMyBooks = async () => {
    try {
      const response = await axios.get(baseurl + "my-book-borrows", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data && Array.isArray(response.data[0])) {
        return response.data[0]; // Return the books array
      }
    } catch (error) {
      console.error("Error fetching my books:", error);
      return [];
    }
  };

  const showpicbooks = async (fileName) => {
    try {
      const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
      const booksData = await showMyBooks();
      if (!booksData || booksData.length === 0) return;

      const updatedBooks = await Promise.all(
        booksData.map(async (order) => {
          const imageUrl = await showpicbooks(order.book.coverImageUrl);
          return {
            ...order.book,
            returnDate: order.returnDate, // Ensure returnDate is included
            coverImageUrl: imageUrl,
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

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  // Check if date is past
  const isDatePast = (dateString) => {
    return new Date(dateString) < new Date();
  };

  // Notify if return date is past
  const notifyPastReturnDate = () => {
    toast.warning("لديك كتب مستعارة يجب ارجاعها", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    // Notify if any book's return date is past, but only once
    if (!notificationShown) {
      const hasOverdueBooks = mybooks.some((book) =>
        isDatePast(book.returnDate)
      );
      if (hasOverdueBooks) {
        notifyPastReturnDate();
        setNotificationShown(true); // Set the flag to true after showing notification
      }
    }
  }, [mybooks, notificationShown]);

  // Split books into rows of 3
  const rows = [];
  for (let i = 0; i < mybooks.length; i += 3) {
    rows.push(mybooks.slice(i, i + 3));
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
لا يوجد كتب قمت بأستعارتها من المكتبة ..
        </p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <ToastContainer position="bottom-left" />
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
                  <p className="text-sm text-gray-500 mb-2">
                    {book.description}
                  </p>
                  {/* Add formatted return date */}
                  <p
                    className={`text-sm font-bold ${
                      isDatePast(book.returnDate)
                        ? "text-red-500"
                        : "text-gray-700"
                    }`}
                  >
                    تاريخ الإرجاع: {formatDate(book.returnDate)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyborrowButton;
