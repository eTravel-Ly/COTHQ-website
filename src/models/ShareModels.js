import React from "react";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { PiInstagramLogoLight } from "react-icons/pi";
import CourseImage from "../assets/images/Image.png"; // Replace with your actual image import

const ShareModels = ({ handleTogglePopup }) => {

  const handleClosePopup = () => {
    // Add functionality if needed
  };

  const handleCopyLink = () => {
    const linkInput = document.getElementById('share-link');
    linkInput.select();
    document.execCommand('copy');
 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full relative">
        {/* Close Icon */}
        <button
          onClick={handleTogglePopup}
          className="absolute top-2 left-2 text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Share Text */}
        <div className="text-center mb-4">
          <span className="font-semibold text-lg">شارك هذه الدورة</span>
        </div>

        {/* Input and Copy Button */}
        <div className="flex items-center justify-center mb-4">
          <input
            id="share-link"
            type="text"
            value="https://example.com/course-link"
            readOnly
            className="p-2 border rounded-md flex-grow mr-2 bg-gray-100 font-tajwal"
          />
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-blue-500 text-white rounded-md  bg-custom-orange mr-2"
          >
            انسخ
          </button>
        </div>

        {/* Course Image */}
        <div className="mb-4">
          <img
            src={CourseImage}
            alt="Course Cover"
            className="w-full h-56 object-cover rounded-md"
          />
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center  mb-4">
          <a href="#" className="text-blue-500 hover:text-blue-700 border border-gray-300 p-2 rounded-2xl ml-4">
            <CiFacebook className="w-6 h-6"/>
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800 border border-gray-300 p-2 rounded-2xl  ml-4 ">
            <CiTwitter className="w-6 h-6"/>
          </a>
          <a href="#" className="text-blue-800 hover:text-blue-800 border border-gray-300 p-2 rounded-2xl">
            <PiInstagramLogoLight className="w-6 h-6"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShareModels;
