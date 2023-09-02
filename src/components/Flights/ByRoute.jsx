import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Error from "../FlightInfo/Error";

const ByRoute = () => {
  const navigate = useNavigate();
  const [airlinesList, setAirlinesList] = useState([]);
  const [airportsList, setAirportsList] = useState([]);
  const [airlines, setAirlines] = useState("");
  const [departAirport, setDepartAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [departTime, setDepartTime] = useState("");
  const [status, setStatus] = useState("");

  // Function to fetch the list of airlines from the API
  const fetchAirlinesAndAirports = async () => {
    try {
      let airlinesEndpoint = "http://localhost:8000/airlines";
      let airportsEndpoint = "http://localhost:8000/airports";

      const [airlinesResponse, airportsResponse] = await Promise.all([
        axios.get(airlinesEndpoint),
        axios.get(airportsEndpoint),
      ]);
      if (
        airlinesResponse.data.status === "success" &&
        airportsResponse.data.status === "success"
      ) {
        setAirlinesList(airlinesResponse.data.data.rows);
        setAirportsList(airportsResponse.data.data.rows);
      } else {
        console.log("Failed to fetch airlines and airports");
      }
    } catch (error) {
      console.error("Error fetching airlines list:", error);
    }
  };

  // Function to generate time intervals for "Departure Time" options
  const generateTimeIntervals = () => {
    const intervals = [];
    for (let hour = 0; hour < 24; hour++) {
      const startTime = `${String(hour).padStart(2, "0")}:00`;
      const endTime = `${String(hour).padStart(2, "0")}:59`;
      intervals.push(`${startTime}-${endTime}`);
    }
    return intervals;
  };

  useEffect(() => {
    fetchAirlinesAndAirports();
  }, []);

  // Function to handle the search button click
  const handleCheckStatus = async () => {
    try {
      // Check if all required fields are filled before making the API request
      if (
        !airlines ||
        !departAirport ||
        !arrivalAirport ||
        !departDate ||
        !departTime
      ) {
        toast.warn("Please fill up all the fields");
        return;
      }

      let endpoint = `http://localhost:8000/route?airlines=${airlines}&departAirport=${departAirport}&arrivalAirport=${arrivalAirport}&departDate=${departDate}&departTime=${departTime}`;
      const response = await axios.get(endpoint);
      setStatus(
        response.data.data ? response.data.data.status : response.data.status
      );

      if (response.data.data.status === "success") {
        // Navigate to the flight info page with the search results
        navigate(
          `/flightinfo?airlines=${airlines}&depAirport=${departAirport}&arrAirport=${arrivalAirport}&depDate=${departDate}&depTime=${departTime}`,
          {
            state: {
              flightData: response.data.data,
              departureGateLoc: response.data.data.dpartLoc
                ? response.data.data.dpartLoc
                : "",
              status: response.data.data.status,
            },
          }
        );
      } else {
        setStatus("Invalid");
      }
    } catch (error) {
      setStatus("Invalid");
      console.error("Error fetching flight information:", error);
    }
  };

  return (
    <div>
      <div className="mt-4 justify-center items-center text-center space-y-2">
        {/* Airlines Input */}
        <input
          type="text"
          className="border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400 m-2"
          placeholder="Airlines"
          value={airlines}
          onChange={(event) => {
            setAirlines(event.target.value.toUpperCase());
          }}
          list="airlinesList"
        />
        <datalist
          id="airlinesList"
          style={{
            fontSize: "14px",
            padding: "8px",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          {airlinesList.map((airline) => (
            <option value={airline.Code !== "" ? airline.Code : airline.ICAO}>
              {airline.Name}
            </option>
          ))}
        </datalist>

        {/* Departure Airport Input */}
        <input
          type="text"
          className="border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400 mt-2 m-2"
          placeholder="Departure Airport"
          value={departAirport}
          onChange={(event) => {
            setDepartAirport(event.target.value.toUpperCase());
          }}
          list="airportsList"
        />
        <datalist
          id="airportsList"
          style={{
            fontSize: "14px",
            padding: "8px",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          {airportsList.map((airport) => (
            <option value={airport.iata}>{airport.name}</option>
          ))}
        </datalist>

        {/* Arrival Airport Input */}
        <input
          type="text"
          className="border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400 mt-2 m-2"
          placeholder="Arrival Airport"
          value={arrivalAirport}
          onChange={(event) => {
            setArrivalAirport(event.target.value.toUpperCase());
          }}
          list="airportsList"
        />
        <datalist
          id="airportsList"
          style={{
            fontSize: "14px",
            padding: "8px",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          {airportsList.map((airport) => (
            <option value={airport.iata}>{airport.name}</option>
          ))}
        </datalist>

        {/* Departure Date Input */}
        <input
          type="date"
          title="Enter the Departure Date"
          className="border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400 mt-2 m-2"
          placeholder="date"
          value={departDate}
          onChange={(event) => {
            setDepartDate(event.target.value);
          }}
        />

        {/* Departure Time Input */}
        <select
          className="border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400 mt-2 m-2"
          value={departTime}
          onChange={(event) => {
            setDepartTime(event.target.value);
          }}
        >
          <option value="">Select Departure time</option>
          {generateTimeIntervals().map((interval) => (
            <option key={interval} value={interval}>
              {interval}
            </option>
          ))}
        </select>

        {/* Search Button */}
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

export default ByRoute;
