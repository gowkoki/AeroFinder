import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Map from "../components/AirportMap/Map";

const AirportMapData = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const airportCode = queryParams.get("aircode");
  const [airportLat, setAirportLat] = useState("");
  const [airportLon, setAirportLon] = useState("");
  const [airportData, setAirportData] = useState("");

  //Request sent to the server to fetch the airport information
  const handleCheckStatus = async () => {
    try {
      console.log(airportCode);
      let endpoint = `https://aerofinderapi.onrender.com/airportMap?airportCode=${airportCode}`;
      const response = await axios.get(endpoint);

      if (response.data.status === "success") {
        setAirportData(response.data.data);
        setAirportLat(response.data.data.latitude);
        setAirportLon(response.data.data.longitude);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the airport data on initial load if airport code is available in the query parameter
  useEffect(() => {
    if (airportCode) {
      handleCheckStatus();
    }
  }, []);

  return (
    <>
      <div className=" p-2 mt-5">
        <h1 className=" text-3xl text-center font-bold text-black mb-4">
          {airportData ? airportData.name : "XXX"}
        </h1>
      </div>
      <div className="">
        <Map airportLat={airportLat} airportLon={airportLon} />
      </div>
    </>
  );
};

export default AirportMapData;
