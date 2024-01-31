import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface SliderRcProps {
    headName: string;
    paramsValue: any;
    minRange: number;
    maxRange: number;
    handleFunction: (value: any) => void;
    min: number;
    max: number;
  }

const SliderRc = ({headName, paramsValue, minRange, maxRange, handleFunction, min, max}: SliderRcProps) => {
  return (
    <div>
    <h2 className="mt-2 text-blue-900 font-normal text-[18px] border-b-[1px] border-[green]">
      {headName}
    </h2>
    {/* <label>Select a range:</label> */}
    <div className="flex items-center justify-between">
      <div className="text-[18px]">{minRange}</div>
      <div className="text-[18px]">{maxRange}</div>
    </div>
    <Slider
      range
      min={min}
      max={max}
      value={paramsValue}
      onChange={handleFunction}
    />
  </div>
  )
}

export default SliderRc