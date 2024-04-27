import React,{useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Reset = () => {
  //set the state of variables using useState hook
 const [state, setState]=useState({
  token:'',
  email:'',
  password:'',
  password_confirmation:'',
  message:'',

});
//formSubmit for login with api
const formSubmit = (e) =>{
  e.preventDefault();
  //create data to hold the values to be passed in to axios
  const data={
    token:state.token,
    email:state.email,
    password:state.password,
    password_confirmation:state.password_confirmation
  };
  //include post axios template
  axios.post('/resetpassword', data)
  .then( (response)=> {
    console.log(response);
    setState({...state, message:response.data.message});
    document.getElementById('submitform').reset();
  })
  .catch( (error)=> {
    //console.log(error);
    setState({...state, message:error.response.data.message});
    document.getElementById('submitform').reset();
  });
};
//show error message="";
let err_message="";
if(state.message){
  err_message=(
    <div class="alert alert-success" role="alert">
      {state.message}
</div>
  );
}



//start of page return
return (
  <div>
    <div className='row'>
        <div className='bg-light p-5 mt-5 rounded col-lg-4 offset-lg-4'>
            <h3 className='text-center'>Reset Account Password</h3>
            {/* display err_message */}
            {err_message}
            <form onSubmit={formSubmit} id="submitform">
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Pin Code</label>
              <input type="text" className="form-control" name='token' required onChange={(e)=>setState({...state, token:e.target.value})}/>           
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email Address</label>
              <input type="email" className="form-control" name='email' required onChange={(e)=>setState({...state, email:e.target.value})}/>           
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">New Password</label>
              <input type="password" className="form-control" name='password' required onChange={(e)=>setState({...state, password:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" name='password_confirmation' required onChange={(e)=>setState({...state, password_confirmation:e.target.value})}/>
            </div>
            <div className='d-grid gap-2 mb-2'>
            <button type="submit" className="btn btn-primary">Reset Password</button>
            </div>   
            <p>Have an account? <Link to="/login">Login here</Link></p>
             
          </form>
        </div>
    </div>
  </div>
)
}

export default Reset