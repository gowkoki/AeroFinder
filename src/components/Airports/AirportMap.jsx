import React, { useEffect } from "react";

const AirportMap = ({ latitude, longitude }) => {
  useEffect(() => {
    // Create a new Google Map instance
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      },
      zoom: 12,
      indoorPicker: true,
    });
  }, [latitude, longitude]);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default AirportMap;
