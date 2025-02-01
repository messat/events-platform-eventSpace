import { Alert, Box, Container, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";


export default function BookingTicketAlertSuccess({ setBookingTicketByUserAlert }) {

    const [show, setShow] = useState(true)

    useEffect(()=> {
        setTimeout(() => {
            setShow(false)
            setBookingTicketByUserAlert(false)
          }, 4000);
    },[])
    
    if(show){
    return (<Box>
        <Container maxWidth="lg">
        <Grid2 container spacing={2}>
            <Grid2 size={{xs: 12, sm: 6, md: 6}} sx={{mx: 3}} offset={{sm: 3, md: 3}} >
        <Alert
        severity="success"
        >
        Successfully Booked Ticket. Enjoy Connecting At Event Space. 
      </Alert>
          </Grid2>
      </Grid2>
      </Container>
    </Box>)
    }
}