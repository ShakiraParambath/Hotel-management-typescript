import React from 'react';
import MenuComponent from './MenuComponents';
import { Grid } from '@mui/material';

import HotelList from './HotelList';
import HotelDetails from './HotelDetails';
import HotelBookingDetails from './HotelBookingDetails'
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function HomeComponent() {
    return (
        <div data-testid="home">
            <div>
                <MenuComponent />
                <Grid>
                <Routes>
                <Route path="/home/list" element={<HotelList />}/>
               <Route
              path="/home/hoteldetails"
              element={<HotelDetails/>}
            />
            
            <Route path="/home/booking" element={<HotelBookingDetails/>} />
            </Routes>  
            </Grid>
            </div>
        </div>
    );
}
