import { Avatar, Box, Button, Container, createTheme, FormHelperText, Grid2, Link, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Link as RouterLink, useNavigate} from 'react-router-dom'
import { useContext, useState } from "react";
import { logInUserEventSpace } from "../API server/api";
import UserContext from "../Context/UserContext";



export default function Login() {
    const {setIsLoggedIn} = useContext(UserContext)

    const theme = createTheme({
        typography: {
            fontFamily: "sniglet"
        }
    })
    let navigate = useNavigate()

    const [formData, setFormData] = useState({username: "", password: ""})
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [messageSubmission, setMessageSubmission] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const loginUser = await logInUserEventSpace(formData)
            setIsLoggedIn(loginUser)
            setMessageSubmission(false)
            localStorage.setItem("user", JSON.stringify(loginUser))
            navigate("/")
        } catch (err) {
            setMessageSubmission(true)
            console.error(err, "Error from Promise chain, user login")
            const errorMessage = err.response.data.msg
        }
    }

   return (<Container maxWidth="sm">
        <Paper elevation={10} sx={{mt: 8, p: 2}}>

            <Avatar sx={{ width: 56, height: 56, bgcolor: '#2196f3', mx: 'auto', textAlign: "center", mb: 2 }}>
                <LockPersonIcon fontSize="large" />
            </Avatar>

            <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2}}>Sign In To Event Space</Typography>
            </ThemeProvider>

            <Box component="form"
            onSubmit={handleSubmit}
            sx={{mx: 1}}
            >
                {messageSubmission ? <FormHelperText sx={{mb: 2, fontSize: "17px", ml: 1, color: "red", textAlign: "center"}}>Incorrect Username or Password</FormHelperText> : ""}
            <TextField 
            id="outlined-basic-username"
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
            placeholder="Enter your username"
            fullWidth
            required
            autoFocus
            autoComplete="on"
            sx={{mb: 2.5}}
            /> 


            <TextField 
            id="outlined-basic-password"
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
            type="password"
            autoComplete="off"
            sx={{mb: 2.5}}
            /> 
            <Button type="submit" variant="contained" fullWidth sx={{mt: 1}}>Log In</Button>
            </Box>

            <Grid2 container justifyContent="end" sx={{mt: 3, ml: 1}}>
                <Grid2 item="true" size={{xs: 12}}>
                <Typography variant="subtitle1" sx={{display: "inline"}}>Don't have an account? </Typography>
                <Link component={RouterLink} to="/events/user/register">Create an account</Link>
                </Grid2>

                <Grid2 item="true" sx={{mt: 1}}>
                <Link component={RouterLink} to="/events/vpn/employee/login" sx={{color: "#9e9e9e", textDecoration: "none", fontWeight: "bold"}} className="StaffLink">Staff Account</Link>
                </Grid2>
            </Grid2>

        </Paper>
    </Container>
   )
}