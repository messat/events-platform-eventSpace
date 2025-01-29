import { Avatar, Box, Button, Container, createTheme, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate} from 'react-router-dom'
import { useContext, useState } from "react";
import { employeeRegisterEventSpace } from "../API server/api";
import WorkIcon from '@mui/icons-material/Work';
import UserContext from "../Context/UserContext";

export default function EmployeeRegister() {
      const {isLoggedIn, setIsLoggedIn} = useContext(UserContext) 


    const theme = createTheme({
        typography: {
            fontFamily: "sniglet"
        }
    })
    const navigate = useNavigate()

    const [formData, setFormData] = useState({firstname: "", lastname: "", email: "", employeeNumber: "", password: ""})


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const registerEmployee = await employeeRegisterEventSpace(formData)
            localStorage.setItem("employee", JSON.stringify(registerEmployee))
            setIsLoggedIn(registerEmployee)
            navigate("/")
        } catch (err) {
            console.error(err, "From handle submit - register employee")
        }     
    }

   return (<Container maxWidth="sm">
        <Paper elevation={10} sx={{mt: 8, p: 2, pb: 4}}>

            <Avatar sx={{ width: 56, height: 56, bgcolor: '#2196f3', mx: 'auto', textAlign: "center", mb: 2 }}>
                <WorkIcon fontSize="large" />
            </Avatar>

            <ThemeProvider theme={theme}>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center", mb: 2}}>Employee registration at Event Space</Typography>
            </ThemeProvider>

            <Box component="form"
            noValidate
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
            }}
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
            }}
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
            }}
            fullWidth
            required
            autoComplete="off"
            sx={{mb: 2}}
            /> 

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
            }}
            fullWidth
            type="number"
            inputMode="numeric"
            required
            autoComplete="off"
            sx={{mb: 2}}
            /> 


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
            }}
            required
            type="password"
            autoComplete="off"
            sx={{mb: 2}}
            /> 
            <Button type="submit" variant="contained" fullWidth sx={{mt: 1}}>Register -- Event Space</Button>
            </Box>   

        </Paper>
    </Container>
   )
}