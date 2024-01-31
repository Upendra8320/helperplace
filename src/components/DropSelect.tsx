import Select from "react-select";


const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? "#48bb78" : "#cbd5e0",
      boxShadow: state.isFocused ? "0 0 0 1px #48bb78" : null,
    }),
  };

  interface DropSelectProps {
    headName: string;
    mapOptions: any[];
    paramsValue: any[];
    dataName: string;
    setStateValues: (selectedValues: string[]) => void;
  }

const DropSelect = ({headName, mapOptions, paramsValue,dataName,setStateValues}:DropSelectProps) => {
  return (
       <div>
       <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green] mb-2">
          {headName}
       </h2>
       <Select
         className="basic-multi-select"
         classNamePrefix="select"
         isMulti
         options={mapOptions?.map((item: any) => ({
           value: item[dataName],
           label: item[dataName],
         }))}
         value={paramsValue?.map((item:any) => ({
           value: item,
           label: item,
         }))}
         onChange={(selectedOptions) => {
            setStateValues(selectedOptions.map((option) => option.value));
         }}
         styles={customStyles}
       />
     </div>
  )
}

export default DropSelect

