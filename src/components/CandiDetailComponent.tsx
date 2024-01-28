import { useEffect, useState } from "react";
import locationLogo from "../assets/helperlocationlogo.webp";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import {
  fetchCandidatesAction,
  setCurrentPage,
} from "../features/candidate/candidateDataSlice";
import { fetchMasterDataAction } from "../features/masterData/masterDataSlice";
import { Link, useSearchParams } from "react-router-dom";

const CandiDetailComponent = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const job_position = searchParam.get("job_position");
  const start_date = searchParam.get("start_date");
  const job_type = searchParam.get("job_type");
  const resume_manager = searchParam.get("resume_manager");
  const gender = searchParam.get("gender");
  const helperName = searchParam.get("helper_name");
  const orderBY = searchParam.get("order_by");
  // console.log(job_position);
  console.log("orderBy",orderBY)

  const dispatch = useAppDispatch();
  const [jobPosId, setJobPosId] = useState();
  const [jobTypeId, setJobTypeId] = useState();
  // console.log("jobTypeId: ", jobTypeId);

  //fetching candidate data
  const { data, currentPage, pageSize, totalRecords, isLoading, error }: any =
    useAppSelector((state) => state.candidateAllData);

  //fetching masterdata
  const { data: masterData }: any = useAppSelector((state) => state.masterData);
  // console.log("masterdata", masterdata);
  // console.log("candidateData", data);

  useEffect(() => {
    if (job_position) {
      masterData.job_position &&
        masterData.job_position.map((element: any) => {
          const text = job_position;
          const newtext = text?.split("-").join(" ");
          if (element.position_name === newtext) {
            setJobPosId(element.job_position_id);
          }
        });
    }
    if (job_type) {
      masterData.job_type &&
        masterData.job_type.map((element: any) => {
          const text = job_type;
          const newtext = text?.split("-").join(" ");
          if (element.job_type_name === newtext) {
            setJobTypeId(element.job_type_id);
          }
        });
    }
  }, [job_position, job_type]);

  //function to hanlde change page
  const handlePageChange = (newPage: number) => {
    searchParam.set("page",newPage+1)
    setSearchParam(searchParam)
    dispatch(setCurrentPage(newPage));
  };

  const totalPages = Math.ceil(totalRecords / pageSize);

  useEffect(() => {
    dispatch(
      fetchCandidatesAction({
        start: currentPage,
        length: pageSize,
        helper_name: helperName,
        position_id: jobPosId,
        start_date: start_date,
        job_type_id: jobTypeId,
        resume_manager: resume_manager,
        gender: gender,
        order_by: orderBY,
      })
    );
  }, [
    dispatch,
    currentPage,
    jobPosId,
    start_date,
    jobTypeId,
    resume_manager,
    gender,
    helperName,
    orderBY
  ]);

  useEffect(() => {
    dispatch(fetchMasterDataAction());
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="">
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
                          {masterData.job_position &&
                            masterData.job_position.map((items: any) => {
                              if (
                                items.job_position_id === candidate.position_id
                              ) {
                                return items.position_name;
                              }
                            })}
                          -{" "}
                          {masterData.contract_status &&
                            masterData.contract_status.map((items: any) => {
                              if (
                                items.contract_sts_id ===
                                candidate.contract_status_id
                              ) {
                                return items.contract_sts_name;
                              }
                            })}
                        </h5>
                        <h5 className="flex">
                          <img className="w-6" src={locationLogo} alt="" />{" "}
                          <span>
                            {masterData.candidate_country &&
                              masterData.candidate_country.map((items: any) => {
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
                      <div className="hidden lg:block text-justify pr-3">
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
                          {masterData.job_type &&
                            masterData.job_type.map((items: any) => {
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
        </div>
      </div>

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
          <span className="mx-2 font-medium">{currentPage + 1}</span>{" "}
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
    </>
  );
};

export default CandiDetailComponent;
