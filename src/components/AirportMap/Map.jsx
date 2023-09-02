import React, { useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import user from "../../images/location.png";
import { ImSpoonKnife } from "react-icons/im";
import { HiShoppingBag } from "react-icons/hi2";
import { FaRestroom } from "react-icons/fa";
import { GrLounge } from "react-icons/gr";
import { MdOutlineLocalAtm } from "react-icons/md";
import { Map, InfoWindow, Marker } from "google-maps-react";
import Hotel from "../../images/cutlery.png";
import Shop from "../../images/shop.png";
import RestRoom from "../../images/restroom.jpg";
import Sofa from "../../images/sofa.png";
import Cash from "../../images/atm.png";

const MapContainer = ({ airportLat, airportLon }) => {
  // State for different types of places
  const [restaurants, setRestaurants] = useState([]);
  const [shoppingPlaces, setShoppingPlaces] = useState([]);
  const [restrooms, setRestrooms] = useState([]);
  const [lounges, setLounges] = useState([]);
  const [atm, setATM] = useState([]);

  // State for InfoWindow and active marker
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);

  // State for showing different types of places
  const [showRestaurants, setShowRestaurants] = useState(true);
  const [showShoppingPlaces, setShowShoppingPlaces] = useState(false);
  const [showRestrooms, setShowRestrooms] = useState(false);
  const [showLounges, setShowLounges] = useState(false);
  const [showATM, setShowATM] = useState(false);

  // State for user's geolocation
  const [userPosition, setUserPosition] = useState(null);

  // Fetch places data when airportLat and airportLon change
  useEffect(() => {
    if (airportLat && airportLon) {
      // Fetch places near the airport using the Places API
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      // Set up requests for different types of places
      const requests = [
        {
          name: "restaurants",
          types: ["restaurant", "Bar", "cafe", "food court", "drink"],
        },
        {
          name: "shopping places",
          types: ["shopping"],
        },
        {
          name: "restrooms",
          types: ["Toilets"],
        },
        {
          name: "lounge",
          types: ["lounge"],
        },
        {
          name: "atm",
          types: ["atm"],
        },
      ];

      // Fetch data for each type of place
      requests.forEach((request) => {
        const placeRequest = {
          location: new window.google.maps.LatLng(airportLat, airportLon),
          radius: 1000,
        };

        if (request.name === "lounge") {
          // Use keyword for lounge
          placeRequest.keyword = request.types;
        } else if (request.name === "restaurants") {
          // Use types as keywords for restaurants
          placeRequest.keyword = request.types.join(", "); // Convert types array to a comma-separated string
        } else {
          // Use type for other places
          placeRequest.type = request.types;
        }

        service.nearbySearch(placeRequest, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            switch (request.name) {
              case "restaurants":
                setRestaurants(results);
                break;
              case "shopping places":
                setShoppingPlaces(results);
                break;
              case "restrooms":
                setRestrooms(results);
                break;
              case "lounge":
                setLounges(results);
                break;
              case "atm":
                setATM(results);
                break;
              default:
                break;
            }
          }
        });
      });
    }
  }, [airportLat, airportLon]);

  // Handle marker click to show info window
  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };

  // Handle info window close
  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setShowInfoWindow(false);
  };

  // Handler for the Restaurants button click
  const onRestaurantsClick = () => {
    setShowRestaurants(true);
    setShowShoppingPlaces(false);
    setShowRestrooms(false);
    setShowLounges(false);
    setShowATM(false);
    setShowInfoWindow(false);
  };

  // Handler for the ShoppingBag button click
  const onShoppingBagClick = () => {
    setShowRestaurants(false);
    setShowShoppingPlaces(true);
    setShowRestrooms(false);
    setShowLounges(false);
    setShowATM(false);
    setShowInfoWindow(false);
  };

  // Handler for the Restroom button click
  const onRestroomClick = () => {
    setShowRestaurants(false);
    setShowShoppingPlaces(false);
    setShowRestrooms(true);
    setShowLounges(false);
    setShowATM(false);
    setShowInfoWindow(false);
  };

  // Handler for the Lounge button click
  const onLoungeClick = () => {
    setShowRestaurants(false);
    setShowShoppingPlaces(false);
    setShowRestrooms(false);
    setShowLounges(true);
    setShowATM(false);
    setShowInfoWindow(false);
  };

  // Handler for the Transport button click
  const onAtmClick = () => {
    setShowRestaurants(false);
    setShowShoppingPlaces(false);
    setShowRestrooms(false);
    setShowLounges(false);
    setShowATM(true);
    setShowInfoWindow(false);
  };

  const handleButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          setUserPosition({ lat: userLat, lng: userLon });
        },
        (error) => {
          console.error("Error getting user's location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <div className="absolute  z-10" style={{ top: "260px" }}>
        <div className="flex flex-col">
          <button
            className="w-12 bg-blue-500 text-white py-2 px-4 rounded ml-2"
            onClick={handleButtonClick}
            title="Find user location"
          >
            <span>
              <BiCurrentLocation />
            </span>
          </button>
          <a
            href="#"
            className={`${
              showRestaurants
                ? "rounded-full shadow-lg bg-yellow-300  shadow-yellow-50 m-2 p-4 "
                : "rounded-full shadow-lg bg-gray-100  shadow-gray-400 m-2 p-4 "
            }cursor-pointer hover:scale-110 ease-in duration-300`}
            onClick={onRestaurantsClick}
            title="Restaurants"
          >
            <ImSpoonKnife size={30} />
          </a>
          <a
            href="#"
            className={`${
              showShoppingPlaces
                ? "rounded-full shadow-lg bg-yellow-300  shadow-yellow-50 m-2 p-4 "
                : "rounded-full shadow-lg bg-gray-100  shadow-gray-400 m-2 p-4 "
            }cursor-pointer hover:scale-110 ease-in duration-300`}
            onClick={onShoppingBagClick}
            title="Shopping"
          >
            <HiShoppingBag size={30} />
          </a>
          <a
            href="#"
            className={`${
              showRestrooms
                ? "rounded-full shadow-lg bg-yellow-300  shadow-yellow-50 m-2 p-4 "
                : "rounded-full shadow-lg bg-gray-100  shadow-gray-400 m-2 p-4 "
            }cursor-pointer hover:scale-110 ease-in duration-300`}
            onClick={onRestroomClick}
            title="Restrooms"
          >
            <FaRestroom size={30} />
          </a>
          <a
            href="#"
            className={`${
              showLounges
                ? "rounded-full shadow-lg bg-yellow-300  shadow-yellow-50 m-2 p-4 "
                : "rounded-full shadow-lg bg-gray-100  shadow-gray-400 m-2 p-4 "
            }cursor-pointer hover:scale-110 ease-in duration-300`}
            onClick={onLoungeClick}
            title="Lounge"
          >
            <GrLounge size={30} />
          </a>
          <a
            href="#"
            className={`${
              showATM
                ? "rounded-full shadow-lg bg-yellow-300  shadow-yellow-50 m-2 p-4 "
                : "rounded-full shadow-lg bg-gray-100  shadow-gray-400 m-2 p-4 "
            }cursor-pointer hover:scale-110 ease-in duration-300`}
            onClick={onAtmClick}
            title="ATM"
          >
            <MdOutlineLocalAtm size={30} />
          </a>
        </div>
      </div>
      <div id="map" style={{ height: "500px", width: "100%" }}>
        {/* Render map and markers */}
        <Map
          google={window.google}
          initialCenter={{ lat: airportLat, lng: airportLon }}
          center={userPosition || { lat: airportLat, lng: airportLon }}
          zoom={15}
        >
          {userPosition && ( // Render the user marker if userPosition is available
            <Marker
              position={userPosition}
              icon={{
                url: user,
                anchor: new window.google.maps.Point(16, 32),
                scaledSize: new window.google.maps.Size(48, 48),
              }}
              animation={window.google.maps.Animation.BOUNCE}
            />
          )}
          {showRestaurants &&
            restaurants.map((restaurant) => (
              <Marker
                key={restaurant.place_id}
                name={restaurant.name}
                position={{
                  lat: restaurant.geometry.location.lat(),
                  lng: restaurant.geometry.location.lng(),
                }}
                icon={{
                  url: Hotel,
                  anchor: new window.google.maps.Point(16, 32),
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
                onClick={onMarkerClick}
              />
            ))}
          {showShoppingPlaces &&
            shoppingPlaces.map((shoppingPlace) => (
              <Marker
                key={shoppingPlace.place_id}
                name={shoppingPlace.name}
                position={{
                  lat: shoppingPlace.geometry.location.lat(),
                  lng: shoppingPlace.geometry.location.lng(),
                }}
                icon={{
                  url: Shop,
                  anchor: new window.google.maps.Point(16, 32),
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
                onClick={onMarkerClick}
              />
            ))}
          {showRestrooms &&
            restrooms.map((restroom) => (
              <Marker
                key={restroom.place_id}
                name={restroom.name}
                position={{
                  lat: restroom.geometry.location.lat(),
                  lng: restroom.geometry.location.lng(),
                }}
                icon={{
                  url: RestRoom,
                  anchor: new window.google.maps.Point(16, 32),
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
              />
            ))}
          {showLounges &&
            lounges.map((lounge) => (
              <Marker
                key={lounge.place_id}
                name={lounge.name}
                position={{
                  lat: lounge.geometry.location.lat(),
                  lng: lounge.geometry.location.lng(),
                }}
                icon={{
                  url: Sofa,
                  anchor: new window.google.maps.Point(16, 32),
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
                onClick={onMarkerClick}
              />
            ))}
          {showATM &&
            atm.map((atms) => (
              <Marker
                key={atms.place_id}
                name={atms.name}
                position={{
                  lat: atms.geometry.location.lat(),
                  lng: atms.geometry.location.lng(),
                }}
                icon={{
                  url: Cash,
                  anchor: new window.google.maps.Point(16, 32),
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
                onClick={onMarkerClick}
              />
            ))}
          <InfoWindow
            marker={activeMarker}
            visible={showInfoWindow}
            onClose={onInfoWindowClose}
          >
            <div>
              <h3>{activeMarker && activeMarker.name}</h3>
            </div>
          </InfoWindow>
        </Map>
      </div>
    </>
  );
};

export default MapContainer;
