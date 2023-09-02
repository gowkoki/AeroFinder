import React from "react";

const FlightTrackerError = () => {
  return (
    <div
      className="bg-white p-2 rounded border border-gray-100"
      style={{ width: "100%" }}
    >
      <div style={{ height: "150px", width: "100%" }}>
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-600 font-bold text-2xl">
            Sorry, unable to track the flight.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightTrackerError;
