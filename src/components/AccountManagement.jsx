import { Box, Container, createTheme, Grid2, Paper, Stack, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { cancelEventByUser, fetchUserJoinedEvents } from "../API server/api";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Groups2Icon from '@mui/icons-material/Groups2';
import Button from '@mui/joy/Button';
import {Button as SingleButton} from '@mui/material'
import ButtonGroup from '@mui/joy/ButtonGroup';
import { Link, useNavigate } from 'react-router-dom';
import Moment from "react-moment";
import AccountManagmentUserLoading from "./LoadingState/AccountManagementLoading";
import { EventTicketCancelledByUserAlert } from "./Alerts/CancelEventAlert";
import BookingTicketAlertSuccess from "./Alerts/BookingTicketAlert";
import ErrorHandlerClient from "./ErrorState/ErrorIndex";
import GoogleIcon from '@mui/icons-material/Google';
import Modal from "@mui/material/Modal";


const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;
const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
const SCOPES = "https://www.googleapis.com/auth/calendar.events"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AccountManagement ({cancelTicketByUserAlert, setCancelTicketByUserAlert, bookingTicketByUserAlert, setBookingTicketByUserAlert}) {
    const [userID, setUserID] = useState({})
    const [eventsUserJoined, setEventsUserJoined] = useState([])

    const [isClicked, setIsClicked] = useState(false)

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [gapiLoaded, setGapiLoaded] = useState(false)
    const [gisLoaded, setGisLoaded] = useState(false)
    const [tokenClient, setTokenClient] = useState(null)
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [eventGoogleCalendar, setEventGoogleCalendar] = useState({})

    const theme = createTheme({
        typography: {
            fontFamily: 'sniglet',
        }
    })

    useEffect(() => {
        const loadGapiScript = () => {
          const script = document.createElement("script");
          script.src = "https://apis.google.com/js/api.js";
          script.async = true;
          script.defer = true;
          script.onload = () => {
            window.gapi.load("client", async () => {
              await window.gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
              });
              setGapiLoaded(true);
            });
          };
          document.body.appendChild(script);
        };
    
        const loadGisScript = () => {
          const script = document.createElement("script");
          script.src = "https://accounts.google.com/gsi/client";
          script.async = true;
          script.defer = true;
          script.onload = () => {
            const client = window.google.accounts.oauth2.initTokenClient({
              client_id: CLIENT_ID,
              scope: SCOPES,
              callback: (resp) => {
                if (resp.error) return;
                setIsAuthorized(true);
              },
            });
            setTokenClient(client);
            setGisLoaded(true);
          };
          document.body.appendChild(script);
        };
    
        loadGapiScript();
        loadGisScript();
      }, []);

    useEffect(()=> {
        const findUser = localStorage.getItem("user")
        if(findUser){
            const parseUserDetails = JSON.parse(findUser)
            setUserID(parseUserDetails)
        }
    }, [])

    useEffect(()=> {
        (async () => {
            try {
                if(userID._id){
                    setIsLoading(true)
                    const userJoinedEvents = await fetchUserJoinedEvents(userID._id)
                    setIsError(null)
                    setEventsUserJoined(userJoinedEvents)
                    setIsLoading(false)
                    setIsClicked(false)   
                }
            } catch (err) {
                setIsError(err)
                setIsClicked(false)
                setIsLoading(false)
            }
        })()
    }, [userID._id && eventsUserJoined.length && isClicked])


    async function hancleCancelTicketUser(userID, event){
        try {
            setIsLoading(true)
            await cancelEventByUser(userID._id, {id: event._id, spaces: event.spaces})
            setIsError(null)
            setCancelTicketByUserAlert(true)
            setIsLoading(false)
            setIsClicked(!false)
            
        } catch (err) {
            setCancelTicketByUserAlert(false)
            setIsError(err)
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

      const handleAuthClick = () => {
        if (!tokenClient) return
        tokenClient.requestAccessToken()
      }
    
      const handleSignoutClick = () => {
        const token = window.gapi.client.getToken()
        if (token) {
          window.google.accounts.oauth2.revoke(token.access_token, () => {
            window.gapi.client.setToken(null)
            setIsAuthorized(false)
          })
        }
      }
    
      const addEvent = async () => {
        try {
          const event = {
            summary: eventGoogleCalendar.title,
            location: eventGoogleCalendar.location,
            description: eventGoogleCalendar.description,
            start: {
              dateTime: eventGoogleCalendar.start,
              timeZone: "Europe/London",
            },
            end: {
              dateTime: eventGoogleCalendar.end,
              timeZone: "Europe/London",
            },
          }
    
          const request = window.gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          })

          await request.execute((event) => {
            if (event.htmlLink) {
              window.open(event.htmlLink, "_blank");
            } else {
              alert("Event created, but no link available.");
            }
          })
        } catch (error) {
          console.error("Error adding event:", error);
        }
      }
    

    return (<main role="main" aria-labelledby="account-management-title-user">
    <Box sx={{mt: 4}}>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-event-google-calendar"
            aria-describedby="modal-add-event-google-calendar"
          >
            <Box sx={style}>
              <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
              <GoogleIcon color="primary" sx={{ mr: 2, mt: -1.4}}/>
              <Typography variant="h6" gutterBottom>
                Google Calendar
              </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAuthClick}
                  disabled={!gapiLoaded || !gisLoaded}
                >
                  {isAuthorized ? "Refresh" : "Authorize"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleSignoutClick}
                  disabled={!isAuthorized}
                >
                  Sign Out
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={addEvent}
                  disabled={!isAuthorized}
                >
                  Add Event
                </Button>
              </Stack>
            </Box>
          </Modal>

        <Container maxWidth="sm">

        <Box sx={{display: "flex", justifyContent: "center", boxShadow: 10, p: 0.5, mb: 4}}  >
            <ThemeProvider theme={theme}>
            <Typography component={"h1"} variant="h3" sx={{color: 'primary.dark'}} id="account-managment-title">Your Event Space</Typography>
            </ThemeProvider>
        </Box>

        </Container>

          {cancelTicketByUserAlert ? <Box sx={{mb: 3}} role="alert" aria-live="polite">
                    <EventTicketCancelledByUserAlert setCancelTicketByUserAlert={setCancelTicketByUserAlert} />
                </Box> : null}

            {bookingTicketByUserAlert ? <Box sx={{mb: 3}} role="alert" aria-live="polite">
                    <BookingTicketAlertSuccess setBookingTicketByUserAlert={setBookingTicketByUserAlert} />
                </Box> : null}

    <Container maxWidth="lg">
        <Grid2 container spacing={4}>

            <Grid2 size={{xs: 12, sm: 12, md: 12}}>
                
            <Paper elevation={10} sx={{p: 4}}>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                <Typography variant="h6" sx={{textAlign: "center"}}>
                  Account Management: All Your Event Tickets In One Place</Typography>
                <br></br>
                </Box>
                </Paper>
            </Grid2>

            {eventsUserJoined.length ? eventsUserJoined.map((event) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4}} key={event._id} role="article" aria-labelledby={`event-title-${event._id}`}>

                <Paper elevation={8}  sx={{maxHeight: "900px", minHeight: "300px", gap: 2, pb: 4}}>

                <img src={event.event_img_url} alt={`${event.title} Image`} role="img" className='eventImage' onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1642618598178-52eb00dc544d?q=80&w=3390&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
                          }}/>

                <Typography variant="h6" sx={{mx: 2, minHeight: 96, typography: { xs: 'h6', sm: 'body1', md: 'h6'}}} id={`event-title-${event.title}`} tabIndex={0} gutterBottom>{event.title}</Typography>
                <Typography variant='subtitle1' sx={{mx: 2, color: "primary.main", fontWeight: "bold"}} gutterBottom><Moment format="LLL">{event.start}</Moment> {">>>"} <Moment format="LT">{event.end}</Moment></Typography>
                <Typography sx={{color: "grey", mx: 2, fontWeight: "bold"}} tabIndex={0} gutterBottom>{event.location}</Typography>
                <Typography variant='h6' sx={{mx: 2, display: "inline-block"}}>{event.price ? "£" + event.price: "FREE" }</Typography>

                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                        <Typography sx={{display: "inline-block", mt: -1.4, mr: 2, typography: { xs: 'h6', sm: 'body1', md: 'button'}}} variant='h6'>{event.duration + " hr"}</Typography>
                        <AccessTimeIcon sx={{mr: 2, display: "inline-block", mt: -1.4, mb: 1 }} aria-label="Duration Icon"/>
                    </div>

                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                        <Typography sx={{display: "inline-block", mr: 2, mt: -0.4, typography: { xs: 'h6', sm: 'body1', md: 'button'}}} variant='h6'>{event.spaces + " spaces"}</Typography>
                        <Groups2Icon  sx={{mr: 2, display: "inline-block", mt: -0.5}} aria-label="Spaces Available Icon"></Groups2Icon> 
                    </div>

                    <ButtonGroup
                        color="primary"
                        orientation="horizontal"
                        size="md"
                        variant="solid"
                        sx={{ '--ButtonGroup-radius': '40px', mx: 2, mt: -4.9}}
                        
                        >
                        <Button component={Link} to={`/event/${event._id}`} role="button">View event</Button>
                        </ButtonGroup>

                        <Stack spacing={3} direction="column" sx={{display: "flex", justifyContent: "center", mt: 3, alignItems: "center"}}>

                            <SingleButton variant="contained" sx={{width: "93%", color: "error", borderRadius: "20px"}} color="error" role="button" onClick={() => {
                                setEventGoogleCalendar(event)
                                handleOpen()
                                }}>
                            <GoogleIcon aria-label="Google Icon" sx={{mr: 2}} onClick={() => {
                                setEventGoogleCalendar(event)
                                handleOpen()
                                }}/>Add To Google Calender</SingleButton>


                            <SingleButton variant="contained" sx={{width: "93%", color: "error", borderRadius: "20px"}} color="warning" role="button" onClick={()=> {
                                return hancleCancelTicketUser(userID, event)
                            }}>Cancel Ticket</SingleButton>
                        </Stack>
                        
                </Paper>
            </Grid2>
            )): <Box sx={{mx: "auto"}}>
              <Typography variant="button" fontSize={"20px"} color="primary" tabIndex={0} onClick={() => navigate("/")}>You Have not joined any Events. Please Visit Event Space</Typography>
              </Box>}
               
        </Grid2>
    </Container>
    </Box>
    </main>)
}