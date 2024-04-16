import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      console.log("Login response:", response); // Add this line to inspect the response object
      if (response && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        props.setUser(response.data.user);
        // Redirect to the profile page after successful login
        navigate("/profile");
      } else {
        console.error("Invalid response format:", response);
      }
    })
    .catch((error) => {
      console.error("Login error:", error); // Add this line to log the error response
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
    <div>
      <div className='row'>
          <div className='bg-light p-5 mt-5 rounded col-lg-4 offset-lg-4'>
              <h3 className='text-center'>Login Account</h3>
              {/* display err_message */}
              {errMessage}
              <form onSubmit={formSubmit} id="submitform">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' required onChange={(e)=>setState({ ...state, email:e.target.value })}/>           
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' required onChange={(e)=>setState({ ...state, password:e.target.value })}/>
              </div>
              <div className='d-grid gap-2 mb-2'>
              <button type="submit" className="btn btn-primary">Login</button>
              </div>   
              Forgot Password? <Link to="/forget">click here</Link>         
            </form>
          </div>
      </div>
    </div>
  )
}

export default Login;
