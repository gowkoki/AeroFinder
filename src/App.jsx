import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import FlightInfo from "./pages/FlightInfo";
import Airports from "./pages/Airports";
import AirportsData from "./pages/AirportsData";
import AirportMap from "./pages/AirportMap";
import AirportMapData from "./pages/AirportMapData";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Map from "./pages/MapToNotify";
import User from "./pages/MyAccount";
import Navbar from "../src/components/Navbar/Navbar";
import Footer from "../src/components/Footer/Footer";

function App() {
  return (
    <>
      {/* Render the navigation bar */}
      <Navbar />
      <Routes>
        {/* Define routes for different pages */}
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/flightinfo" element={<FlightInfo />} />
        <Route path="/airports" element={<Airports />} />
        <Route path="/airportsData" element={<AirportsData />} />
        <Route path="/airportMap" element={<AirportMap />} />
        <Route path="/airportMapData" element={<AirportMapData />} />
        <Route path="/loginForm" element={<LoginForm />} />
        <Route path="/registerForm" element={<RegisterForm />} />
        <Route path="/map" element={<Map />} />
        <Route path="/myAccount" element={<User />} />
      </Routes>
      {/* Render the footer */}
      <Footer />
    </>
  );
}

export default App;
