import { Avatar, Box, Button, Container, createTheme, Grid2, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ImageIcon from '@mui/icons-material/Image';
import EventPriceSlider from "./SliderPrice";
import DurationSlider from "./SliderDuration";
import GroupsIcon from '@mui/icons-material/Groups';
import FormHelperText from '@mui/material/FormHelperText';
import { createEventInEventSpace } from "../../API server/api";
import HostEventLoading from "../LoadingState/HostingEventLoading";
import ErrorHandlerClient from "../ErrorState/ErrorIndex";
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function CreateEvent({setCreateEventAlert}) {

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

    
    const [titleError, setTitleError] = useState(false)
    const [locationError, setLocationError] = useState(false)
    const [imageAddressError, setImageAddressError] = useState(false)
    const [spacesError, setSpacesError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [messageSubmission, setMessageSubmission] = useState(false)
    
    const [startDate, setStartDate] = useState(dayjs('2025-02-03T15:30'))
    const [endDate, setEndDate] = useState(dayjs('2025-02-03T15:30'))
    
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        description: "",
        location: "",
        event_img_url: "",
        price: 0,
        duration: 2,
        category: "",
        spaces: "",
        _id: ""
    });
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    
    const handleStartDateChange = (newValue) => {
        setStartDate(newValue);
        setFormData((prev) => ({ ...prev, start: newValue.toISOString() }))
    }
    
    const handleEndDateChange = (newValue) => {
        setEndDate(newValue)
        setFormData((prev) => ({ ...prev, end: newValue.toISOString() }))
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
           
            setIsLoading(true)
            const newEvent = await createEventInEventSpace(formData)
            setIsError(null)
            setCreateEventAlert(true)
            setMessageSubmission(false)
            setIsLoading(false)
            navigate("/events/vpn/employee/account-management")
            return newEvent
        } catch (err) {
            setCreateEventAlert(false)
            setIsError(err)
            setIsLoading(false)
            setMessageSubmission(true)
        }     
    }

if(isLoading){
    return (<Box>
        <HostEventLoading />
    </Box>)
}

if(isError){
    if(!isError.response){
      return (<Box>
        <ErrorHandlerClient isError={isError} />
    </Box>)
    } else {
        setIsError(null)
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

            {messageSubmission ? <FormHelperText sx={{mb: 2, fontSize: "15px", color: "red", textAlign: "center", mx: 0.6}}>
                Please review the form carefully as some fields contain invalid information. Please check for missing or incorrect details and try again.
                </FormHelperText> : ""}

            <Box component="form"
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
                if(event.target.validity.valid){
                    setTitleError(false)
                } else {
                    setTitleError(true)
                }
            }}
            error={titleError}
            helperText={titleError ? "Please Enter A Title" : ""}
            fullWidth
            required
            autoFocus
            autoComplete="off"
            sx={{mb: 2.5}}
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
                if(event.target.validity.valid){
                    setLocationError(false)
                } else {
                    setLocationError(true)
                }
            }}
            error={locationError}
            helperText={locationError ? "Please Enter A Valid Location" : ""}
            required
            autoComplete="off"
            sx={{mb: 2.5,  width: "92%"}}
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
                if(event.target.validity.valid){
                    setImageAddressError(false)
                } else {
                    setImageAddressError(true)
                }
            }}
            error={imageAddressError}
            helperText={imageAddressError ? "Please Enter A Image Address Link" : ""}
            required
            autoComplete="off"
            sx={{mb: 2.5, width: "92%"}}
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
                if(event.target.validity.valid){
                    setSpacesError(false)
                } else {
                    setSpacesError(true)
                } 
            }}
            error={spacesError}
            helperText={spacesError ? "Please Enter A Valid Number" : ""}
            required
            autoComplete="off"
            sx={{mb: 2.5, width: "92%"}}
            />
            </Box>


            <Box>
                <Box sx={{mb: 2}}>
                <Typography variant="button" color="primary">Start Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                            label="Start Date"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Box>

        <Box sx={{mb: 3}}>   
            <Typography variant="button" color="primary">End Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                    label="End Date"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
                </DemoContainer>
            </LocalizationProvider>
        </Box> 

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
                if(event.target.validity.valid){
                    setCategoryError(false)
                } else {
                    setCategoryError(true)
                } 
            }}
            error={categoryError}
            helperText={categoryError ? "Please Enter A Category" : ""}
            fullWidth
            type="text"
            required
            autoComplete="off"
            sx={{mb: 2.5}}
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
                if(event.target.validity.valid){
                    setDescriptionError(false)
                } else {
                    setDescriptionError(true)
                } 
            }}
            error={descriptionError}
            helperText={descriptionError ? "Please Enter A Description About The Event" : ""}
            required
            type="text"
            autoComplete="off"
            sx={{mb: 2.5, mt: 2.5}}
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