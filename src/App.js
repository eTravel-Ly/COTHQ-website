import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import {
  Home,
  Login,
  LoginRegister,
  HomeAfterLogin,
  NavbarLogin,
  MyCourses,
  MyBooks,
  Shop,
  BookDetails,
  ReadBooks,
  Showcourse,
  ShoppingCart,
  CoursesDetails,
  Settings,
  Profile,
  OrderHistory,
  AllNotify,
  BorrowsHistory,
  Myborrow,
  OrderConfirmation,
  Seminars,
  Contests,
  SeminarsDetails,
  CompetitionsDetails,
  MyActivity,
  Allactivity,
  ContestsDetails,
  TrainingCoursesDtails,
  Paytheorder,
  Paynow,
  HelpCenter
} from "./page/index";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/LoginRegister" element={<LoginRegister />} />
          <Route path="/HomeAfterLogin" element={<HomeAfterLogin />} />
          <Route path="/NavbarLogin" element={<NavbarLogin />} />
          <Route path="/MyCourses" element={<MyCourses />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/HelpCenter" element={<HelpCenter />} />

          <Route path="/MyActivity" element={<MyActivity />} />
          <Route path="/MyBooks" element={<MyBooks />} />
          <Route path="/BookDetails/:bookId" element={<BookDetails />} />
          <Route path="/ReadBooks/:bookId" element={<ReadBooks />} />
          <Route path="/Showcourse/:courseId" element={<Showcourse />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route
            path="/CoursesDetails/:courseId"
            element={<CoursesDetails />}
          />
          <Route path="/ContestsDetails/:Id" element={<ContestsDetails />} />
          <Route
            path="/TrainingCoursesDtails/:Id"
            element={<TrainingCoursesDtails />}
          />
          <Route path="/Contests" element={<Contests />} />
          <Route
            path="/CompetitionsDetails"
            element={<CompetitionsDetails />}
          />

          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/AllNotify" element={<AllNotify />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
          <Route path="/BorrowsHistory" element={<BorrowsHistory />} />
          <Route path="/Myborrow" element={<Myborrow />} />
          <Route
            path="/OrderConfirmation/:cartItems"
            element={<OrderConfirmation />}
          />
          <Route path="/Allactivity" element={<Allactivity />} />
          <Route path="/Seminars" element={<Seminars />} />
          <Route path="/Paytheorder" element={<Paytheorder />} />
          <Route path="/Paynow" element={<Paynow />} />
          <Route path="/SeminarsDetails/:Id" element={<SeminarsDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
