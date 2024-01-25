import Banner from '../components/Banner'
import CandiDetailComponent from '../components/CandiDetailComponent'
import CandidatePagecomponent from '../components/CandidatePagecomponent'
import { OrderByComp } from '../components/OrderByComp'
import Filter from './../components/Filter';

const CandidatePage = () => {
  return (
    <div className='w-[90%] xl:w-[80%] 2xl:w-[60%] m-auto'>
        <Banner/>
        <div>
          <div
          className='mt-2'><OrderByComp/></div>
          <div  className="w-full flex">
            <div className="lg:w-[30%] my-4"><Filter/></div>
            <div className="lg:w-[70%]"><CandiDetailComponent/></div>
          </div>
          </div>        
    </div>
  )
}

export default CandidatePage