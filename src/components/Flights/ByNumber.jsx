import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Error from "../FlightInfo/Error";

const ByNumber = () => {
  const navigate = useNavigate();
  const [flightNumber, setFlightNumber] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [status, setStatus] = useState("");

  // Function to handle the search button click and fetch flight information
  const handleCheckStatus = async () => {
    try {
      let endpoint = `https://aerofinder-api.onrender.com/home?flightNumber=${flightNumber}&departDate=${departDate}`;
      const response = await axios.get(endpoint);
      setStatus(response.data.status);
      if (response.data.status === "success") {
        navigate(`/flightinfo?flight=${flightNumber}&depDate=${departDate}`, {
          state: {
            flightData: response.data,
            departureGateLoc: response.data.dpartLoc
              ? response.data.dpartLoc
              : "",
            status: response.data.status,
          },
        });
      } else {
        setStatus("Invalid");
      }
    } catch (error) {
      setStatus("Invalid");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mt-4 justify-center items-center text-center space-y-2">
        {/* Input field for flight number */}
        <input
          type="text"
          className="border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400 m-2"
          placeholder="Flight Number"
          value={flightNumber}
          onChange={(event) => {
            setFlightNumber(event.target.value);
          }}
        />
        {/* Input field for departure date */}
        <input
          type="date"
          title="Enter the Departure Date"
          className="border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400 mt-2 m-2"
          placeholder="date"
          value={departDate}
          onChange={(event) => {
            setDepartDate(event.target.value);
          }}
        />{" "}
        {/* Button to initiate the flight status search */}
        <button
          className="bg-yellow-300 text-black px-4 py-2 rounded-md mt-4 m-2  hover:bg-yellow-400"
          onClick={handleCheckStatus}
        >
          Search
        </button>
      </div>
      {status === "Invalid" && <Error />}
    </div>
  );
};

export default ByNumber;
