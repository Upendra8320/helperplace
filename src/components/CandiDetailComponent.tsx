import { useEffect, useState } from "react";
import locationlogo from "../assets/helperlocationlogo.webp";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCandidatesAction } from "../features/candidate/candidateDataSlice";

const CandiDetailComponent = () => {
  const dispatch = useAppDispatch();
  const { data, currentPage, pageSize, totalRecords, isLoading, error }: any =
    useAppSelector((state) => state.candidatealldata);

  console.log(data);
  useEffect(() => {
    dispatch(
      fetchCandidatesAction({
        start: (currentPage - 1) * pageSize,
        length: pageSize,
        helper_name: "",
        // Add other filters as needed
      })
    );
  }, [dispatch, currentPage, pageSize]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col w-full h-full">
      {data.map((candidate: any) => {
        return (
          <div className="my-4 border-[1px] rounded-md" key={candidate.id}>
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
                <a href="">
                  <h4 className="text-[18px] text-blue-900 font-medium">
                    {candidate.helper_name} - {candidate.age}
                  </h4>
                  <div className="flex flex-wrap my-1">
                    <h5 className="font-medium text-gray-500 text-[14px]">
                      Domestic Helper-working in Home Country
                    </h5>
                    <h5 className="flex">
                      <img className="w-6" src={locationlogo} alt="" />{" "}
                      <span>Location</span>
                    </h5>
                  </div>
                  <div className="hidden lg:block">{candidate.meta_data}</div>
                  <div className="lg:flex ">
                    <h5 className="text-blue-900 font-semibold mx-2">
                      4 Year experience
                    </h5>
                    <h5 className="text-blue-900 font-semibold mx-4">
                      {" "}
                      From 10 Mar 2024 | Full Time{" "}
                    </h5>
                    <h5
                      className={`${
                        candidate.very_active === 1
                          ? "text-green-500"
                          : "text-red-500"
                      } font-semibold mx-4`}
                    >
                      Very Active
                    </h5>
                  </div>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CandiDetailComponent;
