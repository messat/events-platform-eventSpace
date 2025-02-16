import { Box, Container, createTheme, Grid2, Paper, Stack, ThemeProvider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { deleteEventByEmployee, hostedEventsByEmployee } from "../API server/api";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Groups2Icon from '@mui/icons-material/Groups2';
import Button from '@mui/joy/Button';
import {Button as SingleButton} from '@mui/material'
import ButtonGroup from '@mui/joy/ButtonGroup';
import { Link, useNavigate } from 'react-router-dom';
import Moment from "react-moment";
import AccountManagmentUserLoading from "./LoadingState/AccountManagementLoading";
import CreateEventAlertSuccess from "./Alerts/HostingEventLoading";
import CancelEventByEmployeeAlertSuccess from "./Alerts/CancelEventAlert";
import ErrorHandlerClient from "./ErrorState/ErrorIndex";
import UserContext from "../Context/UserContext";


export default function EmployeeAccountManagement ({ createEventAlert, setCreateEventAlert, cancelEventByEmployeeAlert, setCanelEventByEmployeeAlert}) {
    
    const {isLoggedIn} = useContext(UserContext)

    const [employeeID, setEmployeeID] = useState({})
    const [eventsHostedByEmployee, setEventsHostedByEmployee] = useState([])

    const [isClicked, setIsClicked] = useState(false)

    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)

    const navigate = useNavigate()

    const theme = createTheme({
        typography: {
            fontFamily: 'sniglet',
        }
    })

    useEffect(()=> {
        const findEmployee = localStorage.getItem("employee")
        if(findEmployee){
            const parseEmployeeDetails = JSON.parse(findEmployee)
            setEmployeeID(parseEmployeeDetails)
        }
    }, [])

    useEffect(()=> {
        (async () => {
            if(!isLoggedIn.employeeNumber){
                setIsLoading(false)
                
            }
            try {
                if(employeeID._id){
                    setIsLoading(true)
                    const employeeHosted = await hostedEventsByEmployee(employeeID._id)
                    setIsError(null)
                    setIsLoading(false)
                    setEventsHostedByEmployee(employeeHosted)
                    setIsClicked(false)   
                }
            } catch (err) {
                setIsError(err)
                setIsLoading(false)
                setIsClicked(false)
            }
        })()
    }, [employeeID._id && eventsHostedByEmployee.length  && isClicked])


    async function handleCancelEventByEmployer(event) {
        try {
            setIsLoading(true)
            await deleteEventByEmployee(event._id)
            setIsError(null)
            setCanelEventByEmployeeAlert(true)
            setIsLoading(false)
            setIsClicked(!false)
        } catch (err) {
            setIsLoading(false)
            setIsError(err)
            setCanelEventByEmployeeAlert(false)
            setIsClicked(false)
        }
    }

if(isLoading){
    return (<Box role="alert" aria-live="polite">
        <AccountManagmentUserLoading />
    </Box>)
}

if(isError){
    return (<Box role="alert" aria-live="polite">
      <ErrorHandlerClient isError={isError} />
    </Box>)
  }


    return (<main role="main" aria-labelledby="employee-account-management-event-space">
    <Box sx={{mt: 4}}>

        <Container maxWidth="sm">

        <Box sx={{display: "flex", justifyContent: "center", boxShadow: 10, p: 0.5, mb: 4}}  >
            <ThemeProvider theme={theme}>
            <Typography component={"h1"} variant="h3" sx={{color: 'primary.dark'}} id="employee-event-space-title" tabIndex={0}>Employee Event Space</Typography>
            </ThemeProvider>
        </Box>

        </Container>

        {createEventAlert ? <Box sx={{mb: 3}} role="alert" aria-live="polite" tabIndex={0}>
            <CreateEventAlertSuccess setCreateEventAlert={setCreateEventAlert} />
        </Box> : null}

        {cancelEventByEmployeeAlert ? <Box sx={{mb: 3}} role="alert" aria-live="polite" tabIndex={0}>
            <CancelEventByEmployeeAlertSuccess setCanelEventByEmployeeAlert={setCanelEventByEmployeeAlert} />
        </Box> : null}

    <Container maxWidth="lg">
        <Grid2 container spacing={4}>

            <Grid2 size={{xs: 12, sm: 12, md: 12}}>
                
            <Paper elevation={10} sx={{p: 4}}>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                <Typography component={"h2"} variant="h6" sx={{textAlign: "center"}} tabIndex={0}>Employee Account Management: Browse All Your Hosted Events</Typography>
                <br></br>
                </Box>
                </Paper>
            </Grid2>


            {eventsHostedByEmployee.length ? eventsHostedByEmployee.map((event) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4}} key={event._id}>

                <Paper elevation={8}  sx={{maxHeight: "900px", minHeight: "300px", gap: 2, pb: 4}}>

                <img src={event.event_img_url} alt={`${event.title} image`} className='eventImage' onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1642618598178-52eb00dc544d?q=80&w=3390&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
                          }}/>

                <Typography component={"h3"} variant="h6" sx={{mx: 2, minHeight: 96, typography: { xs: 'h6', sm: 'body1', md: 'h6'}}} gutterBottom>{event.title}</Typography>
                <Typography component={"p"}variant='subtitle1' sx={{mx: 2, color: "primary.main", fontWeight: "bold", minHeight: "50px"}} gutterBottom><Moment format="llll">{event.start}</Moment> {"---"} <Moment format="lll">{event.end}</Moment></Typography>
                <Typography component={"p"} sx={{color: "#757575", mx: 2, fontWeight: "bold", minHeight: "50px"}} gutterBottom>{event.location}</Typography>
                <Typography component={"p"} variant='h6' sx={{mx: 2, display: "inline-block"}}>{event.price ? "£" + event.price: "FREE" }</Typography>

                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                        <Typography component={"p"} sx={{display: "inline-block", mt: -1.4, mr: 2, typography: { xs: 'h6', sm: 'body1', md: 'button'}}} variant='h6'>{event.duration}</Typography>
                        <AccessTimeIcon sx={{mr: 2, display: "inline-block", mt: -1.4, mb: 1 }} aria-label="Duration Icon"/>
                    </div>

                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                        <Typography component={"p"} sx={{display: "inline-block", mr: 2, mt: -0.4, typography: { xs: 'h6', sm: 'body1', md: 'button'}}} variant='h6'>{event.spaces + " spaces"}</Typography>
                        <Groups2Icon  sx={{mr: 2, display: "inline-block", mt: -0.5}} aria-label="Spaces Available Icon"></Groups2Icon> 
                    </div>

                    <ButtonGroup
                        color="primary"
                        orientation="horizontal"
                        size="md"
                        variant="solid"
                        sx={{ '--ButtonGroup-radius': '40px', mx: 2, mt: -4.9}}
                        aria-label={`View event ${event.title}`}
                        >
                        <Button component={Link} to={`/event/${event._id}`}>View event</Button>
                        </ButtonGroup>

                        <Stack spacing={2} direction="row" sx={{display: "flex", justifyContent: "center", mt: 2}}>
                            <SingleButton variant="contained" sx={{width: "93%", borderRadius: "20px"}} color="error" aria-label={`Cancel Event ${event.title}`} onClick={()=> {
                                return handleCancelEventByEmployer(event)
                            }}>Cancel Event</SingleButton>
                            
                        </Stack>
                        
                </Paper>
            </Grid2>
            )): isLoggedIn.employeeNumber ? <Box sx={{mx: "auto", textAlign: "center"}}>
            <Typography component={"p"} variant="button" fontSize={"20px"} color="primary" tabIndex={0} onClick={() => navigate("/events/vpn/employee/hostEvent")}>No Events have been created in your space. Please feel free to add new events. Add Now!</Typography>
            </Box> :
            
            <Box sx={{mx: "auto", textAlign: "center"}}>
              <Typography component={"p"} style={{cursor: "pointer"}} color="primary" variant="button" fontSize={"20px"} tabIndex={0} onClick={() => navigate("/events/user/login")}>Unauthorised Access. Access to Event Space Employees only</Typography>
              </Box>}
               
        </Grid2>
    </Container>
    </Box>
    </main>)
}