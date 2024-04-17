import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the access token in localStorage
        },
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div>
      <h2>Booking List</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
            <p>Pet Name: {booking.pet_name}</p>
            <p>Breed: {booking.breed}</p>
            <p>Age: {booking.age}</p>
            <p>Color: {booking.color}</p>
            <p>Symptoms: {booking.symptoms}</p>
            <p>Status: {booking.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
