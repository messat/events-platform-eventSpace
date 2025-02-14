import { Avatar, Box, Button, Container, createTheme, Link, Paper, TextField, ThemeProvider, Typography, FormHelperText } from "@mui/material";
import { useNavigate} from 'react-router-dom'
import BadgeIcon from '@mui/icons-material/Badge';
import { useContext, useState } from "react";
import { employeeLogInEventSpace } from "../API server/api";
import UserContext from "../Context/UserContext";
import LogInUserLoading from "./LoadingState/LoginUserLoading";
import ErrorHandlerClient from "./ErrorState/ErrorIndex";


export default function EmployeeLogin({setUserLogInAlert}) {
    const {setIsLoggedIn} = useContext(UserContext)

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

    return (<main role="main" aria-labelledby="employee-login-title">
    <Container maxWidth="sm">
        <Paper elevation={10} sx={{mt: 8, p: 2, pb: 4}}>

            <Avatar sx={{ width: 56, height: 56, bgcolor: '#2196f3', mx: 'auto', textAlign: "center", mb: 2 }}>
                <BadgeIcon fontSize="large" aria-label="Lock Icon"/>
            </Avatar>

            <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2}} id="employee-login-title" tabIndex={0}>Employee login Event Space</Typography>
            </ThemeProvider>

            <Box component="form"
            onSubmit={handleSubmit}
            sx={{mx: 1}}
            >

            {messageSubmission ? <FormHelperText sx={{mb: 2, fontSize: "17px", ml: 1, color: "red", textAlign: "center"}} role="alert"
              tabIndex={0}>
                Incorrect Employee ID Or Password</FormHelperText> : ""}
            
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
            aria-invalid={employeeIDError}
            aria-describedby="employee-id-helper"
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
            aria-invalid={passwordError}
            aria-describedby="password-helper"
            type="password"
            autoComplete="off"
            sx={{mb: 2.5}}
            /> 

            <Button type="submit" variant="contained" fullWidth sx={{mt: 1}} role="button" aria-label="Submit Employee Login">Employee Log In</Button>
            </Box>
            

        </Paper>
    </Container>
    </main>)
}