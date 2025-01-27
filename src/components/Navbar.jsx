import * as React from 'react';
import { styled, alpha, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { Link } from '@mui/material';
import { useState, useContext } from 'react';
import UserContext from '../Context/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoginIcon from '@mui/icons-material/Login';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: "flex",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
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





export default function Navbar({setSearchTitle}) {
  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
    >
      {isLoggedIn.username || isLoggedIn.employeeNumber ? <Box sx={{display: "flex", flexDirection: "row"}}>

      <LogoutIcon sx={{mt: 0.9, ml:1.5}} onClick={() => {
        setIsLoggedIn({})
        localStorage.clear()
        window.location.href="/events/user/login"
      }}></LogoutIcon>
      <MenuItem onClick={handleMenuClose} sx={{p: 1}}>
      <Link href={"/events/user/login"} underline='hover' variant='button' 
      onClick={()=> { 
        setIsLoggedIn({}) 
        localStorage.clear()
        }}>{isLoggedIn.employeeNumber ? "Employee Log Out" : "Log Out"}</Link>
      </MenuItem>
      </Box>
      : 
      <Box sx={{display: "flex", flexDirection: "row"}}>
        <LoginIcon sx={{mt: 0.9, ml: 1}} onClick={() => {
          window.location.href="/events/user/login"
        }} />
      <MenuItem onClick={handleMenuClose} sx={{p: 1}}><Link href={"/events/user/login"} underline='hover' variant='button'>Log In</Link></MenuItem>
      </Box>}

      {isLoggedIn.username || isLoggedIn.employeeNumber ? 

      <Box sx={{display: "flex", flexDirection: "row"}}>
      <ManageAccountsIcon sx={{mt: 0.8, ml: 1.5}}/>
      <MenuItem onClick={handleMenuClose} sx={{p: 1}}><Link href={"/events"} underline='hover' variant='button'>My account</Link></MenuItem>
      </Box>

       : null}

       {isLoggedIn.employeeNumber ? 
        <Box sx={{display: "flex", flexDirection: "row"}}>
        <EditCalendarIcon sx={{mt: 0.8, ml: 1.5}} onClick={() => { window.location.href="/events/vpn/employee/hostEvent"}}/>
       <MenuItem onClick={handleMenuClose} sx={{p: 1}}><Link href={"/events/vpn/employee/hostEvent"} underline='hover' variant='button'>Host event</Link></MenuItem>
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
    >
      {isLoggedIn.username  || isLoggedIn.employeeNumber ? 
      <Box sx={{display: "flex", flexDirection: "row"}}>

      <MenuItem>

      <LogoutIcon onClick={() => {
        setIsLoggedIn({})
        localStorage.clear()
        window.location.href="/events/user/login"
      }} sx={{mr: 2}} fontSize='large'></LogoutIcon>
      <Link href={"/events/user/login"} underline='hover' variant='button' sx={{fontSize: "16px"}}
      onClick={()=> { 
        setIsLoggedIn({}) 
        localStorage.clear()
        }}>{isLoggedIn.employeeNumber ? "Employee Log Out" : "Log Out"}</Link>
      </MenuItem>
      </Box>
      :
      <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
        <LoginIcon sx={{mt: 1.3}} onClick={() => {
          window.location.href="/events/user/login"
        }} fontSize='large'/>
      <MenuItem onClick={handleMenuClose} sx={{p: 1.2}}><Link href={"/events/user/login"} underline='hover' variant='button'>Log In</Link></MenuItem>
      </Box>}

        {isLoggedIn.username || isLoggedIn.employeeNumber ? 
         <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
         <ManageAccountsIcon sx={{mt: 1.2, ml: 1.7 }} fontSize='large'/>
         <MenuItem onClick={handleMenuClose} ><Link href={"/events"} underline='hover' variant='button' sx={{fontSize: "16px", mt: 0.5}}>My account</Link></MenuItem>
         </Box>
          : null}

        {isLoggedIn.employeeNumber ? 
         <Box sx={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
         <EditCalendarIcon sx={{mt: 1.2, ml: 1.7 }} fontSize='large'/>
         <MenuItem onClick={handleMenuClose} ><Link href={"/events/vpn/employee/hostEvent"} underline='hover' variant='button' sx={{fontSize: "16px", mt: 0.5}}>Host Event</Link></MenuItem>
         </Box>
          : null}


    </Menu>
  );

  const theme = createTheme({
    typography: {
      fontFamily: 'sniglet'
    }
  })

  return (
    <Box sx={{ flexGrow: 1,  }}>

      <AppBar position="fixed">

        <Container>
          
        <Toolbar>
           <EventAvailableRoundedIcon sx={{mr: 2, fontSize: "lg"}} 
           onClick={() => { window.location.href="/" }}/>
           
          <ThemeProvider theme={theme}>
          <Link
            variant="h6"
            noWrap
            href="/"
            sx={{ display: { xs: 'none', sm: 'block' }, color: "white" }}
          >
            Event Space
          </Link>
          </ThemeProvider>

          <Search >
            <SearchIconWrapper >
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search the event title…"
              inputProps={{ 'aria-label': 'search' }}
              name="search"
              onChange={(event) => {
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
              aria-label="account of current user"
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
              aria-label="show more"
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
  );
}
