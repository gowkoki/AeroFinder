import React, { useState } from "react";
import FlightHistory from "./FlightHistory";
import Flight from "./FlightStatus";
import FlightDetails from "./FlightDetails";
import FlightTracker from "./FlightTracker";
import FlightTrackerError from "./FlightTrackerError";

const FlightInformation = (props) => {
  const { flightData, departureGateLoc, status } = props;

  const callsign = flightData.data[0].callSign;
  const [showFlightTracker, setShowFlightTracker] = useState(true);
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const [showFlightHistory, setShowFlightHistory] = useState(false);

  // Function to handle button clicks and set the corresponding state
  const showFlightTrackerSection = () => {
    setShowFlightTracker(true);
    setShowFlightDetails(false);
    setShowFlightHistory(false);
  };

  const showFlightDetailsSection = () => {
    setShowFlightTracker(false);
    setShowFlightDetails(true);
    setShowFlightHistory(false);
  };

  const showFlightHistorySection = () => {
    setShowFlightTracker(false);
    setShowFlightDetails(false);
    setShowFlightHistory(true);
  };

  return (
    <div>
      <div>
        <h1 className=" text-2xl text-left font-bold text-gray-500 mt-8">
          Flight Status
        </h1>
        {/* Display the Flight component with relevant data */}
        <Flight
          flightData={flightData}
          departureGateLoc={departureGateLoc}
          status={status}
        />
      </div>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <div className="flex justify-center space-x-4 mt-4 mb-10">
        {/* Buttons to toggle between sections */}
        <button
          className={`${
            showFlightTracker ? "bg-yellow-300" : "bg-gray-300"
          } text-black px-4 py-2 rounded-md`}
          onClick={showFlightTrackerSection}
        >
          Flight Tracker
        </button>
        <button
          className={`${
            showFlightDetails ? "bg-yellow-300" : "bg-gray-300"
          } text-black px-4 py-2 rounded-md`}
          onClick={showFlightDetailsSection}
        >
          Flight Details
        </button>
        <button
          className={`${
            showFlightHistory ? "bg-yellow-300" : "bg-gray-300"
          } text-black px-4 py-2 rounded-md`}
          onClick={showFlightHistorySection}
        >
          Past and Upcoming
        </button>
      </div>

      {/* Display the FlightTracker section if showFlightTracker is true */}
      {showFlightTracker && (
        <div>
          <h1 className=" text-2xl text-left font-bold text-gray-500">
            Flight Tracker:
          </h1>
          {callsign ? (
            <FlightTracker
              depAirportlat={flightData.data[0].departure.airport.location.lat}
              depAirportlon={flightData.data[0].departure.airport.location.lon}
              arrAirportlat={flightData.data[0].arrival.airport.location.lat}
              arrAirportlon={flightData.data[0].arrival.airport.location.lon}
              callSign={flightData.data[0].callSign}
              depTime={
                flightData.data[0].departure.revisedTime.local
                  ? flightData.data[0].departure.revisedTime.local
                  : flightData.data[0].departure.revisedTime.local
              }
              arrTime={
                flightData.data[0].arrival.revisedTime.local
                  ? flightData.data[0].arrival.revisedTime.local
                  : flightData.data[0].arrival.revisedTime.local
              }
            />
          ) : (
            <FlightTrackerError />
          )}
        </div>
      )}

      {/* Display the FlightDetails section if showFlightDetails is true */}
      {showFlightDetails && (
        <div>
          <h1 className=" text-2xl text-left font-bold text-gray-500">
            Flight Details:
          </h1>
          <FlightDetails flightData={flightData} />
        </div>
      )}

      {/* Display the FlightHistory section if showFlightHistory is true */}
      {showFlightHistory && (
        <div>
          <h1 className=" text-2xl text-left font-bold text-gray-500">
            Past and Upcoming Flights:
          </h1>
          <FlightHistory
            flightNumber={flightData.data[0].number}
            flightData={flightData}
          />
        </div>
      )}
    </div>
  );
};

export default FlightInformation;
