import React, { useState } from "react";
import "./userpanel.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateProfile() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get user ID from route
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        height: "",
        weight: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/update/${id}`, formData); // Adjust port if needed
            alert("User Updated Successfully");
            navigate("/users/login/user-dashboard");
        } catch (error) {
            console.error("Update failed", error);
            alert("Update failed. Please try again.");
        }
    };

    return (
        <div className="cont position-relative">
            <div className="head d-flex justify-content-between w-100 text-dark fw-bolder">
                <h4 className="pt-3 ps-3 text-center">Update Profile</h4>
                <IoMdCloseCircle
                    size={28}
                    className="position-absolute"
                    style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
                    onClick={() => navigate(-1)} />
            </div>
            <form onSubmit={handleSubmit} className="p-5 col-12">
                <div className="form-floating mb-3">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Enter Name Here" id="nameInput" />
                    <label htmlFor="nameInput">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" id="emailInput" placeholder="name@example.com" />
                    <label htmlFor="emailInput">Email address</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" id="passwordInput" placeholder="Enter your password" />
                    <label htmlFor="passwordInput">Password</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" name="height" value={formData.height} onChange={handleChange} className="form-control" id="heightInput" placeholder="Enter your height" />
                    <label htmlFor="heightInput">Height (cm)</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" name="weight" value={formData.weight} onChange={handleChange} className="form-control" id="weightInput" placeholder="Enter your weight" />
                    <label htmlFor="weightInput">Weight (kg)</label>
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn bg-black text-light">Update</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProfile;
