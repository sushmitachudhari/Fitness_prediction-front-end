import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function UserLogin() {
  const [usern, setUsern] = useState(null);
  const [user, setUser] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailDialog, setShowFailDialog] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setError("");
  };

  const validateForm = () => {
    const { email, password } = user;
    const errors = { email: "", password: "" };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length <1) {
      errors.password = "Password must be at least greater than 1 character.";
    }

    setFieldErrors(errors);
    return !errors.email && !errors.password;
  };

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/user/getuser/${email}`);
      setUsern(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:8080/user/login", user);
      if (response.data.includes("success")) {
        setError("");
        localStorage.setItem("userEmail", user.email);
        await fetchUserDetails(user.email);
        setShowSuccessDialog(true);
        setTimeout(() => {
          setShowSuccessDialog(false);
          navigate("/users/login/user-dashboard/");
        }, 2000);
      } else {
        setShowFailDialog(true);
        setTimeout(() => setShowFailDialog(false), 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="user-login-page mt-lg-5">
      <div className="login-container position-relative">
        <IoMdCloseCircle
          size={28}
          className="position-absolute"
          style={{ top: "2%", right: "2%", cursor: "pointer", color: "red" }}
          onClick={() => navigate(-1)}
        />

        {/* Success Dialog */}
        {showSuccessDialog && (
          <div className="modal fade show d-block rounded-0" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border border-success text-center p-4">
                <div className="d-flex justify-content-center mb-3">
                  <div
                    className="rounded-circle bg-success d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <FaCheckCircle size={112} color="white" />
                  </div>
                </div>
                <h5 className="modal-title text-success mb-2">Login Successful!!!</h5>
                <p className="mb-0">Welcome <b>{usern?.name || "User"}</b>. Redirecting...</p>
              </div>
            </div>
          </div>
        )}

        {/* Failure Dialog */}
        {showFailDialog && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border border-danger text-center p-4">
                <div className="d-flex justify-content-center mb-3">
                  <div
                    className="rounded-circle bg-danger d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <FaTimesCircle size={112} color="white" />
                  </div>
                </div>
                <h5 className="modal-title text-danger mb-2">Login Failed...</h5>
                <p className="mb-0">Please check Login Credentials OR Yet Admin not Approve You</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="login-form-section">
          <div className="login-card">
            <h2 className="text-center mb-4">User Login</h2>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${fieldErrors.password ? "is-invalid" : ""}`}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password}</div>}
              </div>

              <center>
                <a href="/users/register">Don't have a Login? Register</a>
              </center>

              <button type="submit" className="btn bg-black text-light w-100 fw-bold mt-3">
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

export default UserLogin;
