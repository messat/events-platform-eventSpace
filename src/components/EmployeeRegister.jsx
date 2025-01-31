import { Avatar, Box, Button, Container, createTheme, Paper, TextField, ThemeProvider, Typography, FormHelperText } from "@mui/material";
import { useNavigate} from 'react-router-dom'
import { useContext, useState } from "react";
import { employeeRegisterEventSpace } from "../API server/api";
import WorkIcon from '@mui/icons-material/Work';
import UserContext from "../Context/UserContext";
import { RegisterEmployeeLoading } from "./LoadingState/RegisterAccountLoading";

export default function EmployeeRegister() {
      const {isLoggedIn, setIsLoggedIn} = useContext(UserContext) 

    const theme = createTheme({
        typography: {
            fontFamily: "sniglet"
        }
    })
    const navigate = useNavigate()

    const [formData, setFormData] = useState({firstname: "", lastname: "", email: "", employeeNumber: "", password: ""})

    const [firstnameError, setFirstnameError] = useState(false)
    const [lastnameError, setLastnameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [employeeIDError, setEmployeeIDError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [checkUniqueEmployeeID, setCheckUniqueEmployeeID] = useState(false)
    const [checkUniqueEmail, setCheckUniqueEmail] = useState(false)
    const [messageSubmission, setMessageSubmission] = useState(false)
    const [checkEmployeeIDLength, setCheckEmployeeIDLength] = useState(false)

    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const registerEmployee = await employeeRegisterEventSpace(formData)
            setCheckUniqueEmail(false)
            setCheckUniqueEmployeeID(false)
            setCheckEmployeeIDLength(false)
            setMessageSubmission(false)
            setIsLoading(false)
            localStorage.setItem("employee", JSON.stringify(registerEmployee))
            setIsLoggedIn(registerEmployee)
            navigate("/")
        } catch (err) {
            setIsLoading(false)
            console.error(err, "From handle submit - register employee")
            setMessageSubmission(true)
            if(err.response.data.msg === "401 User already exists" && err.response.data.err.employeeNumber){
                setCheckUniqueEmployeeID(true)
                setCheckUniqueEmail(false)
                setCheckEmployeeIDLength(false)
            }
            if(err.response.data.msg === "401 User already exists" && err.response.data.err.email){
                setCheckUniqueEmail(true)
                setCheckUniqueEmployeeID(false)
                setCheckEmployeeIDLength(false)
            }
            if(err.response.data.errors.includes("Must be 8 characters long")){
                setCheckEmployeeIDLength(true)
                setCheckUniqueEmail(false)
                setCheckUniqueEmployeeID(false)
            }
        }     
    }

if(isLoading){
    return (<Box>
        <RegisterEmployeeLoading />
    </Box>)
}

   return (<Container maxWidth="sm">
        <Paper elevation={10} sx={{mt: 8, p: 2, pb: 4}}>

            <Avatar sx={{ width: 56, height: 56, bgcolor: '#2196f3', mx: 'auto', textAlign: "center", mb: 2 }}>
                <WorkIcon fontSize="large" />
            </Avatar>

            <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2}}>Employee registration at Event Space</Typography>
            </ThemeProvider>
            {messageSubmission ? <FormHelperText sx={{mb: 2, fontSize: "15px", color: "red", textAlign: "center", mx: 0.6}}>Please review the form carefully as some fields contain invalid information. Please check for missing or incorrect details and try again.</FormHelperText> : ""}
            <Box component="form"
            onSubmit={handleSubmit}
            sx={{mx: 1}}
            >
            <TextField 
            id="employee-firstname"
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
            sx={{mb: 2}}
            /> 

            <TextField 
            id="employee-email-address"
            label="Email Address"
            variant="outlined"
            placeholder="Create employee email address"
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
            autoComplete="off"
            sx={{mb: 2}}
            /> 

            {checkUniqueEmail ? <FormHelperText sx={{mb: 2.5, fontSize: "13px", color: "red", textAlign: "center", mx: 0.6, mt: -1}}>This Email Already Exists. Please Try Another Email.</FormHelperText> : ""}


            <TextField 
            id="employee-id-register"
            label="Employee ID"
            variant="outlined"
            name="employeeNumber"
            placeholder="Enter Your New Employee ID"
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
            error={employeeIDError}
            helperText={employeeIDError ? "Please Enter A Valid Employee ID" : ""}
            slotProps={{htmlInput: { pattern: "\d+"}}}
            fullWidth
            type="number"
            inputMode="numeric"
            required
            autoComplete="off"
            sx={{mb: 2}}
            /> 

            {checkUniqueEmployeeID ? <FormHelperText sx={{mb: 2.5, fontSize: "13px", color: "red", textAlign: "center", mx: 0.6, mt: -1}}>This Username Already Exists. Please Try Again.</FormHelperText> : ""}
            {checkEmployeeIDLength ? <FormHelperText sx={{mb: 2.5, fontSize: "13px", color: "red", textAlign: "center", mx: 0.6, mt: -1}}>Must Be 8 Characters Long.</FormHelperText> : ""}

            <TextField 
            id="employee-password-register"
            label="Password"
            variant="outlined"
            placeholder="Enter Your Employee Password"
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
            sx={{mb: 2}}
            /> 
            <Button type="submit" variant="contained" fullWidth sx={{mt: 1}}>Employee Registration At Event Space</Button>
            </Box>   

        </Paper>
    </Container>
   )
}