import React, { useEffect } from "react";
import { render } from "react-dom";
import { BiCurrentLocation } from "react-icons/bi";
import user from "../images/location.png"; // Importing the user icon

function MapToNotify() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const gateLatitude = urlParams.get("lat");
    const gateLongitude = urlParams.get("lon");
    const gateAddress = urlParams.get("gateAdd");
    let userMarker;

    // Split the gateAddress based on the comma delimiter
    const gateAddressParts = gateAddress.split(",");
    const location = gateAddressParts[0].trim().split(" ")[0];
    // Get the first part (before the comma) as "Gate XXX"
    const gateLocation = gateAddressParts[0].trim();

    if (gateLatitude && gateLongitude) {
      // Create a new Google Maps instance
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: {
          lat: parseFloat(gateLatitude),
          lng: parseFloat(gateLongitude),
        },
        zoom: 20,
        indoorPicker: true,
      });

      // Add a marker to the gate location
      const gateMarker = new window.google.maps.Marker({
        position: {
          lat: parseFloat(gateLatitude),
          lng: parseFloat(gateLongitude),
        },
        map: map,
        clickable: true,
        visible: true,
        animation: window.google.maps.Animation.BOUNCE,
      });

      // Create a text field container to show the gate number
      const textFieldContainer = document.createElement("div");
      textFieldContainer.classList.add(
        "absolute",
        "top-10",
        "left-4",
        "mt-10",
        "z-10"
      );

      // Create the info element
      const infoElement = document.createElement("p");
      infoElement.classList.add("text-sm", "text-red-600", "mt-1", "mb-2");
      infoElement.textContent =
        "Terminal info is provided. Since Gate can't be found";
      textFieldContainer.appendChild(infoElement);

      // Check if the gateLocation is equal to the value of 'gate'
      if (location === "Gate") {
        infoElement.style.display = "none";
      }

      const textField = document.createElement("input");
      textField.value = gateLocation;
      textField.classList.add("bg-white", "rounded", "p-2", "w-20");
      textField.readOnly = true;
      textFieldContainer.appendChild(textField);

      // Render the icon component into a DOM node
      const iconNode = document.createElement("span");
      render(<BiCurrentLocation />, iconNode);

      // Create a button to find the current location
      const button = document.createElement("button");
      button.classList.add(
        "bg-blue-500",
        "text-white",
        "py-2",
        "px-4",
        "rounded",
        "ml-2"
      );
      button.appendChild(iconNode); // Add the icon component as a child to the button
      textFieldContainer.appendChild(button);

      // Create the walking distance element
      const distanceElement = document.createElement("p");
      distanceElement.classList.add("text-2xl", "text-black", "mt-1");
      textFieldContainer.appendChild(distanceElement);

      // Create the duration element
      const durationElement = document.createElement("p");
      durationElement.classList.add("text-2xl", "text-black", "mt-1");
      textFieldContainer.appendChild(durationElement);

      // Append the text field container to the map element
      document.getElementById("map").appendChild(textFieldContainer);

      // Add click event listener to the button
      button.addEventListener("click", handleButtonClick);

      // Function to handle button click event
      function handleButtonClick() {
        if (navigator.geolocation) {
          // Get the user's current location
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const userLocation = { lat: latitude, lng: longitude };

              const iconSize = new window.google.maps.Size(48, 48);

              // Check if the userMarker already exists
              if (userMarker) {
                // If it exists, update its position
                userMarker.setPosition(userLocation);
              } else {
                userMarker = new window.google.maps.Marker({
                  position: userLocation,
                  map: map,
                  icon: {
                    url: user,
                    scaledSize: iconSize,
                  },
                  animation: window.google.maps.Animation.BOUNCE,
                });
              }

              gateMarker.setOptions({ clickable: false, visible: true });

              // Set the map center to the current location
              map.setCenter(userLocation);
              map.setZoom(17);
              // Calculate the distance between user and gate locations
              const distance = calculateDistance(
                latitude,
                longitude,
                gateLatitude,
                gateLongitude
              );

              let distanceText;
              if (distance >= 1) {
                // Display distance in kilometers if greater than or equal to 1 km
                distanceText = `${distance.toFixed(2)} km`;
              } else {
                // Convert distance to meters and display if less than 1 km
                const distanceInMeters = distance * 1000; // Convert to meters
                distanceText = `${distanceInMeters.toFixed(0)} m`;
              }

              // Calculate the walking duration
              const walkingDuration = calculateWalkingDuration(distance);

              let walkingDurationText;
              if (walkingDuration >= 1) {
                // Display walking duration in hours if greater than or equal to 1 hour
                walkingDurationText = `${walkingDuration.toFixed(2)} hours`;
              } else {
                // Convert walking duration to minutes and display if less than 1 hour
                const walkingDurationInMinutes = walkingDuration * 60; // Convert to minutes
                walkingDurationText = `${walkingDurationInMinutes.toFixed(
                  0
                )} mins`;
              }

              distanceElement.textContent = `Distance: ${distanceText}`;
              durationElement.textContent = `Walking Duration: ${walkingDurationText}`;
            },
            (error) => {
              console.error("Error fetching user location:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }

      // Function to calculate the distance between two points using the Haversine formula
      function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance; // Distance in kilometers
      }

      // Function to convert degrees to radians
      function toRadians(degrees) {
        return (degrees * Math.PI) / 180;
      }

      // Function to calculate the walking duration based on walking speed
      function calculateWalkingDuration(distance) {
        const walkingSpeed = 5; // Walking speed in kilometers per hour
        const duration = distance / walkingSpeed;

        return duration; // Duration in hours
      }
    }
  }, []);

  return <div id="map" className="h-screen w-screen"></div>;
}

export default MapToNotify;
