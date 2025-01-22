import { Grid } from "@mui/joy";
import { Box, Container, createTheme, ThemeProvider, Typography } from "@mui/material";



export default function Footer () {
     const theme = createTheme({
            typography: {fontFamily: 'sniglet'}
          })

    return <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid>
            <ThemeProvider theme={theme}>
            <Typography color="black" variant="h5" sx={{fontStyle: "sniglet"}}>
               Event Space
            </Typography>
            </ThemeProvider>
          </Grid>
          <Grid item="true">
            <ThemeProvider theme={theme}>
            <Typography color="textSecondary" variant="subtitle1">
             © {`${new Date().getFullYear()} | Muhammad Essat | React JS | Material UI | Node | Express | MongoDBk`}
            </Typography>
            </ThemeProvider>
          </Grid>
        </Grid>
      </Container>
    </Box>
}

