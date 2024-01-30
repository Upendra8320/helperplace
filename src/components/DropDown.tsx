import React, { useState } from "react";
import { useAppSelector } from "../app/hooks";

const DropDown = ({ name,handleSelectAllFunction,handleFunction,selectAllValue,paramsValueArray,mapData, dataName, dataId }) => {
  const [isOpen, setIsOpen] = useState(false);
   //fetching masterdata
   const { data: masterdata }: any =
   useAppSelector((state) => state.masterData);


  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  return (
    <div id="location">
      <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green]">
        {name}
      </h2>
      <div className="relative inline-block text-left w-full mt-2">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            id="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={toggleDropdown}
          >
            {name}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[10] h-[500px] overflow-y-scroll no-scrollbar">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown"
            >
              <ul className="space-y-1">
                <li className="flex pl-4">
                  <input
                    type="checkbox"
                    aria-label="multiselect-select-all"
                    checked={selectAllValue}
                    onChange={handleSelectAllFunction}
                  />
                  <div className="px-4 py-2">Select All</div>
                </li>
                <li className="flex pl-4">
                  <input
                    type="text"
                    aria-label="multiselect-search"
                    placeholder="Search"
                    className="px-4 py-2"
                  />
                </li>
                {mapData?.map((items: any) => (
                  <li className="flex pl-4" key={items[dataId]}>
                    {/* console.log(items[dataName]) */}
                    <input
                      type="checkbox"
                      aria-label="multiselect-item"
                      id={`location-${items.dataId}`}
                      checked={paramsValueArray?.includes(items[dataName])}
                      // checked={locationValue == items.location_name}
                      onChange={() => {
                        handleFunction(items[dataName]);
                      }}
                    />
                    <div className="px-4 py-2">{items[dataName]}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
