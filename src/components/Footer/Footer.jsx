import React from "react";
import { FaGooglePlay } from "react-icons/fa";
import { GrAppleAppStore } from "react-icons/gr";
import { FiTwitter, FiFacebook } from "react-icons/fi";
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineGithub,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="mt-10">
      {/* Footer App Download Section */}
      <div className="w-full py-16">
        <div className="flex flex-col justify-center items-center space-y-5">
          <h1 className="text-xl md:text-3xl font-bold">
            Download The Aero Finder app
          </h1>
          <div className="flex space-x-5">
            {/* Google Play Download */}
            <a href="#">
              <div className="flex items-center space-x-2 px-5 py-2 bg-white rounded shadow-xl">
                <FaGooglePlay size={"1.5rem"} />
                <div>
                  <p className="text-xs">Get On</p>
                  <h1 className="text-sm">Google Play</h1>
                </div>
              </div>
            </a>

            {/* Apple App Store Download */}
            <a href="#">
              <div className="flex items-center space-x-2 px-5 py-2 bg-white rounded shadow-xl">
                <GrAppleAppStore size={"1.5rem"} />
                <div>
                  <p className="text-xs">Get On</p>
                  <h1 className="text-sm">Apple Store</h1>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <footer className="w-full py-10 bg-neutral-800 text-white">
        <div className="w-11/12 md:w-1/3 m-auto flex flex-col items-center text-center space-y-5">
          <h1 className="text-2xl font-bold">Aero Finder</h1>
          <ul className="flex item-center space-x-5 text-sm">
            <li>
              <a href="/flights" className=" hover:text-yellow-500">
                Flights
              </a>
            </li>
            <li>
              <a href="/airports" className=" hover:text-yellow-500">
                Airports
              </a>
            </li>
            <li>
              {" "}
              <a href="/airportMap" className=" hover:text-yellow-500">
                Map
              </a>
            </li>
          </ul>
          <div className="flex items-center space-x-5">
            <a href="#" className=" hover:text-yellow-500">
              <FiTwitter size={"1.5rem"} />
            </a>
            <a href="#" className=" hover:text-yellow-500">
              <FiFacebook size={"1.5rem"} />
            </a>
            <a href="#" className=" hover:text-yellow-500">
              <AiOutlineInstagram size={"1.5rem"} />
            </a>
            <a href="#" className=" hover:text-yellow-500">
              <AiOutlineYoutube size={"1.5rem"} />
            </a>
            <a href="#" className=" hover:text-yellow-500">
              <AiOutlineGithub size={"1.5rem"} />
            </a>
          </div>
          <p className="p-5 text-sm text-gray-400">
            Experience seamless flight tracking and exploration with Aero Finder
            - your gateway to the world above.{" "}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
