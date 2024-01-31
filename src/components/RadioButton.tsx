interface RadioButtonProps {
    headName: string;
    mapData: any[];
    dataId: string;
    dataName: string;
    paramsValue: any;
    handleFunction: (value: any) => void;
    subId: string;
  }
const RadioButton = ({headName, mapData,dataId,dataName,paramsValue, handleFunction,subId}:RadioButtonProps) => {
  return (
    <div>
    <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green]">
      {headName}
    </h2>
    {mapData?.map((items: any) => {
      return (
        <div key={items[dataId]} className="mt-1">
          <input
            className="mr-2"
            id={`${subId}-${items[dataId]}`}
            type="radio"
            name={subId}
            checked={paramsValue === items[dataName]}
            onChange={() =>
                handleFunction(items[dataId])
            }
          />

          <label htmlFor={`${subId}-${items[dataId]}`}>
            {items[dataName]}
          </label>
        </div>
      );
    })}
  </div>

  )
}

export default RadioButton