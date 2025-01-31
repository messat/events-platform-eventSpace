import { Box, CircularProgress, Typography } from "@mui/material";

export default function HostEventLoading() {

    return (<Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "75vh"}}>
        <Box sx={{display: "flex", flexDirection: "row"}}>
        <Typography variant="button" sx={{mb: 2}}>Adding An Event to Event Space. Please Wait</Typography>
        <Typography className="loading"></Typography>
        </Box>
        <CircularProgress size={50}/>
        </Box>)
}