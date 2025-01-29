import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from './components/IndexPage'
import Navbar from './components/Navbar'
import EventInformation from './components/EventInfo';
import 'react-calendar/dist/Calendar.css';
import Footer from './components/Footer';
import Login from './components/Login';
import './Login.css'
import { Box } from '@mui/material';
import RegisterUser from './components/Register';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeRegister from './components/EmployeeRegister';
import { useState, useEffect } from 'react';
import UserContext from './Context/UserContext'
import CreateEvent from './components/Forms/CreateEvent';
import AccountManagement from './components/AccountManagement';
import EmployeeAccountManagement from './components/EmployeeAccountManagement';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState({})

  const [searchTitle, setSearchTitle] = useState({search: ""})

  useEffect(()=>{
    const userLoggedIn = localStorage.getItem("user")
    const employeeLoggedIn = localStorage.getItem("employee")
    if(userLoggedIn){
      const parseUser = JSON.parse(userLoggedIn)
      setIsLoggedIn(parseUser)
    }
    if(employeeLoggedIn) {
      const parseEmployeeDetails = JSON.parse(employeeLoggedIn)
      setIsLoggedIn(parseEmployeeDetails)
    }
  }, [])

  return (
      <UserContext.Provider value={{isLoggedIn, setIsLoggedIn}}>

    <Box sx={{position: "relative", minHeight: "100vh"}}>
      <Box sx={{pb: "9rem"}}>

    <Navbar setSearchTitle={setSearchTitle}/>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage searchTitle={searchTitle} />} />
        <Route path="/events/user/login" element={<Login />} />
        <Route path="/events/user/register" element={<RegisterUser />} />
        <Route path="/events/user/account-management" element={<AccountManagement />}/>
        <Route path="/events/vpn/employee/login" element={<EmployeeLogin />} />
        <Route path="/events/vpn/employee/eventspace/register" element={<EmployeeRegister />} />
        <Route path="/events/vpn/employee/hostEvent" element={<CreateEvent />}></Route>
        <Route path="/events/vpn/employee/account-management" element={<EmployeeAccountManagement />} />
        <Route path="/event/:event_id" element={<EventInformation />} />
      </Routes>
      </BrowserRouter>

    <Footer/>
    </Box>
    </Box>

    </UserContext.Provider>
  )
}

export default App
