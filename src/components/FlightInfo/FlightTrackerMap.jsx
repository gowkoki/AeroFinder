import React, { useEffect, useState } from "react";
import Flight from "../../images/fflight.png";

const FlightTrackerMap = (props) => {
  const {
    depAirportlat,
    depAirportlon,
    arrAirportlat,
    arrAirportlon,
    flightlat,
    flightlon,
    position,
  } = props;

  const FlightImage = new Image();
  FlightImage.src = Flight;
  let customIcon;

  function createCustomMarkerIcon(image, rotation) {
    // Create an HTML5 Canvas element
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set the canvas size
    canvas.width = 60;
    canvas.height = 60;

    // Translate and rotate the canvas context to apply rotation
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate((rotation * Math.PI) / 180);

    // Draw the image onto the canvas
    context.drawImage(
      image,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    // Convert the canvas to a data URL (base64 encoded image)
    const dataUrl = canvas.toDataURL("image/png");

    // Create a custom marker icon object
    return {
      url: dataUrl,
      scaledSize: new window.google.maps.Size(60, 60),
    };
  }

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: parseFloat(flightlat),
        lng: parseFloat(flightlon),
      },
      zoom: 5,
      mapTypeId: "hybrid",
    });

    // Create a marker for the departure airport
    const departureMarker = new window.google.maps.Marker({
      position: {
        lat: parseFloat(depAirportlat),
        lng: parseFloat(depAirportlon),
      },
      map: map,
      title: "Departure Airport",
    });

    // Create a marker for the arrival airport
    const arrivalMarker = new window.google.maps.Marker({
      position: {
        lat: parseFloat(arrAirportlat),
        lng: parseFloat(arrAirportlon),
      },
      map: map,
      title: "Arrival Airport",
    });

    const flightMarker = new window.google.maps.Marker({
      position: { lat: parseFloat(flightlat), lng: parseFloat(flightlon) },
      map: map,
      title: "Flight Location",
    });

    FlightImage.onload = () => {
      // Create the custom marker icon based on the imported Flight image and rotation
      customIcon = createCustomMarkerIcon(FlightImage, position);
      // Set the custom icon for the flight marker
      flightMarker.setIcon(customIcon);
    };
  }, [flightlat, flightlon, position]);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default FlightTrackerMap;
