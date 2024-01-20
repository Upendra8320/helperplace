import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchMasterDataAction } from "../features/masterData/masterDataSlice";
import { candidateData } from './../features/candidate/candidateSlice';
const Home = () => {
  const dispatch  = useAppDispatch();
  const candidatedata = useAppSelector(
    (state ) => (console.log(state.candidatedata.data))
    
  );
  const loading = useAppSelector(
    (state) => state.candidatedata.loading
  );
  const error = useAppSelector((state) => state.candidatedata.error);


const getdata = ()=>{
  dispatch(candidateData())
  dispatch(fetchMasterDataAction())
}


  return (
    <div className="flex justify-center items-center flex-col py-10">
      <h2>Hello, this is the Home Page</h2>
      <button
        className="bg-black p-2 rounded text-white mt-5"
        onClick={getdata}
      >
        button
      </button>
      <button
        className="bg-black p-2 rounded text-white mt-5"
        onClick={getdata}
      >
        Master Data
      </button>
    </div>
  );
};

export default Home;
