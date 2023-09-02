import React, { useState } from "react";
import { Tabs, Tab } from "./FlightTab";
import FlightData from "./FlightData";

// Function to format the date label based on the offset from today
const formatDateLabel = (date) => {
  const today = new Date();
  today.setDate(today.getDate() + date);
  const day = today.getDate();
  const month = today.toLocaleString("default", { month: "long" });
  return `${day} ${month}`;
};

const FlightHistory = (props) => {
  const { flightNumber, flightInfo } = props;
  // State to store flight data
  const [flightData, setFlightData] = useState(null);
  // Function to handle flight data updates
  const handleFlightDataUpdate = (data) => {
    setFlightData(data);
  };

  // Generate the previous three dates (offset from today)
  const previousDates = [-3, -2, -1];

  // Generate the next three dates (offset from today)
  const nextDates = [1, 2, 3];

  return (
    <div className="mt-9 mb-9">
      {/* Using the Tabs component to organize the UI */}
      <Tabs
        flightNumber={flightNumber}
        onFlightDataUpdate={handleFlightDataUpdate}
      >
        {previousDates.map((date) => (
          <Tab key={date} label={formatDateLabel(date)}>
            <div className="py-4">
              {flightData && <FlightData flightData={flightData} />}
            </div>
          </Tab>
        ))}

        {/* This Tab for today's flight status */}
        <Tab label={formatDateLabel(0)}>
          <div className="py-4">
            {flightData && <FlightData flightData={flightData} />}
          </div>
        </Tab>

        {/* Map over next dates and create corresponding tabs */}
        {nextDates.map((date) => (
          <Tab key={date} label={formatDateLabel(date)}>
            <div className="py-4">
              {flightData && <FlightData flightData={flightData} />}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default FlightHistory;
