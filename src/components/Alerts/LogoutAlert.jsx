import { Alert, Box, Container, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";


export default function UserLogOutAlertSuccess({setUserLogOutAlert}) {

    const [show, setShow] = useState(true)

    useEffect(()=> {
        setTimeout(() => {
            setShow(false);
            setUserLogOutAlert(false)
          }, 3000);
    },[])

    if(show){
    return (<Box>
        <Container maxWidth="lg">
        <Grid2 container spacing={2}>
            <Grid2 size={{xs: 12, sm: 8, md: 6}} sx={{mx: 3, mt: 3}} offset={{sm: 2, md: 3}} >
        <Alert
        severity="success"
        >
        Successfully Signed Out. We Hope To See You Come Back!
      </Alert>
          </Grid2>
      </Grid2>
      </Container>
    </Box>)
    }
}