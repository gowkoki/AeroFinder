import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlane } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const ArrivalTab = ({ arrivalData }) => {
  const navigate = useNavigate();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  // Handle clicking a flight to get more details
  const handleClick = async (flightNumber) => {
    try {
      let endpoint = `https://aerofinder-api.onrender.com/home?flightNumber=${flightNumber}`;
      const response = await axios.get(endpoint);

      if (response.data.status === "success") {
        navigate("/flightinfo", {
          state: {
            flightData: response.data,
            departureGateLoc: response.data.dpartLoc
              ? response.data.dpartLoc
              : "",
            status: response.data.status,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle changing the current page
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Pagination logic
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = arrivalData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className=" mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Table for displaying arrival data */}
      <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Flight
            </th>
            <th scope="col" className="px-6 py-3">
              Arrival Time
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              origin
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>

            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((flight) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <p>{flight.number}</p>
                <p className="text-xs">{flight.airline.name}</p>
              </th>
              <td className="px-6 py-4">
                {flight.arrival.actualTimeLocal
                  ? flight.arrival.actualTimeLocal.split(" ")[1].split("+")[0]
                  : flight.arrival.scheduledTimeLocal
                      .split(" ")[1]
                      .split("+")[0]}
              </td>
              <td className="px-6 py-4">
                <FaPlane size={30} className="transform rotate-180" />
              </td>
              <td className="px-6 py-4">
                <p>{flight.departure.airport.iata}</p>
                <p className="text-xs">{flight.departure.airport.name}</p>
              </td>
              <td className="px-6 py-4">{flight.status}</td>

              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => handleClick(flight.number)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={Math.ceil(arrivalData.length / itemsPerPage)}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          containerClassName={"flex justify-center mt-4 mb-8 "}
          previousLinkClassName={
            "block rounded bg-transparent text-neutral-500 transition-all duration-300 dark:text-neutral-400"
          }
          nextLinkClassName={
            "block rounded bg-transparent text-neutral-500 transition-all duration-300 dark:text-neutral-400"
          }
          activeClassName={"block rounded bg-yellow-100 font-medium "}
        />
      </div>
    </div>
  );
};

export default ArrivalTab;
