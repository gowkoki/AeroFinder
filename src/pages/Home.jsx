import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import FightInformation from "../components/FlightInfo/FlightInformation";
import Error from "../components/FlightInfo/Error";
import aero from "../images/aero1.jpg";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [flightNumber, setFlightNumber] = useState("");
  const [flightData, setFlightData] = useState("");
  const [departureGateLoc, setDepartureGateLoc] = useState("");
  const [status, setStatus] = useState("");

  // Function to handle fetching flight information
  const fetchFlightData = async (flightNumber) => {
    try {
      let endpoint = `http://localhost:8000/home?flightNumber=${flightNumber}`;
      const response = await axios.get(endpoint);

      if (response.data.status === "success") {
        setFlightData(response.data);
        // Set departure gate location if available
        if (response.data.dpartLoc !== "none") {
          setDepartureGateLoc(response.data.dpartLoc);
        }
      }
      setStatus(response.data.status);
    } catch (error) {
      console.error(error);
    }
  };

  //Request sent to the server to fetch the flight information
  const handleCheckStatus = async () => {
    if (flightNumber) {
      navigate(`/?flight=${flightNumber}`);
    }
  };

  // Use useEffect to fetch flight information based on the query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryFlightNumber = searchParams.get("flight");

    if (queryFlightNumber) {
      setFlightNumber(queryFlightNumber);
      fetchFlightData(queryFlightNumber);
    }
  }, [location.search]);

  return (
    <div className="w-11/12 md:w-4/5 m-auto">
      <div className="h-[500px] relative">
        <img
          src={aero}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-8xl font-bold text-yellow-400">Aero Finder</h1>
          <p className="font-sans text-m font-bold text-white text-center w-80 m-4">
            Track flights, stay informed, and explore the skies effortlessly
            with our all-in-one flight tracking companion.
          </p>
        </div>
        <div className="absolute w-full" style={{ bottom: "3.25rem" }}>
          <div className="flex items-center justify-center space-x-2">
            <input
              type="text"
              placeholder="Ex:UA5772"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={flightNumber}
              onChange={(event) => {
                setFlightNumber(event.target.value);
              }}
            />
            <button
              className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
              onClick={handleCheckStatus}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {status === "success" ? (
        <>
          {/* flight data */}
          <FightInformation
            flightData={flightData}
            departureGateLoc={departureGateLoc}
            status={status}
          />
        </>
      ) : status === "Invalid" ? (
        <Error />
      ) : null}
    </div>
  );
};

export default Home;
