import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useEffect } from "react";
import { fetchCandidatesResume } from "../features/resumeData/resumeSlice";
import { fetchMasterDataAction } from "../features/masterData/masterDataSlice";
import starLogo from "../assets/star-symbol.png";
const Resume = () => {
  const dispatch = useAppDispatch();
  const { location, position, name, resumeNo }: any = useParams();
  const encodedLocation = encodeURIComponent(location);
  const encodedPosition = encodeURIComponent(position);
  const encodedName = encodeURIComponent(name);
  const encodedResumeNo = encodeURIComponent(resumeNo);

  const { data, isLoading, error }: any = useAppSelector(
    (state) => state.resumeData
  );
  const { data: masterData }: any = useAppSelector((state) => state.masterData);

  console.log("data: ", data.resume_detail);
  console.log("masterdata:", masterData);

  const myData = data.resume_detail;

  console.log(
    "resume_url",
    `${encodedLocation}/${encodedPosition}/${encodedName}/${encodedResumeNo}`
  );
  useEffect(() => {
    dispatch(
      fetchCandidatesResume({
        resume_url: `${encodedLocation}/${encodedPosition}/${encodedName}/${encodedResumeNo}`,
        resume_id: `${resumeNo}`,
      })
    );
    dispatch(fetchMasterDataAction());
  }, []);

  return (
    <div className="mt-4 mx-auto w-[98%]">
      <div id="banner" className="border-1 rounded-md">
        <div className="w-full relative">
          <img
            className="w-full "
            src="https://www.helperplace.com/assets/images/misc/resume-lg.webp"
            alt="backgroundImg"
          />
          <div className="w-full bg-[#808080ab] h-full absolute top-0"></div>
        </div>
        <div className="relative flex items-center">
          <div className="w-[30%]">
            <img
              className="absolute w-[100px] rounded-full top-[-50px] left-[12px] border-[1px] border-black"
              src={myData && myData.profile_photo}
              alt="profileImg"
            />
            <div
              className="w-[85%] h-[30px] bg-blue-900 w-[200%] border-b-[2px] border-yellow-400 inline-block mt-12"
              style={{
                clipPath:
                  "polygon(100% 0%, 89% 48%, 100% 100%, 0 100%, 0% 50%, 0 0)",
              }}
            >
              <label htmlFor="" className="pl-8">
                <span className=" text-white">
                  {myData && myData.resume_manager}
                </span>
              </label>
            </div>
          </div>
          <div className=" w-[70%] pl-8 pr-6">
            <div className="name text-blue-900 font-medium text-[1.5rem] tracking-widest">
              {name}{" "}
              <span className="block md:inline-block text-[1rem] font-normal tracking-widest">{`(${
                myData && myData.age
              } Years)`}</span>
            </div>
            <div id="personal_detail">
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-wrap ">
                  <div className="text-[0.8rem] font-normal tracking-wider">
                    {" "}
                    {myData && myData.gender} |{" "}
                  </div>
                  <div className="text-[0.8rem] font-normal tracking-wider pl-1">
                    {" "}
                    {myData && myData.marital_status} |{" "}
                  </div>
                  <div className="text-[0.8rem] font-normal tracking-wider pl-1">
                    {" "}
                    {myData && myData.child_count} kids |{" "}
                  </div>
                  <div className="text-[0.8rem] font-normal tracking-wider pl-1">
                    {" "}
                    {location} |{" "}
                  </div>
                  <div className="text-[0.8rem] font-normal tracking-wider pl-1">
                    {" "}
                    {masterData.religion &&
                      masterData.religion.map((item: any) => {
                        if (
                          item.religion_id === (myData && myData.religion_id)
                        ) {
                          return item.religion_name;
                        }
                      })}{" "}
                  </div>
                </div>
                <div className=" bg-[#25ae88] text-white px-2 py-1 rounded text-[14px]">
                  CONTACT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional information */}

      <div className="border-b-2 border-blue-800 bg-blue-100 mt-2">
        <div className="px-4 py-1">
          <div className="text-blue-900 font-medium">Professional Info</div>
        </div>
      </div>
      <div>
        <div className="px-4 mt-2">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 flex items-center mb-2 md:mb-0">
              <div>
                <img className="inline w-3" src={starLogo} alt="" />
              </div>
              <div className="ml-2 text-[0.8rem] font-medium">
                {position} | Finished Contract
              </div>
            </div>
            <div className="md:w-1/2 flex items-center">
              <div>
                <img className="inline w-3" src={starLogo} alt="" />
              </div>
              <div className="ml-2 text-[0.8rem] font-medium">
                Present Location: {location}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-2 lg:flex-row">
            <div className="md:w-1/2 flex items-center mb-2 md:mb-0">
              <div>
                <img className="inline w-3" src={starLogo} alt="" />
              </div>
              <div className="ml-2 text-[0.8rem] font-medium">
                {myData && myData.experience_year} Year Experience
              </div>
            </div>
            <div className="md:w-1/2 flex items-center">
              <div>
                <img className="inline w-3" src={starLogo} alt="" />
              </div>
              <div className="ml-2 text-[0.8rem] font-medium">
                Start From{" "}
                {new Date(myData && myData.next_job_available_date).toLocaleDateString(
                  "en-US",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}{" "}
                |{" "}
                {masterData.job_type &&
                  masterData.job_type.map((item: any) => {
                    if (item.job_type_id === (myData && myData.job_type_id)) {
                      return item.job_type_name;
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
