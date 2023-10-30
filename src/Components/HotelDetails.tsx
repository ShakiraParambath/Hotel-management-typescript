import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Chip, Typography } from "@mui/material";
import BookNow from "./BookNow";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const HotelDetails: React.FC = () => {
    const [open, setOpen] = useState(false);
    const value: string | null = sessionStorage.getItem("CurrentIndex");
    let data;
    if(value !== null)
    {
        data=JSON.parse(value);
    }
    const Role = sessionStorage.getItem("userRole");

    const changeState = (value: boolean) => {
        setOpen(value);
    }

    return (
        <Grid data-testid="details">
            <br />
            <Typography variant="h4" align="center" className='text-[#08088A]'>Hotel Details</Typography>
            <br />
            <Box className='w-600  ml-400 content-center ...'>
                <Card variant="outlined" >
                    <CardContent style={{ alignItems: "center" }} className='bg-[#FBEFEF]'>
                        <Typography variant="h5" align="center" className='text-[#FE2E64]'>{data?.name}</Typography>
                        <Typography align="center" className='p-10'>{data?.address}</Typography>
                        <Typography variant="body2" color="textSecondary" align="justify" component="p">{data?.description}</Typography>

                        <Typography align="center" className='p-[5px]'>Contact : {data?.contact}</Typography>
                        <Chip label={`${data?.amount}/day`} variant="filled" color="primary" className='w-100 ml-[230px] text-xl'/>
                        <br />
                        <br />
                        {Role === 'User' &&
                        <div className='flex justify-center items-center'>
                         <Button variant="contained" color="success"  onClick={() => setOpen(true)}>Book Now</Button></div>}
                        <BookNow open={open} setOpen={changeState} />
                        <ToastContainer />
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    )
}

export default HotelDetails;
