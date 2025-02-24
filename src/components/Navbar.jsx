import * as React from 'react';
import { styled, alpha, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useState, useContext } from 'react';
import UserContext from '../Context/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoginIcon from '@mui/icons-material/Login';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { useNavigate } from 'react-router';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: "flex",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.8),
  '&:hover': {
    backgroundColor: "#f0f0f0",
  },
  marginRight: theme.spacing(2),
  marginTop: 1,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: "black",
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000000",
  fontSize: "20px",
  fontWeight: "400",
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '45ch',
    },
  },
}));

const cursorStyle = {
  cursor: "pointer",
  "&:hover": {
    cursor: "pointer"
  }
}




export default function Navbar({setSearchTitle, setUserLogOutAlert}) {
  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate()

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose()    
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      aria-labelledby='menu-button-profile'
    >
      {isLoggedIn.username || isLoggedIn.employeeNumber ? <Box sx={{display: "flex", flexDirection: "row"}}>

      <LogoutIcon sx={{mt: 0.9, ml:1.5}} style={cursorStyle} onClick={() => {
        setIsLoggedIn({})
        localStorage.clear()
        setUserLogOutAlert(true)
        navigate("/events/user/login")
      }}></LogoutIcon>
      <MenuItem onClick={handleMenuClose} sx={{p: 1}}>
      <Typography color='primary' underline='hover' variant='button' 
      onClick={()=> {
        setIsLoggedIn({}) 
        localStorage.clear()
        setUserLogOutAlert(true)
        navigate("/events/user/login")
        }}>{isLoggedIn.employeeNumber ? "Employee Log Out" : "Log Out"}</Typography>
      </MenuItem>
      </Box>
      : 
      <Box sx={{display: "flex", flexDirection: "row"}}>
      <LoginIcon sx={{mt: 0.9, ml: 1}} style={cursorStyle} onClick={() => {
          navigate("/events/user/login")
        }} />
      <MenuItem onClick={handleMenuClose} sx={{p: 1}}><Typography underline='hover' variant='button' color='primary' onClick={() => {navigate("/events/user/login")}}>Log In</Typography></MenuItem>
      </Box>}

      {isLoggedIn.username ? 

      <Box sx={{display: "flex", flexDirection: "row"}}>
      <ManageAccountsIcon style={cursorStyle} sx={{mt: 0.8, ml: 1.5}} onClick={() => navigate("/events/user/account-management")}/>
      <MenuItem onClick={handleMenuClose} sx={{p: 1}}><Typography onClick={() => { navigate("/events/user/account-management")}} color="primary" underline='hover' variant='button'>My account</Typography></MenuItem>
      </Box>

       : null}

      {isLoggedIn.employeeNumber ? 

      <Box sx={{display: "flex", flexDirection: "row"}}>
      <ManageAccountsIcon sx={{mt: 0.8, ml: 1.5}} style={cursorStyle} onClick={() => navigate("/events/vpn/employee/account-management")}/>
      <MenuItem onClick={handleMenuClose} sx={{p: 1}}><Typography onClick={() => { navigate("/events/vpn/employee/account-management")}} color='primary' underline='hover' variant='button'>My account</Typography></MenuItem>
      </Box>

      : null}

       {isLoggedIn.employeeNumber ? 
        <Box sx={{display: "flex", flexDirection: "row"}}>
        <EditCalendarIcon sx={{mt: 0.8, ml: 1.5}} style={cursorStyle} onClick={() => { navigate("/events/vpn/employee/hostEvent")}}/>
       <MenuItem onClick={handleMenuClose} sx={{p: 1}}><Typography onClick={() => { navigate("/events/vpn/employee/hostEvent")}} color='primary' underline='hover' variant='button'>Host event</Typography></MenuItem>
      </Box>

       : null}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      aria-labelledby='mobile-menu-profile-button'
    >
      {isLoggedIn.username  || isLoggedIn.employeeNumber ? 
      <Box sx={{display: "flex", flexDirection: "row"}}>

      <MenuItem>

      <LogoutIcon style={cursorStyle} onClick={() => {
        setIsLoggedIn({})
        localStorage.clear()
        setUserLogOutAlert(true)
        navigate("/events/user/login")
      }} sx={{mr: 2}} fontSize='large'></LogoutIcon>
      <Typography color='primary' underline='hover' variant='button' sx={{fontSize: "16px", ml: -0.2}}
      onClick={()=> { 
        setIsLoggedIn({}) 
        localStorage.clear()
        setUserLogOutAlert(true)
        navigate("/events/user/login")
        }}>{isLoggedIn.employeeNumber ? "Employee Log Out" : "Log Out"}</Typography>
      </MenuItem>
      </Box>
      :
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
        <LoginIcon sx={{mt: 0.5}} style={cursorStyle} onClick={() => {
          navigate("/events/user/login")
        }} fontSize='large'/>
      <MenuItem onClick={handleMenuClose} sx={{p: 1.2}}><Typography onClick={() => { navigate("/events/user/login")}} color='primary' underline='hover' variant='button'>Log In</Typography></MenuItem>
      </Box>}

        {isLoggedIn.username ? 
         <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
         <ManageAccountsIcon sx={{mt: 1.2, ml: 1.7 }} fontSize='large' style={cursorStyle} onClick={() => navigate("/events/user/account-management")}/>
         <MenuItem onClick={handleMenuClose} ><Typography onClick={() => navigate("/events/user/account-management")} underline='hover' variant='button' color='primary' sx={{fontSize: "16px", mt: 1}}>My account</Typography></MenuItem>
         </Box>
          : null}
        
        {isLoggedIn.employeeNumber ? 
         <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
         <ManageAccountsIcon sx={{mt: 1.2, ml: 1.7 }} fontSize='large' style={cursorStyle} onClick={() => navigate("/events/vpn/employee/account-management")}/>
         <MenuItem onClick={handleMenuClose} ><Typography onClick={() => navigate("/events/vpn/employee/account-management")} underline='hover' color='primary' variant='button' sx={{fontSize: "16px", mt: 0.5}}>My account</Typography></MenuItem>
         </Box>
          : null}

        

        {isLoggedIn.employeeNumber ? 
         <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
         <EditCalendarIcon sx={{mt: 1.2, ml: 1.7 }} style={cursorStyle} fontSize='large' onClick={() => navigate("/events/vpn/employee/hostEvent")}/>
         <MenuItem onClick={handleMenuClose} ><Typography onClick={() => navigate("/events/vpn/employee/hostEvent")} underline='hover' color='primary' variant='button' sx={{fontSize: "16px", mt: 0.5}}>Host Event</Typography></MenuItem>
         </Box>
          : null}


    </Menu>
  );

  const theme = createTheme({
    typography: {
      fontFamily: 'sniglet'
    }
  })

  return (<nav role='navigation' aria-label='Main Navigation On Event Space'>
    <Box sx={{ flexGrow: 1,  }}>

      <AppBar position="fixed">

        <Container>
          
        <Toolbar>
           <EventAvailableRoundedIcon sx={{mr: 2, fontSize: "lg"}} 
           aria-label='Go to home page' style={cursorStyle}
           onClick={() => navigate("/") }/>
           
          <ThemeProvider theme={theme}>
          <Typography
            variant="h6"
            noWrap
            style={cursorStyle}
            onClick={() => navigate("/") }
            color='primary'
            tabIndex={0}
            sx={{ display: { xs: 'none', sm: 'block' }, color: "white" }}
          >
            Event Space
          </Typography>
          </ThemeProvider>

          <Search >
            <SearchIconWrapper >
              <SearchIcon  aria-hidden="true"/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search The Event Title…"
              inputProps={{ 'aria-label': 'search' }}
              name="search"
              onChange={(event) => {
                if(window.location.pathname !== "/"){
                  navigate("/")
                }
                const {name, value} = event.target
                setSearchTitle((prev) => {
                  return {...prev, [name]: value}
                })
              }}
            />
          </Search>
          
          <Box sx={{ flexGrow: 1 }} />


          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="Open profile menu"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more options"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
          </Container>
      </AppBar>
      <Toolbar />
      {renderMobileMenu}
      {renderMenu}
    </Box>
    </nav>
  );
}
