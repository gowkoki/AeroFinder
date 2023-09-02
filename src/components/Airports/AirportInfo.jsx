import React from "react";
import AirportMap from "./AirportMap";

const AirportInfo = (props) => {
  const { airportData, airportTime } = props;

  // Parse the date and time from the provided format
  const [datePart, timePart] = airportTime.localTime.split(" ");

  const timeFormatted = timePart.split("+")[0];

  // Format the date as "01-July"
  const options = { day: "2-digit", month: "long" };
  const dateFormatter = new Intl.DateTimeFormat("en-US", options);
  const dateFormatted = dateFormatter.format(new Date(datePart));

  return (
    <div className="w-11/12 m-auto flex flex-col md:flex-row justify-between items-center md:space-x-10 space-y-10 md:space-y-0 py-10">
      <div className="flex w-full">
        <AirportMap
          latitude={airportData.location.lat}
          longitude={airportData.location.lon}
        />
      </div>
      <div className="w-11/12 md:w-1/2 space-y-5">
        <p>
          <span className="text-xl font-bold text-gray-700">
            Current date :{" "}
          </span>
          <span className="text-xl text-gray-500">{dateFormatted}</span>
        </p>
        <p>
          <span className="text-xl font-bold text-gray-700">
            Current time :{" "}
          </span>
          <span className="text-xl text-gray-500">{timeFormatted}</span>
        </p>
        <p>
          <span className="text-xl font-bold text-gray-700">Country : </span>
          <span className="text-xl text-gray-500">
            {airportData.country.name}
          </span>
        </p>

        <p>
          <span className="text-xl font-bold text-gray-700">
            Airport Website :
          </span>{" "}
          <a
            href={airportData.urls.webSite}
            className="text-xl text-gray-500  hover:text-blue-600"
          >
            {airportData.urls.webSite}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AirportInfo;
