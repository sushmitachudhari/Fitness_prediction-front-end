import React, { useState, useEffect } from "react";
import "./userpanel.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

function ViewProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:8080/user/getuser/${email}`)
        .then(res => {
          setUserData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch user profile", err);
          alert("Error fetching profile. Try again later.");
          setLoading(false);
        });
    } else {
      alert("User not found. Please log in again.");
      navigate("/login");
    }
  }, [email, navigate]);

  const handleUpdate = () => {
    navigate("/users/login/user-dashboard/update-profile");
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  const formatValue = (key, value) => {
    if (key === "height") return `${value} cm`;
    if (key === "weight") return `${value} kg`;
    return value;
  };

  return (
    <div className="cont ">
      <div className="card mx-auto shadow-lg" >
        <div className="card-header border-0 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <FontAwesomeIcon icon={faUserEdit} className="me-2" />
            Profile Details
          </h5>
          <IoMdCloseCircle
            size={24}
            style={{ cursor: "pointer", color: "#dc3545" }}
            onClick={() => navigate(-1)}
          />
        </div>

        <div className="card-body bg-transparent">
  {loading ? (
    <p className="text-center">Loading user profile...</p>
  ) : userData ? (
    <div className="row g-3">
      {Object.entries(userData).map(([key, value]) =>
        key !== "password" && key !=="statuss" && (
          <div key={key} className="col-12">
            <div className="bg-transparent w-100 d-flex gap-4">
              <strong className="hf">{formatLabel(key)}</strong>
              <span className="text-muted pf">:&nbsp;{formatValue(key, value)}</span>
            </div>
          </div>
        )
      )}
    </div>
  ) : (
    <p className="text-danger text-center">Profile not available.</p>
  )}
</div>


        <div className="card-footer text-center">
          <button type="button" className="btn btn-success" onClick={handleUpdate}>
            <FontAwesomeIcon icon={faUserEdit} className="me-2" />
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
