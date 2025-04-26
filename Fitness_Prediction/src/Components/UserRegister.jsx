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

  const [fieldErrors, setFieldErrors] = useState({});
  const [successDialog, setSuccessDialog] = useState(false);
  const [failDialog, setFailDialog] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.id]: "" });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!user.name.length>3) errors.name="Atleast 3 char must be there";
    if (!user.name.trim()) errors.name = "Name is required.";
    if (!emailRegex.test(user.email)) errors.email = "Invalid email address.";
    if (!user.password || user.password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (!user.height || isNaN(user.height) || user.height <= 0) errors.height = "Height must be a positive number.";
    if (!user.weight || isNaN(user.weight) || user.weight <= 0) errors.weight = "Weight must be a positive number.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:8080/user/register", user);
      if (response.data.includes("success")) {
        setSuccessDialog(true);
        setTimeout(() => {
          setSuccessDialog(false);
          navigate("/users/login");
        }, 2000);
      } else {
        setFailMessage(response.data);
        setFailDialog(true);
        setTimeout(() => setFailDialog(false), 2000);
      }
    } catch (error) {
      setFailMessage("Something went wrong: " + error.message);
      setFailDialog(true);
      setTimeout(() => setFailDialog(false), 2000);
    }
  };

  return (
    <div className="container-fluid ur">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg hh position-relative">
            <IoMdCloseCircle
              size={28}
              className="position-absolute"
              style={{ top: "2%", right: "2%", cursor: "pointer", color: "red" }}
              onClick={() => navigate(-1)}
            />

            {/* ✅ Success Dialog */}
            {successDialog && (
              <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border border-success text-center p-4">
                    <div className="rounded-circle bg-success text-white mx-auto mb-3 d-flex justify-content-center align-items-center" style={{ width: 60, height: 60 }}>
                      ✓
                    </div>
                    <h5 className="text-success">Registration Successful!</h5>
                    <p className="mb-0">Redirecting to login...</p>
                  </div>
                </div>
              </div>
            )}

            {/* ❌ Failure Dialog */}
            {failDialog && (
              <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border border-danger text-center p-4">
                    <div className="rounded-circle bg-danger text-white mx-auto mb-3 d-flex justify-content-center align-items-center" style={{ width: 60, height: 60 }}>
                      ✕
                    </div>
                    <h5 className="text-danger">Registration Failed</h5>
                    <p className="mb-0">{failMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="card-body">
              <h3 className="card-title text-center mb-4">User Registration</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className={`form-control ${fieldErrors.name ? "is-invalid" : ""}`} id="name" value={user.name} onChange={handleChange} />
                  {fieldErrors.name && <div className="invalid-feedback">{fieldErrors.name}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`} id="email" value={user.email} onChange={handleChange} />
                  {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className={`form-control ${fieldErrors.password ? "is-invalid" : ""}`} id="password" value={user.password} onChange={handleChange} />
                  {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password}</div>}
                </div>

                <div className="nc d-flex justify-content-between gap-3">
                  <div className="mb-3 w-100">
                    <label htmlFor="height" className="form-label">Height (cm)</label>
                    <input type="text" className={`form-control ${fieldErrors.height ? "is-invalid" : ""}`} id="height" value={user.height} onChange={handleChange} />
                    {fieldErrors.height && <div className="invalid-feedback">{fieldErrors.height}</div>}
                  </div>

                  <div className="mb-3 w-100">
                    <label htmlFor="weight" className="form-label">Weight (kg)</label>
                    <input type="text" className={`form-control ${fieldErrors.weight ? "is-invalid" : ""}`} id="weight" value={user.weight} onChange={handleChange} />
                    {fieldErrors.weight && <div className="invalid-feedback">{fieldErrors.weight}</div>}
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
