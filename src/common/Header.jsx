import React, { useState, useEffect } from 'react';
import Nav from './Navbar/Nav';
import Protected from './Protected';
import Home from '../components/Home';
import About from '../components/aboutPage/AboutPage';
import Services from '../components/servicePage/ServicePage';
import Contact from '../components/contactPage/ContactPage';
import Login from '../components/login/Login';
import Profile from '../components/Profile';
import Register from '../components/register/Register';
import Forget from '../components/forgetPassword/Forget';
import Reset from '../components/Reset';
import BookingForm from '../components/Booking/BookingForm';
import BookingList from '../components/Booking/BookingList';
import Footer from '../components/footer/Footer';
import NotFound from '../components/notfound/NotFound';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const DefaultLayout = ({ children, user, setUser }) => (
  <>
    <Nav user={user} setUser={setUser} />
    {children}
    <Footer />
  </>
);

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
       
        <Routes>
          <Route path='/' element={<DefaultLayout user={user} setUser={setUser}><Protected path="/"><Home /></Protected></DefaultLayout>} />
          <Route path='/about' element={<DefaultLayout user={user} setUser={setUser}><Protected path="/"><About /></Protected></DefaultLayout>} />
          <Route path='/services' element={<DefaultLayout user={user} setUser={setUser}><Protected path="/"><Services /></Protected></DefaultLayout>} />
          <Route path='/contact' element={<DefaultLayout user={user} setUser={setUser}><Protected path="/"><Contact /></Protected></DefaultLayout>} />
          <Route path='/login' element={<DefaultLayout user={user} setUser={setUser}><Protected path="/"><Login user={user} setUser={setUser} /></Protected></DefaultLayout>} />
          <Route path='/register' element={<DefaultLayout user={user} setUser={setUser}><Protected path="/"><Register user={user} setUser={setUser} /></Protected></DefaultLayout>} />
          <Route path='/forget' element={<Forget />} />
          <Route path='/reset/:id' element={<Reset />} />
          <Route path='/profile/*' element={<DefaultLayout user={user} setUser={setUser}><Protected path="/profile"><Profile user={user} setUser={setUser} /></Protected></DefaultLayout>} />
          <Route path='/bookings' element={<DefaultLayout user={user} setUser={setUser}><Protected><BookingForm fetchBookings={fetchBookings} /></Protected></DefaultLayout>} />
          <Route path='/add-booking' element={<DefaultLayout user={user} setUser={setUser}><Protected><BookingList /></Protected></DefaultLayout>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        
        
      </div>
    </BrowserRouter>
  );
}

export default Header;
