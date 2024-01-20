import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from  "./components/Home"
import Navbar from './components/Navbar'
import CandidatePage from './Layouts/CandidatePage'

function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/find-candidate' element={<CandidatePage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
