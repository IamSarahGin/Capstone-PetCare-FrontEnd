import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"
const Login = (props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    message: '',
  });

  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
  
    const data = {
      email: state.email,
      password: state.password
    };
  
    axios.post('/login', data)
    .then((response) => {
      console.log("Login response:", response);
      if (response && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        props.setUser(response.data.user);
        // Redirect to the profile page after successful login
        navigate("/bookings");
      } else {
        console.error("Invalid response format:", response);
      }
    })
    .catch((error) => {
      console.error("Login error:", error); 
      setState({ ...state, message: error.response?.data?.message || 'An error occurred' });
      document.getElementById('submitform').reset();
    });
  
  }
  

  let errMessage = "";
  if (state.message) {
    errMessage = (
      <div className="alert alert-danger" role="alert">
        {state.message}
      </div>
    );
  }

  return (
    <div className="login-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form onSubmit={formSubmit} id="submitform">
          <h2 className="text-center"><strong>Welcome</strong> back!</h2>
          {errMessage}
          <div className="form-group"><input className="form-control" type="email" name="email" id="email" placeholder="Email" required value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} /></div>
          <div className="form-group"><input className="form-control" type="password" name="password" id="password" placeholder="Password"  required value={state.password} onChange={(e) => setState({ ...state, password: e.target.value })} /></div>
          <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Login</button></div>
          <p className="already">Forgot Password? <Link to="/forget">click here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login;
