import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getEventById } from "../API server/api"
import { Box, Container, createTheme, Grid2, Paper, styled, ThemeProvider, Typography } from "@mui/material"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import Calendar from 'react-calendar';




export default function EventInformation() {

    const theme = createTheme({
        typography: {
            fontFamily: 'sniglet'
        }
    })

    const {event_id} = useParams()

    const [eventByID, setEventByID] = useState({})
    const [value, onChange] = useState(new Date())

    useEffect(() => {
       (async () => {
        try {
            const eventInfo = await getEventById(event_id)
            setEventByID(eventInfo)
            console.log(eventInfo)
            return eventInfo
        } catch (err) {
            console.error(err, "Error from event Information")
        }
    })()
    }, [])

    const Item = styled(Typography)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.h4,
        padding: theme.spacing(1),
        textAlign: 'start',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      }));

    return <Box>
    
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
        }}
        src={eventByID.event_img_url}
        alt="Event Image"
        >
        </Box>
    </Box>

        <Box>
            <Container maxWidth="lg">
        <Grid2 container spacing={2}>

        <Grid2 size={{ xs: 12, sm: 6, md: 7 }} sx={{my: 3}}>
            <ThemeProvider theme={theme}>
          <Typography variant="h4" sx={{ typography: {xs: "h5", md: "h4"}}}>{eventByID.title}</Typography>
          </ThemeProvider>
          <Typography variant="h5" sx={{ mt: 2}}>Date and Time</Typography>
          <Typography variant="subtitle1" sx={{mt: 0.5}}>{eventByID.date}</Typography>

          <Box sx={{display: "flex", flexDirection: "row", alignItems: "end", mb: 2}}>
          <LocationOnIcon sx={{color: "orange", mt: 2, mr: 1}} fontSize="large"/>
          <Typography variant="body1" sx={{fontWeight: "bold", fontSize: "19px"}}>{eventByID.location}</Typography>
          </Box>

          <Box sx={{display: "flex", flexDirection: "row", mb: 2}}>
          <CategoryIcon sx={{ color: "#2196f3", mr: 1}} fontSize="large"/>
          <Typography variant="body1" sx={{fontWeight: "bold", fontSize: "19px"}}>{eventByID.category ? eventByID.category.slice(0,1).toUpperCase() + eventByID.category.slice(1) : null}</Typography>
          </Box>

          <Box sx={{display: "flex", flexDirection: "row", mb: 2, alignItems: "center"}}>
            <TimelapseIcon fontSize="large" />
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
            bgcolor: '#4caf50',
          },
        }}>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>

            <Box component={"section"} sx={{
                 p: 2, border: '5px dashed grey',
                 marginTop: 3,
                 textAlign: "center",
                 mx: 3
            }}>
                {eventByID.spaces} Spaces Available
            </Box>
            <Box sx={{
               p: 2, border: '5px dashed grey',
               marginTop: 3,
               textAlign: "center",
               mx: 3
            }}>
                {eventByID.price ? "£" + eventByID.price : "FREE"} 
            </Box>
            <Stack direction="column" sx={{mx: 3, mt: 3}}>
                <Button variant="contained" color="success">
                    Get Ticket
                </Button>
            </Stack>
            </Box>
        </Box>
            <Box sx={{display: "flex", ml: 3}}>
            <Calendar onChange={onchange} value={value}  />
            </Box>
        </Grid2>
        
    
        </Grid2>
        </Container>
        </Box>
    </Box>
}

