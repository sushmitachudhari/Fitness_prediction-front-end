import React, { useState, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import "./userpanel.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    height: "",
    weight: ""
  });

  const [userId, setUserId] = useState(null); // store userId separately

  // 🔁 Fetch user data on mount
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      axios.get(`http://localhost:8080/user/getuser/${email}`)
        .then(res => {
          const user = res.data;
          setFormData({
            name: user.name || "",
            email: user.email || "",
            password: user.password || "",
            height: user.height || "",
            weight: user.weight || ""
          });
          setUserId(user.userid); // Set userId for update call
        })
        .catch(err => {
          console.error("Error fetching user data:", err);
          alert("Failed to load user profile");
        });
    } else {
      alert("User not logged in.");
      navigate("/users/login");
    }
  }, []);

  // 🖊️ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User ID not found.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:8080/user/update/${userId}`, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      alert("Profile updated successfully!");
      localStorage.setItem("userName", formData.name);
      navigate(-1);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="cont ">
      <div className="head d-flex justify-content-between w-100 text-dark fw-bolder position-relative">
        <h4 className="pt-2 ps-3 text-center">Update Profile</h4>
        <IoMdCloseCircle
          size={28}
          className="position-absolute"
          style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
          onClick={() => navigate(-1)} />
      </div>

      <form className="pt-2 ps-5 pe-5 pb-5 col-12" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input type="text" name="name" className="form-control" placeholder="Name" value={formData.name} onChange={handleChange} />
          <label>Name</label>
        </div>

        <div className="form-floating mb-3">
          <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} readOnly />
          <label>Email</label>
        </div>

        <div className="form-floating mb-3">
          <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} />
          <label>Password</label>
        </div>

        <div className="d-flex gap-3">
          <div className="form-floating mb-3 w-100">
            <input type="text" name="height" className="form-control" placeholder="Height" value={formData.height} onChange={handleChange} />
            <label>Height (cm)</label>
          </div>

          <div className="form-floating mb-3 w-100">
            <input type="text" name="weight" className="form-control" placeholder="Weight" value={formData.weight} onChange={handleChange} />
            <label>Weight (kg)</label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn bg-black text-light">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
