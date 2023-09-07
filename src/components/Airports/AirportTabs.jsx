import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab } from "./Tabs";
import DepartureTab from "./DepartureTab";
import ArrivalTab from "./ArrivalTab";
import WeatherTab from "./WeatherTab";

const AirportTabs = (props) => {
  const { airport, airportData } = props;

  const [departureData, setDepartureData] = useState([]);
  const [arrivalData, setArrivalData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  // Fetch data when the airport value changes
  useEffect(() => {
    fetchDepartureData();
  }, [airport]);

  const fetchDepartureData = async () => {
    try {
      // Endpoint URLs for departure/arrival and weather data
      let depArrEndpoint = `https://aerofinderapi.onrender.com/airport/departure/arrival?airport=${airport}`;
      let weatherEndpoint = `https://aerofinderapi.onrender.com/airport/weather?lat=${airportData.location.lat}&lon=${airportData.location.lon}`;

      // Fetch departure/arrival and weather data concurrently
      const [depArrResponse, weatherResponse] = await Promise.all([
        axios.get(depArrEndpoint),
        axios.get(weatherEndpoint),
      ]);

      // Extract departure and arrival flight data, as well as weather data
      const departureFlights = depArrResponse.data.departureFlights;
      const arrivalFlights = depArrResponse.data.arrivalFlights;
      const weather = weatherResponse.data;

      // Update the state with fetched data
      setWeatherData(weather);
      setDepartureData(departureFlights);
      setArrivalData(arrivalFlights);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-9 mb-9">
      {/* Tabs for displaying Departure, Arrival, and Weather information */}
      <Tabs>
        <Tab label="Departure">
          <div className="py-4">
            <DepartureTab departureData={departureData} />
          </div>
        </Tab>
        <Tab label="Arrival">
          <div className="py-4">
            <ArrivalTab arrivalData={arrivalData} />
          </div>
        </Tab>
        <Tab label="Weather">
          <div className="py-4">
            <WeatherTab weatherData={weatherData} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AirportTabs;
