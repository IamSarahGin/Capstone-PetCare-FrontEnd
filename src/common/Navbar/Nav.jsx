import React from 'react';
import Logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

import './Nav.css'; 
const Nav = (props) => {
  // Logout function
  const logout = () => {
    localStorage.clear();
    props.setUser(null);
  };

  // Determine whether the user is logged in
  const isLoggedIn = localStorage.getItem('token');

  // Initialize variables to hold buttons and profile link
  let buttons, profile, bookingsLink, bookingFormLink, homeLink, aboutUsLink, contactUsLink, welcomeMessage;

  if (isLoggedIn) {
    // Display username, profile link, logout button, and bookings link if the user is logged in
    const username = props.user.name; // Assuming the username is stored in 'name' property
   
    welcomeMessage = (
      <div className="d-flex align-items-center me-5">
        <span className="text-white">WELCOME {username} !</span>
      </div>
    );
    buttons = (
      <div className="d-flex align-items-center">
        {welcomeMessage}
        <Link className="nav-link active text-white" to="/" onClick={logout}>LOGOUT</Link>
      </div>
    );
    bookingsLink = (
      <li className="nav-item">
        <Link className="nav-link text-white" to="/bookings">MAKE A BOOKING </Link>
      </li>
    );
    // Add link to the booking form
    bookingFormLink = (
      <li className="nav-item">
        <Link className="nav-link text-white" to="/add-booking">LIST OF REQUEST</Link>
      </li>
    );
  } else {
    // Display login and register buttons if the user is not logged in
    buttons = (
      <div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active text-white" to="/login">LOGIN</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/register">REGISTER</Link>
          </li>
        </ul>
      </div>
    );

    // Center the Home link
    homeLink = (
      <div className="d-flex justify-content-center">
    <ScrollLink className="nav-link active text-white" to="hero" spy={true} smooth={true} duration={500}>HOME</ScrollLink>
    <ScrollLink className="nav-link active text-white" to="about" spy={true} smooth={true} duration={500}>ABOUT</ScrollLink>
    <ScrollLink className="nav-link active text-white" to="services" spy={true} smooth={true} duration={500}>SERVICES</ScrollLink>
    <ScrollLink className="nav-link active text-white" to="contact" spy={true} smooth={true} duration={500}>CONTACT US</ScrollLink>
  </div>
    );
    
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/"><img src={Logo} alt="logo" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {homeLink}
              {profile}
              {bookingsLink}
              {bookingFormLink}
            </ul>
            <div className="navbar-text">
              {buttons}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
