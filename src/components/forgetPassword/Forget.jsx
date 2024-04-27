import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "./Forget.css";

const Forget = () => {
  // Set the state of variables using useState hook
  const [state, setState] = useState({
    email: "",
    message: "",
  });

  // formSubmit for login with API
  const formSubmit = (e) => {
    e.preventDefault();
    // Create data to hold the values to be passed into axios
    const data = {
      email: state.email,
    };
    // Include post axios template
    axios
      .post("/forgetpassword", data)
      .then((response) => {
        console.log(response);
        setState({ ...state, message: response.data.message });
        document.getElementById("submitform").reset();
      })
      .catch((error) => {
        setState({ ...state, message: error.response.data.message });
        document.getElementById("submitform").reset();
      });
  };

  // Show error message
  let err_message = "";
  if (state.message) {
    err_message = (
      <div className="alert alert-danger" role="alert">
        {state.message}
      </div>
    );
  }

  // Start of page return
  return (
    <div className="container form-gap">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <h3>
                  <i className="fa fa-lock fa-4x"></i>
                </h3>
                <h2 className="text-center"><span className="password-text"> Forgot Password?</span></h2>

                {err_message}
                <p>You can reset your password here.</p>
                <div className="panel-body">
                  <form onSubmit={formSubmit} id="submitform" className="form">
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="glyphicon glyphicon-envelope color-blue"></i>
                        </span>
                        <input
                          id="email"
                          name="email"
                          placeholder="Email address"
                          className="form-control"
                          type="email"
                          required
                          onChange={(e) =>
                            setState({ ...state, email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="d-grid gap-2 mb-2">
                      <button type="submit" className="btn btn-primary">
                        Reset Password
                      </button>
                    </div>
                    <p>Have an account? <Link to="/login">Login here</Link></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
