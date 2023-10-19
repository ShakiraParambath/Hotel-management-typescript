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
        window.location.href = '/'
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
          <div className={classes.navLink}>
            <Link to={'/home'}className={classes.link}> HOTEL LIST </Link>
            <Link to={'/home'}   
            className={classes.link}> BOOKING DETAILS </Link>
           <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} className='uppercase ...'>{data.userName.slice(0,2)}</Avatar>
          </IconButton>
          <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
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
