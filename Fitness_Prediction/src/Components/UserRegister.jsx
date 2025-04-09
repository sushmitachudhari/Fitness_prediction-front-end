import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function UserRegister(){
  return(
    
    
    <div className="container-fluid  ur" >
    <div className="row justify-content-center ">
      <div className="col-md-6">
        <div className="card shadow-lg hh">
          <div className="card-body ">
            <h3 className="card-title text-center mb-4">User Registration</h3>
            <form>
              <div className="mb-3">
                <label for="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" required/>
              </div>
  
              <div className="mb-3">
                <label for="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" required/>
              </div>
  
              <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password" required/>
              </div>
  
              <div className="mb-3">
                <label for="height" className="form-label">Height (cm)</label>
                <input type="number" className="form-control" id="height" placeholder="Enter your height"required/>
              </div>
  
              <div className="mb-3">
                <label for="weight" className="form-label">Weight (kg)</label>
                <input type="number" className="form-control" id="weight" placeholder="Enter your weight" required/>
              </div>
              <center><a href="/users/login">already have Login?</a><a href="/users/register">register</a></center>
              <div className="d-grid">
                <button type="submit" className="btn bg-black text-light">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}
export default UserRegister;