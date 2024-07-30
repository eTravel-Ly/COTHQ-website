import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart, CiLogout, CiSettings } from "react-icons/ci";
import { BsBell } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import Notifications from './Notifications';
import { Link } from "react-router-dom";
import { GrUnorderedList } from "react-icons/gr";

const NavbarLogin = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white p-4 w-full">
      <div className="flex items-center">
        <button onClick={() => setShowNotifications(!showNotifications)}>
          <BsBell className="text-gray-700 text-xl mr-4" />
          {showNotifications && <Notifications />}
        </button>
        <Link to="/ShoppingCart">
          <CiShoppingCart className="text-gray-700 text-2xl mr-4" />
        </Link>
        <div className="relative">
          <FiUser
            className="text-gray-700 text-xl cursor-pointer"
            onClick={() => setShowUserMenu(!showUserMenu)}
          />
          {showUserMenu && (
            <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <Link
                to="/settings"
                className=" px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center justify-end"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                <span>الإعدادات</span>
                <CiSettings className="ml-2" />
              </Link>
              <Link
                to="/profile"
                className=" px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center justify-end"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                <span>الملف الشخصي</span>
                <FiUser className="ml-2" />
              </Link>
              <Link
                to="/OrderHistory"
                className=" px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center justify-end"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                <span>قائمة الطلبات </span>
                <GrUnorderedList className="ml-2" />
              </Link>
              <button
                className=" w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center justify-end"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                <span>تسجيل خروج</span>
                <CiLogout className="ml-2" />
              </button>
            </div>
          )}
        </div>
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
