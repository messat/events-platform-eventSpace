import { Avatar, Box, Button, Container, createTheme, Grid2, Link, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate} from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ImageIcon from '@mui/icons-material/Image';
import EventPriceSlider from "./SliderPrice";
import DurationSlider from "./SliderDuration";
import GroupsIcon from '@mui/icons-material/Groups';
import FormHelperText from '@mui/material/FormHelperText';
import { createEventInEventSpace } from "../../API server/api";


export default function CreateEvent() {

    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext)
    const theme = createTheme({
        typography: {
            fontFamily: "sniglet"
        }
    })
    const navigate = useNavigate()

    useEffect(() => {
        const employee = localStorage.getItem("employee")
        const parseEmployeeDetails = JSON.parse(employee)
        setFormData((prev) => {
            return {...prev, _id: parseEmployeeDetails._id}
        })
    }, [])

    const [formData, setFormData] = useState({title: "", date: "", description: "", location: "", event_img_url: "", price: 0, duration: 2, category: "", spaces: "", _id: ""})
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const newEvent = await createEventInEventSpace(formData)
            console.log(newEvent)
            navigate("/")
            return newEvent
        } catch (err) {
            console.error(err, "From handle submit - register user")
        }     
    }

   return (<Container maxWidth="sm">
        <Paper elevation={10} sx={{mt: 4, p: 4}}>

            <Avatar sx={{ width: 56, height: 56, bgcolor: '#2196f3', mx: 'auto', textAlign: "center", mb: 2 }}>
                <EditCalendarIcon fontSize="large" />
            </Avatar>

            <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2}}>Host an event at Event Space</Typography>
            </ThemeProvider>

            <Box component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{mx: 1}}
            >
            <TextField 
            id="title-event"
            label="Title"
            variant="outlined"
            placeholder="Enter the title of the event"
            name="title"
            value={formData.title}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value }
                })
            }}
            fullWidth
            required
            autoFocus
            autoComplete="off"
            sx={{mb: 2}}
            /> 
            
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
            <AddLocationIcon color="primary" fontSize="large" sx={{mt: 1, mr: 1.2}}/>
            <TextField 
            id="location-event"
            label="Location"
            variant="outlined"
            placeholder="Enter the location of the event"
            name="location"
            value={formData.location}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value }
                })
            }}
            required
            autoComplete="off"
            sx={{mb: 2,  width: "92%"}}
            /> 
            </Box>

            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
            <ImageIcon color="primary" fontSize="large" sx={{mt: 1, mr: 1.2}}/>
            <TextField 
            id="event_image_url-event"
            label="Image Address Link"
            variant="outlined"
            placeholder="Enter the Image URL"
            type="text"
            name="event_img_url"
            value={formData.event_img_url}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value.trim()}
                })
            }}
            required
            autoComplete="off"
            sx={{mb: 2, width: "92%"}}
            />
            </Box>


            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
            <GroupsIcon color="primary" fontSize="large" sx={{mt: 1, mr: 1.2}}/>
            <TextField 
            id="spaces-event"
            label="Spaces Available"
            variant="outlined"
            placeholder="Enter the spaces available for the event"
            type="number"
            inputMode="numeric"
            name="spaces"
            value={formData.spaces}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value}
                })
            }}
            required
            autoComplete="off"
            sx={{mb: 2, width: "92%"}}
            />
            </Box>

            <Box sx={{mt: 1.5}}>
                <Typography variant="button" color="primary">Date of Event</Typography>
                <FormHelperText sx={{mb: 1}} >Enter date in this format date: Sat, 20 Apr 2025 15:00 - 18:00 GMT</FormHelperText>
            <TextField 
            id="event_date"
            label="Event Date"
            variant="outlined"
            placeholder="Enter the date of event"
            type="text"
            name="date"
            value={formData.date}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value}
                })
            }}
            required
            autoComplete="off"
            sx={{mb: 2, width: "100%"}}
            />
            </Box>



            <TextField 
            id="category-event"
            label="Category"
            variant="outlined"
            name="category"
            placeholder="Enter the event category"
            value={formData.category}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value}
                })
            }}
            fullWidth
            type="text"
            required
            autoComplete="off"
            sx={{mb: 2}}
            /> 

            <EventPriceSlider formData={formData} setFormData={setFormData} />

            <DurationSlider formData={formData} setFormData={setFormData} />

            <TextField 
            id="description-event"
            label="About the Event"
            variant="outlined"
            placeholder="Enter the description of the event"
            fullWidth
            name="description"
            value={formData.description}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value}
                })
            }}
            required
            type="text"
            autoComplete="off"
            sx={{mb: 2, mt: 2.5}}
            multiline
            rows={3}
            /> 

            <Button type="submit" variant="contained" fullWidth sx={{mt: 1}}>Create an Event Space</Button>
            </Box>

            <Grid2 container justifyContent="end" sx={{mt: 3, ml: 1}}>
                

      
            </Grid2>

        </Paper>
    </Container>
   )
}