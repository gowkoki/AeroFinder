import React, { useState, useEffect } from "react";
import axios from "axios";
import FlightTrackerMap from "./FlightTrackerMap";
import FlightTrackerError from "./FlightTrackerError";

const FlightTracker = (props) => {
  const {
    depAirportlat,
    depAirportlon,
    arrAirportlat,
    arrAirportlon,
    callSign,
    depTime,
    arrTime,
  } = props;

  // State to store flight data
  const [flightData, setFlightData] = useState(null);

  // State to store calculated time values
  const [totalTravelTime, setTotalTravelTime] = useState(null);
  const [elapsed, setElapsed] = useState(null);
  const [remaining, setRemaining] = useState(null);

  // Function to calculate time differences
  function getTimeDifference(depTime, arrTime) {
    const currentTimestamp = Date.now();
    const departureTimestamp = Date.parse(depTime.replace(" ", "T"));
    const arrivalTimestamp = Date.parse(arrTime.replace(" ", "T"));

    const totalTravelTimeMs = arrivalTimestamp - departureTimestamp;
    const elapsedMs = currentTimestamp - departureTimestamp;
    let remainingMs = totalTravelTimeMs - elapsedMs;
    remainingMs += 60 * 1000;

    const elapsedF = elapsedMs < 0 ? "0h 0m" : msToTime(elapsedMs);
    const remainingF = remainingMs < 0 ? "0h 0m" : msToTime(remainingMs);
    const totalTravelTimeF = msToTime(totalTravelTimeMs);

    // Update state with calculated values
    setTotalTravelTime(totalTravelTimeF);
    setElapsed(elapsedF);
    setRemaining(remainingF);
  }

  // Function to convert milliseconds to formatted time
  function msToTime(duration) {
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const formattedTime = `${hours}h ${minutes}m`;

    return formattedTime;
  }

  // Fetch flight data and calculate time differences on mount
  useEffect(() => {
    console.log(callSign);
    // Fetch flight data from the backend
    let endpoint = `https://aerofinder-api.onrender.com/flightTracker?callSign=${encodeURIComponent(
      callSign
    )}`;
    axios
      .get(endpoint)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setFlightData(response.data);
        } else if (response.status === 404 || response.status === 500) {
          console.log("flight error: " + response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching flight data:", error);
      });
  }, []);

  // Calculate time differences when flightData changes
  useEffect(() => {
    if (depTime && arrTime) {
      getTimeDifference(depTime, arrTime);
    }
  }, [depTime, arrTime]);

  return (
    <div>
      {flightData ? (
        <div className="w-11/12 m-auto flex flex-col md:flex-row justify-between items-center md:space-x-10 space-y-10 md:space-y-0 py-10">
          <div className="flex w-full">
            <FlightTrackerMap
              depAirportlat={depAirportlat}
              depAirportlon={depAirportlon}
              arrAirportlat={arrAirportlat}
              arrAirportlon={arrAirportlon}
              flightlat={flightData ? flightData[0][6] : ""}
              flightlon={flightData ? flightData[0][5] : ""}
              position={flightData ? flightData[0][10] : ""}
            />
          </div>

          <div className="w-11/12 md:w-1/2 space-y-5">
            <p>
              <span className="text-xl font-bold text-gray-700">
                Total travel duration :{" "}
              </span>
              <span className="text-xl text-gray-500">{totalTravelTime}</span>
            </p>

            <p>
              <span className="text-xl font-bold text-gray-700">
                Elapsed :{" "}
              </span>
              <span className="text-xl text-gray-500">{elapsed}</span>
            </p>

            <p>
              <span className="text-xl font-bold text-gray-700">
                {" "}
                Remaining: :{" "}
              </span>
              <span className="text-xl text-gray-500"> {remaining}</span>
            </p>
          </div>
        </div>
      ) : (
        // Flight data not available, render error message
        <FlightTrackerError />
      )}
    </div>
  );
};

export default FlightTracker;
