import { Avatar, Box, Button, Container, createTheme, FormHelperText, Grid2, Link, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Link as RouterLink, useLocation, useNavigate} from 'react-router-dom'
import { useContext, useState } from "react";
import { logInUserEventSpace } from "../API server/api";
import UserContext from "../Context/UserContext";
import LogInUserLoading from "./LoadingState/LoginUserLoading";
import UserLogOutAlertSuccess from "./Alerts/LogoutAlert";
import ErrorHandlerClient from "./ErrorState/ErrorIndex";


export default function Login({setUserLogInAlert, userLogOutAlert, setUserLogOutAlert}) {
    const {setIsLoggedIn} = useContext(UserContext)


    const theme = createTheme({
        typography: {
            fontFamily: "sniglet"
        }
    })

    let navigate = useNavigate()
    let recieved = useLocation().state


    const [formData, setFormData] = useState({username: "", password: ""})
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [messageSubmission, setMessageSubmission] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const loginUser = await logInUserEventSpace(formData)
            setIsError(null)
            setUserLogInAlert(true)
            setIsLoggedIn(loginUser)
            setMessageSubmission(false)
            setIsLoading(false)
            localStorage.setItem("user", JSON.stringify(loginUser))
            const from = recieved || "/"
            navigate(from, { replace: true })
        } catch (err) {
            setUserLogInAlert(false)
            setIsError(err)
            setIsLoading(false)
            setMessageSubmission(true)
        }
    }

if(isLoading){
    return (<Box role="alert" aria-live="polite">
        <LogInUserLoading />
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

   return (<main role="main" aria-labelledby="login-page-user">
   <Box>
    {userLogOutAlert ? <Box role="alert"> <UserLogOutAlertSuccess setUserLogOutAlert={setUserLogOutAlert} /> </Box> : null}

   <Container maxWidth="sm">
        <Paper elevation={10} sx={{mt: 8, p: 2}}>

            <Avatar sx={{ width: 56, height: 56, bgcolor: '#2196f3', mx: 'auto', textAlign: "center", mb: 2 }}>
                <LockPersonIcon fontSize="large" aria-label="Lock Icon"/>
            </Avatar>

            <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2}} id="Login-page-title" tabIndex={0}>Sign In To Event Space</Typography>
            </ThemeProvider>

            <Box component="form"
            onSubmit={handleSubmit}
            sx={{mx: 1}}
            aria-labelledby="login-page-title"
            >
            
            {messageSubmission ? <FormHelperText sx={{mb: 2, fontSize: "17px", ml: 1, color: "red", textAlign: "center"}} role="alert" tabIndex={0}>Incorrect Username or Password</FormHelperText> : ""}
            
            <TextField 
            id="username"
            label="Username"
            variant="outlined"
            name="username"
            value={formData.name}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value}
                })
                if(event.target.validity.valid){
                    setUsernameError(false)
                } else {
                    setUsernameError(true)
                }
            }}
            helperText={usernameError ? "Please Enter Your Username" : ""}
            error={usernameError}
            aria-invalid={usernameError}
            aria-describedby="username-helper"
            placeholder="Enter your username"
            fullWidth
            required
            autoFocus
            autoComplete="on"
            sx={{mb: 2.5}}
            /> 

            <TextField 
            id="password"
            label="Password"
            variant="outlined"
            placeholder="Enter your password"
            fullWidth
            required
            name="password"
            value={formData.password}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]:value}
                })
                if(event.target.validity.valid){
                    setPasswordError(false)
                } else {
                    setPasswordError(true)
                }
            }}
            error={passwordError}
            helperText={passwordError ? "Please Enter A Valid Password" : ""}
            aria-invalid={passwordError}
            aria-describedby="password-helper"
            type="password"
            autoComplete="off"
            sx={{mb: 2.5}}
            /> 

            <Button type="submit" variant="contained" fullWidth sx={{mt: 1}}>Log In</Button>
            </Box>

            <Grid2 container justifyContent="end" sx={{mt: 3, ml: 1}}>
                
                <Grid2 item="true" size={{xs: 12}}>
                <Typography component={"h2"} variant="subtitle1" sx={{display: "inline"}}>Don't have an account? </Typography>
                <Link component={RouterLink} to="/events/user/register">Create an account</Link>
                </Grid2>

            </Grid2>

        </Paper>
    </Container>
    </Box>
    </main>
   )
}