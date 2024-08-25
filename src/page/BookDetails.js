import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // لاستخراج bookId من الرابط
import axios from 'axios';
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { FaRegUserCircle } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegHeart, FaPlus, FaMinus } from "react-icons/fa6";
import { baseurl } from '../helper/Baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const BookDetails = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`${baseurl}book/${bookId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        
        // Fetch the image URL using showpicbooks
        const imageUrl = await showpicbooks(response.data.coverImageUrl);
        
        // Set the book data with the fetched image URL
        setBookData({ ...response.data, coverImageUrl: imageUrl });
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, [bookId]);

  const showpicbooks = (fileName) => {
    try {
      const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(baseurl + 'all-books', {
          headers: {
            'accept': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        const booksData = response.data.map((book) => {
          const imageUrl = showpicbooks(book.coverImageUrl);
          return { ...book, coverImageUrl: imageUrl };
        });
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleIncrement = () => {
 ///   setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
  //  setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  if (!bookData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
      baseurl + 'add-to-cart',
        {
          type: "BOOK",
          id:bookId,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        window.dispatchEvent(new Event('cartUpdated'));
        toast.success('تم إضافة الكتاب إلى سلة التسوق بنجاح');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.warning('حدث خطأ أثناء إضافة الكتاب إلى السلة. حاول مرة أخرى.');
    }
  };

  // Process relatedBooks
  const relatedBooks = books
    .filter(book => book.id.toString() !== bookId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);


   const openBookDetails = (bookId) => {
      navigate(`/BookDetails/${bookId}`);
    };
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-[80%] mt-2 ml-1">
        <NavbarLogin />
        <div className="container mx-auto p-4" dir="rtl">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4">
            <div className="md:w-1/4 p-4">
              <img src={bookData.coverImageUrl} alt="Book" className="w-60" />
            </div>
            <div className="md:w-2/3 p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold font-tajwal">{bookData.title}</h1>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center ml-2">
                  {Array(bookData.overallRating).fill('').map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.192c.969 0 1.371 1.24.588 1.81l-3.396 2.47a1 1 0 00-.364 1.118l1.287 3.958c.3.921-.755 1.688-1.538 1.118l-3.396-2.47a1 1 0 00-1.176 0l-3.396 2.47c-.783.57-1.838-.197-1.538-1.118l1.287-3.958a1 1 0 00-.364-1.118l-3.396-2.47c-.783-.57-.381-1.81.588-1.81h4.192a1 1 0 00.95-.69l1.286-3.959z" />
                    </svg>
                  ))}
                </div>
                <div className="text-orange-500">
                  <span className="text-lg">{bookData.overallRating}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex text-gray-700">
                  <span className="flex items-center ml-60 font-bold font-tajwal">
                    <FaRegUserCircle className="ml-1" /> كتب بواسطة
                  </span>
                  <span className="flex items-center ml-10 font-bold font-tajwal">دار النشر</span>
                  <span className="flex items-center mr-28 font-bold font-tajwal">تاريخ النشر</span>
                </div>
                <div className="flex text-gray-700 mt-1">
                  <span className="flex items-center ml-64 font-tajwal">{bookData.author}</span>
                  <span className="flex items-center  ml-14 font-tajwal">{bookData.publisher}</span>
                  <span className="flex items-center mr-28 font-tajwal">{bookData.publicationDate}</span>
                </div>
              </div>

              <p className="mb-4" style={{
                fontFamily: "Tajwal, sans-serif",
                textAlign: "justify",
                lineHeight: "1.5",
                marginBottom: "8px"
              }}>
                {bookData.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-xl text-red_aa font-tajwal">{bookData.studentsPrice} دينار</span>
                  <span className="line-through text-gray-500 ml-2 font-tajwal">{bookData.price} دينار</span>
                  <span className="ml-2 bg-red_aa text-white px-2 py-1 text-sm rounded font-tajwal">خصم {Math.round((bookData.price - bookData.studentsPrice) / bookData.price * 100)}%</span>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center border rounded">
                    <button
                      className="px-4 py-2 border-r border-gray-300 bg-white text-gray-700 font-tajwal"
                      onClick={handleDecrement}
                    >
                      <FaMinus size={12} className='text-custom-orange' />
                    </button>
                    <input
                      type="text"
                      className="border-0 p-2 w-8 text-center font-tajwal"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="px-4 py-2 border-l border-gray-300 font-tajwal bg-white text-gray-700"
                      onClick={handleIncrement}
                    >
                      <FaPlus size={12} className='text-custom-orange' />
                    </button>
                  </div>
                  <button  onClick={handleAddToCart} className="bg-custom-orange text-white mr-2 font-tajwal px-4 py-2 rounded ml-4 flex items-center">
                    <CiShoppingCart className="mr-2 ml-3" />
                    أضف إلى سلة التسوق
                  </button>
                  <button className="bg-white border border-gray-300 rounded p-2 ml-2 flex items-center justify-center">
                    <FaRegHeart size={19} className='text-custom-orange' />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-reverse md:space-x-4 mt-4">
            <div className="md:w-2/3">
              <h2 className="text-xl font-bold mb-2 font-tajwal">تفاصيل المنتج</h2>
              <table className="w-full text-right">
                <tbody className="space-y-2">
                  <tr className="border-t border-b">
                    <td className="p-4 font-tajwal font-bold">عنوان الكتاب</td>
                    <td className="p-4 font-tajwal">{bookData.title}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold">المؤلف</td>
                    <td className="p-4 font-tajwal">{bookData.author}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold">ISBN</td>
                    <td className="p-4 font-tajwal">{bookData.isbn}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold">الناشر</td>
                    <td className="p-4 font-tajwal">{bookData.publisher}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-tajwal font-bold">تاريخ النشر</td>
                    <td className="p-4 font-tajwal">{bookData.publicationDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="md:w-1/3">
              <div>
                <h2 className="text-xl font-bold mb-2 font-tajwal">الكتب ذات الصلة</h2>
                <div className="flex flex-col space-y-4">
                  {relatedBooks.map((book) => (
                    <div key={book.id} className="flex items-center p-2 border">
                      <img src={book.coverImageUrl} alt={book.title} className="w-16 h-25 ml-10" />
                      <div className="ml-4">
                        <h3 className="font-bold font-tajwal">{book.title}</h3>
                        <p className='font-tajwal'>{book.studentsPrice} دينار</p>
                        <button className="bg-white text-black px-2 py-1 flex rounded mt-2 font-tajwal border border-custom-orange" onClick={
                          () => openBookDetails(book.id)
                        }>
                         تـــفــاصـــيــل الكــتاب
                          <CiShoppingCart className="mr-2 ml-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {relatedBooks.length === 0 && (
                    <p className="font-tajwal">لا توجد كتب ذات صلة متاحة.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <ToastContainer />

    </div>
  );
};

export default BookDetails;
