import React, { useState, useEffect } from "react";
import { FaRegUserCircle, FaSpinner } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from '../helper/Baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noCoursesImage from "../assets/images/search2.png"; // Image for no courses
import cover1 from "../assets/images/test2.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons from react-icons
import { useTranslation } from "../context/TranslationContext"; 

Modal.setAppElement("#root");


const getImageUrl = (fileName) => {
  return fileName ? `${baseurl}uploads/file/download/${fileName}` : "";
};

const ConferencesAll = () => {

    const { translations , language} = useTranslation(); 
    const isArabic = language === "ar";

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "MALE",
    birthDate: "",
    email: "",
    mobileNo: "",
    city: "",
    nationalityCode: "",
    subscriberNotes: "",
    attachmentFile: null,
    eventId: 0,
  });
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch conferences from API
    const fetchConferences = async () => {
      try {
        const response = await axios.get(
          baseurl + "public/events/active",
          { headers: { accept: "application/json" } }
        );
        const data = response.data.CONFERENCE || [];
        setConferences(data);
      } catch (error) {
        console.error("Error fetching conferences:", error);
      } finally {
        setLoading1(false);
      }
    };

    fetchConferences();
  }, []);

  const openConferenceDetails = (id) => {
    navigate(`/SeminarsDetails/${id}`);
  };

  const openModal = (conference) => {
    setSelectedConference(conference);
    setFormData((prevData) => ({
      ...prevData,
      eventId: conference.id,
    }));
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedConference(null);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const initialFormData = {
    fullName: "",
    gender: "MALE",
    birthDate: "",
    email: "",
    mobileNo: "",
    city: "",
    nationalityCode: "",
    subscriberNotes: "",
    attachmentFile: null,
    eventId: 0,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Create an object to send in JSON format
    const dataToSend = { ...formData };
    if (dataToSend.attachmentFile) {
      // Convert file to base64 if needed for JSON
      const reader = new FileReader();
      reader.readAsDataURL(dataToSend.attachmentFile);
      reader.onloadend = async () => {
        dataToSend.attachmentFile = reader.result;
        try {
          await axios.post(baseurl + 'public/event/register', dataToSend, {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json', // Use application/json
            },
          });
                toast.success(translations.registrationSuccess);
        
          setFormData(initialFormData); // Reset the form data
          closeModal();
        } catch (error) {
          handleErrorResponse(error);
        } finally {
          setLoading(false);
        }
      };
    } else {
      // No file to send
      try {
        await axios.post(baseurl + 'public/event/register', dataToSend, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
               toast.success(translations.registrationSuccess);
       
        setFormData(initialFormData); // Reset the form data
        closeModal();
      } catch (error) {
        handleErrorResponse(error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleErrorResponse = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.message === "Learner has already registered for this event.") {
           toast.warning(translations.alreadyRegistered);
             } else {
               toast.warning(translations.registrationFailed);
             }
    } else {
      console.error('Error submitting form:', error);
      toast.warning(translations.registrationFailed);
    }
  };
  

  // Calculate current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentConferences = conferences.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(conferences.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading1) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="text-4xl animate-spin" />
      </div>
    );
  }

  if (conferences.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4 mt-[-10%]">
        <img
          src={noCoursesImage}
          alt="No conferences available"
          className="w-60 h-60 object-cover "
        />
        <p className="text-lg text-gray-700 mt-0">
    {translations.noConferencesAdded}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentConferences.map((item) => (
          <div key={item.id} className="p-2">
            <div
              className={`bg-white rounded-lg shadow-md p-3 flex flex-col ${
                item.isActive ? "shadow-sm shadow-green-500" : "shadow-md"
              }`}
            >
              <img
                src={getImageUrl(item.coverImageUrl)}
                alt={item.title}
                className="object-cover rounded-lg mb-4"
              />
              <h2 className="text-sm font-bold mb-2 text-right">{item.title}</h2>
              <div className="flex items-center mb-2">
                <CiCalendarDate className="text-gray-600 mr-2 ml-2" />
                <p
                  className="text-xs text-gray-500 mb-2 text-right"
                  style={{
                    fontFamily: "Tajwal, sans-serif",
                    textAlign: "justify",
                    lineHeight: "1.5",
                    marginBottom: "8px",
                  }}
                >
                   {translations.seminarStartDate} {item.eventStartDate}
                </p>
              </div>
              <div className="flex items-center mb-2">
                <FaRegUserCircle className="text-gray-600 mr-2 ml-2" />
                <p
                  className="text-xs text-gray-600 text-right"
                  style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                 {translations.speaker} {item.organizer}
                </p>
              </div>
              <div className="flex justify-center items-center text-sm text-gray-600 space-x-4 space-x-reverse">
                <button
                  className="bg-custom-green text-white py-2 px-4 rounded mr-5"
                  onClick={() => openConferenceDetails(item.id)}
                >
                  {translations.conferenceDetails}
                </button>
                <button
                  className="bg-custom-green text-white py-2 px-4 rounded"
                  onClick={() => openModal(item)}
                >
                                   {translations.registerNow}

                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <ul className="flex items-center space-x-2">
          <li>
            <button
              className="px-3 py-1 rounded-full text-custom-green"
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
              disabled={currentPage === 1}
            >
              {isArabic ?    <FaArrowRight /> :    <FaArrowLeft />}
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                className={`px-3 py-1 rounded-full ${
                  currentPage === index + 1 ? 'bg-custom-green text-white' : 'text-custom-green'
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              className="px-3 py-1 rounded-full text-custom-green"
              onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : currentPage)}
              disabled={currentPage === totalPages}
            >
              {isArabic ?      <FaArrowLeft />  :    <FaArrowRight />}
            </button>
          </li>
        </ul>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-lg p-4 w-[98vw] max-w-xl mx-auto"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
        style={{
          direction: language === 'ar' ? 'rtl' : 'ltr',
          fontFamily: "Tajwal, sans-serif"
        }}
      >
        <h2
          className="text-xl font-bold mb-6 text-center"
          style={{ fontFamily: "Tajwal, sans-serif" }}
        >
             {translations.registerForConference}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-2 justify-end items-end">
          <div className="flex flex-wrap -mx-2 justify-end items-end">
            <div className="w-full sm:w-1/2 px-2 mb-4 text-right">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                 {translations.fullName}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
               className="block w-full p-1.5 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full sm:w-1/2 px-2 mb-4 ">
              <label
                htmlFor="nationalityCode"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                {translations.nationalityCode}
              </label>
              <input
                type="text"
                id="nationalityCode"
                name="nationalityCode"
                value={formData.nationalityCode}
                onChange={handleChange}
                required
              className="block w-full p-1.5 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full sm:w-1/2 px-2 mb-4 ">
              <label
                htmlFor="gender"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                 {translations.gender}
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                  className="block w-full p-1.5 border border-gray-300 rounded"
                style={{ fontFamily: "Tajwal, sans-serif" }}
                >
                   {language === 'ar' ? (
                    <>
                      <option value="MALE">ذكر</option>
                      <option value="FEMALE">أنثى</option>
                    </>
                  ) : (
                    <>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </>
                  )}
              </select>
            </div>
            <div className="w-full sm:w-1/2 px-2 mb-4 ">
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                   {translations.birthDate}
              </label>
              <input
                  type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                style={{ fontFamily: "Tajwal, sans-serif" }}
                required
              className="block w-full p-1.5 border border-gray-300 rounded"
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-4 ">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
               {translations.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
               className="block w-full p-1.5 border border-gray-300 rounded"
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label
                htmlFor="mobileNo"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                 {translations.mobileNo}
              </label>
              <input
                type="text"
                id="mobileNo"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
                className="block w-full p-1.5 border border-gray-300 rounded"
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-4 ">
              <label
                htmlFor="attachmentFile"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
               {translations.attachmentFile}
              </label>
              <input
                type="file"
                id="attachmentFile"
                name="attachmentFile"
                onChange={handleChange}
                className="block w-full p-1 border border-gray-300 rounded cursor-pointer file:cursor-pointer file:bg-custom-green file:text-white file:px-2 file:py-1 file:border-0 file:mr-2 file:rounded file:text-sm"
                />
            </div>
            <div className="w-full sm:w-1/2 px-2 mb-4 ">
              <label
                htmlFor="city"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
                 {translations.city}
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="block w-full p-1.5 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full px-2 mb-4 ">
              <label
                htmlFor="subscriberNotes"
                className="block text-sm font-medium mb-2"
                style={{ fontFamily: "Tajwal, sans-serif" }}
              >
               {translations.subscriberNotes}
              </label>
              <textarea
                id="subscriberNotes"
                name="subscriberNotes"
                value={formData.subscriberNotes}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded"
                />
            </div>
          </div>

          
          </div>
        

        <div className="flex justify-center sm:justify-between sm:space-x-4">
          <button
            type="submit"
            className="bg-custom-green text-white py-2 px-4 rounded w-full sm:w-auto flex items-center justify-center"
            disabled={loading}
            style={{ fontFamily: "Tajwal, sans-serif" }}
          >
            {loading ? <FaSpinner className="animate-spin text-lg" /> : `${translations.registerButton}`}
          </button>

          {/* زر إغلاق يظهر فقط على الشاشات الصغيرة */}
          <button
            onClick={closeModal}
            className="bg-red_aa text-white py-2 px-4 rounded w-full sm:w-auto flex items-center justify-center sm:hidden"
            style={{ fontFamily: "Tajwal, sans-serif" }}
          >
            {translations.closeButton}
          </button>
        </div> 
        </form>
        <button
        onClick={closeModal}
        className="absolute top-2 left-2 text-white"
        style={{ fontFamily: "Tajwal, sans-serif" }}
      >
       {translations.closeButton}
      </button>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ConferencesAll;

