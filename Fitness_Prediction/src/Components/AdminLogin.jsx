import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminLogin() {
  const [admin, setAdmin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation

  // Handle Input Change
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (admin.username === "" || admin.password === "") {
      setError("Both fields are required!");
      return;
    }

    if (admin.username !== "admin" || admin.password !== "admin123") {
      setError("Invalid username or password!");
      return;
    }

    setError(""); // Clear error
    alert("Login Successful! Redirecting to Admin Dashboard");
    navigate("/account/admin/admin-dashboard"); // Redirect to Dashboard
  };

  return (
    <div className="mainU container-fluid">
    <div className="container d-flex justify-content-center align-items-center   tw">
      <div className="card p-5 shadow-lg border-0 ">
        <h2 className="text-center fw-bold mb-2" >Admin Login</h2>
        
        {/* Error Message */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-2">
            <label className="form-label fw-bold">Username</label>
            <input
              type="text"
              className="form-control p-3 rounded-2"
              name="username"
              value={admin.username}
              onChange={handleChange}
              placeholder="Enter admin username"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control p-3 rounded-2"
              name="password"
              value={admin.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn w-100 p-3 fw-bold bg-black" 
            style={{ borderRadius: "8px", backgroundColor: "#333", color: "white", transition: "0.3s" }}
            
          >
            Login
          </button>
        </form>
      </div>
    </div>
    <div className="container col-6 d-flex on">
       <img src="\src\assets\two.png"></img>
     
      </div>
    </div>
  );
}

export default AdminLogin;