import React from "react";
import { GrPowerReset } from "react-icons/gr";

const Filter = React.memo(({ MasterData, SearchParamters, selectedJobPosition, Positiononchange,selectdate,datevalue,selectedJobType, JobTypeonChange}) => {
  console.log("selectedDate: ", datevalue);

  const handleReset = () => {
    Positiononchange("");
    JobTypeonChange("")
    SearchParamters("")
  };

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
          {MasterData.job_position &&
            MasterData.job_position.map((items: any) => {
              return (
                <div key={items.job_position_id} className="mt-1">
                  <input
                    className="mr-2"
                    id={`jobPos-${items.job_position_id}`}
                    type="radio"
                    name="jobType"
                    checked={selectedJobPosition === items.job_position_id}
                    onChange={() => Positiononchange(items.job_position_id)}
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
              value={datevalue}
              onChange={(event)=> selectdate(event)}
            />
          </div>
        </div>


        {/* Job type */}
        <div>
        <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green]">
            Job Type
          </h2>
          {MasterData.job_type &&
            MasterData.job_type.map((items: any) => {
              return (
                <div key={items.job_type_id} className="mt-1">
                  <input
                    className="mr-2"
                    id={`jobPos-${items.job_type_id}`}
                    type="radio"
                    name="jobPosition"
                    checked={selectedJobType === items.job_type_id}
                    onChange={() => JobTypeonChange(items.job_type_id)}
                  />

                  <label htmlFor={`jobPos-${items.job_type_id}`}>
                    {items.job_type_name}
                  </label>
                </div>
              );
            })}
        </div>

      </form>
    </div>
  );
});

export default Filter;
