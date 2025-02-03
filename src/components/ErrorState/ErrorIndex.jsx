import { Box, Typography } from "@mui/material";


export default function ErrorHandlerClient({ isError }) {
    return (<section>
    <Box display={{display: "flex", flexDirection: "column", alignItems: "center"}} role="alert" aria-live="assertive" tabIndex={-1}>
        <Typography variant="button" color="primary" sx={{mt: 1.5, fontSize: "25px"}}>OOPs something went wrong</Typography>
        <Typography variant="button" color="error" sx={{mt: 1, fontSize: "25px"}}>{isError.message ? isError.message: null}</Typography>
        <Typography variant="button" color="error" sx={{mt: 1, fontSize: "25px"}}>{isError.response ? isError.response.data.msg : null}</Typography>
        <Typography variant="button" color="error" sx={{mt: 1, fontSize: "15px", mx: 2, textAlign: "center", mb: 1}}>We Are Sorry. Event Space Team Are Working Hard To Bring Event Space To You At The Earliest</Typography>
    </Box>
    </section>)
}