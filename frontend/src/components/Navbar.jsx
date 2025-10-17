import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  ArrowRight,
  CircleUserIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { UserContext } from "../context/userContext";
import Popup from "./Popup";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";

const Navbar = () => {
  const { user, handleLogout } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [keywords, setKeywords] = useState("");
  const navigate = useNavigate();

  const closePopup = () => {
    setIsPopup(false);
    setShowLogin(true);
  };
  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
      <Link to="/" className="max-md:flex-1">
        <img
          className="w-35 h-auto max-h-10 object-cover"
          src={assets.logo}
          alt=""
        />
      </Link>
      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 max-md:w-0 ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Link
          to="/"
          onClick={() => {
            scrollTo(0, 0), setIsOpen(!isOpen);
          }}
        >
          Trang chủ
        </Link>
        <Link
          to="/movies"
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(!isOpen);
          }}
        >
          Phim đang chiếu
        </Link>

        <Link
          to="/release"
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(!isOpen);
          }}
        >
          Sắp công chiếu
        </Link>
        {user && (
          <Link
            to="/bookings"
            onClick={() => {
              scrollTo(0, 0);
              setIsOpen(!isOpen);
            }}
          >
            Vé của tôi
          </Link>
        )}
      </div>
      <div className="flex items-center gap-8">
        <div className="group flex items-center justify-end relative">
          {/* Input */}
          <input
            onChange={(e) => setKeywords(e.target.value)}
            type="text"
            placeholder="Search..."
            className="
        absolute right-0 px-3 py-1 border-b-2 border-b-white outline-none
        w-0 opacity-0 translate-x-full
        transition-all duration-500 ease-in-out
        group-hover:w-48 group-hover:opacity-100 group-hover:translate-x-0
      "
          />

          {/* Icon */}
          <div className="flex items-center">
            {/* Khi hover group, hiện ArrowRight; khi không hover, hiện Search */}
            <SearchIcon className="w-6 h-6 cursor-pointer z-10 group-hover:hidden transition-all" />
            <ArrowRight
              onClick={() =>
                keywords === ""
                  ? navigate("/movies")
                  : navigate(`/search?keywords=${keywords}`)
              }
              className="w-6 h-6 cursor-pointer z-10 hidden group-hover:block transition-all"
            />
          </div>
        </div>
        {!user ? (
          <button
            onClick={() => setIsPopup(true)}
            className="font-semibold bg-primary hover:bg-primary/80 hover:text-black cursor-pointer px-5 py-1.5 rounded-full text-white"
          >
            Đăng nhập
          </button>
        ) : (
          <div className="relative group inline-block">
            {/* Icon */}
            <CircleUserIcon className="w-8 h-8 cursor-pointer" />

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 w-full text-left text-black hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <MenuIcon
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer "
      ></MenuIcon>
      <Popup isOpen={isPopup} onClose={closePopup}>
        {showLogin ? (
          <Login
            switchToSignUp={() => setShowLogin(false)}
            setIsOpen={setIsPopup}
          />
        ) : (
          <SignUp switchToLogin={() => setShowLogin(true)} />
        )}
      </Popup>
    </div>
  );
};

export default Navbar;
