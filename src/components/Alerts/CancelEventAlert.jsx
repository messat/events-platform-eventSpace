import { Alert, Box, Container, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";


export default function CancelEventByEmployeeAlertSuccess({ setCanelEventByEmployeeAlert }) {

    const [show, setShow] = useState(true)

    useEffect(()=> {
        setTimeout(() => {
            setShow(false)
            setCanelEventByEmployeeAlert(false)
          }, 3000);
    },[])
    
    if(show){
    return (<Box>
        <Container maxWidth="lg">
        <Grid2 container spacing={2}>
            <Grid2 size={{xs: 12, sm: 6, md: 6}} sx={{mx: 3}} offset={{sm: 3, md: 3}} >
        <Alert
        severity="success"
        >
        Successfully Cancelled The Event From Event Space.
      </Alert>
          </Grid2>
      </Grid2>
      </Container>
    </Box>)
    }
}


export function EventTicketCancelledByUserAlert({ setCancelTicketByUserAlert }) {

    const [show, setShow] = useState(true)

    useEffect(()=> {
        setTimeout(() => {
            setShow(false)
            setCancelTicketByUserAlert(false)
          }, 3000);
    },[])
    
    if(show){
    return (<Box>
        <Container maxWidth="lg">
        <Grid2 container spacing={2}>
            <Grid2 size={{xs: 12, sm: 6, md: 6}} sx={{mx: 3}} offset={{sm: 3, md: 3}} >
        <Alert
        severity="success"
        >
        Successfully Cancelled Your Ticket From Event Space.
      </Alert>
          </Grid2>
      </Grid2>
      </Container>
    </Box>)
    }
}