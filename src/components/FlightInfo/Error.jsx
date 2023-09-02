import React from "react";

const Error = () => {
  return (
    <div className="mt-8 border-solid border-2 border-gray-500 rounded-md p-2 h-64 bg-whitesmoke text-4xl">
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500 font-bold">Sorry, Flight data not found.</p>
      </div>
    </div>
  );
};

export default Error;
