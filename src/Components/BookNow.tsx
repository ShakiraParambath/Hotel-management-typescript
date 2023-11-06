import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Chip, FormHelperText, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'react-uuid';

interface BookNowProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const BookNow: React.FC<BookNowProps> = ({ open, setOpen }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [count, setCount] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [book, setBook] = useState(false);
    const [out, setOut] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const val: string | null = sessionStorage.getItem("login-user");
    let login;
    if(val !== null)
    {
        login=JSON.parse(val);
    }

    useEffect(() => {
        fetch('http://localhost:3000/BookingData')
            .then(response => response.json())
            .then(response => {
                setData(response);
            });
    }, []);

    const handleClose = () => {
        setOpen(false);
        setName("");
        setAddress("");
        setCount("");
        setCheckIn("");
        setCheckOut("");
        setBook(false);
    };

    const value: string | null = sessionStorage.getItem("CurrentIndex");
    let session:any;
    if(value !== null)
    {
        session=JSON.parse(value);
    }

    function getNumberOfDays(start: string, end: string) {
        const date1 = new Date(start);
        const date2 = new Date(end);

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();

        // Calculating the number of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);

        return diffInDays;
    }

    const days = getNumberOfDays(checkIn, checkOut);

    function Total() {
        const total = days * session?.amount;
        return total;
    }

    const Amount = Total();

    const Booking = {
        id: uuid(),
        HotelName: session?.name,
        checkIN: checkIn,
        checkOut: checkOut,
        No_of_Rooms: count,
        Amount: Amount,
        user: name,
        userName: login?.userName
    };

    const onSubmit = () => {
        fetch('http://localhost:3000/BookingData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Booking)
        }).then(response => response.json()).then(response => {
            setOpen(false);
            toast.success("you successfully done your booking!!!", {
                style: { width: '350px' },
                position: toast.POSITION.TOP_CENTER
            });
        });
    };

    const dates: string[] = [];

    let filteredList = data?.filter((item) => {
        return item?.HotelName?.toLowerCase() === session.name.toLowerCase();
    });

    filteredList.forEach((item) => {
        getDates(item.checkIN, item.checkOut);
    });

    function getDates(startDate: string, endDate: string) {
        const currentDate = new Date(startDate);
        const end = new Date(endDate);

        while (currentDate <= end) {
            dates.push(new Date(currentDate).toLocaleDateString());
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }

    useEffect(() => {
        const val = new Date(checkIn).toLocaleDateString();
        const val2 = new Date(checkOut).toLocaleDateString();
        dates.includes(val) ? setBook(true) : setBook(false);
        dates.includes(val2) ? setOut(true) : setOut(false);
        days < 1 ? setInvalid(true) : setInvalid(false);
    }, [checkIn, checkOut]);

    return (
        <Dialog data-testid="booking" open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title" className='min-w-500'>
            <DialogTitle align='center' className='bg-[#1976d2] text-white-900'>Booking Details</DialogTitle>
            <DialogContent className='min-w-[500px] pl-[100px]'>
                <br />
                <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                <br /><br />
                <TextField id="outlined-basic" label="Enter Your Address" variant="outlined" multiline rows={2} value={address} onChange={(e) => setAddress(e.target.value)} className='w-[220px]' />
                <br /><br />
                <TextField id="outlined-basic" label="No:of Rooms" variant="outlined" type='number' value={count} onChange={(e) => setCount(e.target.value)} className='w-[220px]' />
                <br /><br />
                <TextField
                    id="outlined-basic"
                    label="Check-in date & time"
                    variant="outlined"
                    type="datetime-local"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    error={book}
                    className='w-[220px]'
                />
                {book && <FormHelperText  style={{color:'red'}}>This date is booked. Please choose another date !</FormHelperText>}
                <br /><br />
                <TextField
                    id="outlined-basic"
                    label="Check-out date & time"
                    variant="outlined"
                    type="datetime-local"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className='w-[220px]'
                    error={out || invalid}
                />
                {out && <FormHelperText style={{color:'red'}}>This date is booked. Please choose another date !</FormHelperText>}
                {invalid && <FormHelperText  style={{color:'red'}}>Invalid date selection. Please choose another date !</FormHelperText>}
                <br /><br />
                <TextField id="outlined-basic" label={"No:of days"} variant="outlined" disabled value={days ? `${days}` : ""} className='w-[220px]' />
                <br /><br />
                <Typography>Total Amount</Typography>
                <Chip label={Amount ? `${Amount}` : ""} variant="filled" color='secondary' />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
                <Button onClick={onSubmit} variant="contained" color="success" disabled={name && address && count && checkIn && checkOut ? false : true}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default BookNow;
