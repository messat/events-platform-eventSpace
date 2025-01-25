import { Avatar, Box, Button, Container, createTheme, Grid2, Link, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate} from 'react-router-dom'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useState } from "react";
import { registerUserEventSpace } from "../API server/api";

export default function RegisterUser() {

    const theme = createTheme({
        typography: {
            fontFamily: "sniglet"
        }
    })
    const navigate = useNavigate()

    const [formData, setFormData] = useState({firstname: "", lastname: "", email: "", username: "", password: ""})


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const addUser = await registerUserEventSpace(formData)
            navigate("/")
            return addUser
        } catch (err) {
            console.error(err, "From handle submit - register user")
        }     
    }

   return (<Container maxWidth="sm">
        <Paper elevation={10} sx={{mt: 8, p: 2}}>

            <Avatar sx={{ width: 56, height: 56, bgcolor: '#2196f3', mx: 'auto', textAlign: "center", mb: 2 }}>
                <AppRegistrationIcon fontSize="large" />
            </Avatar>

            <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2}}>Register with Event Space</Typography>
            </ThemeProvider>

            <Box component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{mx: 1}}
            >
            <TextField 
            id="outlined-basic-firstname"
            label="First Name"
            variant="outlined"
            placeholder="Enter your first name"
            name="firstname"
            value={formData.firstname}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value }
                })
            }}
            fullWidth
            required
            autoFocus
            autoComplete="on"
            sx={{mb: 2}}
            /> 
            <TextField 
            id="outlined-basic-lastname"
            label="Last Name"
            variant="outlined"
            placeholder="Enter your last name"
            name="lastname"
            value={formData.lastname}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value }
                })
            }}
            fullWidth
            required
            autoComplete="on"
            sx={{mb: 2}}
            /> 

            <TextField 
            id="outlined-basic-email-address"
            label="Email Address"
            variant="outlined"
            placeholder="Enter your email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value.trim()}
                })
            }}
            fullWidth
            required
            autoComplete="on"
            sx={{mb: 2}}
            /> 

            <TextField 
            id="outlined-basic-username-register"
            label="Username"
            variant="outlined"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value.trim()}
                })
            }}
            fullWidth
            required
            autoComplete="on"
            sx={{mb: 2}}
            /> 


            <TextField 
            id="outlined-basic-password-register"
            label="Password"
            variant="outlined"
            placeholder="Enter your password"
            fullWidth
            name="password"
            value={formData.password}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value}
                })
            }}
            required
            type="password"
            autoComplete="off"
            sx={{mb: 2}}
            /> 
            <Button type="submit" variant="contained" fullWidth sx={{mt: 1}}>Log In to event space</Button>
            </Box>

            <Grid2 container justifyContent="end" sx={{mt: 3, ml: 1}}>
                

                <Grid2 item="true" sx={{mt: 1}}>
                <Link component={RouterLink} to="/employee/login" sx={{color: "#9e9e9e", textDecoration: "none", fontWeight: "bold"}} className="StaffLink">Staff Account</Link>
                </Grid2>
            </Grid2>

        </Paper>
    </Container>
   )
}