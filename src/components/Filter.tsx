import React, { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { setCurrentPage } from "../features/candidate/candidateDataSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useSearchParams } from "react-router-dom";
import { Resumeby } from "../constantData/constData";
import { Gender } from "../constantData/constData";
import RadioButton from "./RadioButton";
import SliderRc from "./SliderRc";
import DropSelect from "./DropSelect";


const Filter = React.memo(() => {
  const dispatch = useAppDispatch();

  //fetching master data
  const { data: masterdata }: any = useAppSelector((state) => state.masterData);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDate = searchParams.get("start_date");
  const ResumeByValue = searchParams?.get("resume_manager");
  const gender = searchParams.get("gender");
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
  const ResumebyFunction = (resumeby: any) => {
    Resumeby.map((items: any) => {
      if (items.id === resumeby) {
        searchParams.set("resume_manager", items.name);
        searchParams.set("page", "1"); // Reset to the first page
        setSearchParams(searchParams);
        dispatch(setCurrentPage(0));
      }
    });
  };

  //handle gender function
  const genderFunction = (gender: any) => {
    Gender.map((items: any) => {
      if (items.id === gender) {
        searchParams.set("gender", items.name);
        searchParams.set("page", "1");
        setSearchParams(searchParams);
        dispatch(setCurrentPage(0)); // Reset to the first page
      }
    });
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

  //function for experience range selection
  const handleExpRangeChange = (newRange: any) => {
    searchParams.set("experience_range", `${newRange[0]}-${newRange[1]}`);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  // function for age range selection
  const handleAgeRangeChange = (newRange: any) => {
    searchParams.set("age_range", `${newRange[0]}-${newRange[1]}`);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const [locationValues, setLocationValues] = useState<string[]>([]); // State to store selected locations
  const [contractValues, setContractValues] = useState<string[]>([]); // State to store selected locations


  //fetching from seachParams for location
  const location = searchParams?.get("location");
  const locationArray = location ? location.split(",") : [];
  //fetching from seachParams for contract status
  const contractParams = searchParams?.get("contract_status")
  const contractArray = contractParams ? contractParams.split(",") : [];


  useEffect(() => {
    // Only update locationValues on component mount
    if (locationValues.length === 0) {
      setLocationValues(locationArray);
    }
    if(contractValues.length ===0){
      setContractValues(contractArray)
    }
  }, []);

  useEffect(() => {
    if(contractValues.length === 0){
      searchParams.delete("contract_status")
    }else{
      const contractParam = contractValues.join(",");
      searchParams.set("contract_status", contractParam);
      searchParams.set("page", "1");
    }

    if (locationValues.length === 0) {
      searchParams.delete("location");
    } else {
      const locationsParam = locationValues.join(",");
      searchParams.set("location", locationsParam);
      searchParams.set("page", "1");
    }
    setSearchParams(searchParams);
  }, [locationValues, contractValues]);




  //function for reset button
  const handleReset = () => {
    const newSearchParams = new URLSearchParams(); // Create a new empty search params object
    setSearchParams(newSearchParams); // Set the search params to the new empty object
    setLocationValues([]); // Reset location values state
    setContractValues([]); // Reset contract status state
    dispatch(setCurrentPage(0)); // Reset to the first page
  };

  return (
    <div className=" border-2 border-black bg-[#aaa8a80e] px-4 rounded-lg mr-4 h-[800px] w-[400px] md:w-[500px] overflow-y-scroll  lg:h-auto lg:w-auto bg-white no-scrollbar">
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

        {/* job position component */}
        <RadioButton
          headName={"Job Position"}
          mapData={masterdata?.job_position}
          paramsValue={jobPosition}
          dataId={"job_position_id"}
          dataName={"position_name"}
          handleFunction={handleJobPositionChange}
          subId={"jobPos"}
        />

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
        <DropSelect
        headName = {"Candidate Location"}
        mapOptions = {masterdata?.candidate_country}
        paramsValue = {locationArray}
        setStateValues ={setLocationValues}
        dataName = {"country_name"}
        />

        {/* contract status */}
        <DropSelect
        headName = {"Contract Status"}
        mapOptions = {masterdata?.contract_status}
        paramsValue = {contractArray}
        setStateValues ={setContractValues}
        dataName = {"contract_sts_name"}
        />


        {/* Job type */}
        <RadioButton
          headName={"Job Type"}
          mapData={masterdata?.job_type}
          paramsValue={jobType}
          dataId={"job_type_id"}
          dataName={"job_type_name"}
          handleFunction={handleJobType}
          subId={"jobType"}
        />

        {/* resume data */}
        <RadioButton
          headName={"Resume by"}
          mapData={Resumeby}
          paramsValue={ResumeByValue}
          dataId={"id"}
          dataName={"name"}
          handleFunction={ResumebyFunction}
          subId={"resumeby"}
        />

        {/* gender */}
        <RadioButton
          headName={"Gender"}
          mapData={Gender}
          paramsValue={gender}
          dataId={"id"}
          dataName={"name"}
          handleFunction={genderFunction}
          subId={"gender"}
        />

        {/*experience range selector */}
        <SliderRc
          headName={"Working Experience"}
          paramsValue={exp_range}
          minRange={+exp_range[0]}
          maxRange={+exp_range[1]}
          min={0}
          max ={40}
          handleFunction={handleExpRangeChange}
        />


        {/*age range selector */}
        <SliderRc
          headName={"Age"}
          paramsValue={age_range}
          minRange={+age_range[0]}
          maxRange={+age_range[1]}
          min={18}
          max ={60}
          handleFunction={handleAgeRangeChange}
        />
      

        {/* name search input box */}
        <div>
          <h2 className="mt-2 text-blue-900 font-normal text-[18px]">
            Helper Name
          </h2>
          <div className="py-1 mb-3">
            <input
              className="border-[1px] mt-1 border-gray-400 p-1 placeholder:pl-1 rounded-md w-full"
              type="text"
              name="helper_name"
              id="name"
              onChange={handleNameSearch}
              onKeyDown={handleNameSearch}
              placeholder="Search with Helper Name"
            />
          </div>
        </div>
      </form>
    </div>
  );
});

export default Filter;
