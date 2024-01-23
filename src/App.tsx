import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from  "./components/Home"
import Navbar from './components/Navbar'
import CandidatePage from './Layouts/CandidatePage'
import Resume from './components/Resume'

function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/find-candidate' element={<CandidatePage/>}/>
          <Route path='/resume/:location/:position/:name/:resumeNo' element={<Resume/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
