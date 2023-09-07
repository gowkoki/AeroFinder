import React, { useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../images/logo1.jpg";
import { useUserDataExpiration } from "../SessionExpire/useUserDataExpiration";
import { toast } from "react-toastify";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Call the custom hook to handle user data expiration
  useUserDataExpiration();

  // Retrieve user data from localStorage
  const storedUserData = localStorage.getItem("userData");
  const user = storedUserData ? JSON.parse(storedUserData) : null;

  // Function to handle mobile view navigation
  const handleNav = () => {
    setNav(!nav);
  };

  // Function to toggle the user dropdown menu
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      let endpoint = "https://aerofinderapi.onrender.com/logout";
      const response = await axios.post(endpoint);
      console.log(response);
      if (response.data.status === "success") {
        // Successful logout
        console.log("logout..");
        localStorage.removeItem("userData");
        toast.success("Logged out successfully");
        navigate(`/`);
      }
    } catch (error) {
      console.log("Error during logout:", error.message);
    }
  };

  return (
    <div className=" bg-neutral-100 w-full h-[80px]">
      <div className="max-w-[1240px] mx-auto px-4 flex justify-between items-center h-full mr-4 ml-4 md:mr-8 md:ml-8 lg:mr-12 lg:ml-12">
        <div className="w-52">
          {/* Logo */}
          <a href="/">
            <img src={Logo} alt="" />
          </a>
        </div>
        <div className="hidden md:flex">
          {/* Desktop menu */}
          <ul className="flex text-black items-center">
            <li>
              <a href="/flights" className="font-bold hover:text-yellow-500">
                Flights
              </a>
            </li>
            <li>
              <a href="/airports" className="font-bold hover:text-yellow-500">
                Airports
              </a>
            </li>
            <li>
              <a href="/airportMap" className="font-bold hover:text-yellow-500">
                Map
              </a>
            </li>

            {/* login and user login button */}
            {user !== null ? (
              <div className="relative inline-block text-left z-50">
                {/* user login button - with dropdown feature */}
                <button
                  type="button"
                  className="bg-yellow-400 px-5 py-2 rounded-xl text-xs md:text-base"
                  onClick={toggleDropdown}
                >
                  <span>{user.user.firstName}</span>
                </button>
                {isOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    {/* User Setting */}
                    <a
                      href={`/myAccount?user_id=${user.user._id}`}
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-yellow-200"
                    >
                      Account Setting
                    </a>
                    {/* Logout */}
                    <a
                      href="#"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-900 hover:bg-yellow-200"
                    >
                      Log out
                    </a>
                  </div>
                )}
              </div>
            ) : (
              // login button
              <a href="/loginForm">
                <button className="bg-yellow-400 px-5 py-2 rounded-xl text-xs md:text-base">
                  Login
                </button>
              </a>
            )}
          </ul>
        </div>
        {/* Hamburger menu for mobile*/}
        <div onClick={handleNav} className="block md:hidden">
          {nav ? (
            <AiOutlineClose size={30} className="text-black" />
          ) : (
            <AiOutlineMenu size={30} className="text-black" />
          )}
        </div>

        {/* Mobile menu */}
        <div
          className={
            nav
              ? "z-50 w-full bg-white text-black absolute top-[90px] left-0 flex justify-center text-center"
              : "absolute left-[-100%]"
          }
        >
          <ul>
            <li className="text-xl">
              <a href="/flights" className="font-bold hover:text-yellow-500">
                Flights
              </a>
            </li>
            <li className="text-xl">
              <a href="/airports" className="font-bold hover:text-yellow-500">
                Airports
              </a>
            </li>
            <li className="text-xl">
              <a href="/airportMap" className="font-bold hover:text-yellow-500">
                Map
              </a>
            </li>
            {/* User actions in mobile view */}
            {user !== null ? (
              <div className="relative inline-block text-left z-50">
                <button
                  type="button"
                  className="bg-yellow-400 px-5 py-2 rounded-xl m-8"
                  onClick={toggleDropdown}
                >
                  <span>{user.user.firstName}</span>
                </button>
                {isOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 w-40 mt-2 mb-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    {/* User Setting */}
                    <a
                      href={`/myAccount?user_id=${user.user._id}`}
                      onClick={handleLogout}
                      className="block px-4 py-2 text-m text-gray-900 hover:bg-yellow-200"
                    >
                      Account Setting
                    </a>
                    {/* Logout */}
                    <a
                      href="#"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-m text-gray-900 hover:bg-yellow-200"
                    >
                      Log out
                    </a>
                  </div>
                )}
              </div>
            ) : (
              // Login button in mobile view
              <a href="/loginForm">
                <button className="bg-yellow-400 px-5 py-2 rounded-xl m-8">
                  Login
                </button>
              </a>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
