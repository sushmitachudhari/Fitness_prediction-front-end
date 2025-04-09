import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // Import CSS

function AdminLogin() {
  const [admin, setAdmin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

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

    setError("");
    alert("Login Successful! Redirecting to Admin Dashboard");
    navigate("/account/admin/admin-dashboard");
  };

  return (
    <div className="admin-login-page mt-lg-5">
      <div className="login-container">
        <div className="login-form-section">
          <div className="login-card">
            <h2 className="text-center mb-4">Admin Login</h2>

            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={admin.username}
                  onChange={handleChange}
                  placeholder="Enter admin username"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={admin.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                />
              </div>

              <button type="submit" className="btn bg-black text-light w-100 fw-bold" >
                Login
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

export default AdminLogin;
