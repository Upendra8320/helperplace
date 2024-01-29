import React, { useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { setCurrentPage } from "../features/candidate/candidateDataSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Filter = React.memo(() => {
  const dispatch = useAppDispatch();
  //drop location down state
  const [isOpen, setIsOpen] = useState(false);

  //fetching master data
  const { data: masterdata }: any = useAppSelector((state) => state.masterData);

  // const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // console.log('selectedSkills: ', selectedSkills);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDate = searchParams.get("start_date");
  const ResumeByValue = searchParams.get("resume_manager");
  const gender = searchParams.get("gender");
  const helperName = searchParams.get("helper_name");
  const jobPosition = searchParams.get("job_position")?.split("-").join(" ");
  const jobType = searchParams.get("job_type")?.split("-").join(" ");
  const minimumExperience = searchParams.get("experience_range");
  const exp_range = minimumExperience ? minimumExperience.split("-") : [0, 40];
  const minimumAge = searchParams.get("age_range");
  const age_range = minimumAge ? minimumAge.split("-") : [18, 60];

  // handle jobposition filter
  const handleJobPositionChange = (jobPositionId: any) => {
    masterdata.job_position.map((items: any) => {
      if (items.job_position_id == jobPositionId) {
        const text = items.position_name;
        const newtext = text.split(" ").join("-");
        searchParams.set("job_position", newtext);
        searchParams.set("page", "1");
        setSearchParams(searchParams);
      }
    });
    dispatch(setCurrentPage(0)); // Reset to the first page
  };

  //handle startdate filter
  const selectDate = (event: any) => {
    const { value } = event.target;
    searchParams.set("start_date", value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    dispatch(setCurrentPage(0)); // Reset to the first page
  };

  //handle jobType
  const handleJobType = (jobTypeId: any) => {
    masterdata.job_type.map((items: any) => {
      if (items.job_type_id == jobTypeId) {
        const text = items.job_type_name;
        const newtext = text.split(" ").join("-");
        searchParams.set("job_type", newtext);
        searchParams.set("page", "1");
        setSearchParams(searchParams);
      }
    });
    dispatch(setCurrentPage(0)); // Reset to the first page
  };

  //handle resumeby function
  const Resumebyfunction = (resumeby: any) => {
    searchParams.set("resume_manager", resumeby);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    dispatch(setCurrentPage(0)); // Reset to the first page
  };

  //handle gender function
  const genderFunction = (gender: any) => {
    searchParams.set("gender", gender);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    dispatch(setCurrentPage(0)); // Reset to the first page
  };

  //function for search box
  const handleNameSearch = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const text = e.target.value.trim();
      if (text !== "") {
        const newtext = text.split(" ").join("_").trim();
        searchParams.set("helper_name", newtext);
        searchParams.set("page", "1");
        setSearchParams(searchParams);
      }
    }
  };

  // const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const skill = event.target.value;

  //   // Update selected skills
  //   if (event.target.checked) {
  //     setSelectedSkills((prevSkills) => [...prevSkills, skill]);
  //   } else {
  //     setSelectedSkills((prevSkills) =>
  //       prevSkills.filter((prevSkill) => prevSkill !== skill)
  //     );
  //   }
  // };

  //function for reset button
  const handleReset = () => {};

  //function for experience range selection
  const handleExpRangeChange = (newRange: any) => {
    searchParams.set("experience_range", `${newRange[0]}-${newRange[1]}`);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  //function for age range selection
  const handleAgeRangeChange = (newRange: any) => {
    searchParams.set("age_range", `${newRange[0]}-${newRange[1]}`);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  // const handleAgeRangeComplete = (newRange: any) => {
  //   searchParams.set("age_range", `${newRange[0]}-${newRange[1]}`);
  //   searchParams.set("page", "1");
  //   setSearchParams(searchParams);
  // };


  const [locationValues, setLocationValues] = useState<string[]>([]); // State to store selected locations
  const [selectAll, setSelectAll] = useState(false); // State to track if "Select All" is checked

  const location = searchParams.get("location");
  const locationArray = location?.split(",");
  const locationLen = locationArray?.length;


  // handle location selection
  const handleLocation = (location: string) => {
    const index = locationValues.indexOf(location);
    if (index === -1) {
      // Location is not selected, add it to the list
      const newLocationValues = [...locationValues, location];
      setLocationValues(newLocationValues);

      // Join the array with commas
      const locationsParam = newLocationValues.join(",");
      const sanitizedLocationsParam = locationsParam.replace(/%2C/g, ',');

      searchParams.set("location", sanitizedLocationsParam);
      setSearchParams(searchParams);
    } else {
      // Location is selected, remove it from the list
      const newLocationValues = locationValues.filter(
        (item) => item !== location
      );
      setLocationValues(newLocationValues);
      // Join the array with commas
    const locationsParam = newLocationValues.join(',');
    const sanitizedLocationsParam = locationsParam.replace(/%2C/g, ',');

    // Update the URL parameter for location
    searchParams.set("location", sanitizedLocationsParam);
    searchParams.set("page",1)
    setSearchParams(searchParams);
    }
  };

  // handle "Select All" checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // If "Select All" is checked, select all locations
      const newLocationValues = masterdata?.candidate_country?.map((item: any) => item.country_name)
      setLocationValues(newLocationValues);
      const locationsParam = newLocationValues.join(",");
      const sanitizedLocationsParam = locationsParam.replace(/%2C/g, ',');
      searchParams.set("location", sanitizedLocationsParam);
      searchParams.set("page",1)
      setSearchParams(searchParams);
    } else {
      // If "Select All" is unchecked, clear all selected locations
      setLocationValues([]);
      // const locationsParam = newLocationValues.join("");
      searchParams.delete("location");
      setSearchParams(searchParams);
    }
  };

  //handle dropdown menu of location
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  //object array for resumeby details
  const Resumeby = [
    {
      id: 1,
      name: "Direct",
    },
    {
      id: 2,
      name: "Agency",
    },
  ];

  //object array of gender data
  const Gender = [
    {
      id: 1,
      name: "Male",
    },
    {
      id: 2,
      name: "Female",
    },
  ];

  return (
    <div className="border-2 border-black bg-[#aaa8a80e] px-4 rounded-lg mr-4">
      <div className="pl-4 mt-4 text-blue-800 font-normal text-[24px]">
        I'm Looking For
      </div>
      <form action="">
        <div className="flex justify-between items-center mt-4 text-[18px]">
          <div className="text-blue-900">Filter</div>
          <div className="flex justify-center items-center">
            {" "}
            <div className="mr-1 text-[green]">
              <GrPowerReset />
            </div>
            <button className="text-[green]" type="reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
        <div id="jobPosition">
          <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green]">
            Job Position
          </h2>
          { masterdata?.job_position?.map((items: any) => {
              return (
                <div key={items.job_position_id} className="mt-1">
                  <input
                    className="mr-2"
                    id={`jobPos-${items.job_position_id}`}
                    type="radio"
                    name="jobPos"
                    checked={jobPosition === items.position_name}
                    onChange={() =>
                      handleJobPositionChange(items.job_position_id)
                    }
                  />

                  <label htmlFor={`jobPos-${items.job_position_id}`}>
                    {items.position_name}
                  </label>
                </div>
              );
            })}
        </div>

        {/* startDate */}
        <div className="my-2">
          <div className="mb-1 text-blue-900 text-[18px]">Start Date</div>
          <div className="w-full">
            <input
              className="border-[2px] w-full py-1 px-3 rounded-md"
              value={selectedDate ? selectedDate : ""}
              type="date"
              onChange={(event) => selectDate(event)}
            />
          </div>
        </div>
        {/* candidate location */}
        <div id="location">
          <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green]">
            Candidate Location
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
                Candidate Location
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
              <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[10]">
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
                        checked={selectAll}
                        onChange={handleSelectAll}
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
                    {
                      masterdata?.candidate_country?.map((items: any) => (
                        <li className="flex pl-4" key={items.country_id}>
                          <input
                            type="checkbox"
                            aria-label="multiselect-item"
                            id={`location-${items.country_id}`}
                            checked={locationArray?.includes(
                              items.country_name
                            )}
                            // checked={locationValue == items.location_name}
                            onChange={() => {
                              handleLocation(items.country_name);
                            }}
                          />
                          <div className="px-4 py-2">{items.country_name}</div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Job type */}
        <div>
          <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green]">
            Job Type
          </h2>
          {masterdata.job_type &&
            masterdata.job_type.map((items: any) => {
              return (
                <div key={items.job_type_id} className="mt-1">
                  <input
                    className="mr-2"
                    id={`jobType-${items.job_type_id}`}
                    type="radio"
                    name="jobType"
                    checked={jobType === items.job_type_name}
                    onChange={() => handleJobType(items.job_type_id)}
                  />

                  <label htmlFor={`jobType-${items.job_type_id}`}>
                    {items.job_type_name}
                  </label>
                </div>
              );
            })}
        </div>

        {/* resume data */}
        <div>
          <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green]">
            Resume by
          </h2>
          {Resumeby &&
            Resumeby.map((items: any) => {
              return (
                <div key={items.id} className="mt-1">
                  <input
                    className="mr-2"
                    id={`resumeby-${items.id}`}
                    type="radio"
                    name="resumeby"
                    checked={ResumeByValue === items.name}
                    onChange={() => Resumebyfunction(items.name)}
                  />

                  <label htmlFor={`resumeby-${items.id}`}>{items.name}</label>
                </div>
              );
            })}
        </div>

        {/* gender */}
        <div>
          <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green]">
            Gender
          </h2>
          {Gender &&
            Gender.map((items: any) => {
              return (
                <div key={items.id} className="mt-1">
                  <input
                    className="mr-2"
                    id={`gender-${items.id}`}
                    type="radio"
                    name="gender"
                    checked={gender === items.name}
                    onChange={() => genderFunction(items.name)}
                  />

                  <label htmlFor={`gender-${items.id}`}>{items.name}</label>
                </div>
              );
            })}
        </div>

        {/*experience range selector */}
        <div>
          <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green]">
            Working Experience
          </h2>
          {/* <label>Select a range:</label> */}
          <div className="flex items-center justify-between">
            <div className="text-[18px]">{exp_range[0]}</div>
            <div className="text-[18px]">{exp_range[1]}</div>
          </div>
          <Slider
            range
            min={0}
            max={40}
            value={exp_range}
            onChange={handleExpRangeChange}
          />
        </div>

        {/*age range selector */}
        <div>
          <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green]">
            Age
          </h2>
          {/* <label>Select a range:</label> */}
          <div className="flex items-center justify-between">
            <div className="text-[18px]">{age_range[0]}</div>
            <div className="text-[18px]">{age_range[1]}</div>
          </div>
          <Slider
            range
            min={18}
            max={60}
            value={age_range}
            onChange={handleAgeRangeChange}
            // onChangeComplete={handleAgeRangeComplete}
          />
        </div>

        {/* name search input box */}
        <div>
          <h2 className="mt-2 text-blue-900 font-normal text-[18px]">
            Helper Name
          </h2>
          <div className="py-1">
            <input
              className="border-[1px] mt-1 border-gray-400 p-1 placeholder:pl-1"
              type="text"
              name="helper_name"
              id="name"
              onChange={handleNameSearch}
              onKeyDown={handleNameSearch}
              placeholder="Seach with Helper Name"
            />
          </div>
        </div>
      </form>
    </div>
  );
});

