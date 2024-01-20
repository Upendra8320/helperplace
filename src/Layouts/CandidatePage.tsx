import Banner from '../components/Banner'
import CandiDetailComponent from '../components/CandiDetailComponent'
import CandidatePagecomponent from '../components/CandidatePagecomponent'

const CandidatePage = () => {
  return (
    <div className='w-[90%] xl:w-[80%] 2xl:w-[60%] m-auto'>
        <Banner/>
        <CandiDetailComponent/>
    </div>
  )
}

export default CandidatePage