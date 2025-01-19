import { Typography } from "@mui/material";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import AllEvents from "./AllEvents";


export default function IndexPage (){
    const theme = createTheme({
        typography: {fontFamily: 'sniglet'}
      })
    return <div style={{marginTop: 20}}>
        
        <ThemeProvider theme={theme}>
        <Typography variant="h2" sx={{textAlign: "center", mt: "21px"}} gutterBottom>Welcome to Event Space</Typography>
        </ThemeProvider>
        
        <div style={{display: 'flex', justifyContent: "center"}}>
        <div className="eventSpaceImage" style={{backgroundImage: `url("https://www.interactsoftware.com/wp-content/uploads/2017/12/persona.png")`, width: "85%"}}>
        <div style={{marginTop: "15%"}}>

        <Typography variant="h6" textAlign={"center"} gutterBottom fontWeight={"bold"} fontSize={"25px"} className="missionText">A platform to connect with anyone in the event space to Learn, Share and Grow</Typography>
        <Typography variant="h6" textAlign={"center"} gutterBottom fontWeight={"bold"} fontSize={"25px"}>From marathons, conferences, community rallies, and fundraisers, to gaming competitions, and tech talks</Typography>
        <Typography variant="h6" textAlign={"center"} gutterBottom fontWeight={"bold"} fontSize={"25px"}>Our mission is to bring experiences from all walks of life to form networks</Typography>
        <Typography variant="h6" textAlign={"center"} color="error" fontWeight={"bold"} fontSize={"25px"}>Be sure to browse, sign up to events and add to your Google Calendar 🗓️</Typography>
        
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        </div>
        </div>
        </div>

        <AllEvents/>
    </div>
} 