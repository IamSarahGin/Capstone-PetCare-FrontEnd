import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    fetchBookings();
  }, [currentPage]); // Fetch bookings whenever currentPage changes

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/bookings', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
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
    <div className='mt-5'>
      <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>BOOKING LIST</h3>
      <table className="table table-striped">
        {/* Table header */}
        <thead>
          {/* Header row */}
          <tr>
            <th>DATE</th>
            <th>TIME</th>
            <th>PET Name</th>
            <th>BREED</th>
            <th>AGE</th>
            <th>COLOR</th>
            <th>SYMPTOMS</th>
            <th>STATUS</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Map through bookings and render each row */}
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
      {/* Pagination controls */}
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">{currentPage}</span>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BookingList;
