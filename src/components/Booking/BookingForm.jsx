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

  useEffect(() => {
    fetchPetTypes();
  }, []);

  const fetchPetTypes = async () => {
    try {
      const response = await axios.get('/pets');
      setPetTypes(response.data);
    } catch (error) {
      console.error('Error fetching pet types:', error);
    }
  };

  const fetchTimeSlots = async (selectedDate = '') => {
    try {
      const response = await axios.get(`/time-slots?date=${selectedDate}`);
      const fetchedTimeSlots = response.data;
      
      // Check if any time slots are available
      if (fetchedTimeSlots.length === 0) {
        alert('No available time slots for selected date. Please choose a different date.');
      }
      
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
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
  
    // Check if the selected date is in the past
    if (selectedDateObj < currentDate) {
      alert('You cannot select a past date for booking. Please choose a future date.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. User not logged in.');
        return;
      }
  
      // Fetch bookings asynchronously
      const response = await axios.get(`/bookings?date=${selectedDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const bookings = response.data;
  
      // Check if the user already booked on the selected date
      const alreadyBooked = bookings.some((booking) => {
        return booking.date === selectedDate;
      });
      if (alreadyBooked) {
        alert('You already have a booking on this date. Please choose another date.');
        return;
      }
  
      setFormData({ ...formData, date: selectedDate });
      fetchTimeSlots(selectedDate); // Call fetchTimeSlots with selectedDate
    } catch (error) {
      console.error('Error handling date change:', error);
      // Handle error appropriately
    }
  };
  
  
  
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setFormData({ ...formData, time: selectedTime });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. User not logged in.');
        return;
      }
  
      // Create the booking
      const bookingResponse = await axios.post('/bookings', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Booking added successfully:', bookingResponse.data);
  
      // Update the availability status of the selected time slot to 'booked'
      const selectedTimeSlot = timeSlots.find(slot => slot.startTime === formData.time);
      if (selectedTimeSlot) {
        const updatedTimeSlot = { ...selectedTimeSlot, availability: 'booked' };
        await axios.put(`/time-slots/${selectedTimeSlot.id}`, updatedTimeSlot, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Time slot updated successfully:', updatedTimeSlot);
      }
  
      alert('Booking added successfully!');
      fetchBookings();
  
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
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };
  
  
  // Render Time select dropdown
let timeSelect;
if (timeSlots.length > 0) {
  timeSelect = (
    <div>
      <label>Time:</label>
      <select name="time" value={formData.time} onChange={handleTimeChange} required>
        <option value="">Select Time</option>
        {timeSlots.map((slot) => (
          <option key={slot.id} value={slot.startTime}>{slot.startTime} - {slot.endTime}</option>
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
<div>
  <label>Time:</label>
  <select name="time" value={formData.time} onChange={handleTimeChange} required>
    <option value="">Select Time</option>
    {timeSlots.map((slot) => (
      <option key={slot.id} value={slot.startTime}>{slot.startTime} - {slot.endTime}</option>
    ))}
  </select>
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
