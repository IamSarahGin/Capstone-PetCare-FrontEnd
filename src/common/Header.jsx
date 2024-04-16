import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Protected from './Protected';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Register from '../components/Register';
import Forget from '../components/Forget';
import Reset from '../components/Reset';
import BookingForm from '../components/Booking/BookingForm';
import BookingList from '../components/Booking/BookingList';
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

  return (
    <BrowserRouter>
      <div>
        <Nav user={user} setUser={setUser} />
        <Routes>
          <Route path='/' element={<Protected path="/"><Home /></Protected>} />
          <Route path='/login' element={<Protected path="/"><Login user={user} setUser={setUser} /></Protected>} />
          <Route path='/register' element={<Protected path="/"><Register user={user} setUser={setUser} /></Protected>} />
          <Route path='/forget' element={<Forget />} />
          <Route path='/reset/:id' element={<Reset />} />
          <Route path='/profile/*' element={<Protected path="/profile"><Profile user={user} setUser={setUser} /></Protected>} />
          <Route path='/bookings' element={<Protected><BookingForm /></Protected>} />
          <Route path='/add-booking' element={<Protected><BookingList /></Protected>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Header;
