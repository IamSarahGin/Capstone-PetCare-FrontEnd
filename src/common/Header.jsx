import React, { useState, useEffect } from 'react';
import Nav from './Navbar/Nav';
import Protected from './Protected';
import Home from '../components/Home';
import About from '../components/about/About';
import Services from '../components/services/Services';
import Contact from '../components/contact/Contact';
import Login from '../components/login/Login';
import Profile from '../components/Profile';
import Register from '../components/register/Register';
import Forget from '../components/Forget';
import Reset from '../components/Reset';
import BookingForm from '../components/Booking/BookingForm';
import BookingList from '../components/Booking/BookingList';
import Footer from '../components/footer/Footer';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken); // Set token state

    if (storedToken) {
      axios.get('/user', {
        headers: { 'Authorization': `Bearer ${storedToken}` }
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      // If there's no token, set user to an empty object
      setUser({});
    }
  }, []); // No dependencies, runs once on mount
  const fetchBookings = async () => {
    try {
      const response = await axios.get('/bookings');
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
  };
  return (
    <BrowserRouter>
      <div>
        <Nav user={user} setUser={setUser} />
        <Routes>
          <Route path='/' element={<Protected path="/"><Home /></Protected>} />
          <Route path='/about' element={<Protected path="/"><About /></Protected>} />
          <Route path='/services' element={<Protected path="/"><Services /></Protected>} />
          <Route path='/contact' element={<Protected path="/"><Contact /></Protected>} />
          <Route path='/login' element={<Protected path="/"><Login user={user} setUser={setUser} /></Protected>} />
          <Route path='/register' element={<Protected path="/"><Register user={user} setUser={setUser} /></Protected>} />
          <Route path='/forget' element={<Forget />} />
          <Route path='/reset/:id' element={<Reset />} />
          <Route path='/profile/*' element={<Protected path="/profile"><Profile user={user} setUser={setUser} /></Protected>} />
          <Route path='/bookings' element={<Protected><BookingForm fetchBookings={fetchBookings} /></Protected>} />
          <Route path='/add-booking' element={<Protected><BookingList /></Protected>} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default Header;
