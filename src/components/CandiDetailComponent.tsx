import { useEffect, useState } from "react";
import locationLogo from "../assets/helperlocationlogo.webp";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchCandidatesAction,
  setCurrentPage,
} from "../features/candidate/candidateDataSlice";
import { fetchMasterDataAction } from "../features/masterData/masterDataSlice";
import { Link, useSearchParams } from "react-router-dom";
import Skeleton from '../components/Skeleton';

const CandiDetailComponent = () => {
  const [jobPosId, setJobPosId] = useState();
  const [jobTypeId, setJobTypeId] = useState();
  const [locationArr, setLocationArr] = useState<number[]>([]);
  const locationIds = locationArr.join(",")
  const [contractArr, setContractArr] = useState<number[]>([]);
  const contractIds = contractArr.join(",")

  // console.log('locationIds: ', locationIds);

  const [searchParam, setSearchParam] = useSearchParams();
  const job_Position = searchParam.get("job_position");
  // console.log("job_position usesearch", job_Position);
  const start_date = searchParam.get("start_date");
  const job_Type = searchParam.get("job_type");
  const resume_manager = searchParam.get("resume_manager");
  const gender = searchParam.get("gender");
  const helperName = searchParam.get("helper_name");
  const orderBY = searchParam.get("order_by");
  const minimumExperience = searchParam.get("experience_range");
  const [exp_min, exp_max] = minimumExperience
    ? minimumExperience.split("-")
    : [0, 40];
  const minimumAge = searchParam.get("age_range");
  const [age_min, age_max] = minimumAge ? minimumAge.split("-") : [18, 60];
  const location = searchParam.get("location");
  // console.log("location: ", location);
  const locationArray = location?.split(",");
  // console.log("locationArray: ", locationArray);
  const contract = searchParam.get("contract_status")
  const contractArray = contract?.split(",")

  const dispatch = useAppDispatch();
  // console.log("jobpos", jobPosId);
  // console.log("jobtype", jobTypeId);

  //fetching candidate data
  const { data, currentPage, pageSize, totalRecords, isLoading, error }: any =
  useAppSelector((state) => state.candidateAllData);
  // console.log('currentPage: ', currentPage);
    

  //fetching masterdata
  const { data: masterData, isLoading: masterDataLoading }: any =
    useAppSelector((state) => state.masterData);

  //master data useeffect
  useEffect(() => {
    dispatch(fetchMasterDataAction());
  }, []);

  useEffect(() => {
    if (!masterDataLoading) {
      if (job_Position) {
        masterData.job_position &&
          masterData.job_position.map((element: any) => {
            const text = job_Position;
            const newtext = text?.split("-").join(" ");
            if (element.position_name === newtext) {
              setJobPosId(element.job_position_id);
            }
          });
      }else{
        setJobPosId(null);
      }
      if (job_Type) {
        masterData.job_type &&
          masterData.job_type.map((element: any) => {
            const text = job_Type;
            const newtext = text?.split("-").join(" ");
            if (element.job_type_name === newtext) {
              setJobTypeId(element.job_type_id);
            }
          });
      }else{
        setJobTypeId(null);
      }
      if(locationArray) {
        let country_ids: number[] = [];
        masterData?.candidate_country?.map((elements: any) => {
          locationArray?.forEach((items: any) => {
            if (elements.country_name === items) {
              country_ids.push(elements.country_id);
            }
          });
        });
        setLocationArr(country_ids)
      }else{
        setLocationArr([]); //default value for country is Thailand
      }
      if(contractArray) {
        let contract_ids: number[] = [];
        masterData?.contract_status?.map((elements: any) => {
          contractArray?.forEach((items: any) => {
            if (elements.contract_sts_name === items) {
              contract_ids.push(elements.contract_sts_id);
            }
          });
        });
        setContractArr(contract_ids)
      }else{
        setContractArr([]);  //Default Value : Continue working
      }
    }
  }, [job_Position, job_Type, masterData,location,contract]);

  //function to handle change page
  const handlePageChange = (newPage: number) => {
    let page = newPage + 1;
    searchParam.set("page", JSON.stringify(page));
    setSearchParam(searchParam);
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
        country_id: locationIds,
        contract_status_id: contractIds,
        job_type_id: jobTypeId,
        resume_manager: resume_manager,
        gender: gender,
        order_by: orderBY,
        experience_min: exp_min,
        experience_max: exp_max,
        age_min: age_min,
        age_max: age_max,
      })
    );
  // console.log('currentPage: ', currentPage);
  // console.log("searchParam",searchParam)

  }, [
    currentPage,
    jobPosId,
    start_date,
    jobTypeId,
    resume_manager,
    gender,
    helperName,
    orderBY,
    minimumExperience,
    minimumAge,
    locationIds,
    contractIds,
  ]);

  if (isLoading || masterDataLoading) {
    // return <p>Loading...</p>;
    return    <Skeleton/>
  }

  if (data.length === 0) {
    return <p>No candidate data available.</p>;
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
