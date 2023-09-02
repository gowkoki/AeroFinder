import React from "react";

const FlightDetails = (props) => {
  const { flightData } = props;
  return (
    <div className="w-11/12 m-auto flex flex-col md:flex-row justify-between items-center md:space-x-10 space-y-10 md:space-y-0 py-10">
      <div className="flex">
        {/* Display the flight's image or a default image */}
        <img
          src={
            flightData.data[0].aircraft.image
              ? flightData.data[0].aircraft.image.url
              : "https://images.unsplash.com/photo-1570970580763-7993ca30d726?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          }
          alt=""
          className="object-cover rounded-md"
        />
      </div>

      {/* Display Flight Information */}
      <div className="w-11/12 md:w-1/2 space-y-5">
        <p>
          <span className="text-xl font-bold text-gray-700">
            Flight Number :{" "}
          </span>
          <span className="text-xl text-gray-500">
            {flightData ? flightData.data[0].number : "XXX"}
          </span>
        </p>
        <p>
          <span className="text-xl font-bold text-gray-700">Airlines : </span>
          <span className="text-xl text-gray-500">
            {flightData ? flightData.data[0].airline.name : "XXX"}
          </span>
        </p>
        <p>
          <span className="text-xl font-bold text-gray-700">
            Flight Type :{" "}
          </span>
          <span className="text-xl text-gray-500">
            {flightData
              ? flightData.data[0].isCargo === true
                ? "Cargo"
                : "Passenger"
              : "XXX"}
          </span>
        </p>
        <p>
          <span className="text-xl font-bold text-gray-700">Modal : </span>
          <span className="text-xl text-gray-500">
            {flightData
              ? flightData.data[0].aircraft.model
                ? flightData.data[0].aircraft.model
                : "N/A"
              : "XXX"}
          </span>
        </p>

        <p>
          <span className="text-xl font-bold text-gray-700">
            Description :{" "}
          </span>
          <span className="text-xl text-gray-500">
            {flightData
              ? flightData.data[0].aircraft.image
                ? flightData.data[0].aircraft.image.title
                : "N/A"
              : "XXX"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default FlightDetails;
