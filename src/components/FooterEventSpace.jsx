import { Grid } from "@mui/joy";
import { Box, Container, createTheme, ThemeProvider, Typography } from "@mui/material";



export default function FooterEventSpace () {
     const theme = createTheme({
            typography: {fontFamily: 'sniglet'}
          })

    return (<footer role="contentinfo" aria-label="Footer with tech stack information">
    <Box
      sx={{
        width: "100%",
        height: "auto",
        bottom: 40,
        position: "absolute"
      }}
      tabIndex={0}
    >

      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">

          <Grid>
            <ThemeProvider theme={theme}>
            <Typography color="black" component={"h1"} variant="h5" sx={{fontStyle: "sniglet", color: "#2196f3"}}>
               Event Space
            </Typography>
            </ThemeProvider>
          </Grid>

          <Grid item="true">
            <ThemeProvider theme={theme}>
            <Typography color="textSecondary" component={"p"} variant="subtitle1" textAlign={"center"}>
             © {`${new Date().getFullYear()} | Muhammad Essat | React JS | Material UI | Node | JavaScript | Express | MongoDB | Mongoose`}
            </Typography>
            </ThemeProvider>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
    </footer>)
}

