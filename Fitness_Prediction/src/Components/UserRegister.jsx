import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserRegister() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    height: "",
    weight: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/register", user);
      if (response.data.includes("success")) {
        alert("User Registered Successfully");
        navigate("/users/login/");
      } else {
        alert("Registration Failed: " + response.data);
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="container-fluid ur">
      <div className="row justify-content-center ">
        <div className="col-md-6 ">
          <div className="card shadow-lg hh position-relative">
            <IoMdCloseCircle
              size={28}
              className="position-absolute"
              style={{ top: "2%", right: "2%", cursor: "pointer", color: "red" }}
              onClick={() => navigate(-1)}
            />
            <div className="card-body ">
              <h3 className="card-title text-center mb-4">User Registration</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={user.name} onChange={handleChange} placeholder="Enter your name" required />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={user.email} onChange={handleChange} placeholder="Enter your email" required />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" value={user.password} onChange={handleChange} placeholder="Enter your password" required />
                </div>

               <div className="nc d-flex justify-content-between gap-3">
               <div className="mb-3">
                  <label htmlFor="height" className="form-label">Height (cm)</label>
                  <input type="text" className="form-control" id="height" value={user.height} onChange={handleChange} placeholder="Enter your height" required />
                </div>

                <div className="mb-3">
                  <label htmlFor="weight" className="form-label">Weight (kg)</label>
                  <input type="text" className="form-control" id="weight" value={user.weight} onChange={handleChange} placeholder="Enter your weight" required />
                </div>
               </div>

                <center>
                  <a href="/users/login">Already have an account? Login</a>
                </center>

                <div className="d-grid mt-3">
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
