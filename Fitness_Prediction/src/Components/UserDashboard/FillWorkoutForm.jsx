import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import "./userpanel.css";
import { useNavigate } from "react-router-dom";

function FillWorkoutForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userid: '',
    workout_type_id: '',
    intensityid: '',
    duration: '',
    calories_burn: ''
  });

  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [intensityLevels, setIntensityLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // <-- new (success or danger)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [workoutRes, intensityRes] = await Promise.all([
          axios.get('http://localhost:8080/admin/workout/view'),
          axios.get('http://localhost:8080/admin/intensity/view')
        ]);
        setWorkoutTypes(workoutRes.data);
        setIntensityLevels(intensityRes.data);
      } catch (err) {
        console.error("Failed to load dropdown data", err);
      }

      const email = localStorage.getItem("userEmail");
      if (!email) {
        alert("User email not found. Please login again.");
      }

      try {
        const userRes = await axios.get(`http://localhost:8080/user/getuser/${email}`);
        if (userRes.data && userRes.data.userid) {
          setFormData(prev => ({ ...prev, userid: userRes.data.userid }));
        } else {
          alert("User not found.");
        }
      } catch (err) {
        console.error("Error fetching user ID", err);
        alert("Failed to fetch user information.");
      }

      setLoading(false);
    };

    fetchInitialData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userid) {
      alert("User ID not loaded yet.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post("http://localhost:8080/user/workoutdetails", formData);

      // Success Message
      setMessage(response.data || "Workout submitted successfully!");
      setDialogType("success");
      setShowDialog(true);

      setTimeout(() => {
        setShowDialog(false);
        navigate(-1);
      }, 2000);

    } catch (error) {
      console.error("Error submitting data", error);

      // Error Message
      setMessage("Error submitting workout. Please try again.");
      setDialogType("danger");
      setShowDialog(true);

      setTimeout(() => {
        setShowDialog(false);
      }, 2000);
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading user data...</div>;
  }

  return (
    <div className="cont">
      {/* Dialog Box */}
      {showDialog && (
        <div className={`dialog-box alert alert-${dialogType}`} role="alert">
          {message}
        </div>
      )}

      <div className="head d-flex justify-content-between w-100 text-dark fw-bolder position-relative">
        <h4 className="pt-2 ps-3 text-center">Fill Workout Form</h4>
        <IoMdCloseCircle
          size={28}
          className="position-absolute"
          style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
          onClick={() => navigate(-1)}
        />
      </div>

      <form className="p-3" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between">
          <div className="form-floating mb-3" style={{ flexBasis: "48%" }}>
            <select
              className="form-select"
              id="workoutType"
              name="workout_type_id"
              value={formData.workout_type_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Workout Type</option>
              {workoutTypes.map(w => (
                <option key={w.workout_type_id} value={w.workout_type_id}>
                  {w.workout_type_name}
                </option>
              ))}
            </select>
            <label htmlFor="workoutType">Workout Type</label>
          </div>

          <div className="form-floating mb-3" style={{ flexBasis: "48%" }}>
            <select
              className="form-select"
              id="intensity"
              name="intensityid"
              value={formData.intensityid}
              onChange={handleChange}
              required
            >
              <option value="">Select Intensity</option>
              {intensityLevels.map(i => (
                <option key={i.intensityid} value={i.intensityid}>
                  {i.intensity_type}
                </option>
              ))}
            </select>
            <label htmlFor="intensity">Intensity Level</label>
          </div>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="duration"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min={1}
          />
          <label htmlFor="duration">Duration (minutes)</label>
        </div>

        <div className="d-grid col-6 text-center m-auto">
          <button type="submit" className="btn bg-black text-light" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FillWorkoutForm;
