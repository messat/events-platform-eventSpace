import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getEventById, signUpUserToEvent } from "../API server/api"
import { Box, Container, createTheme, Grid2, ThemeProvider, Typography } from "@mui/material"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import Calendar from 'react-calendar';
import Groups2Icon from '@mui/icons-material/Groups2';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import Moment from 'react-moment';
import EventInfoLoadingScreen, { SignUpTicketLoading } from "./LoadingState/EventInfoLoading";
import ErrorHandlerClient from "./ErrorState/ErrorIndex";



export default function EventInformation({setBookingTicketByUserAlert}) {
    const theme = createTheme({
        typography: {
            fontFamily: 'sniglet'
        }
    })

    const navigate = useNavigate()
    
    const {event_id} = useParams()

    const [eventByID, setEventByID] = useState({author: {firstname: "Farhana", lastname: "Essat"}})
    const [userID, setUserID] = useState({_id :""}) 
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const [isLoadingTicket, setIsLoadingTicket] = useState(false)

    const [isError, setIsError] = useState(null)

    const [value, onChange] = useState(new Date())

    useEffect(() => {
       (async () => {
        try {
            setIsLoading(true)
            const eventInfo = await getEventById(event_id)
            setIsError(null)
            setEventByID((prev) => {
                return {...prev, ...eventInfo}
            })
            if(eventByID.attendees && userID._id && eventByID.attendees.includes(userID._id)){
                setIsClicked(!false)
            }
            setIsLoading(false)
            return eventInfo
        } catch (err) {
            setIsLoading(false)
            setIsError(err)
            setIsClicked(false)
        }
    })()
    }, [JSON.stringify(eventByID.attendees)])

      useEffect(()=> {
        const findUser = localStorage.getItem("user")
        if(findUser){
            const parseUser = JSON.parse(findUser)
            setUserID((prev) => {
                return {...prev, _id: parseUser._id}
            })
        }
    }, [])
    
      async function handleSignUp(event) {
        event.preventDefault()
        try {
            const checkUserLogin = JSON.parse(localStorage.getItem("user"))
            const checkEmployeeLogin = JSON.parse(localStorage.getItem("employee"))
            if(!checkUserLogin){
                navigate("/events/user/login", { state: `/event/${event_id}`})
            } 
            if(checkEmployeeLogin){
                navigate(`/event/${event_id}`)
            }
            setIsLoadingTicket(true)
            const signUp = await signUpUserToEvent(event_id, userID)
            setIsError(null)
            setBookingTicketByUserAlert(true)
            setIsClicked(!false)
            setIsLoadingTicket(false)
            setEventByID(signUp)
            navigate("/events/user/account-management")
        } catch (err) {
            setIsError(err)
            setIsClicked(false)
            setBookingTicketByUserAlert(false)
            setIsLoadingTicket(false)
        }
      }


if(isLoading){
    return (<Box role="alert" aria-live="polite">
        <EventInfoLoadingScreen />
    </Box>)
}

if(isLoadingTicket){
    return (<Box role="alert" aria-live="polite">
        <SignUpTicketLoading  eventByID={eventByID}/>
    </Box>)
}


if(isError){
    if(!isError.response){
    return (<Box role="alert" aria-live="polite">
        <ErrorHandlerClient isError={isError} />
        </Box>)
    } else {
        setIsError(null)
    }
}



    return (<main role="main" aria-labelledby="event-information-page">
    <Box>
    
    <Box sx={{display: "flex", justifyContent: "center"}}>
        <Box
        component={"img"}
        sx={{
            mt: 3,
            height: 500,
            width: 1300,
            objectFit: "fill",
            borderRadius: "15px",
            maxHeight: { xs: 250, sm: 400, md: 500 },
            maxWidth: { xs: 400,sm: 650, md: 1300 },
            boxShadow: 15
        }}
        src={eventByID.event_img_url}
        alt={`${eventByID.title} Image`}
        onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1642618598178-52eb00dc544d?q=80&w=3390&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
            }}
        >
        </Box>
    </Box>

        <Box>
            <Container maxWidth="lg">
        <Grid2 container spacing={2}>

        <Grid2 size={{ xs: 12, sm: 6, md: 7 }} sx={{my: 3}}>
            
            <ThemeProvider theme={theme}>
          <Typography variant="h4" sx={{ typography: {xs: "h5", md: "h4"}}} color="primary" id="event title" tabIndex={0}>{eventByID.title}</Typography>
          </ThemeProvider>
          
        {eventByID.author ?
          <Box sx={{bgcolor: "#eeeeee", p: 2, my: 1, borderRadius: 2, mt: 2}}>
          <Typography tabIndex={0}>{eventByID.author.firstname} {" "} {eventByID.author.lastname} is hosting the event</Typography>
          </Box>
            : null}

          <Typography variant="h5" sx={{ mt: 2}}>Date and Time</Typography>
          <Typography variant="subtitle1" sx={{mt: 0.5, color: "primary.main", fontWeight: "bold"}}><Moment format="LLL">{eventByID.start}</Moment> {">>>"} <Moment format="LT">{eventByID.end}</Moment></Typography>

          <Box sx={{display: "flex", flexDirection: "row", alignItems: "end", mb: 2}}>
          <LocationOnIcon sx={{color: "orange", mt: 2, mr: 1}} fontSize="large" aria-label="Location Icon"/>
          <Typography variant="body1" sx={{fontWeight: "bold", fontSize: "19px"}}>{eventByID.location}</Typography>
          </Box>

          <Box sx={{display: "flex", flexDirection: "row", mb: 2}}>
          <CategoryIcon sx={{ color: "#2196f3", mr: 1}} fontSize="large" aria-label="Category Icon"/>
          <Typography variant="body1" sx={{fontWeight: "bold", fontSize: "19px"}}>{eventByID.category ? eventByID.category.slice(0,1).toUpperCase() + eventByID.category.slice(1) : null}</Typography>
          </Box>

          <Box sx={{display: "flex", flexDirection: "row", mb: 2, alignItems: "center"}}>
            <TimelapseIcon fontSize="large" aria-label="Duration Icon"/>
            <Typography variant="body1" sx={{fontWeight: "bold", fontSize: "19px", ml: 1}}>{eventByID.duration + " hr"}</Typography>
          </Box>

            <Typography variant="h5" gutterBottom>About this event</Typography>
            <Typography sx={{textAlign: "justify", fontSize: "18px"}}>{eventByID.description}</Typography>

        </Grid2>
        
        <Grid2 size={{ xs: 12, sm: 6, md: 5 }} sx={{mt: {xs: 1, sm: 3, md: 3}}}>

          <Box sx={{
          mb: 3,  
          width: {xs: 400, sm: 350, md: 400},
          minWidth: 200,
          height: 250,
          borderRadius: 1,
          bgcolor: '#2196f3',
          '&:hover': {
            bgcolor: '#90caf9',
          },
        }}>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <Box component={"section"} sx={{
                border: '5px dashed white',
                marginTop: 3,
                textAlign: "center",
                mx: 3,
            }}>
                <Groups2Icon fontSize="large" aria-label="Spaces Icon"/>
                <Typography variant="h6" tabIndex={0}>{eventByID.spaces} Spaces</Typography>
            </Box>
            <Box sx={{
               border: '5px dashed white',
               marginTop: 3,
               textAlign: "center",
               mx: 3,
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               alignItems: "center"
            }}>
                <CurrencyPoundIcon fontSize="medium" aria-label="Currency Icon"/>
                <Typography variant="h6" fontSize={"23px"}>{eventByID.price ? eventByID.price : "FREE"}</Typography>
            </Box>
            <Stack direction="column" sx={{mx: 3, mt: 3}}>
                <Button variant="contained" color="success" onClick={handleSignUp} disabled={isClicked} role="button" aria-label={isClicked ? "Already Signed Up" : "Get Ticket"}>
                  {eventByID._id && userID._id && eventByID.attendees.includes(userID._id) ? "Already Signed up to this event" : "Get Ticket"}  
                </Button>
            </Stack>
            </Box>
        </Box>
            <Box sx={{display: "flex", ml: 3}}>
            <Calendar onChange={onchange} value={value} aria-label="Calendar" />
            </Box>
        </Grid2>
        
    
        </Grid2>
        </Container>
        </Box>
    </Box>
    </main>)
}

