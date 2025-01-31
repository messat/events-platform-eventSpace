import { Box, Container, createTheme, Grid2, Paper, Stack, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { cancelEventByUser, fetchUserJoinedEvents } from "../API server/api";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Groups2Icon from '@mui/icons-material/Groups2';
import Button from '@mui/joy/Button';
import {Button as SingleButton} from '@mui/material'

import ButtonGroup from '@mui/joy/ButtonGroup';
import { Link } from 'react-router-dom';
import AccountManagmentUserLoading from "./LoadingState/AccountManagementLoading";


export default function AccountManagement () {
    
    const [userID, setUserID] = useState({})

    const [eventsUserJoined, setEventsUserJoined] = useState([])

    const [isClicked, setIsClicked] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const theme = createTheme({
        typography: {
            fontFamily: 'sniglet',
        }
    })

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
                    setEventsUserJoined(userJoinedEvents)
                    setIsLoading(false)
                    setIsClicked(false)   
                }
            } catch (err) {
                console.error("error from Account management", err)
                setIsClicked(false)
                setIsLoading(false)
            }
        })()
    }, [userID._id && eventsUserJoined.length && isClicked])

if(isLoading){
    return (<Box>
        <AccountManagmentUserLoading />
    </Box>)
}

    return (<Box sx={{mt: 4}}>
        <Container maxWidth="sm">
        <Box sx={{display: "flex", justifyContent: "center", boxShadow: 10, p: 0.5, mb: 4}}  >
            <ThemeProvider theme={theme}>
            <Typography component={"h1"} variant="h3" sx={{color: 'primary.dark'}}>Your Event Space</Typography>
            </ThemeProvider>
        </Box>
        </Container>
    <Container maxWidth="lg">
        <Grid2 container spacing={4}>

            <Grid2 size={{xs: 12, sm: 12, md: 12}}>
                
            <Paper elevation={10} sx={{p: 4}}>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                <Typography variant="h6" sx={{textAlign: "center"}}>Account Management: All Your Event Tickets In One Place</Typography>
                <br></br>
                </Box>
                </Paper>
            </Grid2>

            {eventsUserJoined.length ? eventsUserJoined.map((event) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4}} key={event._id}>
                <Paper elevation={8}  sx={{maxHeight: "900px", minHeight: "300px", gap: 2, pb: 4}}>
                <img src={event.event_img_url} alt='Event Image' className='eventImage'/>
                <Typography variant="h6" sx={{mx: 2, minHeight: 96, typography: { xs: 'h6', sm: 'body1', md: 'h6'}}} gutterBottom>{event.title}</Typography>
                <Typography variant='subtitle1' sx={{mx: 2}} gutterBottom>{event.date.slice(0,22) + " GMT"}</Typography>
                <Typography sx={{color: "grey", mx: 2, fontWeight: "bold"}} gutterBottom>{event.location}</Typography>
                <Typography variant='h6' sx={{mx: 2, display: "inline-block"}}>{event.price ? "£" + event.price: "FREE" }</Typography>

                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                        <Typography sx={{display: "inline-block", mt: -1.4, mr: 2, typography: { xs: 'h6', sm: 'body1', md: 'button'}}} variant='h6'>{event.duration + " hr"}</Typography>
                        <AccessTimeIcon sx={{mr: 2, display: "inline-block", mt: -1.4, mb: 1 }}/>
                    </div>

                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                        <Typography sx={{display: "inline-block", mr: 2, mt: -0.4, typography: { xs: 'h6', sm: 'body1', md: 'button'}}} variant='h6'>{event.spaces + " spaces"}</Typography>
                        <Groups2Icon  sx={{mr: 2, display: "inline-block", mt: -0.5}}></Groups2Icon> 
                    </div>

                    <ButtonGroup
                        color="primary"
                        orientation="horizontal"
                        size="md"
                        variant="solid"
                        sx={{ '--ButtonGroup-radius': '40px', mx: 2, mt: -4.9}}
                        >
                        <Button component={Link} to={`/event/${event._id}`}>View event</Button>
                        </ButtonGroup>
                        <Stack spacing={2} direction="row" sx={{display: "flex", justifyContent: "center", mt: 2}}>
                            <SingleButton variant="contained" sx={{width: "93%", color: "error", borderRadius: "20px"}} color="warning" onClick={()=> {
                                cancelEventByUser(userID._id, {id: event._id, spaces: event.spaces})
                                setIsClicked(!false)
                            }}>Cancel Ticket</SingleButton>
                        </Stack>
                </Paper>
            </Grid2>
            )): null}
               
        </Grid2>
    </Container>
    </Box>)
}