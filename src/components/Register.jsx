import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <div className='row'>
        <div className='bg-light p-5 mt-5 rounded col-lg-4 offset-lg-4'>
          <h3 className='text-center'>Register New Account</h3>
          {errMessage}
          {successMessage}
          <form onSubmit={formSubmit} id="submitform">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name='name' required value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" className="form-control" id="email" name='email' required value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name='password' required value={state.password} onChange={(e) => setState({ ...state, password: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="password_confirmation" name='password_confirmation' required value={state.password_confirmation} onChange={(e) => setState({ ...state, password_confirmation: e.target.value })} />
            </div>
            <div className='d-grid gap-2 mb-2'>
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
            <p>Have an account? <Link to="/login">Login here</Link></p>
            <p>Forgot Password? <Link to="/forget">Click here</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
