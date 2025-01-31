import { Box, CircularProgress, Typography } from "@mui/material";


export default function RegisterUserLoading() {

    return (<Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "75vh"}}>
        <Box sx={{display: "flex", flexDirection: "row"}}>
        <Typography variant="button" sx={{mb: 2}}>Registering To Event Space. Please Wait</Typography>
        <Typography className="loading"></Typography>
        </Box>
        <CircularProgress size={50}/>
        </Box>)
}


export function RegisterEmployeeLoading() {

    return (<Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "75vh"}}>
        <Box sx={{display: "flex", flexDirection: "row"}}>
        <Typography variant="button" sx={{mb: 2}}>Registering Employee To Event Space. Please Wait</Typography>
        <Typography className="loading"></Typography>
        </Box>
        <CircularProgress size={50}/>
        </Box>)
}