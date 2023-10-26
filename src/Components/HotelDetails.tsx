import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Chip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BookNow from "./BookNow";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(() => ({
    box: {
        width: '600px',
        align: "center",
        marginLeft: "400px",
    },
    heading: {
        color: "#FE2E64"
    },
    address: {
        padding: "10px",
    },
    card: {
        backgroundColor: "#FBEFEF",
    }
}));

const HotelDetails: React.FC = () => {
    const classes = useStyles();
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
            <Typography variant="h4" align="center" style={{ color: "#08088A" }}>Hotel Details</Typography>
            <br />
            <Box className={classes.box}>
                <Card variant="outlined" >
                    <CardContent style={{ alignItems: "center" }} className={classes.card}>
                        <Typography variant="h5" align="center" className={classes.heading}>{data?.name}</Typography>
                        <Typography align="center" className={classes.address}>{data?.address}</Typography>
                        <Typography variant="body2" color="textSecondary" align="justify" component="p">{data?.description}</Typography>

                        <Typography align="center" style={{ padding: "5px" }}>Contact : {data?.contact}</Typography>
                        <Chip label={`${data?.amount}/day`} variant="filled" color="primary" style={{ marginLeft: "210px", fontSize: "18px", width: "100px" }} />
                        <br />
                        <br />
                        {Role === 'User' && <Button variant="contained" color="success" style={{ marginLeft: '210px' }} onClick={() => setOpen(true)}>Book Now</Button>}
                        <BookNow open={open} setOpen={changeState} />
                        <ToastContainer />
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    )
}

export default HotelDetails;
