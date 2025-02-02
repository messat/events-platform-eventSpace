import { Box, Grid2, Paper, Typography } from "@mui/material";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import AllEvents from "./AllEvents";
import UserLogInAlertSuccess from "./Alerts/UserLogInAlert";
import RegistrationLoginAlert from "./Alerts/RegistrationLoginAlert";


export default function IndexPage ({searchTitle, userLogInAlert, setUserLogInAlert, registrationLogInAlertSuccess, setRegistrationLogInAlertSuccess }){
    const theme = createTheme({
        typography: {fontFamily: 'sniglet'}
      })

    return <div style={{marginTop: 20}}>
        
        <ThemeProvider theme={theme}>
        <Typography variant="h2" sx={{textAlign: "center", mt: "21px"}} color="primary" gutterBottom>Welcome to Event Space</Typography>
        </ThemeProvider>
        
        {userLogInAlert ? <Box>
        <UserLogInAlertSuccess setUserLogInAlert={setUserLogInAlert} />
        </Box> : null}
        
        {registrationLogInAlertSuccess ? <Box>
        <RegistrationLoginAlert setRegistrationLogInAlertSuccess={setRegistrationLogInAlertSuccess} />
        </Box> : null}

        <Grid2 container spacing={2} sx={{marginX: {xs: "2.5em"}, marginTop: "2.7em", marginBottom: "2.5em"}}>
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3}}>
        <Paper elevation={24} sx={{minHeight: "325px", bgcolor: "#1769aa", display: "flex", alignItems: "center"}} >
        <Typography variant="subtitle2" textAlign={"center"}   fontSize={"24px"} color="white" letterSpacing={2} sx={{p: 1, fontFamily: "Arial"}}>
            A platform to connect with anyone in the event space to Learn, Share and Grow</Typography>
        </Paper>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3}} >
        <Paper elevation={24} sx={{minHeight: "325px", bgcolor: "#1769aa", display: "flex", alignItems: "center"}}>
        <Typography variant="h6" textAlign={"center"} fontSize={"24px"} color="white" sx={{p: 1, fontFamily: "Arial"}} letterSpacing={2}>
            From marathons, conferences, community rallies, and fundraisers, to gaming competitions, and tech talks</Typography>
        </Paper>
            </Grid2 >

            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3}} >
        <Paper elevation={24} sx={{minHeight: "325px", bgcolor: "#1769aa", display: "flex", alignItems: "center"}}>
        <Typography variant="h6" textAlign={"center"} fontSize={"24px"} color="white" sx={{p: 1, fontFamily: "Arial"}} letterSpacing={2}>
            Our mission is to bring experiences from all walks of life to form networks</Typography>
        </Paper>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3}}>
        <Paper elevation={24} sx={{minHeight: "325px", bgcolor: "#1769aa", display: "flex", alignItems: "center"}}>
        <Typography variant="h6" textAlign={"center"} color="white" fontSize={"24px"} letterSpacing={2} sx={{p: 1, fontFamily: "Arial"}}>
            Be sure to browse, sign up to events and add to your Google Calendar 🗓️</Typography>
        </Paper>
            </Grid2>
        
        </Grid2>


        <AllEvents searchTitle={searchTitle}/>
    </div>
} 


