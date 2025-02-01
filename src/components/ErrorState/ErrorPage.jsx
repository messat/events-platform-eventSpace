import { Box, Container, Grid2, Link, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router";


export default function ErrorPage() {
    const navigate = useNavigate()
    return (<Container maxWidth="lg" sx={{mt: 10}}>
        <Grid2 container spacing={2} sx={{justifyContent: "center",}}>
        <Grid2 size={{xs: 12, sm: 8, md: 6}}>
            <Paper elevation={20} sx={{display: "flex", justifyContent: "center", bgcolor: "#1976d2"}}>
                <Typography variant="button" sx={{fontSize: "30px", color: "white"}}>404 Route Not Found</Typography>
            </Paper>
            <Box sx={{display: "flex", justifyContent: "center", mt: 5}}>
            <Link component={"button"} variant="button" underline="hover" 
            onClick={() => navigate("/")}
            >Connect Back To Event Space</Link>
            </Box>
        </Grid2>
        </Grid2>
    </Container>)
}