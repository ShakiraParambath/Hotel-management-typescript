import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Table } from 'antd';

interface HotelBookingDetailsProps {}

const HotelBookingDetails: React.FC<HotelBookingDetailsProps> = () => {
  const Role = sessionStorage.getItem("userRole");
  const [details, setDetails] = useState<any[]>([]);
  const [hotel, setHotel] = useState<any[]>([]);

  const val: string | null = sessionStorage.getItem("login-user");
    let login:any;
    if(val !== null)
    {
        login=JSON.parse(val);
    }

  useEffect(() => {
    fetch('http://localhost:3000/BookingData')
      .then((response) => response.json())
      .then((response) => {
        setDetails(response);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/HotelData')
      .then((response) => response.json())
      .then((response) => {
        setHotel(response);
      });
  }, []);

  function filteredData() {
    if (Role === 'User') {
      const filteredList = details?.filter((item) => {
        return item?.userName?.toLowerCase() === login?.userName?.toLowerCase();
      });
      return filteredList;
    } else if (Role === 'Hotel-admin') {
      const List = hotel?.filter((item) => {
        return item?.userName?.toLowerCase() === login?.userName?.toLowerCase();
      });

      const filteredList = details?.filter((item) => {
        return item?.HotelName?.toLowerCase() === List[0]?.name?.toLowerCase();
      });

      return filteredList;
    }
    return details;
  }

  const filtered = filteredData();

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Hotel Name',
      dataIndex: 'HotelName',
      key: 'HotelName',
    },
    {
      title: 'Check-in Date',
      dataIndex: 'checkIN',
      key: 'checkIN',
    },
    {
      title: 'Check-out Date',
      dataIndex: 'checkOut',
      key: 'checkOut',
    },
    {
      title: 'Number of Rooms Booked',
      dataIndex: 'No_of_Rooms',
      key: 'No_of_Rooms',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
    },
  ];

  return (
    <Grid data-testid="table">
      <br />
      <Typography variant="h4" align="center" style={{ color: "#08088A" }}>
        Hotel Booking Details
      </Typography>
      <br />
      <Table dataSource={filtered} columns={columns} />
    </Grid>
  );
};

export default HotelBookingDetails;
