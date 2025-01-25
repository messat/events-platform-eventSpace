import { Avatar, Box, Button, Container, createTheme, Grid2, Link, Paper, TextField, ThemeProvider, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate} from 'react-router-dom'
import BadgeIcon from '@mui/icons-material/Badge';
import { useState } from "react";
import { employeeLogInEventSpace } from "../API server/api";

export default function EmployeeLogin() {

    const theme = createTheme({
        typography: {
            fontFamily: "sniglet"
        }
    })
    const navigate = useNavigate()

    const [formData, setFormData] = useState({employeeNumber: "", password: ""})
    
        const handleSubmit = async (event) => {
            event.preventDefault()
            try {
                const employeeLogIn = await employeeLogInEventSpace(formData)
                navigate("/")
            } catch (err) {
                console.error(err, "Error from catch block, employee log in")
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
            noValidate
            onSubmit={handleSubmit}
            sx={{mx: 1}}
            >
            <TextField 
            id="employee-id"
            label="Employee ID"
            variant="outlined"
            name="employeeNumber"
            value={formData.employeeNumber}
            onChange={(event) => {
                const {name, value} = event.target
                setFormData((curr) => {
                    return {...curr, [name]: parseInt(value)}
                })
            }}
            placeholder="Enter your employee ID"
            fullWidth
            required
            type="number"
            inputMode="numeric"
            autoComplete="off"
            sx={{mb: 2}}
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
            }}
            type="password"
            autoComplete="off"
            sx={{mb: 2}}
            /> 
            <Button type="submit" variant="contained" fullWidth sx={{mt: 1}}>Log In</Button>
            </Box>

        </Paper>
    </Container>)
}