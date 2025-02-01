import { Avatar, Box, Button, Container, createTheme, Link, Paper, TextField, ThemeProvider, Typography, FormHelperText } from "@mui/material";
import { useNavigate} from 'react-router-dom'
import BadgeIcon from '@mui/icons-material/Badge';
import { useContext, useState } from "react";
import { employeeLogInEventSpace } from "../API server/api";
import UserContext from "../Context/UserContext";
import LogInUserLoading from "./LoadingState/LoginUserLoading";
import ErrorHandlerClient from "./ErrorState/ErrorIndex";


export default function EmployeeLogin({setUserLogInAlert}) {
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext)

    const theme = createTheme({
        typography: {
            fontFamily: "sniglet"
        }
    })
    const navigate = useNavigate()

    const [formData, setFormData] = useState({employeeNumber: "", password: ""})
    const [employeeIDError, setEmployeeIDError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [messageSubmission, setMessageSubmission] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(null)
    
        const handleSubmit = async (event) => {
            event.preventDefault()
            try {
                setIsLoading(true)
                const employeeLogIn = await employeeLogInEventSpace(formData)
                localStorage.setItem("employee", JSON.stringify(employeeLogIn))
                setIsError(null)
                setMessageSubmission(false)
                setIsLoggedIn(employeeLogIn)
                setUserLogInAlert(true)
                setIsLoading(false)
                navigate("/")
            } catch (err) {
                setIsLoading(false)
                setIsError(err)
                setUserLogInAlert(false)
                setMessageSubmission(true)
                console.error(err, "Error from catch block, employee log in")
            }
    }

if(isLoading){
    return (<Box>
        <LogInUserLoading />
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
        <Paper elevation={10} sx={{mt: 8, p: 2, pb: 4}}>

            <Avatar sx={{ width: 56, height: 56, bgcolor: '#2196f3', mx: 'auto', textAlign: "center", mb: 2 }}>
                <BadgeIcon fontSize="large" />
            </Avatar>

            <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2}}>Employee login Event Space</Typography>
            </ThemeProvider>

            <Box component="form"
            onSubmit={handleSubmit}
            sx={{mx: 1}}
            >
                {messageSubmission ? <FormHelperText sx={{mb: 2, fontSize: "17px", ml: 1, color: "red", textAlign: "center"}}>Incorrect Employee ID Or Password</FormHelperText> : ""}
            <TextField 
            id="employee-id"
            label="Employee ID"
            variant="outlined"
            name="employeeNumber"
            value={formData.employeeNumber}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: value}
                })
                if(event.target.validity.valid){
                    setEmployeeIDError(false)
                } else {
                    setEmployeeIDError(true)
                }
            }}
            helperText={employeeIDError ? "Please Enter A Valid Employee ID" : ""}
            error={employeeIDError}
            placeholder="Enter your employee ID"
            fullWidth
            required
            type="number"
            inputMode="numeric"
            autoComplete="off"
            sx={{mb: 2.5}}
            /> 

            <TextField 
            id="employee-password"
            label="Password"
            variant="outlined"
            placeholder="Enter your employee password"
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
            <Button type="submit" variant="contained" fullWidth sx={{mt: 1}}>Employee Log In</Button>
            </Box>
            <Box sx={{mt: 2}}>
            <Link href="/events/user/login" sx={{ml: 1, marginTop: "20px"}} underline="hover" variant="body1">Back to User Login</Link>
            </Box>
        </Paper>
    </Container>)
}