import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Box, List, ListItem, ListItemText, Button, Dialog, DialogContent, DialogActions, DialogTitle, SelectChangeEvent } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import AddHotel from './AddHotel';
import { Delete, Edit } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { place } from '../MockData/place';



const HotelList: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<any>('');
  const [open, setOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState<boolean>(false);
  const [select, setSelected] = useState<any>('');
  const Role = sessionStorage.getItem('userRole');
  const [edit, setEdit] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [hotel, setHotel] = useState<any[]>([]);
  const [delId, setDelId] = useState<string>('');

  
    useEffect(() => {
      fetch('http://localhost:3000/HotelData').then(response => response.json())
        .then(response => {
          console.log(response, 'response');
          setData(response);
          setHotel(response);
          sessionStorage.setItem("HotelData", JSON.stringify(response));
        })
    }, [open]);
 
  function changeState(value: boolean) {
    setOpen(value);
  }

  function changeEditState(value: boolean) {
    setEdit(value);
  }


function handleLocation(event: SelectChangeEvent<string>, child: React.ReactNode) {
    setLocation(event.target.value);
    filteredLocation(event.target.value);
  }

  const filteredLocation = (location: string) => {
    if (!location) {
      setData(hotel);
    } else {
      const filterList = hotel.filter((item) => {
        return item.Location.toLowerCase() === location.toLowerCase();
      });
      setData(filterList);
    }
  };

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    const query = event.target.value;
    const filteredList = hotel.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setData(filteredList);
  };

 
  const handleDelete = async (e: any) => {
    e.preventDefault();
    fetch('http://localhost:3000/HotelData/' + delId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
    }).then(response => response.json()).then(response => {
      console.log(response)
      setDialog(false);
      const datas = data?.filter((item: any) => item.code !== select.code);
      setData(datas);
      sessionStorage.setItem("data", JSON.stringify(datas));
    });
  }
console.log(place)
  const DeleteDialog = () => {
    return (
      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <DialogTitle>Conform Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this hotel details?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)} variant="outlined" color="inherit">
            NO
          </Button>
          <Button onClick={(e) => handleDelete(e)} variant="contained" color="error">
            YES
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Grid data-testid="list">
      <br />
      <Typography variant="h4" align="center" className='text-[#08088A]'>
        Hotel List
      </Typography>
      <br />
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <TextField
          type="text"
          id="standard-basic"
          variant="standard"
          label="Search by Name"
          onChange={handleSearch}
          value={search}
          className='m-2 min-w-[200px]'
        ></TextField>
        <FormControl className='w-[160px]' variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Filter By Location</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard-label"
            value={location}
            onChange={handleLocation}
            label="Filter By Location"
            data-testid="my-select"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {/* Place Menu Items */}
            {place?.map((item: string) => {
              return <MenuItem value={item} key={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>
        {Role === 'Admin' && (
          <FormControl>
            <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
              Add Hotels
            </Button>
          </FormControl>
        )}
        <AddHotel open={open} setOpen={changeState} edit={edit} code={code} setEdit={changeEditState} />
      </Grid>
      <Box>
        <List className='w-full'>
          {data?.length ? (
            data?.map((item:any) => {
              return (
                <ListItem>
                  <ListItem component={Link} to="/home/hoteldetails" onClick={() => { sessionStorage.setItem('CurrentIndex', JSON.stringify(item)); }}>
                    <ListItemText className='bg-purple-200 h-12 p-2'>
                      <span className='text-[19px] text-pink-500'>{item.name}</span>
                      <span className='text-[13px] m-2 text-[#08088A]'>{item.Location}</span>
                    </ListItemText>
                  </ListItem>
                  {Role === 'Admin' && (
                    <ListItem style={{ width: '120px' }}>
                      <ListItemText className='flex justify-end'>
                        <Edit className='mr-[15px]' onClick={() => { setOpen(true); setEdit(true); setCode(item.id); }} />
                      </ListItemText>
                      <ListItemText className='flex justify-end'>
                        <Delete onClick={() => { setDialog(true); setSelected(item); setDelId(item.id); }} />
                      </ListItemText>
                    </ListItem>
                  )}
                </ListItem>
              );
            })
          ) : (
            <h3 >Search not found !!!!</h3>
          )}
        </List>
        <DeleteDialog />
      </Box>
      <ToastContainer />
    </Grid>
  );
};

export default HotelList;
