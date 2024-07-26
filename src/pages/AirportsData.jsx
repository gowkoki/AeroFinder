import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import AirportInfo from "../components/Airports/AirportInfo";
import AirportTabs from "../components/Airports/AirportTabs";

const AirportsInfo = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const airportCode = queryParams.get("aircode");
  const airport = airportCode ? airportCode : "";
  const [airportData, setAirportData] = useState("");
  const [airportTime, setAirportTime] = useState("");
  const [status, setStatus] = useState("");

  //Request sent to the server to fetch the airport arrival and departure information
  const handleCheckStatus = async () => {
    try {
      console.log(airport);
      let endpoint = `https://aerofinderapi.onrender.com/airport?airport=${airport}`;
      const response = await axios.get(endpoint);

      if (response.data.status === "success") {
        setAirportData(response.data.data1);
        setAirportTime(response.data.data2);
      }
      setStatus(response.data.status);
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
    <div className="w-11/12 md:w-4/5 m-auto">
      <div>
        {status === "success" ? (
          <div>
            <div className=" p-2 mt-5">
              <h1 className=" text-3xl text-center font-bold text-black">
                {airportData ? airportData.fullName : "XXX"}
              </h1>
            </div>
            <AirportTabs airport={airport} airportData={airportData} />
{/*             <AirportInfo airportData={airportData} airportTime={airportTime} /> */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AirportsInfo;
