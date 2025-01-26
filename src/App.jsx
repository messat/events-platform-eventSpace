import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from './components/IndexPage'
import Navbar from './components/Navbar'

import EventInformation from './components/EventInfo';
import 'react-calendar/dist/Calendar.css';
import Footer from './components/footer';
import Login from './components/Login';
import './Login.css'
import { Box } from '@mui/material';
import RegisterUser from './components/Register';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeRegister from './components/EmployeeRegister';
import { useState } from 'react';




function App() {
  const [searchTitle, setSearchTitle] = useState({search: ""})
  return (
    <Box sx={{position: "relative", minHeight: "100vh"}}>
      <Box sx={{pb: "9rem"}}>
    <Navbar setSearchTitle={setSearchTitle}/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage searchTitle={searchTitle} />} />
        <Route path="/events/user/login" element={<Login />} />
        <Route path="/events/user/register" element={<RegisterUser />} />
        <Route path="/events/vpn/employee/login" element={<EmployeeLogin />} />
        <Route path="/events/vpn/employee/eventspace/register" element={<EmployeeRegister />} />
        <Route path="/event/:event_id" element={<EventInformation />} />
      </Routes>
      </BrowserRouter>
    <Footer/>
    </Box>
    </Box>
  )
}

export default App
