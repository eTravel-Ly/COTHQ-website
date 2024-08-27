import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import { FaRegUserCircle, FaPlayCircle, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { baseurl } from "../helper/Baseurl";
import AddToCartImage from "../assets/images/AddtoCart.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper function to fetch image URL for books
const showpicbooks = (fileName) => {
  try {
    const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
    return imageUrl;
  } catch (error) {
    return null;
  }
};

// Helper function to fetch image URL for courses
const showpiccourses = (fileName) => {
  try {
    const imageUrl = `${baseurl}uploads/file/download/${fileName}`;
    return imageUrl;
  } catch (error) {
    return null;
  }
};

function ShoppingCart() {
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false); // Added for checkout loading
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${baseurl}my-cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const { books, courses, total } = response.data;
        setCartItems([...books, ...courses]);
        setTotalPrice(total);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const clearCart = async () => {
    try {
      const response = await axios.delete(`${baseurl}clear-my-cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        toast.success("تم مسح جميع عناصر العربة بنجاح");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.warning("فشل في مسح عناصر العربة");
      }
    } catch (error) {
      toast.warning("حدث خطأ أثناء مسح عناصر العربة:", error);
    }
  };

  const removeFromCart = async (id, type) => {
    try {
      const response = await axios.delete(`${baseurl}remove-from-cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: {
          type: type,
          id: id,
          quantity: 1,
        },
      });

      if (response.status === 200) {
        toast.success("تم إزالة العنصر من السلة بنجاح");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.warning("فشل في إزالة العنصر من السلة");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء إزالة العنصر من السلة");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="text-4xl animate-spin" />
      </div>
    );
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) return; // Prevent checkout if cart is empty

    setCheckoutLoading(true); // Show loading spinner on checkout button
    setTimeout(() => {
      navigate(`/OrderConfirmation/${cartItems.length}`, {
        state: { totalPrice },
      });
    }, 2000); // Simulate the delay before navigation
  };

  const renderItem = (item, type) => (
    <div key={item.id} className="bg-white shadow-md rounded-lg p-4 my-1 flex" style={{ direction: "rtl" }}>
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
            <h3 className="text-md font-bold mb-2" style={{ fontFamily: "Tajwal, sans-serif" }}>
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
            <p className="text-lg font-bold text-custom-orange mb-2" style={{ fontFamily: "Tajwal, sans-serif" }}>
              {item.price} دينار
            </p>
            <button
              className="text-red-500"
              style={{ fontFamily: "Tajwal, sans-serif" }}
              onClick={() => removeFromCart(item.id, "COURSE")}
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
            <h3 className="text-md font-bold mb-2" style={{ fontFamily: "Tajwal, sans-serif" }}>
              {item.title}
            </h3>
            <div className="flex text-gray-700 mt-1 text-sm mb-2">
              <div className="flex items-center font-tajwal">
                <FaRegUserCircle className="text-gray-600 mr-2" />
                <span>{item.author}</span>
              </div>
            </div>
            <div className="flex text-gray-700 text-sm mb-2">
              <div className="flex items-center">
                <span className="font-bold mr-2" style={{ fontFamily: "Tajwal, sans-serif" }}>
                  دار النشر
                </span>
                <span style={{ fontFamily: "Tajwal, sans-serif" }}>{item.publisher}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start mt-4">
            <p className="text-lg font-bold text-custom-orange mb-2" style={{ fontFamily: "Tajwal, sans-serif" }}>
              {item.price} دينار
            </p>
            <button
              className="text-red-500"
              style={{ fontFamily: "Tajwal, sans-serif" }}
              onClick={() => removeFromCart(item.id, "BOOK")}
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
            <h2 className="text-2xl font-bold mb-4 text-right" style={{ fontFamily: "Tajwal, sans-serif" }}>
              الإجمالي
            </h2>
            <div className="flex justify-between mb-4">
              <p className="font-bold text-lg" style={{ fontFamily: "Tajwal, sans-serif" }}>
                {totalPrice.toFixed(2)} دينار
              </p>
              <p className="font-bold text-lg" style={{ fontFamily: "Tajwal, sans-serif" }}>
                الإجمالي
              </p>
            </div>
            <div className="border-t border-gray-300 mb-4"></div>
            <button
              className={`w-full bg-custom-orange text-white py-3 px-4 rounded-lg transition duration-300 ${
                cartItems.length === 0 || checkoutLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || checkoutLoading}
              style={{ fontFamily: "Tajwal, sans-serif" }}
            >
              {checkoutLoading ? (
                <div className="flex justify-center items-center">
                  <FaSpinner className="animate-spin mr-2" />
                  جاري إتمام الشراء...
                </div>
              ) : (
                "إتمام الشراء"
              )}
            </button>
           
          </div>
          <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-4 text-right font-tajwal">
              عربة الشراء
            </h1>
            <h6 className="font-tajwal text-red-500 underline cursor-pointer" onClick={clearCart}>(حذف كل العناصر)</h6>
            {cartItems.map((item) =>
              renderItem(item, item.type === "COURSE" ? "course" : "book")
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ShoppingCart;
