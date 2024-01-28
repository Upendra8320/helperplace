import { useAppDispatch } from "../app/hooks";
import { useSearchParams } from "react-router-dom";
import {
  setCurrentPage,
} from "../features/candidate/candidateDataSlice";

const OrderByComp = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  let selectedValue = searchParams.get("order_by");
  

  //handle select option
  const handleSelectChange = (event: any) => {
    // console.log("thing function is working")
    const newSelectedValue = event.target.value;
    searchParams.set("order_by", newSelectedValue);
    setSearchParams(searchParams);
    dispatch(setCurrentPage(0)); // Reset to the first page
  };

    return (
      <div>
        <label htmlFor="mySelect" className="text-blue-900 font-medium">
          Order By :
        </label>
        <select
          className="border-[1px] bg-gray-100 ml-2 px-2 text-[14px] py-1"
          id="mySelect"
          value={selectedValue ? selectedValue : ""}
          onChange={(event)=>(handleSelectChange(event))}
        >
          <option value="last_active">Last Active</option>
          <option value="available_from">Available From</option>
          <option value="publish_date">Publish Date</option>
        </select>
      </div>
    );
  };
  
  export { OrderByComp };