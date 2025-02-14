import { Box, Grid2, Paper, Typography } from "@mui/material";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import AllEvents from "./AllEvents";
import UserLogInAlertSuccess from "./Alerts/UserLogInAlert";
import RegistrationLoginAlert from "./Alerts/RegistrationLoginAlert";


export default function IndexPage ({searchTitle, userLogInAlert, setUserLogInAlert, registrationLogInAlertSuccess, setRegistrationLogInAlertSuccess }){
    const theme = createTheme({
        typography: {fontFamily: 'sniglet'}
      })

    return (<main role="main" aria-labelledby="Main section of the event space">
    <Box style={{marginTop: 20}}>
        
        <ThemeProvider theme={theme}>
        <Typography sx={{textAlign: "center", mt: {xs: "10px", sm: "21px"}, typography: {xs: "h4", sm: "h3", md: "h2"}}} 
        color="primary" gutterBottom tabIndex={0}>
            Welcome To Event Space</Typography>
        </ThemeProvider>
        
        {userLogInAlert ? <Box aria-live="polite" aria-atomic="true">
        <UserLogInAlertSuccess setUserLogInAlert={setUserLogInAlert} role="alert"/>
        </Box> : null}
        
        {registrationLogInAlertSuccess ? <Box role="alert">
        <RegistrationLoginAlert setRegistrationLogInAlertSuccess={setRegistrationLogInAlertSuccess} />
        </Box> : null}

        <Grid2 container spacing={2} sx={{marginX: {xs: "2.5em"}, marginTop: {xs: "1.5em", sm: "2em", md: "1.9em" }, marginBottom: "2.5em"}} 
        role="region" aria-labelledby="intro-section-event-space-values">
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3}}>
        <Paper elevation={24} sx={{minHeight: {xs: "200px", sm: "325px", animationName: "eventSpaceValues1", animationDuration: "2s"}, bgcolor: "#1769aa", display: "flex", alignItems: "center"}} role="region" tabIndex={0}>
        <Typography variant="subtitle2" textAlign={"center"}   fontSize={"24px"} color="white" letterSpacing={2} sx={{p: 1, fontFamily: "Arial"}}>
            A platform to connect with anyone in the event space to Learn, Share and Grow</Typography>
        </Paper>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3}} >
        <Paper elevation={24} sx={{minHeight: {xs: "200px", sm: "325px", animationName: "eventSpaceValues2", animationDuration: "3s" }, bgcolor: "#1769aa", display: "flex", alignItems: "center"}}>
        <Typography variant="h6" textAlign={"center"} fontSize={"24px"} color="white" sx={{p: 1, fontFamily: "Arial"}} letterSpacing={2}>
            From marathons, conferences, community rallies, and fundraisers, to gaming competitions, and tech talks</Typography>
        </Paper>
            </Grid2 >

            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3}} >
        <Paper elevation={24} sx={{minHeight: {xs: "200px", sm: "325px", animationName: "eventSpaceValues3", animationDuration: "4s" }, bgcolor: "#1769aa", display: "flex", alignItems: "center"}}>
        <Typography variant="h6" textAlign={"center"} fontSize={"24px"} color="white" sx={{p: 1, fontFamily: "Arial"}} letterSpacing={2}>
            Our mission is to bring experiences from all walks of life to form networks</Typography>
        </Paper>
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3}}>
        <Paper elevation={24} sx={{minHeight: {xs: "200px", sm: "325px", animationName: "eventSpaceValues4", animationDuration: "4s" }, bgcolor: "#1769aa", display: "flex", alignItems: "center"}}>
        <Typography variant="h6" textAlign={"center"} color="white" fontSize={"24px"} letterSpacing={2} sx={{p: 1, fontFamily: "Arial"}}>
            Be sure to browse, sign up to events and add to your Google Calendar 🗓️</Typography>
        </Paper>
            </Grid2>
        
        </Grid2>


        <AllEvents searchTitle={searchTitle}/>
    </Box>
    </main>)
} 


