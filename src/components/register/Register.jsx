import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Register.css";
const Register = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    message: '',
    successMessage: '',
  });

  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
  
    const data = {
      name: state.name,
      email: state.email,
      password: state.password,
      password_confirmation: state.password_confirmation
    };
  
    axios.post('/register', data)
      .then(() => {
        setState({
          ...state,
          successMessage: 'Registration successful!',
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        });
        // Redirect to the login page after successful registration
        navigate('/login', { state: { fromRegister: true } });
      })
      .catch((error) => {
        setState({ ...state, message: error.response.data.message });
        document.getElementById('submitform').reset();
      });
  };
  
  
  let errMessage = "";
  if (state.message) {
    errMessage = (
      <div className="alert alert-danger" role="alert">
        {state.message}
      </div>
    );
  }

  let successMessage = "";
  if (state.successMessage) {
    successMessage = (
      <div className="alert alert-success" role="alert">
        {state.successMessage}
      </div>
    );
  }

  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form onSubmit={formSubmit} id="submitform">
          <h2 className="text-center"><strong>Create</strong> an account.</h2>
          {errMessage}
          {successMessage}
          <div className="form-group"><input className="form-control" type="text" name="name" id='name' placeholder="Full Name" required value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })}/></div>
          <div className="form-group"><input className="form-control" type="email" name="email" id='email' placeholder="Email" required value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} /></div>
          <div className="form-group"><input className="form-control" type="password" name="password" id="password" placeholder="Password"  required value={state.password} onChange={(e) => setState({ ...state, password: e.target.value })}/></div>
          <div className="form-group"><input className="form-control" type="password" name="password_confirmation" id="password_confirmation" placeholder="Password (repeat)" required value={state.password_confirmation} onChange={(e) => setState({ ...state, password_confirmation: e.target.value })} /></div>
          <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Sign Up</button></div>
          <p  className="already">You already have an account?<Link to="/login">Login here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
