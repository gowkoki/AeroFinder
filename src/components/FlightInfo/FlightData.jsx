import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlane } from "react-icons/fa";

const FlightData = (props) => {
  const { flightData } = props;
  const navigate = useNavigate();

  // Function to handle the click event on the "Details" button
  const handleClick = () => {
    navigate("/flightinfo", {
      state: {
        flightData: flightData,
        departureGateLoc: flightData.dpartLoc ? flightData.dpartLoc : "",
        status: flightData.status,
      },
    });
  };

  return (
    <div className=" mt-2 relative overflow-x-auto shadow-md sm:rounded-lg">
      {flightData.status === "success" ? (
        // Display the flight data in a table
        <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Departure Time
              </th>
              <th scope="col" className="px-6 py-3">
                Origin
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Destination
              </th>
              <th scope="col" className="px-6 py-3">
                Arrival Time
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              {/* Display departure time */}
              <td className="px-6 py-4">
                {flightData
                  ? flightData.data[0].departure.revisedTime.local
                    ? new Date(
                        flightData.data[0].departure.revisedTime.local
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : new Date(
                        flightData.data[0].departure.scheduledTime.local
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                  : "---"}
                <p className="text-xs">
                  {/* Display departure date */}
                  {flightData
                    ? flightData.data[0].departure.revisedTime.local
                      ? new Date(
                          flightData.data[0].departure.revisedTime.local
                        ).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : new Date(
                          flightData.data[0].departure.scheduledTime.local
                        ).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                    : "---"}
                </p>
              </td>
              {/* Display departure airport */}
              <td className="px-6 py-4">
                {flightData.data[0].departure.airport.iata}
                <p className="text-xs">
                  {flightData.data[0].departure.airport.municipalityName}
                </p>
              </td>
              <td className="px-6 py-4">
                <FaPlane size={30} />
              </td>
              {/* Display arrival airport */}
              <td className="px-6 py-4">
                {flightData.data[0].arrival.airport.iata}
                <p className="text-xs">
                  {flightData.data[0].arrival.airport.municipalityName}
                </p>
              </td>
              {/* Display arrival time */}
              <td className="px-6 py-4">
                {flightData.data[0].arrival.revisedTime.local
                  ? new Date(
                      flightData.data[0].arrival.revisedTime.local
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : new Date(
                      flightData.data[0].arrival.scheduledTime.local
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                <p className="text-xs">
                  {flightData.data[0].arrival.revisedTime.local
                    ? new Date(
                        flightData.data[0].arrival.revisedTime.local
                      ).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : new Date(
                        flightData.data[0].arrival.scheduledTime.local
                      ).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                </p>
              </td>

              {/* Display "Details" button */}
              <td className="px-6 py-4 text-right">
                <button
                  onClick={handleClick}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : flightData.status === "Invalid" ? (
        // Display message when flight information is not available
        <div className="text-center text-lg text-gray-500 dark:text-gray-400 mb-5">
          <p>No Flight Information Available</p>
          <p>
            According to our data, this flight is not scheduled to fly on this
            date
          </p>
        </div>
      ) : (
        <div className="text-center text-lg text-gray-500 dark:text-gray-400 mb-5">
          <p>One Flight This Day</p>
          <p>You are currently viewing the only flight for this day</p>
        </div>
      )}
    </div>
  );
};

export default FlightData;
