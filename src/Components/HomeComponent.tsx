import React from 'react';
import MenuComponent from './MenuComponents';
import { Grid } from '@mui/material';

import HotelList from './HotelList';
import HotelDetails from './HotelDetails';
import HotelBookingDetails from './HotelBookingDetails'
// import { BrowserRouter, Routes, Route ,} from "react-router-dom";
import {  Routes, Route } from 'react-router-dom';

export default function HomeComponent() {
    return (
        <div data-testid="home">
            <div>
                <MenuComponent />
                <Grid>
                <Routes>
                     <Route path="/" element={<HotelList />}/>
               <Route
              path="hoteldetails"
              element={<HotelDetails/>}
            />
            
            <Route path="booking" element={<HotelBookingDetails/>} /> 
                </Routes>
         
            </Grid>
            </div>
        </div>
    );
}
