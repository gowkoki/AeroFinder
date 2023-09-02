import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiOutlineBellAlert } from "react-icons/hi2";
import Map from "./MapHome";
import MapError from "./MapError";
import Error from "./Error";
import { toast } from "react-toastify";
import { useUserDataExpiration } from "../SessionExpire/useUserDataExpiration";

const FlightStatus = (props) => {
  const { flightData, departureGateLoc, status } = props;

  // Initialize state and navigate hook
  const navigate = useNavigate();
  const [showDepartureMap, setShowDepartureMap] = useState(false);

  // Call the custom hook to handle user data expiration
  useUserDataExpiration();

  // Retrieve user data from localStorage
  const storedUserData = localStorage.getItem("userData");
  const user = storedUserData ? JSON.parse(storedUserData) : null;

  // Function to navigate to departure airport information page
  const handleDepAirportinfo = async () => {
    navigate(
      `/airportsData?aircode=${flightData.data[0].departure.airport.iata}`
    );
  };

  // Function to navigate to arrival airport information page
  const handleArrAirportinfo = async () => {
    navigate(
      `/airportsData?aircode=${flightData.data[0].arrival.airport.iata}`
    );
  };

  // Function to navigate to departure airport map
  const handleDepAirportMap = async () => {
    navigate(
      `/airportMapData?aircode=${flightData.data[0].departure.airport.iata}`
    );
  };

  // Function to navigate to arrival airport map
  const handleArrAirportMap = async () => {
    navigate(
      `/airportMapData?aircode=${flightData.data[0].arrival.airport.iata}`
    );
  };

  // Function to handle sending notifications
  const handleSendMessage = async () => {
    if (user !== null) {
      try {
        //Construct the message content
        const message = `Welcome to AeroFinder\n\n${
          flightData.data[0].departure.airport.municipalityName
        }(${flightData.data[0].departure.airport.iata}) - ${
          flightData.data[0].arrival.airport.municipalityName
        } (${
          flightData.data[0].arrival.airport.iata
        })\n\nYou're now receiving live updates on flight *${
          flightData.data[0].number
        }* [${flightData.data[0].airline.name}]\nStatus : ${
          flightData.data[0].status
        }\n\nDeparture Airport : ${
          flightData.data[0].departure.airport.iata
        }\nDeparture Time : ${
          flightData.data[0].departure.actualTimeLocal
            ? `${new Date(
                flightData.data[0].departure.actualTimeLocal
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} (${new Date(
                flightData.data[0].departure.actualTimeLocal
              ).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })})`
            : `${new Date(
                flightData.data[0].departure.scheduledTimeLocal
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} (${new Date(
                flightData.data[0].departure.scheduledTimeLocal
              ).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })})`
        }\nDeparture Terminal : ${
          flightData.data[0].departure.terminal
            ? flightData.data[0].departure.terminal
            : "N/A"
        }\nDeparture Gate : ${
          flightData.data[0].departure.gate
            ? flightData.data[0].departure.gate
            : "N/A"
        }\nCheck-in Desk : ${
          flightData.data[0].departure.checkInDesk
            ? flightData.data[0].departure.checkInDesk
            : "N/A"
        }
        \n\nArrival Airport : ${
          flightData.data[0].arrival.airport.iata
        }\nArrival Time : ${
          flightData.data[0].arrival.actualTimeLocal
            ? `${new Date(
                flightData.data[0].arrival.actualTimeLocal
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} (${new Date(
                flightData.data[0].arrival.actualTimeLocal
              ).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })})`
            : `${new Date(
                flightData.data[0].arrival.scheduledTimeLocal
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} (${new Date(
                flightData.data[0].arrival.scheduledTimeLocal
              ).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })})`
        }\nArrival Terminal : ${
          flightData.data[0].arrival.terminal
            ? flightData.data[0].arrival.terminal
            : "N/A"
        }\nArrival Gate : ${
          flightData.data[0].arrival.gate
            ? flightData.data[0].arrival.gate
            : "N/A"
        }\nBaggage Belt : ${
          flightData.data[0].arrival.baggageBelt
            ? flightData.data[0].arrival.baggageBelt
            : "N/A"
        }`;

        // Construct the map link
        const mapLink = `Gate location : ${
          flightData.data[0].departure.gate
            ? `http://localhost:5173/map?gateAdd=${departureGateLoc.address}&lat=${departureGateLoc.latitude}&lon=${departureGateLoc.longitude}`
            : ""
        }`;

        // Construct the flight data to save it in the DB
        const flightDataDB = {
          airline: flightData.data[0].airline.name,
          flightNumber: flightData.data[0].number,
          status: flightData.data[0].status,
          departure: {
            airport: flightData.data[0].departure.airport.iata,
            scheduledTime: flightData.data[0].departure.scheduledTimeLocal,
            actualTime: `${
              flightData.data[0].departure.actualTimeLocal
                ? flightData.data[0].departure.actualTimeLocal
                : "N/A"
            }`,
            terminal: `${
              flightData.data[0].departure.terminal
                ? flightData.data[0].departure.terminal
                : "N/A"
            }`,
            gate: `${
              flightData.data[0].departure.gate
                ? flightData.data[0].departure.gate
                : "N/A"
            }`,
            checkinDesk: `${
              flightData.data[0].departure.checkInDesk
                ? flightData.data[0].departure.checkInDesk
                : "N/A"
            }`,
          },
          arrival: {
            airport: flightData.data[0].arrival.airport.iata,
            scheduledTime: flightData.data[0].arrival.scheduledTimeLocal,
            actualTime: `${
              flightData.data[0].arrival.actualTimeLocal
                ? flightData.data[0].arrival.actualTimeLocal
                : "N/A"
            }`,
            terminal: `${
              flightData.data[0].arrival.terminal
                ? flightData.data[0].arrival.terminal
                : "N/A"
            }`,
            gate: `${
              flightData.data[0].arrival.gate
                ? flightData.data[0].arrival.gate
                : "N/A"
            }`,
            baggageBelt: `${
              flightData.data[0].arrival.baggageBelt
                ? flightData.data[0].arrival.baggageBelt
                : "N/A"
            }`,
          },
        };

        // sending the data to the server
        let endpoint = "http://localhost:8000/notify";
        const response = await axios.post(endpoint, {
          message: message,
          mapLink: mapLink,
          mobile: user.user.mobile,
          email: user.user.email,
          flightNumber: flightData.data[0].number,
          flightData: flightDataDB,
        });

        // Handle the response
        if (response.data.success === true) {
          console.log("Notification sent successfully:", response.data);
          toast.success("Notification sent successfully");
        } else if (response.data.success === "exist") {
          console.log(
            "Notofication is already in process for flight ",
            response.data.flight
          );
          toast.warn(
            "Notification is already in process for flight " +
              response.data.flight
          );
        } else {
          toast.error("Error in sending notification");
        }
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    } else {
      toast.warn("Kindly Register/login to notify you");
    }
  };

  return (
    <div>
      {/* flight status */}
      <div className="py-10 ">
        {status === "success" ? (
          <div className="border-solid border-2 border-gray-500 rounded-md p-2">
            {/* Flight status content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center p-5 drop-shadow-2xl rounded-md">
              <div className="rounded-md p-3">
                <h1 className="text-xl font-bold">
                  {flightData.data[0].number}
                </h1>
                <p className="text-xs">{flightData.data[0].airline.name}</p>
              </div>
              <div className="rounded-md p-3">
                <h1 className="text-xl font-bold">
                  {`${flightData.data[0].departure.airport.municipalityName} (${flightData.data[0].departure.airport.iata}) - ${flightData.data[0].arrival.airport.municipalityName} (${flightData.data[0].arrival.airport.iata})`}
                </h1>
              </div>
              <div className="rounded-md p-3">
                <h1 className="text-xl font-bold text-green-500">
                  {flightData.data[0].status}
                </h1>
                <p className="text-xs">Status</p>
              </div>
            </div>

            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
              {/* Departure */}
              <div>
                <div className="text-center pb-4 ">
                  <h2 className="text-2xl font-bold text-yellow-400">
                    Departure
                  </h2>{" "}
                  <button
                    onClick={handleDepAirportinfo}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    title="Click to view the departure airport information"
                  >
                    <p className="text-m text-gray-400">
                      {flightData.data
                        ? flightData.data[0].departure.airport.name
                        : "XXXX"}{" "}
                    </p>
                  </button>
                  <div>
                    <button
                      onClick={handleDepAirportMap}
                      className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
                      title="Click to view the departure airport map"
                    >
                      <p>view airport map</p>
                    </button>
                  </div>
                  <p className="text-m font-bold text-black mt-2">
                    {new Date(
                      flightData.data[0].departure.scheduledTimeLocal
                    ).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="">
                    <div
                      className=" bg-white text-center p-5 drop-shadow-2xl"
                      style={{ width: "11rem" }}
                    >
                      <p className="text-xs">Scheduled</p>
                      <h1 className="text-xl font-bold">
                        {new Date(
                          flightData.data[0].departure.scheduledTimeLocal
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </h1>
                    </div>
                    <div
                      className=" bg-white text-center p-5 drop-shadow-2xl"
                      style={{ width: "11rem" }}
                    >
                      <p className="text-xs">Terminal</p>
                      <h1 className="text-xl font-bold">
                        {flightData.data[0].departure.terminal
                          ? flightData.data[0].departure.terminal
                          : "N/A"}
                      </h1>
                    </div>
                  </div>
                  <div className="">
                    <div
                      className=" bg-white text-center p-5 drop-shadow-2xl"
                      style={{ width: "11rem" }}
                    >
                      <p className="text-xs">Actual</p>
                      <h1 className="text-xl font-bold">
                        {" "}
                        {flightData.data[0].departure.actualTimeLocal
                          ? new Date(
                              flightData.data[0].departure.actualTimeLocal
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "---"}
                      </h1>
                    </div>
                    <div
                      className=" bg-white text-center p-5 drop-shadow-2xl"
                      style={{ width: "11rem" }}
                    >
                      <p className="text-xs">
                        Gate-{" "}
                        <button
                          className="text-blue-400"
                          onClick={() => setShowDepartureMap(true)}
                          title="Click to view the flight gate location"
                        >
                          view map
                        </button>{" "}
                      </p>
                      <h1 className="text-xl font-bold">
                        {flightData.data[0].departure.gate
                          ? flightData.data[0].departure.gate
                          : "N/A"}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="text-center pb-4 mt-3">
                  <span className="text-sm">Check-in Desk</span>{" "}
                  <h1 className="text-xl font-bold">
                    {flightData.data[0].departure.checkInDesk
                      ? flightData.data[0].departure.checkInDesk
                      : "N/A"}
                  </h1>
                </div>
              </div>

              {/* Arrival */}
              <div>
                <div className="text-center pb-4 ">
                  <h2 className="text-2xl font-bold text-yellow-400">
                    Arrival
                  </h2>
                  <button
                    onClick={handleArrAirportinfo}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    title="Click to view the arrival airport information"
                  >
                    <p className="text-m text-gray-400">
                      {flightData.data
                        ? flightData.data[0].arrival.airport.name
                        : "XXXX"}
                    </p>
                  </button>
                  <div>
                    <button
                      onClick={handleArrAirportMap}
                      className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
                      title="Click to view the arrival airport map"
                    >
                      <p>view airport map</p>
                    </button>
                  </div>
                  {""}
                  <p className="text-m font-bold text-black mt-2">
                    {new Date(
                      flightData.data[0].arrival.scheduledTimeLocal
                    ).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="">
                    <div
                      className=" bg-white text-center p-5 drop-shadow-2xl"
                      style={{ width: "11rem" }}
                    >
                      <p className="text-xs">Scheduled</p>
                      <h1 className="text-xl font-bold">
                        {" "}
                        {new Date(
                          flightData.data[0].arrival.scheduledTimeLocal
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </h1>
                    </div>
                    <div
                      className=" bg-white text-center p-5 drop-shadow-2xl"
                      style={{ width: "11rem" }}
                    >
                      <p className="text-xs">Terminal</p>
                      <h1 className="text-xl font-bold">
                        {flightData.data[0].arrival.terminal
                          ? flightData.data[0].arrival.terminal
                          : "N/A"}
                      </h1>
                    </div>
                  </div>
                  <div className="">
                    <div
                      className=" bg-white text-center p-5 drop-shadow-2xl"
                      style={{ width: "11rem" }}
                    >
                      <p className="text-xs">Actual</p>
                      <h1 className="text-xl font-bold">
                        {flightData.data[0].arrival.actualTimeLocal
                          ? new Date(
                              flightData.data[0].arrival.actualTimeLocal
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "---"}
                      </h1>
                    </div>
                    <div
                      className=" bg-white text-center p-5 drop-shadow-2xl"
                      style={{ width: "11rem" }}
                    >
                      <p className="text-xs">Gate</p>
                      <h1 className="text-xl font-bold">
                        {flightData.data[0].arrival.gate
                          ? flightData.data[0].arrival.gate
                          : "N/A"}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="text-center pb-4 mt-3">
                  <span className="text-sm">Baggage Belt</span>{" "}
                  <h1 className="text-xl font-bold">
                    {flightData.data[0].arrival.baggageBelt
                      ? flightData.data[0].arrival.baggageBelt
                      : "N/A"}
                  </h1>
                </div>
              </div>
            </div>
            <div className="text-center pb-5 mt-5">
              <button
                className="px-5 py-2 bg-yellow-400 rounded-md"
                onClick={() => handleSendMessage()}
                title="Click to get notifications about this flight"
              >
                <HiOutlineBellAlert className="mr-2 inline" />
                <span>Notify me</span>
              </button>
            </div>
          </div>
        ) : status === "Invalid" ? (
          // Display error component if the status is invalid
          <Error />
        ) : null}
      </div>

      {/*Departure Gate Map */}
      {showDepartureMap &&
        (flightData.data[0].departure.gate ? (
          <Map
            onClose={() => {
              setShowDepartureMap(false);
            }}
            visible={showDepartureMap}
            gateLatitude={departureGateLoc ? departureGateLoc.latitude : ""}
            gateLongitude={departureGateLoc ? departureGateLoc.longitude : ""}
            gateAddress={departureGateLoc ? departureGateLoc.address : ""}
          />
        ) : (
          // Display MapError component if departure gate doesn't exist
          <MapError
            onClose={() => {
              setShowDepartureMap(false);
            }}
            visible={showDepartureMap}
          />
        ))}
    </div>
  );
};

export default FlightStatus;
