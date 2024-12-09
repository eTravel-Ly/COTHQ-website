import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import NavbarLogin from "../component/NavbarLogin";
import ContinueReadingSection from "../component/ContinueReadingSection";
import ContinueWatchingSection from "../component/ContinueWatchingSection";
import NewCoursesSection from "../component/NewCoursesSection";

function HomeAfterLogin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
  
      
        <div
          className={`fixed top-0 z-10 transition-all duration-300 w-full lg:w-[calc(100%-20%)]`}
        >
          <NavbarLogin
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        {/* Content and Sidebar */}
        <div className="flex flex-col md:flex-row pt-16 w-full">
          {/* Main content */}
          <div className="flex-1 p-4">
            <ContinueReadingSection />
            <ContinueWatchingSection />
            <NewCoursesSection />
          </div>

          {/* Sidebar on the right */}
          <div
            className={`transition-all duration-300 ${
              isSidebarOpen ? "w-1/4" : "w-0"
            } md:w-[20%] h-full`}
          >
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
        </div>
    
    </>
  );
}

export default HomeAfterLogin;
