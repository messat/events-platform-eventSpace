import { Box, Container, Grid2, Skeleton } from "@mui/material";


export default function AccountManagmentUserLoading() {
    return (<Box aria-busy="true" role="status">
        <Container maxWidth="sm">
        <Box sx={{display: "flex", justifyContent: "center", mb: 4, mt: 4}}  >
            <Skeleton variant="rectangular" width={490} height={80} aria-hidden="true"/>
        </Box>
        </Container>

        <Container maxWidth="lg">
        <Grid2 container spacing={4}>
        <Grid2 size={{xs: 12, sm: 12, md: 12}}>
        <Skeleton variant="rectangular" sx={{p: 5}} aria-hidden="true"/>  
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4}} sx={{mt: -7}}>
            <Skeleton sx={{maxHeight: "900px", minHeight: "300px", gap: 2, pb: 4}} width={"100%"} aria-hidden="true"/>
            <Skeleton variant="text" width={"80%"} sx={{minHeight: 60, mt: -5}} aria-hidden="true"/>
            <Box sx={{display: "flex", flexDirection: "row"}}>
            <Skeleton variant="text" width={"60%"} sx={{minHeight: 50, mr: 12}} aria-hidden="true"/>
            <Skeleton variant="circular" width={40} height={40} sx={{mt: 1}} aria-hidden="true"/>
            </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4}} sx={{mt: -7}}>
            <Skeleton sx={{maxHeight: "900px", minHeight: "300px", gap: 2, pb: 4}}  width={"100%"} aria-hidden="true"/>
            <Skeleton variant="text" width={"80%"} sx={{minHeight: 60, mt: -5}} aria-hidden="true"/>
            <Box sx={{display: "flex", flexDirection: "row"}}>
            <Skeleton variant="text" width={"60%"} sx={{minHeight: 50, mr: 12}} aria-hidden="true"/>
            <Skeleton variant="circular" width={40} height={40} sx={{mt: 1}} aria-hidden="true"/>
            </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4}} sx={{mt: -7}}>
            <Skeleton sx={{maxHeight: "900px", minHeight: "300px", gap: 2, pb: 4}}  width={"100%"} aria-hidden="true"/>
            <Skeleton variant="text" width={"80%"} sx={{minHeight: 60, mt: -5}} aria-hidden="true"/>
            <Box sx={{display: "flex", flexDirection: "row"}}>
            <Skeleton variant="text" width={"60%"} sx={{minHeight: 50, mr: 12}} aria-hidden="true"/>
            <Skeleton variant="circular" width={40} height={40} sx={{mt: 1}} aria-hidden="true"/>
            </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4}} sx={{mt: -7}}>
            <Skeleton sx={{maxHeight: "900px", minHeight: "300px", gap: 2, pb: 4}}  width={"100%"} aria-hidden="true"/>
            <Skeleton variant="text" width={"80%"} sx={{minHeight: 60, mt: -5}} aria-hidden="true"/>
            <Box sx={{display: "flex", flexDirection: "row"}}>
            <Skeleton variant="text" width={"60%"} sx={{minHeight: 50, mr: 12}} aria-hidden="true"/>
            <Skeleton variant="circular" width={40} height={40} sx={{mt: 1}} aria-hidden="true"/>
            </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4}} sx={{mt: -7}}>
            <Skeleton sx={{maxHeight: "900px", minHeight: "300px", gap: 2, pb: 4}}  width={"100%"} aria-hidden="true"/>
            <Skeleton variant="text" width={"80%"} sx={{minHeight: 60, mt: -5}} aria-hidden="true"/>
            <Box sx={{display: "flex", flexDirection: "row"}}>
            <Skeleton variant="text" width={"60%"} sx={{minHeight: 50, mr: 12}} aria-hidden="true"/>
            <Skeleton variant="circular" width={40} height={40} sx={{mt: 1}} aria-hidden="true"/>
            </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4}} sx={{mt: -7}}>
            <Skeleton sx={{maxHeight: "900px", minHeight: "300px", gap: 2, pb: 4}}  width={"100%"} aria-hidden="true"/>
            <Skeleton variant="text" width={"80%"} sx={{minHeight: 60, mt: -5}} aria-hidden="true"/>
            <Box sx={{display: "flex", flexDirection: "row"}}>
            <Skeleton variant="text" width={"60%"} sx={{minHeight: 50, mr: 12}} aria-hidden="true"/>
            <Skeleton variant="circular" width={40} height={40} sx={{mt: 1}} aria-hidden="true"/>
            </Box>
        </Grid2>

        </Grid2>
        </Container>
    </Box>)
}