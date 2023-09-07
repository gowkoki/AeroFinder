import React, { useState, useEffect } from "react";
import axios from "axios";

// A component for creating tabs with content
export function Tabs({ children, flightNumber, onFlightDataUpdate }) {
  const allDates = [].concat(...children); // Flatten the array of children
  // Calculate the middle index of the tabs for initial active tab
  const middleTabIndex = Math.floor(allDates.length / 2);
  // Get the label of the tab at the middle index
  const middleTabLabel = allDates[middleTabIndex].props.label;
  // State to store the active tab label
  const [activeTab, setActiveTab] = useState(middleTabLabel);

  // On component mount, set the initial active tab
  useEffect(() => {
    handleClick({ preventDefault: () => {} }, middleTabLabel);
  }, []);

  // Handle tab click event
  const handleClick = async (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);

    // Format the date to "YYYY-MM-DD" format
    const formattedDate = newActiveTab.split(" ").reverse().join("-");
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = parseInt(formattedDate.split("-")[1]);
    const formattedFullDate = `${year}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

    // Fetch the flight data based on selected tab
    try {
      let endpoint = `https://aerofinderapi.onrender.com/home?flightNumber=${flightNumber}&departDate=${formattedFullDate}`;
      const response = await axios.get(endpoint);
      onFlightDataUpdate(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full border-solid border-2 border-gray-100 rounded-md p-2">
      <div className="flex border-b border-gray-300">
        {allDates.map((child) => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label
                ? "border-b-2 border-yellow-400"
                : ""
            } flex-1 text-gray-700 font-medium py-2`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {/* Render tab content */}
        {allDates.map((child) => (
          <div
            key={child.props.label}
            className={activeTab === child.props.label ? "" : "hidden"}
          >
            {child.props.children}
          </div>
        ))}
      </div>
    </div>
  );
}

// A component for individual tabs
export function Tab({ label, children }) {
  return (
    <div label={label} className="hidden">
      {children}
    </div>
  );
}
