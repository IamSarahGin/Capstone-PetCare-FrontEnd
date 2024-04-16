import React from 'react';
import { Navigate } from 'react-router-dom';

const Profile = (props) => {
  const token = localStorage.getItem('token');
  const { user } = props;

  // If user is not authenticated (no user and no token), redirect to login page
  if (!user && !token) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated but user data is still being fetched, don't redirect
  if (!user && token) {
    return null; // Render nothing while user data is being fetched
  }

  // If user data is available, render profile details
  const { name, email } = user;
  return (
    <div>
      <div className='row'>
        <div className='bg-light p-5 mt-5 rounded col-lg-4 offset-lg-4 '>
          <h3 className='text-center'>Profile Account</h3>
          <ul className='list-group'>
            <li className='list-group-item'>Name: {name}</li>
            <li className='list-group-item'>Email Address: {email}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
