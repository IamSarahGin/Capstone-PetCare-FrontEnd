import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ fetchBookings }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    pet_name: '',
    breed: '',
    age: '',
    color: '',
    symptoms: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/bookings', formData);
      alert('Booking added successfully!');
      fetchBookings(); // Refresh booking list after adding a new booking
  
      // Clear form fields by resetting the formData state to empty values
      setFormData({
        date: '',
        time: '',
        pet_name: '',
        breed: '',
        age: '',
        color: '',
        symptoms: ''
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };
  

  return (
    <div>
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </div>
        <div>
          <label>Pet Name:</label>
          <input type="text" name="pet_name" value={formData.pet_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Breed:</label>
          <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Color:</label>
          <input type="text" name="color" value={formData.color} onChange={handleChange} required />
        </div>
        <div>
          <label>Symptoms:</label>
          <input type="text" name="symptoms" value={formData.symptoms} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingForm;