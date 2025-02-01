import { Avatar, Box, Button, Container, createTheme, FormHelperText, Grid2, Link, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate} from 'react-router-dom'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useContext, useState } from "react";
import { registerUserEventSpace } from "../API server/api";
import UserContext from "../Context/UserContext";
import RegisterUserLoading from "./LoadingState/RegisterAccountLoading";

export default function RegisterUser({setRegistrationLogInAlertSuccess}) {

    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext)

    const theme = createTheme({
        typography: {
            fontFamily: "sniglet"
        }
    })
    const navigate = useNavigate()

    const [formData, setFormData] = useState({firstname: "", lastname: "", email: "", username: "", password: ""})

    const [firstnameError, setFirstnameError] = useState(false)
    const [lastnameError, setLastnameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [checkUniqueUsername, setCheckUniqueUsername] = useState(false)
    const [checkUniqueEmail, setCheckUniqueEmail] = useState(false)
    const [messageSubmission, setMessageSubmission] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const addUser = await registerUserEventSpace(formData)
            setRegistrationLogInAlertSuccess(true)
            setCheckUniqueUsername(false)
            setCheckUniqueEmail(false)
            setMessageSubmission(false)
            setIsLoggedIn(addUser)
            setIsLoading(false)
            localStorage.setItem("user", JSON.stringify(addUser))
            navigate("/")
            return addUser
        } catch (err) {
            setRegistrationLogInAlertSuccess(false)
            setIsLoading(false)
            setMessageSubmission(true)
            if(err.response.data.msg === "401 User already exists" && err.response.data.err.username){
                setCheckUniqueUsername(true)
                setCheckUniqueEmail(false)
            }
            if(err.response.data.msg === "401 User already exists" && err.response.data.err.email){
                setCheckUniqueEmail(true)
                setCheckUniqueUsername(false)
            }
            console.error(err, "From handle submit - register user")
        }     
    }

if(isLoading){
    return (<Box>
        <RegisterUserLoading />
    </Box>)
}

   return (<Container maxWidth="sm">
        <Paper elevation={10} sx={{mt: 8, p: 2}}>

            <Avatar sx={{ width: 56, height: 56, bgcolor: '#2196f3', mx: 'auto', textAlign: "center", mb: 2 }}>
                <AppRegistrationIcon fontSize="large" />
            </Avatar>

            <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2}}>Register with Event Space</Typography>
            </ThemeProvider>
            {messageSubmission ? <FormHelperText sx={{mb: 2, fontSize: "15px", color: "red", textAlign: "center", mx: 0.6}}>Please review the form carefully as some fields contain invalid information. Please check for missing or incorrect details and try again.</FormHelperText> : ""}
            <Box component="form"
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
                if(event.target.validity.valid){
                    setFirstnameError(false)
                } else {
                    setFirstnameError(true)
                }
            }}
            slotProps={{htmlInput: {pattern: "[A-Za-z ]+"}}}
            error={firstnameError}
            helperText={firstnameError ? "Please Enter Your Firstname" : ""}
            fullWidth
            required
            autoFocus
            autoComplete="on"
            sx={{mb: 2.5}}
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
                if(event.target.validity.valid){
                    setLastnameError(false)
                } else {
                    setLastnameError(true)
                }
            }}
            error={lastnameError}
            slotProps={{htmlInput: {pattern: "[A-Za-z ]+"}}}
            helperText={lastnameError ? "Please Enter Your Lastname" : ""}
            fullWidth
            required
            autoComplete="on"
            sx={{mb: 2.5}}
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
                if(event.target.validity.valid){
                    setEmailError(false)
                } else {
                    setEmailError(true)
                }
            }}
            error={emailError}
            helperText={emailError ? "Please Enter A Valid Email" : ""}
            fullWidth
            required
            autoComplete="on"
            sx={{mb: 2.5}}
            /> 
            {checkUniqueEmail ? <FormHelperText sx={{mb: 2.5, fontSize: "13px", color: "red", textAlign: "center", mx: 0.6, mt: -1}}>This Email Already Exists. Please Try Another Email.</FormHelperText> : ""}

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
                if(event.target.validity.valid){
                    setUsernameError(false)
                } else {
                    setUsernameError(true)
                }
            }}
            error={usernameError}
            slotProps={{htmlInput: {pattern: "[A-Za-z0-9]+"}}}
            helperText={usernameError ? "Please Enter A Valid Username. This Should Not Include Any Special Characters !*_?" : ""}
            fullWidth
            required
            autoComplete="off"
            sx={{mb: 2.5}}
            /> 

            {checkUniqueUsername ? <FormHelperText sx={{mb: 2.5, fontSize: "13px", color: "red", textAlign: "center", mx: 0.6, mt: -1}}>This Username Already Exists. Please Try Again.</FormHelperText> : ""}



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
                if(event.target.validity.valid){
                    setPasswordError(false)
                } else {
                    setPasswordError(true)
                }
            }}
            error={passwordError}
            helperText={passwordError ? "Please Enter A Valid Password" : ""}
            required
            type="password"
            autoComplete="off"
            sx={{mb: 2.5}}
            /> 
            <Button type="submit" variant="contained" fullWidth sx={{mt: 1}}>Register at event space</Button>
            </Box>

            <Grid2 container justifyContent="end" sx={{mt: 3, ml: 1}}>
                

                <Grid2 item="true" sx={{mt: 1}}>
                <Link component={RouterLink} to="/events/vpn/employee/login" sx={{color: "#9e9e9e", textDecoration: "none", fontWeight: "bold"}} className="StaffLink">Staff Account</Link>
                </Grid2>
            </Grid2>

        </Paper>
    </Container>
   )
}