const OrderByComp = ({ onChange, value }) => {
    return (
      <div>
        <label htmlFor="mySelect" className="text-blue-900 font-medium">
          Order By :
        </label>
        <select
          className="border-[1px] bg-gray-100 ml-2 px-2 text-[14px] py-1"
          id="mySelect"
          value={value || ""}
          onChange={(event) => onChange(event)}
        >
          <option value="last_active">Last Active</option>
          <option value="available_from">Available From</option>
          <option value="publish_date">Publish Date</option>
        </select>
      </div>
    );
  };
  
  export { OrderByComp };