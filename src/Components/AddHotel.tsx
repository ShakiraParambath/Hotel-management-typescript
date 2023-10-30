import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import uuid from 'react-uuid';
import { place } from '../MockData/place';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddHotelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  edit: boolean;
  code: string;
  setEdit: (edit: boolean) => void;
}

const AddHotel: React.FC<AddHotelProps> = ({ open, setOpen, edit, code, setEdit }) => {
  const [data, setData] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (edit) {
        try {
          const response = await fetch(`http://localhost:3000/HotelData/${code}`, {
            method: 'GET',
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const res = await response.json();
          setData(res);
          setName(res.name);
          setLocation(res.Location);
          setAddress(res.address);
          setPhone(res.contact);
          setAmount(res.amount);
          setDescription(res.description);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [edit, code]);

  const addHotel = {
    id: edit ? data[0]?.id : uuid(),
    code: edit ? data[0]?.code : uuid(),
    name: name,
    address: address,
    Location: location,
    contact: phone,
    amount: amount,
    description: description,
    userName: email,
  };

  function handleClose() {
    setName('');
    setLocation('');
    setAmount('');
    setAddress('');
    setDescription('');
    setPhone('');
    setOpen(false);
    setEdit(false);
  }

  function AddHotel() {
    fetch('http://localhost:3000/HotelData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addHotel),
    })
      .then((response) => response.json())
      .then((response) => {
        setOpen(false);
        toast.success('New Hotel details added !!!', {
          style: { width: '350px' },
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }

  function EditHotel(e: React.FormEvent) {
    e.preventDefault();
    fetch(`http://localhost:3000/HotelData/${code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addHotel),
    })
      .then((response) => response.json())
      .then((response) => {
        setOpen(false);
        setEdit(false);
        toast.success('Updated Successfully !!!', {
          style: { width: '350px' },
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title" className='min-w-500'  data-testid="add-hotel">
      <DialogTitle align="center" className='bg-[#1976d2] text-white-900'>
        {!edit ? 'Add New Hotel' : 'Edit Hotel details'}
      </DialogTitle>
      <DialogContent  className='min-w-[500px] pl-[100px]'>
        <br />
        <TextField id="outlined-basic" label="Hotel Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <br />
        <FormControl className='w-[220px]' data-testid="select">
          <InputLabel>Select Location</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={location}
            onChange={(e) => setLocation(e.target.value as string)}
            label="Select Location"
            data-testid="my-select"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {place?.map((item) => {
              return (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          type="text"
          rows={3}
          multiline
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className='w-[220px]'
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Contact Number"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='w-[220px]'
          type="phone"
          autoComplete="phone"
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Contact Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-[220px]'
          type="email"
          autoComplete="email"
        />
        <br />
        <br />
        <FormControl className='w-[220px]'>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            endAdornment={<InputAdornment position="end">/day</InputAdornment>}
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl>
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          type="text"
          rows={3}
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-[220px]'
        />
        <br />
        <br />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">
          Cancel
        </Button>
        {!edit ? (
          <Button onClick={AddHotel} variant="contained" color="success" disabled={name && location && address && description && phone && amount ? false : true}>
            ADD HOTEL
          </Button>
        ) : (
          <Button onClick={EditHotel} variant="contained" color="success" disabled={name && location && address && description && phone && amount ? false : true}>
            EDIT HOTEL
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddHotel;
