import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Singup from './pages/Singup'
import Dashbord from './pages/Dashbord'
import { ToastContainer, toast } from 'react-toastify';
import About from './components/About/About'





function App() {

  return (
<><ToastContainer/>
      <Router>
        <Routes>
          <Route path='/' element={<Singup />} />
          <Route path='/dashboard' element={<Dashbord />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
</>    

  )
}

export default App
