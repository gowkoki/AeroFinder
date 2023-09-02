import React, { useState } from "react";

export function Tabs({ children }) {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  // Function to handle tab click
  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="w-full border-solid border-2 border-gray-100 rounded-md p-2">
      {/* Tab buttons */}
      <div className="flex border-b border-gray-300">
        {children.map((child) => (
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
        {children.map((child) => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null; // Hide content of inactive tabs
        })}
      </div>
    </div>
  );
}

export function Tab({ label, children }) {
  // Each Tab component has a label and its children as content
  return (
    <div label={label} className="hidden">
      {children}
    </div>
  );
}
