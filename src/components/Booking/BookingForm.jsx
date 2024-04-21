import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = ({ fetchBookings }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    pet_name: '',
    breed: '',
    age: '',
    color: '',
    symptoms: '',
    pet_type: '',
    pet_id: '',
    status: 'pending',
  });

  const [petTypes, setPetTypes] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [errors, setErrors] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchPetTypes();
    fetchUserBookings();
  }, []);

  const fetchPetTypes = async () => {
    try {
      const response = await axios.get('/pets');
      setPetTypes(response.data);
    } catch (error) {
      console.error('Error fetching pet types:', error);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  const fetchTimeSlots = async (selectedDate) => {
    try {
      console.log('Fetching time slots for date:', selectedDate);
      const response = await axios.get(`/time-slots?date=${selectedDate}`);
      const fetchedTimeSlots = response.data;
      console.log('Fetched time slots:', fetchedTimeSlots);
      setTimeSlots(fetchedTimeSlots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let petId = '';

    if (name === 'pet_type') {
      const selectedPetType = petTypes.find(petType => petType.pet_type === value);
      if (selectedPetType) {
        petId = selectedPetType.id;
      } else {
        console.error('Invalid pet type selected.');
      }
    }

    setFormData({ ...formData, [name]: value, pet_id: petId });
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    console.log('Selected date:', selectedDate);
    setFormData({ ...formData, date: selectedDate });

    await fetchTimeSlots(selectedDate);

    // Check if the selected date is already booked
    const alreadyBooked = bookings.some(booking => booking.date === selectedDate);
    if (alreadyBooked) {
      alert('You already have a booking on this date.');
    }
  };

  
  const handleTimeChange = (e) => {
    const selectedTimeRange = e.target.value;
    // Extract the start time from the selected time range
    const startTime = selectedTimeRange.split('-')[0];
    setFormData({ ...formData, time: startTime });
  };
  
  

  // Ensure that pet_id is converted to an integer before sending it to the backend
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User not logged in.');
      return;
    }

    const bookingData = {
      ...formData,
      pet_id: parseInt(formData.pet_id),
    };

    const bookingResponse = await axios.post('/bookings', bookingData, {

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert('Booking added successfully!');
    fetchBookings();

    // Reset the form after successful submission
    setFormData({
      date: '',
      time: '',
      pet_name: '',
      breed: '',
      age: '',
      color: '',
      symptoms: '',
      pet_type: '',
      pet_id: '',
      status: 'pending',
    });
  } catch (error) {
    console.error('Error submitting booking:', error);
    if (error.response) {
      console.log('Response data:', error.response.data);
      // Handle validation errors if any
      setErrors(error.response.data.errors);
    }
  }
};

  

  let timeSelect;
  if (timeSlots.length > 0) {
    timeSelect = (
      <div>
        <label>Time:</label>
        <select name="time" value={formData.time} onChange={handleTimeChange} required>
          <option value="">Select Time</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot.start_time}>
              {slot.start_time} - {slot.end_time}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    timeSelect = <p>No available time slots for selected date.</p>;
  }
  return (
    <div>
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleDateChange} required />
        </div>
        {timeSelect}
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
        <div>
          <label>Pet Type:</label>
          <select name="pet_type" value={formData.pet_type} onChange={handleChange} required>
            <option value="">Select Pet Type</option>
            {petTypes.map((petType) => (
              <option key={petType.id} value={petType.pet_type}>{petType.pet_type}</option>
            ))}
          </select>
        </div>
        {errors && Object.keys(errors).length > 0 && (
          <div>
            <h3>Error</h3>
            <ul>
              {Object.values(errors).flat().map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingForm;
