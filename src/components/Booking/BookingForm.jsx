import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './BookingForm.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

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
    service_id:'',
    status: 'pending',
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [errors, setErrors] = useState({});
  const [bookings, setBookings] = useState([]);
  const fetchServiceTypes = async () => {
    try {
      const response = await axios.get('/services');
      setServiceTypes(response.data);
    } catch (error) {
      console.error('Error fetching service types:', error);
    }
  };
  
  // Call fetchServiceTypes in useEffect hook
  useEffect(() => {
    fetchServiceTypes();
  }, []);

  const handleServiceChange = (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      service_type: value
    }));
  };


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

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
      pet_id: petId
    }));
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0]; // Get today's date
  
    if (selectedDate < today) {
      alert("You can't select a past date. Please select a future date.");
      return; // Exit the function without updating the state
    }
  
    console.log('Selected date:', selectedDate);
    setFormData(prevState => ({
      ...prevState,
      date: selectedDate
    }));
  
    await fetchTimeSlots(selectedDate);
  
    // Check if the selected date is already booked
    const alreadyBooked = bookings.some((booking) => booking.date === selectedDate);
    if (alreadyBooked) {
      alert('You already have a booking on this date.');
      // Reset the date selection to prevent booking on the same date
      setFormData(prevState => ({
        ...prevState,
        date: ''
      }));
    }
  };

  const handleTimeChange = (e) => {
    const selectedTimeRange = e.target.value;
    // Extract the start time from the selected time range
    const startTime = selectedTimeRange.split('-')[0];
    setFormData(prevState => ({
      ...prevState,
      time: startTime
    }));
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
        service_id: '',
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
      <Form.Group controlId="time">
        <Form.Label>Time:</Form.Label>
        <Form.Control as="select" value={formData.time} onChange={handleTimeChange} required>
          <option value="">Select Time</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot.start_time}>
              {slot.start_time} - {slot.end_time}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    );
  } else {
    timeSelect = <p>No available time slots for selected date.</p>;
  }
  return (
    <section className="section mb-5">
      <Container data-aos="fade-up">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="mt-5">
              <Card.Body>
              <h3 className="text-center" >MAKE A BOOKING</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="date">
                    <Form.Label style={{ color: '#226c97' }}>DATE:</Form.Label>
                    <Form.Control type="date" value={formData.date} onChange={handleDateChange} required />
                  </Form.Group>
                  {timeSelect}
                  <Form.Group controlId="pet_name">
                    <Form.Label style={{ color: '#226c97' }}>PET NAME:</Form.Label>
                    <Form.Control type="text" name="pet_name" value={formData.pet_name} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="breed">
                    <Form.Label style={{ color: '#226c97' }}>BREED:</Form.Label>
                    <Form.Control type="text" name="breed" value={formData.breed} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="age">
                    <Form.Label style={{ color: '#226c97' }}>AGE:</Form.Label>
                    <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="color">
                    <Form.Label style={{ color: '#226c97' }}>COLOR:</Form.Label>
                    <Form.Control type="text" name="color" value={formData.color} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="symptoms">
                    <Form.Label style={{ color: '#226c97' }}>SYMPTOMS:</Form.Label>
                    <Form.Control type="text" name="symptoms" value={formData.symptoms} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="service_type">
                  <Form.Label style={{ color: '#226c97' }}>SERVICE TYPE:</Form.Label>
                  <Form.Control as="select" name="service_type" value={formData.service_type} onChange={handleServiceChange} required>
                    <option value="">SELECT SERVICE TYPE</option>
                    {serviceTypes.map((serviceType) => (
                      <option key={serviceType.id} value={serviceType.service_type}>{serviceType.service_type}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                  <Form.Group controlId="pet_type">
                    <Form.Label style={{ color: '#226c97' }}>PET TYPE:</Form.Label>
                    <Form.Control as="select" name="pet_type" value={formData.pet_type} onChange={handleChange} required>
                      <option value="">SELECT PET TYPE</option>
                      {petTypes.map((petType) => (
                        <option key={petType.id} value={petType.pet_type}>{petType.pet_type}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
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
                  <Button variant="primary" type="submit" className="w-100 btn-submit mt-3 ">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BookingForm;
