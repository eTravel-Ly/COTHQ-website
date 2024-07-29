import React , { useState }  from 'react';
import Sidebar from '../component/Sidebar';
import NavbarLogin from '../component/NavbarLogin';
import user from '../assets/images/4EyBa.png'; // قم بتحديث المسار إلى صورة الشعار
import MyCoursesButton from "../component/MyCoursesButton"
import MyBookButton from "../component/MyBookButton";

const Profile = () => {
    const [selectedSection, setSelectedSection] = useState("MyBookButton");

    const showbooks = () => setSelectedSection("MyBookButton");
    const showallCourses = () => setSelectedSection("MyCoursesButton");

    return (
        <div className="flex h-screen" >
            <Sidebar />
            <div className="flex flex-col w-[80%] mt-2 ml-1" >
                <NavbarLogin />
                <div className="flex flex-1 flex-col" dir="rtl">
                    {/* الحاوية الأولى */}
                    <div className="flex flex-col md:flex-row items-center bg-white p-6 shadow-sm rounded-md mb-4 mr-20" style={{
                        width:'800px',
                    }} >
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mr-20">
                            <img src={user}  className="w-full h-full object-cover" />
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 mr-24">
                            <p className="text-gray-700 font-bold" style={{ fontFamily: "Tajwal, sans-serif" }}>رقم القيد: </p>
                            <p className="text-gray-700" style={{ fontFamily: "Tajwal, sans-serif" }}> 217180057 </p>
                            
                            <p className="text-gray-700 font-bold" style={{ fontFamily: "Tajwal, sans-serif" }}>اسم المستخدم</p>
                            <p className="text-gray-700" style={{ fontFamily: "Tajwal, sans-serif" }}>arwa abdo  </p>

                            <p className="text-gray-700 font-bold" style={{ fontFamily: "Tajwal, sans-serif" }}>البريد الالكتروني</p>
                            <p className="text-gray-700" style={{ fontFamily: "Tajwal, sans-serif" }}>arwaabdo880@gmail.com</p>

                            <p className="text-gray-700 font-bold" style={{ fontFamily: "Tajwal, sans-serif" }}>نوع الحساب</p>
                            <p className="text-gray-700" style={{ fontFamily: "Tajwal, sans-serif" }}>طالب داخلي  </p>

                        </div>
                    </div>
                    {/* الحاوية الثانية */}
                    <div className="flex flex-col bg-white p-6 rounded-md " >
                    <p className="text-gray-700 mb-4 font-bold text-2xl" style={{ fontFamily: "Tajwal, sans-serif" }}>الكتب والدورات الخاصة بالطالب أروى عبدالرحمن أبوزقية:</p>
                    <div className="flex mt-4">
                        <button
                            style={{ fontFamily: "Tajwal, sans-serif" }}
                            className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                                selectedSection === "MyBookButton" ? "bg-custom-orange" : ""
                            }`}
                            onClick={showbooks}
                        >
                            الكتب الخاصة بك
                        </button>
                        <button
                            style={{ fontFamily: "Tajwal, sans-serif" }}
                            className={`flex items-center mx-1 px-4 py-2 bg-blue rounded-lg text-l font-bold text-gray-900 hover:bg-custom-orange hover:text-blue focus:outline-none ${
                                selectedSection === "MyCoursesButton" ? "bg-custom-orange" : ""
                            }`}
                            onClick={showallCourses}
                        >
                            الكورسات الخاصة بك
                        </button>
                    </div>

                </div>

                {selectedSection === "MyCoursesButton" && <MyCoursesButton />}
                    {selectedSection === "MyBookButton" && <MyBookButton />}
                </div>
            </div>
        </div>
    );
};

export default Profile;
