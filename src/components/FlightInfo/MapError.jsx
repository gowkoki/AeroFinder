import React from "react";

const MapError = (props) => {
  const { onClose, visible } = props;
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-2 rounded" style={{ width: "80%" }}>
        <div style={{ height: "500px", width: "100%" }}>
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-400 font-bold text-3xl">
              Sorry, unable to find the gate location
            </p>
          </div>
        </div>

        <button
          className="absolute top-0 left-0 m-2 w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default MapError;
