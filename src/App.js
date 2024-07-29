import './App.css';
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
          <Route path="/Shop" element={<Shop/>} />
          <Route path="/MyBooks" element={<MyBooks />} />
          <Route path="/BookDetails" element={<BookDetails />} />
          <Route path="/ReadBooks" element={<ReadBooks />} />
          <Route path="/Showcourse" element={<Showcourse />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
