import { Box, Grid2, Typography } from '@mui/material';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Paper from '@mui/material/Paper';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Groups2Icon from '@mui/icons-material/Groups2';
import CategoryIcon from '@mui/icons-material/Category';
import { useEffect } from 'react';
import { getAllEvents } from '../API server/api';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingEvents from './LoadingState/EventsLoading';
import ErrorHandlerClient from './ErrorState/ErrorIndex';

export default function AllEvents ({searchTitle}){

  const [allEvents, setAllEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
      (async () => {
        try {
          setIsLoading(true)
          const eventsArr = await getAllEvents(searchTitle)
          setIsError(null)
          setAllEvents(eventsArr)
          setIsLoading(false)
          return eventsArr
        } catch (err) {
          setIsError(err)
          setIsLoading(false)
        }
      })()
  }, [searchTitle.search])

  if(isLoading){
    return (<Box>
    <LoadingEvents />
    </Box>)
  }

  if(isError){
    return (<Box>
      <ErrorHandlerClient isError={isError} />
    </Box>)
  }
  
    
    return <Box>
        
        <Grid2 container spacing={2} sx={{marginX: {xs: "2.5em"}, marginTop: "2.7em", marginBottom: "2.5em"}}>
                {Array.isArray(allEvents) ? allEvents.map((event) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3}} key={event._id}>
                    
                        <Paper elevation={6} spacing={5} item="true" sx={{maxHeight: "700px", minHeight: "465px", mb: 2}}>

                        <img src={event.event_img_url} alt='Event Image' className='eventImage' 
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1642618598178-52eb00dc544d?q=80&w=3390&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
                          }}/>

                        <Typography variant="h6" sx={{mx: 2, minHeight: 96, typography: { xs: 'h6', sm: 'body1', md: 'h6'}}} gutterBottom>{event.title}</Typography>
                        <Typography variant='subtitle1' sx={{mx: 2}} gutterBottom>{event.date ? event.date : event.start + " GMT"}</Typography>
                        <Typography sx={{color: "grey", mx: 2, fontWeight: "bold", height: "40px"}} gutterBottom>{event.location}</Typography>
                        <Typography variant='h6' sx={{mx: 2, display: "inline-block"}}>{event.price ? "£" + event.price: "FREE" }</Typography>
                        
                        <Box >
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                        <Typography sx={{display: "inline-block", mt: -5, mr: 2, typography: { xs: 'button', sm: 'body1', md: 'button'}}} variant='h6'>{event.category.slice(0, 1).toUpperCase() + event.category.slice(1)}</Typography>
                        <CategoryIcon sx={{mr: 2, display: "inline-block", mt: -5 }}/>
                        </div>

                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                        <Typography sx={{display: "inline-block", mt: -1.4, mr: 2, typography: { xs: 'button', sm: 'body1', md: 'button'}}} variant='h6'>{event.duration + " hr"}</Typography>
                        <AccessTimeIcon sx={{mr: 2, display: "inline-block", mt: -1.4, mb: 1 }}/>
                        </div>

                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                            <Typography sx={{display: "inline-block", mr: 2, mt: -0.4, typography: { xs: 'h6', sm: 'body1', md: 'button'}}} variant='h6'>{event.spaces + " spaces"}</Typography>
                            <Groups2Icon  sx={{mr: 2, display: "inline-block", mt: {xs: 0.1, sm: -0.5}}}></Groups2Icon> 
                        </div>
                        </Box>
                        
                        <ButtonGroup
                        color="primary"
                        orientation="horizontal"
                        size="md"
                        variant="solid"
                        sx={{ '--ButtonGroup-radius': '40px', mx: 1.5, mt: -4.4}}
                        >
                        <Button component={Link} to={`/event/${event._id}`}>View event</Button>
                        </ButtonGroup>

                    </Paper>
            </Grid2>
                )): <Grid2 size={{xs: 12, sm: 6, md: 6 }} offset={{ sm: 3, md: 3}} sx={{mt: 3}}>
                  <Paper elevation={6}  sx={{display: "flex", justifyContent: "center", p:3 }}>
                <Typography variant='button' sx={{align: "center", fontSize: "20px", color : 'red'}}>
                  {allEvents.replace(/\\\S\+/g, " ") + ". Please try again."}</Typography>
                </Paper>
               </Grid2>}
            
        </Grid2>
  
    </Box>
}
