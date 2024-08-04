import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { FaStar, FaRegUserCircle, FaPlayCircle } from "react-icons/fa";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import AddToCartImage from "../assets/images/AddtoCart.png"; 

// Helper function to fetch image URL for books
const showpicbooks = (fileName) => {
  try {
    const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
    console.log("Fetched book image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching book image:", error);
    return null;
  }
};


const showpiccourses = (fileName) => {
  try {
    const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
    console.log("Fetched course image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching course image:", error);
    return null;
  }
};

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${baseurl}my-cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("API Response:", response.data); // Debugging line

        const { books, courses, total } = response.data;
        console.log("Extracted Items:", { books, courses, total }); // Debugging line

        setCartItems([...books, ...courses]);
        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const renderItem = (item, type) => (
    <div
      key={item.id}
      className="bg-white shadow-md rounded-lg p-4 my-1 flex"
      style={{ direction: "rtl" }}
    >
      {type === "course" && (
        <div className="flex flex-row items-center w-full">
          <div className="relative flex-shrink-0 ml-12">
            <img
              src={showpiccourses(item.coverImageUrl)}
              alt={item.title}
              className="h-30 w-24 rounded"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            />
            <FaPlayCircle className="absolute ml-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300 text-3xl" />
          </div>
          <div className="flex-grow ml-4 w-2/3">
            <h3
              className="text-md font-bold mb-2"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              {item.title}
            </h3>
            <p
              className="text-gray-600 text-xs mb-2"
              style={{
                fontFamily: "Tajwal, sans-serif",
                textAlign: "justify",
                lineHeight: "1.5",
              }}
            >
              {item.description}
            </p>
          </div>
          <div className="flex flex-col items-start mt-4">
            <p
              className="text-lg font-bold text-custom-orange mb-2"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              {item.price} دينار
            </p>
            <button
              className="text-custom-orange"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              إزالة
            </button>
          </div>
        </div>
      )}

      {type === "book" && (
        <div className="flex flex-row items-center w-full">
          <div className="relative flex-shrink-0 ml-12">
            <img
              src={showpicbooks(item.coverImageUrl)}
              alt={item.title}
              className="h-30 w-24 rounded"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            />
          </div>
          <div className="flex-grow ml-4 w-2/3">
            <h3
              className="text-md font-bold mb-2"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              {item.title}
            </h3>
            <div className="flex text-gray-700 mt-1 text-sm mb-2">
              <div className="flex items-center">
                <FaRegUserCircle className="text-gray-600 mr-2" />
                <span>{item.author}</span>
              </div>
            </div>
            <div className="flex text-gray-700 text-sm mb-2">
              <div className="flex items-center">
                <span
                  className="font-bold mr-2"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  دار النشر
                </span>
                <span style={{ fontFamily: "Tajwal, sans-serif" }}>
                  {item.publisher}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start mt-4">
            <p
              className="text-lg font-bold text-custom-orange mb-2"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              {item.price} دينار
            </p>
            <button
              className="text-custom-orange"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              إزالة
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div className="border-t"></div>
        <div className="flex flex-col lg:flex-row justify-between container mx-auto mt-10 rtl">
          <div className="lg:w-1/3 rounded-lg p-6 mt-6 lg:mt-0">
            <h2
              className="text-2xl font-bold mb-4 text-right"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              الإجمالي
            </h2>
            <div className="flex justify-between mb-4">
              <p
                className="font-bold text-lg"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                {totalPrice.toFixed(2)} دينار
              </p>
              <p
                className="font-bold text-lg"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                الإجمالي
              </p>
            </div>
            <button
              className="bg-custom-orange text-white w-full py-2 rounded"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              إتمام الشراء
            </button>
          </div>
          <div className="lg:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-4 text-right font-tajwal">
              عربة الشراء
            </h1>
            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((item) =>
                  item.author
                    ? renderItem(item, "book")
                    : renderItem(item, "course")
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center  h-full">
                <img
                  src={AddToCartImage}
                  alt="Add to Cart"
                  className=" h-[50%] mb-4"
                />
                <p
                  className="text-center text-gray-500 font-bold text-2xl mb-4"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                  سلتك فارغة
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
