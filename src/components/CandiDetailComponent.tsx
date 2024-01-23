import { useEffect, useState } from "react";
import locationlogo from "../assets/helperlocationlogo.webp";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import {
  fetchCandidatesAction,
  setCurrentPage,
} from "../features/candidate/candidateDataSlice";
import { fetchMasterDataAction } from "../features/masterData/masterDataSlice";
import { Link } from "react-router-dom";

const CandiDetailComponent = () => {
  const dispatch = useAppDispatch();
  const { data, currentPage, pageSize, totalRecords, isLoading, error }: any =
    useAppSelector((state) => state.candidatealldata);
  const { data: masterdata }: any = useAppSelector((state) => state.masterData);
  console.log("masterdata", masterdata);
  console.log("candidateData", data);

  const [selectedValue, setSelectedValue] = useState("");

  //function to hanlde change page
  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  //handle select option
  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)

  };

  const totalPages = Math.ceil(totalRecords / pageSize);

  useEffect(() => {
    dispatch(
      fetchCandidatesAction({
        start: (currentPage - 1) * pageSize,
        length: pageSize,
        helper_name: "",
        order_by: selectedValue,
      })
    );
    dispatch(fetchMasterDataAction());
  }, [dispatch, currentPage, pageSize, selectedValue]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="flex flex-col w-full h-full">
        {/* <button onClick={()=>setLastActive("publish_date")}>Available_from</button> */}
        <div className="mt-2 w-full flex lg:justify-end">
          <div>
          <label htmlFor="mySelect" className="text-blue-900 font-medium">Order By :</label>
          <select
          className="border-[1px] bg-gray-100 ml-2 px-2 text-[14px] py-1"
            id="mySelect"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option>Select Option..</option>
            <option value="last_active">Last Active</option>
            <option value="available_from">Available From</option>
            <option value="publish_date">Publish Date</option>
          </select>
          </div>
        </div>
        {data.map((candidate: any) => {
          return (
            <div
              className="my-4 border-[1px] rounded-md"
              key={candidate.resume_id}
            >
              {/* //details component */}
              <div className="flex box-border items-center">
                {/* img */}
                <div>
                  <div className="p-2">
                    <img
                      className="rounded-full w-48 lg:w-96"
                      src={candidate.profile_photo}
                      alt="profile"
                    />
                  </div>
                </div>
                {/* info */}
                <div className="candi-info box-border h-full pl-2 lg:">
                  <Link to={`/resume/${candidate.resume_url}`}>
                    <h4 className="text-[18px] text-blue-900 font-medium">
                      {candidate.helper_name} - {candidate.age}
                    </h4>
                    <div className="flex flex-wrap my-1">
                      <h5 className="font-medium text-gray-500 text-[14px]">
                        {masterdata.job_position &&
                          masterdata.job_position.map((items: any) => {
                            if (
                              items.job_position_id === candidate.position_id
                            ) {
                              return items.position_name;
                            }
                          })}
                        -{" "}
                        {masterdata.contract_status &&
                          masterdata.contract_status.map((items: any) => {
                            if (
                              items.contract_sts_id ===
                              candidate.contract_status_id
                            ) {
                              return items.contract_sts_name;
                            }
                          })}
                      </h5>
                      <h5 className="flex">
                        <img className="w-6" src={locationlogo} alt="" />{" "}
                        <span>
                          {masterdata.candidate_country &&
                            masterdata.candidate_country.map((items: any) => {
                              if (
                                items.country_id ===
                                candidate.current_country_id
                              ) {
                                return items.country_name;
                              }
                            })}
                        </span>
                      </h5>
                    </div>
                    <div className="hidden lg:block text-justify">
                      {candidate.meta_data}
                    </div>
                    <div className="lg:flex ">
                      <h5 className="text-blue-900 font-semibold mx-4">
                        {candidate.experience_year}yr experience
                      </h5>
                      <h5 className="text-blue-900 font-semibold mx-4">
                        From{" "}
                        {new Date(
                          candidate.next_job_available_date
                        ).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        |{" "}
                        {masterdata.job_type &&
                          masterdata.job_type.map((items: any) => {
                            if (items.job_type_id === candidate.job_type_id) {
                              return items.job_type_name;
                            }
                          })}
                      </h5>
                      <h5
                        className={`${
                          candidate.very_active === 1
                            ? "text-green-500"
                            : "hidden"
                        } font-semibold mx-4`}
                      >
                        Very Active
                      </h5>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        {/* pagination */}
        <div className="w-full">
          <div className="flex items-center justify-center">
            <button
              className="mx-4 font-medium border-[1px] rounded-md p-2 hover:text-white hover:bg-gray-600 w-[80px]"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-2 font-medium">{currentPage}</span>{" "}
            {<strong>of</strong>}{" "}
            <span className="mx-2 font-medium">{totalPages}</span>
            <button
              className="mx-4 font-medium border-[1px] rounded-md p-2 hover:text-white hover:bg-gray-600 w-[80px]"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandiDetailComponent;
