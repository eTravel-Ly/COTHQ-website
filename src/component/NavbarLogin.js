import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { BsBell } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import Notifications from './Notifications';

import { Link } from "react-router-dom";


const NavbarLogin = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white p-4 w-full">
      <div className="flex items-center">
        <button onClick={() => setShowNotifications(!showNotifications)}  >
        <BsBell className="text-gray-700 text-xl mr-4"  />
        {showNotifications && <Notifications/>}
        </button>
        <Link to="/ShoppingCart">
          <CiShoppingCart className="text-gray-700 text-2xl mr-4" />
        </Link>

        <FiUser className="text-gray-700 text-xl" />
      </div>
      <div className="bg-gray-100 w-500 h-10 p-2 flex rounded-2xl items-center mb-1 mx-5">
        <IoSearchOutline className="text-gray-700 text-xl mr-4" />
        <input
          style={{ fontFamily: "Tajwal, sans-serif", direction: "rtl" }}
          type="text"
          placeholder="ابحث عن شيء..."
          className="bg-gray-100 w-500 text-right outline-none text-l flex-1"
        />
      </div>
    </div>
  );
};

export default NavbarLogin;
