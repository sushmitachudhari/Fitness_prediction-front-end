import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";

function UserLogin() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/user/login", user);
      const message = response.data;

      if (message.includes("success")) {
        navigate("/users/login/user-dashboard"); // change as per your route
      } else {
        setError(message);
      }
    } catch (err) {
      setError("Server error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="user-login-page mt-lg-5">

      <div className="login-container position-relative">

      <IoMdCloseCircle
                    size={28}
                    className="position-absolute"
                    style={{ top: "2%", right: "2%", cursor: "pointer", color: "red" }}
                    onClick={() => navigate(-1)} />
        <div className="login-form-section ">
        
          <div className="login-card">
            <h2 className="text-center mb-4">User Login</h2>
            
            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
              <center><a href="/users/login">already have Login?</a><a href="/users/register">register</a></center>
              <button
                type="submit"
                className="btn bg-black text-light w-100 fw-bold"
              >Login
              </button>
            </form>
          </div>
        </div>

        <div className="login-image-section">
          <img src="/src/assets/two.png" alt="Workout" />
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
