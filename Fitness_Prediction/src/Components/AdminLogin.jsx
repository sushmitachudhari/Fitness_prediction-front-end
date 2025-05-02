import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle  } from "react-icons/fa"; // ✅ import check icon

function AdminLogin() {
  const [admin, setAdmin] = useState({ username: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailDialog, setShowFailDialog] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
   // const { name, value } = e.target;
    setAdmin({ ...admin, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setError("");
  };

  const validateForm = () => {
    const errors = { username: "", password: "" };
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const { username, password } = admin;

    if (!username) {
      errors.username = "Username is required.";
    } else if (!usernameRegex.test(username)) {
      errors.username = "Username must be alphanumeric.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 1) {
      errors.password = "Password must contain at least 4 characters.";
    }

    setFieldErrors(errors);
    return !errors.username && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `http://localhost:8080/admin/login/${admin.username}/${admin.password}`
      );

      if (response.data.includes("success")) {
        setError("");
        setShowSuccessDialog(true);
        setTimeout(() => {
          setShowSuccessDialog(false);
          navigate("/account/admin/admin-dashboard/");
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
    <div className="admin-login-page mt-lg-5">
      <div className="login-container position-relative">
        <IoMdCloseCircle
          size={28}
          className="position-absolute"
          style={{ top: "2%", right: "2%", cursor: "pointer", color: "red" }}
          onClick={() => navigate(-1)}
        />

        {/* ✅ Success Dialog with Checkmark */}
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
                <h5 className="modal-title text-success mb-2">Login Successfull!!!</h5>
                <p className="mb-0">Welcome Admin! Redirecting...</p>
              </div>
            </div>
          </div>
        )}

      
        {showFailDialog && (
          <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border border-danger text-center p-4">
            <div className="d-flex justify-content-center mb-3">
                <div
                  className="rounded-circle bg-danger d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px" }}
                >
                  <FaTimesCircle  size={112} color="white" />
                </div>
              </div>
              <h5 className="modal-title text-danger mb-2">Login Failed...</h5>
              <p className="mb-0">Please check Login Credentials</p>
            </div>
          </div>
        </div>
        )}

        <div className="login-form-section">
          <div className="login-card">
            <h2 className="text-center mb-4">Admin Login</h2>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className={`form-control ${fieldErrors.username ? "is-invalid" : ""}`}
                  name="username"
                  value={admin.username}
                  onChange={handleChange}
                  placeholder="Enter admin username"
                />
                {fieldErrors.username && (
                  <div className="invalid-feedback">{fieldErrors.username}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${fieldErrors.password ? "is-invalid" : ""}`}
                  name="password"
                  value={admin.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                />
                {fieldErrors.password && (
                  <div className="invalid-feedback">{fieldErrors.password}</div>
                )}
              </div>

                {/* for resetting username and password */}
            <div>
              <Link to="/account/admin/reset" >Forgot username and password</Link>
            </div>
			
		
              <button type="submit" className="btn bg-black text-light w-100 fw-bold">
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
