import { Avatar, Box, Button, Container, createTheme, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ImageIcon from '@mui/icons-material/Image';
import EventPriceSlider from "./SliderPrice";
import DurationEvent from "./SliderDuration";
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
import 'dayjs/locale/en-gb'



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
    const [durationError, setDurationError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [messageSubmission, setMessageSubmission] = useState(false)
    
    const [startDate, setStartDate] = useState(dayjs(new Date().toISOString()))
    const [endDate, setEndDate] = useState(dayjs(new Date().toISOString()))
    const [minEndDate, setMinEndDate] = useState(startDate)
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        description: "",
        location: "",
        event_img_url: "",
        price: 0,
        duration: "",
        category: "",
        spaces: "",
        _id: ""
    });
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    
    const handleStartDateChange = (newValue) => {
        setStartDate(newValue)
        setFormData((prev) => ({ ...prev, start: newValue.toISOString() }))
       
    }

    useEffect(()=>{
        setMinEndDate(() => {
            let newDateObj = new Date(startDate)
            newDateObj.setTime(newDateObj.getTime() + 15 * 60_000)
            return dayjs(newDateObj)
        })
    }, [startDate])
    
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
    return (<Box role="alert" aria-live="polite">
        <HostEventLoading />
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

   return (<main role="main" aria-labelledby="create-event-title">
   <Container maxWidth="sm">
        <Paper elevation={10} sx={{mt: 4, p: 4}}>

            <Avatar sx={{ width: 56, height: 56, bgcolor: '#2196f3', mx: 'auto', textAlign: "center", mb: 2 }}>
                <EditCalendarIcon fontSize="large" aria-label="Calendar Icon"/>
            </Avatar>

            <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2}} id="create-event-title" tabIndex={0}>Host an event at Event Space</Typography>
            </ThemeProvider>

            {messageSubmission ? <FormHelperText sx={{mb: 2, fontSize: "15px", color: "red", textAlign: "center", mx: 0.6}} role="alert" tabIndex={0}>
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
            aria-invalid={titleError}
            aria-describedby={`title-helper`}
            fullWidth
            required
            autoFocus
            autoComplete="off"
            sx={{mb: 2.5}}
            /> 
            
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
            <AddLocationIcon color="primary" fontSize="large" sx={{mt: 1, mr: 1.2}} aria-label="location icon"/>
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
            aria-invalid={locationError}
            aria-describedby={`location-helper`}
            required
            autoComplete="off"
            sx={{mb: 2.5,  width: "92%"}}
            /> 
            </Box>

            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
            <ImageIcon color="primary" fontSize="large" sx={{mt: 1, mr: 1.2}} aria-label="Image address icon"/>
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
            aria-invalid={imageAddressError}
            aria-describedby={`image-address-helper`}
            required
            autoComplete="off"
            sx={{mb: 2.5, width: "92%"}}
            />
            </Box>

            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
            <GroupsIcon color="primary" fontSize="large" sx={{mt: 1, mr: 1.2}} aria-label="Spaces Icon"/>
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
            aria-invalid={spacesError}
            aria-describedby={`spaces-helper`}
            required
            autoComplete="off"
            sx={{mb: 2.5, width: "92%"}}
            />
            </Box>


            <Box>
                <Box sx={{mb: 2}}>
                <Typography variant="button" color="primary">Start Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                            disablePast
                            label="Start Date"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Box>

        <Box sx={{mb: 3}}>   
            <Typography variant="button" color="primary">End Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                    disablePast
                    label="End Date"
                    value={minEndDate}
                    onChange={handleEndDateChange}
                    minDate={startDate}
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
            aria-invalid={categoryError}
            aria-describedby={`category-helper`}
            fullWidth
            type="text"
            required
            autoComplete="off"
            sx={{mb: 2.5}}
            /> 

            <EventPriceSlider formData={formData} setFormData={setFormData} aria-label="Event Price"/>

            <DurationEvent formData={formData} setFormData={setFormData} durationError={durationError} setDurationError={setDurationError} aria-label="Duration Event slider"/>

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
            aria-invalid={descriptionError}
            aria-describedby={`description-helper`}
            required
            type="text"
            autoComplete="off"
            sx={{mb: 2.5, mt: 2.5}}
            multiline
            rows={3}
            /> 

            <Button type="submit" variant="contained" fullWidth sx={{mt: 1}} role="button">Create an Event Space</Button>
            </Box>

        </Paper>
    </Container>
    </main>
   )
}