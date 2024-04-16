import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';



const Forget = () => {
 //set the state of variables using useState hook
 const [state, setState]=useState({
  email:'',
  message:'',
  
});
//formSubmit for login with api
const formSubmit = (e) =>{
  e.preventDefault();
  //create data to hold the values to be passed in to axios
  const data={
    email:state.email,
 
  };
  //include post axios template
  axios.post('/forgetpassword', data)
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
    <div class="alert alert-danger" role="alert">
      {state.message}
</div>
  );
}



//start of page return
return (
  <div>
    <div className='row'>
        <div className='bg-light p-5 mt-5 rounded col-lg-4 offset-lg-4'>
            <h3 className='text-center'>Reset Account</h3>
            {/* display err_message */}
            {err_message}
            <form onSubmit={formSubmit} id="submitform">
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' required onChange={(e)=>setState({...state, email:e.target.value})}/>           
            </div>
            <div className='d-grid gap-2 mb-2'>
            <button type="submit" className="btn btn-primary">Reset Password</button>
            </div>   
           Have an account? <Link to="/login">Login here</Link>         
          </form>
        </div>
    </div>
  </div>
)
}

export default Forget