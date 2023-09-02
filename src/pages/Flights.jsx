import React, { useState } from "react";
import ByRoute from "../components/Flights/ByRoute";
import ByNumber from "../components/Flights/ByNumber";

const Flights = () => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <div className="w-11/12 md:w-4/5 m-auto">
      <div className="py-10 ">
        <div className=" p-2">
          <h1 className=" text-3xl text-center font-bold text-black">
            Find Flight Status
          </h1>
        </div>
        <div className="mt-5">
          <div className="flex flex-wrap">
            <div className="w-full">
              {/* Tab Navigation */}
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
              >
                {/* "Search by Route" Tab */}
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 1
                        ? "text-black bg-yellow-400"
                        : "text-black bg-gray-300")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Search by Route
                  </a>
                </li>

                {/* "Search by Flight Number" Tab */}
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 2
                        ? "text-black bg-yellow-400"
                        : "text-black bg-gray-300")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Search by Flight Number
                  </a>
                </li>
              </ul>

              {/* Tab Content */}
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div
                      className={openTab === 1 ? "block" : "hidden"}
                      id="link1"
                    >
                      <ByRoute />
                    </div>
                    <div
                      className={openTab === 2 ? "block" : "hidden"}
                      id="link2"
                    >
                      <ByNumber />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
