import { Box, Grid2, Typography } from '@mui/material';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Paper from '@mui/material/Paper';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Groups2Icon from '@mui/icons-material/Groups2';
import { useEffect } from 'react';
import { getAllEvents } from '../API server/api';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AllEvents ({searchTitle}){
  const [allEvents, setAllEvents] = useState([]) 
  useEffect(() => {
      (async () => {
        try {
          const eventsArr = await getAllEvents(searchTitle)
          setAllEvents(eventsArr)
          return eventsArr
        } catch (err) {
          console.error(err, "From all events")
        }
      })()
  }, [searchTitle.search])
    
    return <Box>
        
        <Grid2 container spacing={2} sx={{marginX: {xs: "2.5em"}, marginTop: "2.7em", marginBottom: "2.5em"}}>
                {Array.isArray(allEvents) ? allEvents.map((event) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3}} key={event._id}>
                    <Paper elevation={6} spacing={5} item="true" sx={{maxHeight: "700px", minHeight: "435px", mb: 2}}>

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
                    </Paper>
            </Grid2>
                )): <Grid2 size={{xs: 12, sm: 6, md: 6 }} offset={{ sm: 3, md: 3}} sx={{mt: 3}}>
                  <Paper elevation={6}  sx={{display: "flex", justifyContent: "center", p:3 }}>
                <Typography variant='button' sx={{align: "center", fontSize: "20px", color : 'red'}}>{allEvents.replace(/\\\S\+/g, " ") + ". Please try again."}</Typography>
                </Paper>
               </Grid2>}
            
        </Grid2>
  
    </Box>
}
