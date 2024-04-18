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
      // Format the date and time before setting the bookings
      const formattedBookings = response.data.map(booking => ({
        ...booking,
        date: formatDate(booking.date),
        time: formatTime(booking.time),
      }));
      setBookings(formattedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const amOrPm = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${amOrPm}`;
  };

  return (
    <div>
      <h2>Booking List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Pet Name</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Color</th>
            <th>Symptoms</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.pet_name}</td>
              <td>{booking.breed}</td>
              <td>{booking.age}</td>
              <td>{booking.color}</td>
              <td>{booking.symptoms}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
