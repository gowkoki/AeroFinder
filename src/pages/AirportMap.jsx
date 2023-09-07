import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AirportMap = () => {
  const [airport, setAirport] = useState("");
  const [airportsList, setAirportsList] = useState([]);
  const navigate = useNavigate();

  // Function to fetch the list of airlines from the API
  const fetchAirports = async () => {
    try {
      let endpoint = "https://aerofinderapi.onrender.com/airports";

      const airportsResponse = await axios.get(endpoint);

      if (airportsResponse.data.status === "success") {
        setAirportsList(airportsResponse.data.data.rows);
      } else {
        console.log("Failed to fetch", airlinesResponse.data);
      }
    } catch (error) {
      console.error("Error fetching airlines list:", error);
    }
  };

  // Fetch the airport data on initial load if airport code is available in the query parameter
  useEffect(() => {
    fetchAirports();
  }, []);

  const handleCheckStatus = () => {
    navigate(`/airportMapData?aircode=${airport}`);
  };
  return (
    <div className="w-11/12 md:w-4/5 m-auto">
      <div className="py-10 ">
        <div className=" p-2">
          <h1 className=" text-3xl text-center font-bold text-black">
            View Airport Map
          </h1>
        </div>
        <div className="mt-5 justify-center items-center text-center space-y-2">
          <input
            type="text"
            className="w-72 border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400 m-2"
            placeholder="Search by Airport name"
            value={airport}
            onChange={(event) => {
              setAirport(event.target.value.toUpperCase());
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
          <button
            className="bg-yellow-300 text-black px-4 py-2 rounded-md mt-4 m-2  hover:bg-yellow-400"
            onClick={handleCheckStatus}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default AirportMap;
