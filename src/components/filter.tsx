import React, { useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import {
  fetchCandidatesAction,
  setCurrentPage,
} from "../features/candidate/candidateDataSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useSearchParams } from "react-router-dom";
import { OrderByComp } from "./OrderByComp";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Filter = React.memo(() => {
  // console.log("selectedDate: ", datevalue);
  const dispatch = useAppDispatch();
  const { data: masterdata }: any = useAppSelector((state) => state.masterData);

  const [jobPosition, setJobPosition] = useState();
  const [jobType, setJobType] = useState();
  // const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // console.log('selectedSkills: ', selectedSkills);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValue = searchParams.get("order_by");
  const selectedDate = searchParams.get("start_date");
  const ResumeByValue = searchParams.get("resume_manager");
  const gender = searchParams.get("gender");
  const helperName = searchParams.get("helper_name");

  //handle select option
  const handleSelectChange = (event: any) => {
    const newSelectedValue = event.target.value;
    searchParams.set("order_by", newSelectedValue);
    setSearchParams(searchParams);
    dispatch(setCurrentPage(0)); // Reset to the first page
  };

  // handle jobposition filter
  const handleJobPositionChange = (jobPositionId: any) => {
    setJobPosition(jobPositionId);
    masterdata.job_position.map((items: any) => {
      if (items.job_position_id == jobPositionId) {
        const text = items.position_name;
        const newtext = text.split(" ").join("-");
        searchParams.set("job_position", newtext);
        setSearchParams(searchParams);
      }
    });
    dispatch(setCurrentPage(0)); // Reset to the first page
  };

  //handle startdate filter
  const selectDate = (event: any) => {
    const { value } = event.target;
    searchParams.set("start_date", value);
    setSearchParams(searchParams);
    dispatch(setCurrentPage(0)); // Reset to the first page
  };

  //handle jobType
  const handleJobType = (jobTypeId: any) => {
    setJobType(jobTypeId);
    masterdata.job_type.map((items: any) => {
      if (items.job_type_id == jobTypeId) {
        const text = items.job_type_name;
        const newtext = text.split(" ").join("-");
        searchParams.set("job_type", newtext);
        setSearchParams(searchParams);
        // console.log("searchParams: ", searchParams);
      }
    });
    dispatch(setCurrentPage(0)); // Reset to the first page
  };

  //handle resumeby function
  const Resumebyfunction = (resumeby: any) => {
    searchParams.set("resume_manager", resumeby);
    setSearchParams(searchParams);
    dispatch(setCurrentPage(0)); // Reset to the first page
  };
  //handle gender function
  const genderFunction = (gender: any) => {
    searchParams.set("gender", gender);
    setSearchParams(searchParams);
    dispatch(setCurrentPage(0)); // Reset to the first page
  };


  //handle name search function

  const handleNameSearch = (e:any)=>{
    const text = e.target.value
    const newtext = text.split(" ").join("_").trim()
    searchParams.set("helper_name", newtext);
    setSearchParams(searchParams)
 }

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

  const handleReset = () => {};

  // const propsforOrderBy = {
  //   value: selectedValue,
  //   onChange: handleSelectChange,
  // };

  //age range selector state and function
  const [range, setRange] = useState([20, 80]);

  const handleRangeChange = (newRange) => {
    setRange(newRange);
  };
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
      {/* {false && <OrderByComp {...propsforOrderBy} />} */}
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
          {masterdata.job_position &&
            masterdata.job_position.map((items: any) => {
              return (
                <div key={items.job_position_id} className="mt-1">
                  <input
                    className="mr-2"
                    id={`jobPos-${items.job_position_id}`}
                    type="radio"
                    name="jobPos"
                    checked={jobPosition === items.job_position_id}
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
              type="date"
              value={selectedDate}
              onChange={(event) => selectDate(event)}
              // onChange={selectDate}
            />
          </div>
        </div>
        {/* candidate location */}
        {/* <div id="location">
          <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green]">
            Skills
          </h2>
          <select name="" id="">
            <option value="">Candidate Location</option>
            {masterdata.skills &&
            masterdata.skills.map((skill: any) => (
              <option key={skill.skill_id} className="mt-1 p-x4">
                <input
                  className="mr-2 border-[2px]"
                  id={`skill-${skill.skill_id}`}
                  type="checkbox"
                  value={skill.skill_name}
                  checked={selectedSkills.includes(skill.skill_name)}
                  onChange={handleSkillChange}
                />

                <label htmlFor={`skill-${skill.skill_id}`}>
                  {skill.skill_name}
                </label>
              </option>
            ))}
          </select>
          
        </div> */}

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
                    checked={jobType === items.job_type_id}
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
            Resume by
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
        {/*age range selector */}
        <div>
          <label>Select a range:</label>
          <Slider
            range
            min={0}
            max={100}
            value={range}
            onChange={handleRangeChange}
          />
          <p>
            Selected Range: {range[0]} to {range[1]}
          </p>
        </div>

        {/* name search input box */}
        <div>
        <h2 className="mt-2 text-blue-900 font-normal text-[18px]">
            Helper Name
          </h2>
          <div className="py-1">
            <input className="border-[1px] mt-1 border-gray-400 p-1 placeholder:pl-1" type="text" name="name" id="name" onChange={handleNameSearch} value={helperName} placeholder="Seach with Helper Name"/>
          </div>
        </div>
      </form>
    </div>
  );
});


export default Filter;
