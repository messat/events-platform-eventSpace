import { Box, CircularProgress, Container, Grid2, Skeleton, Typography } from "@mui/material";


export default function EventInfoLoadingScreen() {
    return (<Box>
        <Box sx={{display: "flex", justifyContent: "center"}}>
        <Skeleton variant="rounded" sx={{
            maxHeight: { xs: 250, sm: 400, md: 500 }, 
            maxWidth: { xs: 400,sm: 650, md: 1300 },   
            height: 500,
            width: 1300,
            mt: 3, borderRadius: "15px"}}>
        </Skeleton>
        </Box>

        <Box>
            <Container maxWidth='lg'>
                <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 6, md: 7 }} sx={{my: 3}}>
                    <Skeleton  variant="text" sx={{p: 5}}/>
                    <Skeleton width={"60%"} variant="text" sx={{p: 2}}/>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Skeleton variant="circular" width={40} height={40} sx={{mt: 2, mr: 2}}/>
                    <Skeleton variant="text" width={"30%"} sx={{mt: 1.5}}/>
                    </Box>

                    <Box sx={{display: "flex", flexDirection: "row"}}>
                    <Skeleton variant="circular" width={40} height={40} sx={{mt: 2, mr: 2}}/>
                    <Skeleton variant="text" width={"30%"} sx={{mt: 1.5}}/>
                    </Box>

                    <Box sx={{display: "flex", flexDirection: "row", mb: 2}}>
                    <Skeleton variant="circular" width={40} height={40} sx={{mt: 2, mr: 2}}/>
                    <Skeleton variant="text" width={"30%"} sx={{mt: 1.5}}/>
                    </Box>
                    <Skeleton width={"60%"} variant="text" sx={{p: 2}}/>
                    <Skeleton width={"100%"} variant="text" sx={{p: 20, mt: -6}}/>
                </Grid2>
                
                <Grid2 size={{ xs: 12, sm: 6, md: 5 }} sx={{mt: {xs: -14, sm: -4, md: -4}}}>
                    <Skeleton sx={{  mb: 3, width: {xs: 400, sm: 350, md: 400}, minWidth: 200, 
                    height: 350,
                    borderRadius: 1,}}/>
                    <Skeleton variant="rectangular" width={"80%"} sx={{p: 15, mt: {xs: -4, sm: -4, md: -4}}}/>
                </Grid2>
                </Grid2>
            </Container>
        </Box>
    </Box>)
}

export function SignUpTicketLoading({eventByID}) {
    return (<Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "75vh"}}>
         <Box sx={{display: "flex", flexDirection: "row"}}>
        <Typography variant="button" sx={{mb: 2}} >Getting Tickets for {eventByID.title}. Please Wait</Typography>
        <Typography className="loading"></Typography>
        </Box>
        <CircularProgress size={50}/>
    </Box>)
}