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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found. User not logged in.');
        return;
      }

      const response = await axios.post('/bookings', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Booking added successfully:', response.data);
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
