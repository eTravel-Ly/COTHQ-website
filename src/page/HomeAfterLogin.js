import React from 'react'
import Sidebar from '../component/Sidebar'
import NavbarLogin from "../component/NavbarLogin";
import ContinueReadingSection from "../component/ContinueReadingSection";
import ContinueWatchingSection from "../component/ContinueWatchingSection";
import NewCoursesSection from "../component/NewCoursesSection";

import { useNavigate } from 'react-router-dom';

function HomeAfterLogin() {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-[80%] mt-2 ml-1">
          {" "}
          <NavbarLogin />
          <div className="border-t"></div>
          <div className="p-4 ">
            <ContinueReadingSection />
            <ContinueWatchingSection  />
            <NewCoursesSection />
         
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAfterLogin
