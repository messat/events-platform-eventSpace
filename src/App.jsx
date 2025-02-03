import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from './components/IndexPage'
import Navbar from './components/Navbar'
import EventInformation from './components/EventInfo';
import 'react-calendar/dist/Calendar.css';
import FooterEventSpace from './components/FooterEventSpace';
import Login from './components/Login';
import './Login.css'
import './Loading.css'
import { Box } from '@mui/material';
import RegisterUser from './components/Register';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeRegister from './components/EmployeeRegister';
import { useState, useEffect } from 'react';
import UserContext from './Context/UserContext'
import CreateEvent from './components/Forms/CreateEvent';
import AccountManagement from './components/AccountManagement';
import EmployeeAccountManagement from './components/EmployeeAccountManagement';
import ErrorPage from './components/ErrorState/ErrorPage';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState({})

  const [searchTitle, setSearchTitle] = useState({search: ""})

  const [userLogInAlert, setUserLogInAlert] = useState(false)

  const [registrationLogInAlertSuccess, setRegistrationLogInAlertSuccess] = useState(false)

  const [createEventAlert, setCreateEventAlert] = useState(false)

  const [cancelEventByEmployeeAlert, setCanelEventByEmployeeAlert] = useState(false)

  const [cancelTicketByUserAlert, setCancelTicketByUserAlert] = useState(false)

  const [bookingTicketByUserAlert, setBookingTicketByUserAlert] = useState(false)

  const [userLogOutAlert, setUserLogOutAlert] = useState(false)


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

    <BrowserRouter>
    <Navbar aria-label="Main Navigation" setSearchTitle={setSearchTitle} setUserLogOutAlert={setUserLogOutAlert} />
      <main role='Main Part Of Event Space'>
      <Routes>
        <Route path="/" element={<IndexPage searchTitle={searchTitle} userLogInAlert={userLogInAlert} setUserLogInAlert={setUserLogInAlert} registrationLogInAlertSuccess={registrationLogInAlertSuccess} setRegistrationLogInAlertSuccess={setRegistrationLogInAlertSuccess} />} />
        <Route path="/events/user/login" element={<Login setUserLogInAlert={setUserLogInAlert} userLogOutAlert={userLogOutAlert} setUserLogOutAlert={setUserLogOutAlert} />} />
        <Route path="/events/user/register" element={<RegisterUser setRegistrationLogInAlertSuccess={setRegistrationLogInAlertSuccess} />} />
        <Route path="/events/user/account-management" element={<AccountManagement cancelTicketByUserAlert={cancelTicketByUserAlert} setCancelTicketByUserAlert={setCancelTicketByUserAlert} bookingTicketByUserAlert={bookingTicketByUserAlert}  setBookingTicketByUserAlert={setBookingTicketByUserAlert} />}/>
        <Route path="/events/vpn/employee/login" element={<EmployeeLogin setUserLogInAlert={setUserLogInAlert} />} />
        <Route path="/events/vpn/employee/eventspace/register" element={<EmployeeRegister setRegistrationLogInAlertSuccess={setRegistrationLogInAlertSuccess} />} />
        <Route path="/events/vpn/employee/hostEvent" element={<CreateEvent setCreateEventAlert={setCreateEventAlert} />}></Route>
        <Route path="/events/vpn/employee/account-management" element={<EmployeeAccountManagement createEventAlert={createEventAlert} setCreateEventAlert={setCreateEventAlert} cancelEventByEmployeeAlert={cancelEventByEmployeeAlert} setCanelEventByEmployeeAlert={setCanelEventByEmployeeAlert} />} />
        <Route path="/event/:event_id" element={<EventInformation setBookingTicketByUserAlert={setBookingTicketByUserAlert} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      </main>
      </BrowserRouter>
      <footer role='Event Space Tech Stacks Used'>
    <FooterEventSpace />
    </footer>
    </Box>
    </Box>

    </UserContext.Provider>
  )
}

export default App
