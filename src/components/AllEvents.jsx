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

export default function AllEvents (){
  const [allEvents, setAllEvents] = useState([]) 

  useEffect(() => {
      (async () => {
        try {
          const eventsArr = await getAllEvents()
          console.log(eventsArr)
          setAllEvents(eventsArr)
          return eventsArr
        } catch (err) {
          console.error(err, "From all events")
        }
      })()
  }, [])
    
    return <Box>
        
        <Grid2 container spacing={2} sx={{marginX: {xs: "2.5em", }, marginTop: "2.7em", marginBottom: "2.5em"}}>
                {allEvents.map((event) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3}} key={event._id}>
                    <Paper elevation={6} spacing={5} item="true" sx={{maxHeight: "700px", minHeight: "435px", mb: 2}}>

                        <img src={event.event_img_url} alt='Event Image' className='eventImage'/>

                        <Typography variant="h6" sx={{mx: 2, minHeight: 96, typography: { xs: 'h6', sm: 'body1', md: 'h6'}}} gutterBottom>{event.title}</Typography>
                        <Typography variant='subtitle1' sx={{mx: 2}} gutterBottom>{event.date.slice(0,22) + " GMT"}</Typography>
                        <Typography sx={{color: "grey", mx: 2, fontWeight: "bold"}} gutterBottom>{event.location}</Typography>
                        <Typography variant='h6' sx={{mx: 2, display: "inline-block"}}>{event.price ? "£" + event.price: "FREE" }</Typography>
                        
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                        <Typography sx={{display: "inline-block", mt: -0.7, mr: 2, typography: { xs: 'h6', sm: 'body1', md: 'button'}}} variant='h6'>{event.duration + " hr"}</Typography>
                        <AccessTimeIcon sx={{mr: 2, display: "inline-block", mt: -0.2}}/>
                        </div>

                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                            <Typography sx={{display: "inline-block", mr: 2, typography: { xs: 'h6', sm: 'body1', md: 'button'}}} variant='h6'>{event.spaces + " spaces"}</Typography>
                            <Groups2Icon  sx={{mr: 2, display: "inline-block", mt: 0.4}}></Groups2Icon> 
                        </div>
                        
                        <ButtonGroup
                        color="primary"
                        orientation="horizontal"
                        size="md"
                        variant="solid"
                        sx={{ '--ButtonGroup-radius': '40px', mx: 2, mt: -5.2}}
                        >
                        <Button component={Link} to={`/event/${event._id}`}>View event</Button>
                        </ButtonGroup>
                    </Paper>
            </Grid2>
                ))}
            
        </Grid2>
  
    </Box>
}





const eventsArr = [
    {
      id: 1,
      title: "From Data to Cyber Security: Exploring DMU’s Tech Apprenticeships",
      date: "Wed, 12 Feb 2025 12:00 - 13:00 GMT",
      body: "Join us for an exclusive online information session tailored for employers and current technology professionals. This interactive webinar will explore the benefits of higher and degree apprenticeships, focusing on Level 4 Data Analyst, Level 4 Business Analyst, Level 6 Data Scientist, Level 6 Cyber Security Technical Professional, Level 6 Digital and Technology Solutions Technical Professional, Level 6 Digital User Experience (UX) Professional, and Level 7 Artificial Intelligence data specialist apprenticeships.",
      location: "Manchester",
      event_img_url: "https://www.securitymagazine.com/ext/resources/images/cyber-products-tech-fp1170x650.jpg?1671553963",
      price: 0,
      event_last: 1,
      category: "tech",
      spaces: 5
    },
    {
      id: 2,
      title: "Innovations in Green Technology",
      date: "Fri, 15 Mar 2025 10:00 - 14:00 GMT",
      body: "A day-long event highlighting the latest advancements in green technology and sustainable practices. Keynote speakers from the industry will discuss renewable energy, sustainable design, and the future of eco-friendly technology.",
      event_last: 4,
      location: "London",
      category: "sustainability",
      event_img_url: "https://www.securitymagazine.com/ext/resources/images/cyber-products-tech-fp1170x650.jpg?1671553963",
      price: 20,
      spaces: 50
    },
    {
      id: 3,
      title: "Women in STEM Leadership Summit",
      date: "Tue, 25 Mar 2025 09:00 - 17:00 GMT",
      body: "This summit celebrates and empowers women in STEM fields. Join us for inspirational talks, panel discussions, and networking opportunities aimed at fostering diversity and inclusion in technology, engineering, and science.",
      event_last: 8,
      location: "Birmingham",
      category: "diversity",
      event_img_url: "https://www.securitymagazine.com/ext/resources/images/cyber-products-tech-fp1170x650.jpg?1671553963",
      price: 15,
      spaces: 30
    },
    {
      id: 4,
      title: "AI & Machine Learning Conference 2025",
      date: "Thu, 3 Apr 2025 08:00 - 18:00 GMT",
      body: "Dive into the world of artificial intelligence and machine learning at this annual conference. Explore cutting-edge research, practical applications, and emerging trends with leading experts in the field.",
      event_last: 10,
      location: "Edinburgh",
      category: "AI",
      event_img_url: "https://www.securitymagazine.com/ext/resources/images/cyber-products-tech-fp1170x650.jpg?1671553963",
      price: 50,
      spaces: 100
    },
    {
      id: 5,
      title: "Start-Up Pitch Fest 2025",
      date: "Sat, 20 Apr 2025 15:00 - 18:00 GMT",
      body: "An exciting opportunity for start-ups to pitch their ideas to a panel of investors and industry leaders. Network with entrepreneurs, gain valuable feedback, and connect with potential partners.",
      event_last: 3,
      location: "Leeds",
      category: "business",
      event_img_url: "https://www.securitymagazine.com/ext/resources/images/cyber-products-tech-fp1170x650.jpg?1671553963",
      price: 10,
      spaces: 20
    },
    {
      id: 6,
      title: "The Future of FinTech",
      date: "Mon, 12 May 2025 11:00 - 16:00 GMT",
      body: "Explore how technology is revolutionizing the finance industry. Topics include blockchain, digital payments, AI in banking, and the rise of decentralized finance.",
      event_last: 5,
      location: "Bristol",
      category: "finance",
      event_img_url: "https://www.securitymagazine.com/ext/resources/images/cyber-products-tech-fp1170x650.jpg?1671553963",
      price: 25,
      spaces: 40
    },
    {
      id: 7,
      title: "HealthTech Expo 2025",
      date: "Wed, 22 May 2025 09:00 - 17:00 GMT",
      body: "Discover how technology is transforming healthcare. From wearable tech to AI in diagnostics, this expo brings together healthcare professionals and tech innovators.",
      event_last: 8,
      location: "Liverpool",
      category: "health",
      event_img_url: "https://www.securitymagazine.com/ext/resources/images/cyber-products-tech-fp1170x650.jpg?1671553963",
      price: 30,
      spaces: 75
    },
    {
      id: 8,
      title: "Gaming Innovations Conference",
      date: "Fri, 7 Jun 2025 13:00 - 19:00 GMT",
      body: "A must-attend event for gaming enthusiasts and developers. Learn about the latest gaming trends, meet industry leaders, and explore the future of game design and development.",
      event_last: 6,
      location: "Cardiff",
      category: "gaming",
      event_img_url: "https://www.securitymagazine.com/ext/resources/images/cyber-products-tech-fp1170x650.jpg?1671553963",
      price: 35,
      spaces: 60
    }
  ];