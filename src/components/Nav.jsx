/* eslint-disable react/jsx-key */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../images/LOGO.png'
import user from '../images/pngwing.com.png'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import LongMenu from './DropDown';
import FilterMenu from './SearchFilter';
import { JwtContext, SearchContext } from '../JwtContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'


const pages = [{ Name: 'Mood Tracker', Link: "/moodtracker" }, { Name: 'Get Started', Link: "/guide" }, { Name : 'Watch List', Link:"/watch-list"} ];
const settings1 = [{ Name: 'Profile', Link: "/profile" },  {Name:'Logout', Link: '/logout'}];
const settings2 = [{ Name: 'Login', Link: "/login" }, { Name: 'Signup', Link: "/signup" }, {Name:'Profile', Link: '/profile'}];
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 3),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '24ch',
      },
    },
  },
}));



function Nav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { search, setSearch } = useContext(SearchContext)
  const navigate = useNavigate();

  const changeTheSearch = (event) => {
    console.log(event.target.value , " is value");
    setSearch(event.target.value);
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(
    () => {
      //setMovies([]);
      // console.log("Hello");
      if (search === "") {
        //getAllMovies();
        console.log("search empty")
      } else {
        //getSearchedMovies();
        console.log("searched : " , search)
      }
    },
    [search]
  )

  var settings;
  const { jwt, setJwt } = React.useContext(JwtContext)
  console.log("jwt for nav : ", jwt)
  if(jwt == null ){
    settings = settings2;
  } else {
    settings = settings1;
  }
  console.log(settings)
  return (
    <AppBar className='bg-black' sx={{backgroundColor:'black'}} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box className= "bg-black" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
            <IconButton
              className='md: justify-start'
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
                      </IconButton>
 
            <Menu className='bg-transparent'
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              PaperProps={{
          style: {
            borderRadius:'2ch',
             backgroundColor: 'black',
          },
        }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                  display: { xs: 'block', md: 'none' },
                  
              }}
            >
              {pages.map((page) => (
                  <MenuItem sx={{ color: '#BD6513' , 'outlineStyle':'solid' , 'outlineColor':'#BD6513'}} className='text-amber-700 bg-black !important' key={page.name} onClick={handleCloseNavMenu}>
                      <button onClick={() => {navigate(page.Link)}} >
                          <Typography textAlign="center">{page.Name}</Typography>
                          </button>
                </MenuItem>
              ))}
              <MenuItem sx={{ color: '#BD6513' , 'outlineStyle':'solid' , 'outlineColor':'#BD6513'}} className='text-amber-700 bg-black !important'  onClick={handleCloseNavMenu}>
                      <button onClick={()=> {navigate('/')}}>
                          <Typography textAlign="center">Langauge</Typography>
                          </button>
              </MenuItem>
              <MenuItem>
                  <Box sx={{ flexGrow: 0 }}>
                      
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' , borderRadius:'2ch', }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                    }}
                     PaperProps={{
          style: {
            
                         backgroundColor: 'black',
                         backdropFilter:'none',
                         textDecorationColor: 'white',
             color:'#bd6513',
          },
        }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <button onClick={()=> {navigate(setting.Link)}}>
                    <Typography textAlign="center">{setting.Name}</Typography>
                    </button>
                </MenuItem>
              ))}
                      </Menu>
                      
                       
          </Box>
              </MenuItem>
              <MenuItem>
              <>
                  <div className='sm: pr-2  !important'>
                      
               
            <Search >
              
                          <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
                      <StyledInputBase
                        value={search}
                        onChange={changeTheSearch}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
            </Search>
            </div>                     
             <FilterMenu /> </></MenuItem>
            </Menu>
                  </Box>
                                         <button onClick={()=> {navigate('/')}} >
                      <img className='pt-4 pb-4 h-28 w-42 align-left' src={Logo} alt="logo" />
                      </button>
          {window.innerWidth > 600 ? 
            <>
                  <div className='sm: pr-2  !important'>
                      
               
            <Search >
              
                          <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
                  <StyledInputBase
                    value={search}
                        onChange={changeTheSearch}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
                      </Search>
            </div>                     
             <FilterMenu /> </>  : <></>} 
          
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className= 'justify-end pr-28'>
            {pages.map((page) => (
                <button  onClick={()=> {navigate(page.Link)}} className='text-amber-700 px-6 border-b-amber-700 !important'>
                <Button sx={{color:'#BD6513' , outlineStyle:'solid' , outlineColor:'#BD6513'}} className='text-amber-700 !important'>
                {page.Name}
                </Button>
                </button>
            ))}
               
           
              

          </Box>
          <a className='text-amber-700 pr-6 justify-end pb-1 border-b-amber-700 !important'>
                <Button sx={{color:'#BD6513' , outlineStyle:'solid' , outlineColor:'#BD6513'}} className='text-amber-700 !important'>
               
              <LongMenu />   
                  {/* <LongMenu />             */}
              </Button>
            </a>
                   {/* <form action="https://www.google.com/search" method="get"  className="search-bar mx-2 pt-1 px-2 sm:pt-1 bg-amber-700 " target="_blank">
            {/* <input className='bg-amber-700 text-black border-solid rounded mb-0 sm:mb-2' type="text" placeholder="         search your movie" name="q"/>
            <button className='text-black px-1 sm:px-3' type="submit">  <i className="fas fa-search text-green"></i></button>
             */}
                       {/* <input type="text" className="search-bar" placeholder="Search..."/>
      <button className="search-button"><i className="fas fa-search"></i></button>
        </form> */} 
          {window.innerWidth > 600 ?
            <Box sx={{ flexGrow: 0 }}>
                      
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                       <button  onClick={()=> {navigate(setting.Link)}}>
                      <Typography textAlign="center">{setting.Name}</Typography>
                    </button>
                    </MenuItem>
                    
                ))}
              </Menu>
                      
                       
            </Box> : <></>

          }      
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;