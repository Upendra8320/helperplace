import { useState } from "react";
import Banner from "../components/Banner";
import CandiDetailComponent from "../components/CandiDetailComponent";
import CandidatePagecomponent from "../components/CandidatePagecomponent";
import { OrderByComp } from "../components/OrderByComp";
import Filter from "./../components/Filter";
import Skeleton from "../components/Skeleton";

const CandidatePage = () => {
    // State to manage the visibility of the filter modal
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    // Event handler to toggle the visibility of the filter modal
    const toggleFilterModal = () => {
      setIsFilterModalOpen((previous)=> !previous);
    };
  return (
    <div className="w-[90%] xl:w-[80%] 2xl:w-[60%] m-auto">
      <Banner />
      <div>
        <div className="mt-4 flex justify-between lg:justify-end ">
          <div>
            <OrderByComp />
          </div>
          <div className="lg:hidden bg-blue-950 text-white py-1 px-4">
            <button onClick={toggleFilterModal}>Filter</button>
          </div>
        </div>
        <div className="w-full flex">
          <div className=" hidden lg:block lg:w-[30%] my-4">
            <Filter />
          </div>
           <div className="lg:hidden my-4">
            {/* Render Filter component as a modal based on state */}
             {/* Render Filter component based on the state */}
             {isFilterModalOpen ? (
              <div className="filter-modal-overlay flex flex-col gap-2 pl-4">
                <button className="rounded-full bg-yellow-300  p-2" onClick={toggleFilterModal}>Close</button>
                <Filter />
              </div>
            ) : null}
          </div>
          <div className="w-[95%] m-auto lg:w-[70%]">
            <CandiDetailComponent />
            {/* <Skeleton/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatePage;