export default Filter;

// <div   className="dropdown-list" hidden="">
// <ul    className="item1">
//     <li    className="multiselect-item-checkbox ng-star-inserted" style="border-bottom: 1px solid #ccc; padding: 10px;">
//         <input   type="checkbox" aria-label="multiselect-select-all">
//         <div  >Select All</div>
//     </li>
//     <!---->
//     <li    className="filter-textbox ng-star-inserted">
//         <input   type="text" aria-label="multiselect-search" placeholder="Search" value=""  className="ng-untouched ng-pristine ng-valid">
//     </li>
//     <!---->
// </ul>
// <ul    className="item2" style="max-height:197px;">
//     <li    className="multiselect-item-checkbox ng-star-inserted">
//         <input   type="checkbox" aria-label="multiselect-item">
//         <div  >Finished Contract</div>
//     </li>
//     <li    className="multiselect-item-checkbox ng-star-inserted">
//         <input   type="checkbox" aria-label="multiselect-item">
//         <div  >Terminated (Relocation / Financial)</div>
//     </li>
//     <li    className="multiselect-item-checkbox ng-star-inserted">
//         <input   type="checkbox" aria-label="multiselect-item">
//         <div  >Terminated (Other)</div>
//     </li>
//     <li    className="multiselect-item-checkbox ng-star-inserted">
//         <input   type="checkbox" aria-label="multiselect-item">
//         <div  >Break Contract</div>
//     </li>
//     <li    className="multiselect-item-checkbox ng-star-inserted">
//         <input   type="checkbox" aria-label="multiselect-item">
//         <div  >Transfer</div>
//     </li>
//     <li    className="multiselect-item-checkbox ng-star-inserted">
//         <input   type="checkbox" aria-label="multiselect-item">
//         <div  >Working in Home Country</div>
//     </li>
//     <li    className="multiselect-item-checkbox ng-star-inserted">
//         <input   type="checkbox" aria-label="multiselect-item">
//         <div  >Unemployed</div>
//     </li>
//     <li    className="multiselect-item-checkbox ng-star-inserted">
//         <input   type="checkbox" aria-label="multiselect-item">
//         <div  >Ex overseas</div>
//     </li>
//     <!---->
//     <!---->
// </ul>
// </div>
