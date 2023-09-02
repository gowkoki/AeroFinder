import React from "react";

const WeatherTab = ({ weatherData }) => {
  console.log(weatherData);
  return (
    <div>
      {weatherData && (
        <div className=" rounded-md bg-blue-100 w-11/12 m-auto flex flex-col md:flex-row justify-between items-center md:space-x-10 space-y-10 md:space-y-0 py-10">
          {/* Left section - Weather details */}
          <div className="w-11/12 md:w-1/2 space-y-5 text-center">
            <h4 className="text-2xl">{weatherData.data.weather[0].main}</h4>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.data.weather[0].icon}.png`}
              alt=""
              className="w-[150px] inline-grid"
            />
            <h2 className="text-5xl font-bold mb-2">
              {Math.round(weatherData.data.main.temp - 273.15)}&deg;C
            </h2>
            <p className="text-sm">
              Feels like :{" "}
              {Math.round(weatherData.data.main.feels_like - 273.15)}&deg;C
            </p>
            <p className="text-sm">
              Min{" "}
              <b>{Math.round(weatherData.data.main.temp_min - 273.15)}&deg;C</b>{" "}
              /{" "}
              <b>{Math.round(weatherData.data.main.temp_max - 273.15)}&deg;C</b>{" "}
              Max
            </p>
          </div>

          {/* Right section - Additional weather details */}
          <div className="w-11/12 md:w-1/2 space-y-5">
            <p>
              <span className="text-xl font-bold text-gray-700">Wind : </span>
              <span className="text-xl text-gray-500">
                {Math.round(weatherData.data.wind.speed)} mi/h
              </span>
            </p>
            <p>
              <span className="text-xl font-bold text-gray-700">
                Humidity :{" "}
              </span>
              <span className="text-xl text-gray-500">
                {weatherData.data.main.humidity}%
              </span>
            </p>
            <p>
              <span className="text-xl font-bold text-gray-700">
                Visibility :{" "}
              </span>
              <span className="text-xl text-gray-500">
                {Math.round(weatherData.data.visibility * 0.000621371)} miles
              </span>
            </p>

            <p>
              <span className="text-xl font-bold text-gray-700">
                Air pressure :{" "}
              </span>
              <span className="text-xl text-gray-500">
                {weatherData.data.main.pressure} hPa
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherTab;
