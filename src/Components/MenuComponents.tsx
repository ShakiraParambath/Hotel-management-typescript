import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {  signOut } from "firebase/auth";
import {auth} from '../config/firebase'
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginTop:"10px",
        marginLeft: "80px",
        "&:hover": {
          color: "yellow",
          borderBottom: "1px solid white",
        },
      },
    navLink:{
        marginLeft: "250px",
        display: "flex",
    }
}))

export default function MenuComponents() {
  const navigate = useNavigate();
    const value: string | null = sessionStorage.getItem("login-user");
    let data;
    if(value !== null)
    {
        data=JSON.parse(value);
    }
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    // const auth = getAuth();
    // console.log(auth) 
    const handleSignOut = async(e:any) =>{
      e.preventDefault();
      await signOut(auth).then(() => {
        // Sign-out successful.
        setAnchorEl(null);
        navigate('/');
      }).catch((err) => {
        // An error happened.
        console.log(err.code);
        alert(err.code);
      });
    }
    
console.log(data);
  return (
   
      <AppBar position="static" data-testid="menu">
         <CssBaseline />
        <Toolbar>
          <Typography variant="h4" component="div" >
            SKY BOOKING.COM
          </Typography>
          <div className="flex justify-between ..">
            <Link to={'/home'} className="text-xl ml-300 mt-7 text-white-900 hover:underline hover:text-yellow "> HOTEL LIST </Link>
            <Link to={'/home/booking'}   
             className="text-xl ml-50 mt-7 text-white-900 hover:underline hover:text-yellow "> BOOKING DETAILS </Link>
           
           <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            className='ml-250'
          >
            <Avatar sx={{ width: 32, height: 32 }} className='uppercase ...'>{data?.userName ? data?.userName?.slice(0,2): 'TE'}</Avatar>
          </IconButton>
         
          <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
          </div>
        </Toolbar>
      </AppBar>
  );
}
