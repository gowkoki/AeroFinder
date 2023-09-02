import React from "react";
import { useLocation } from "react-router-dom";
import FightInformation from "../components/FlightInfo/FlightInformation";

const FlightInfo = () => {
  // Access the location state passed from the previous page
  const location = useLocation();
  const { flightData, departureGateLoc, status } = location.state;

  return (
    <div className="w-11/12 md:w-4/5 m-auto">
      <div className="py-10 ">
        <div className=" p-2">
          <h1 className=" text-3xl text-center font-bold text-black">
            {flightData
              ? `${flightData.data[0].departure.airport.municipalityName}(${flightData.data[0].departure.airport.iata}) - ${flightData.data[0].arrival.airport.municipalityName} (${flightData.data[0].arrival.airport.iata})`
              : "XXXX"}
          </h1>
        </div>
        <div>
          <FightInformation
            flightData={flightData}
            departureGateLoc={departureGateLoc}
            status={status}
          />
        </div>
      </div>
    </div>
  );
};

export default FlightInfo;
