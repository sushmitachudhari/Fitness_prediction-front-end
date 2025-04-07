import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function UserLogin() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation

  // Handle Input Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.username === "" || user.password === "") {
      setError("Both fields are required!");
      return;
    }

    if (user.username !== "user" || user.password !== "user123") {
      setError("Invalid username or password!");
      return;
    }

    setError(""); // Clear error
    alert("Login Successful! Redirecting to Admin Dashboard");
    navigate("/admin-dashboard"); // Redirect to Dashboard
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" 
         style={{ backgroundColor: "#f8f8f8" }}>
      <div className="card p-5 shadow-lg border-0" 
           style={{ width: "500px", borderRadius: "10px", backgroundColor: "white" }}>
        <h2 className="text-center fw-bold mb-2" style={{ color: "#333" }}>User Login</h2>
        
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
              value={user.username}
              onChange={handleChange}
              placeholder="Enter  username"
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
              value={user.password}
              onChange={handleChange}
              placeholder="Enter user password"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn w-100 p-3 fw-bold" 
            style={{ borderRadius: "8px", backgroundColor: "#333", color: "white", transition: "0.3s" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;