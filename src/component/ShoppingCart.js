import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { FaStar, FaRegUserCircle, FaPlayCircle } from "react-icons/fa";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { PiUsersThreeLight } from "react-icons/pi";
import CourseImage from "../assets/images/cover.png"; // Replace with actual path to course images
import BookImage from "../assets/images/Books-1.png";
import { baseurl } from '../helper/Baseurl';
import axios from 'axios';
const courses = [
  {
    title: "شرح متن الآجرومية",
    instructor: "شامي بن مطاعن آل شيبة القرشي",
    price: "14.99 دينار",
    rating: 4.5,
    description:
      "متن مشهور في النحو للأبي عبدالله محمد بن محمد بن داود الصنهاجي المعروف بابن آجروم...",
    lessons: 23,
    duration: "32 س",
    students: 2949,
    image: CourseImage,
  },
  // Add more courses as needed
];

const books = [
  {
    title: "شرح متن الآجرومية",
    author: "محمد بن صالح العثيمين",
    publisher: "دار النشر ثريا",
    edition: "الطبعة الرابعة 24-1-2024",
    type: "الفقه",
    price: "14.99 دينار",
    image: BookImage,
  },
  // Add more books as needed
];

// Helper function to fetch image URL for books
const showpicbooks = (fileName) => {
  try {
    // Ensure `fileName` is valid and correct path is used
    const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
    console.log("Fetched book image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error fetching book image:', error);
    return null;
  }
};

// Helper function to fetch image URL for courses
const showpiccourses = (fileName) => {
  try {
    // Ensure `fileName` is valid and correct path is used
    const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
    console.log("Fetched course image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error fetching course image:', error);
    return null;
  }
};


function ShoppingCart() {

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://160.19.99.6:8989/api/my-cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        console.log("API Response:", response.data); // Debugging line
        
        const items = response.data[0]; // Extracting items array
        console.log("Extracted Items:", items); // Debugging line
  
        const total = items.reduce((sum, item) => {
          // Initialize itemPrice to 0
          let itemPricebook = 0;
          let itemPricecourse = 0;

          // Check if the item has a book or a course and get the price accordingly
          if (item.book) {
            itemPricebook = item.book.price;
          } 
          
         if (item.course) {
          itemPricecourse = item.course.price;
          }
  
          // Calculate the total price
          return sum + itemPricecourse +itemPricebook * item.quantity;
        }, 0);
        
        console.log("totalPrice Items:", total); // Debugging line
  
        setCartItems(items);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchCartItems();
  }, []);
  

  const renderItem = (item, type) => (
    <div
    key={item.title}
    className="bg-white  shadow-md rounded-lg p-4 my-1 flex"
    style={{ direction: "rtl" }}
  >
  
    {type === "course" && item.course && (
      <div className="flex flex-row items-center w-full">
        <div className="relative flex-shrink-0 ml-12">
          <img
            src={showpiccourses(item.course.coverImageUrl)}
            alt={item.course.title}
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
            {item.course.title}
          </h3>
          <p
            className="text-gray-600 text-xs mb-2"
            style={{
              fontFamily: "Tajwal, sans-serif",
              textAlign: "justify",
              lineHeight: "1.5",
            }}
          >
            {item.course.description}
          </p>   
       
        </div>
        <div className="flex flex-col items-start mt-4">
            <p
              className="text-lg font-bold text-custom-orange mb-2"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              {item.course.price} دينار
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
  
    {type === "book" && item.book && (
      <div className="flex flex-row items-center w-full">
        <div className="relative flex-shrink-0  ml-12">
          <img
            src={showpicbooks(item.book.coverImageUrl)}
            alt={item.book.title}
            className="h-30 w-24 rounded"
            style={{ fontFamily: "Tajwal, sans-serif" }}
          />
        </div>
        <div className="flex-grow ml-4 w-2/3">
          <h3
            className="text-md font-bold mb-2"
            style={{ fontFamily: "Tajwal, sans-serif" }}
          >
            {item.book.title}
          </h3>
          <div className="flex text-gray-700 mt-1 text-sm mb-2">
            <div className="flex items-center">
              <FaRegUserCircle
                className="text-gray-600 mr-2"
              />
              <span>{item.book.author}</span>
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
                {item.book.publisher}
              </span>
            </div>
          </div>
        
        </div>
        <div className="flex flex-col items-start mt-4">
            <p
              className="text-lg font-bold text-custom-orange mb-2"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              {item.book.price} دينار
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
              {cartItems.map((item) => (
                <React.Fragment key={item.id}>
                  {item.book && renderItem(item, "book")}
                  {item.course && renderItem(item, "course")}
                </React.Fragment>
              ))}
              
            </div>
          ) : (
            <p
              className="text-center text-gray-500"
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              سلتك فارغة
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}

export default ShoppingCart;
