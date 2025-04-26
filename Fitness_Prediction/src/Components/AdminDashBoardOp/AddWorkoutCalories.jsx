import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddWorkoutCalories() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workout_type_id: '',
    intensityid: '',
    duration: '',
    calories_burn: ''
  });

  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [intensityLevels, setIntensityLevels] = useState([]);

  const [status, setStatus] = useState({ message: '', type: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/admin/workout/view')
      .then(res => setWorkoutTypes(res.data))
      .catch(err => console.error("Failed to load workout types", err));

    axios.get('http://localhost:8080/admin/intensity/view')
      .then(res => setIntensityLevels(res.data))
      .catch(err => console.error("Failed to load intensity levels", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = [];
    if (isNaN(formData.duration) || parseFloat(formData.duration) <= 0) {
      errors.push("Duration must be a positive number.");
    }
    if (isNaN(formData.calories_burn) || parseFloat(formData.calories_burn) <= 0) {
      errors.push("Calories burned must be a positive number.");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      setStatus({ message: errors.join(" "), type: "error" });
      setTimeout(() => setStatus({ message: "", type: "" }), 2000);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/admin/addWorkoutCalories", formData);
      setStatus({ message: response.data, type: "success" });
      setFormData({
        workout_type_id: "",
        intensityid: "",
        duration: "",
        calories_burn: ""
      });
    } catch (error) {
      console.error("Error submitting data", error);
      setStatus({ message: "An error occurred while adding the workout.", type: "error" });
    }

    setTimeout(() => setStatus({ message: "", type: "" }), 2000);
  };

  return (
    <div className="container cont" style={{ width: "60%" }}>
      <div className="head d-flex justify-content-between w-100 text-dark fw-bolder position-relative">
        <h4 className="pt-2 ps-3 text-center">Add WorkOut Calories</h4>
        <IoMdCloseCircle
          size={28}
          className="position-absolute"
          style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
          onClick={() => navigate(-1)}
        />
      </div>

      {/* Dialog Box */}
      {status.message && (
        <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} text-center mt-3`}>
          {status.message}
        </div>
      )}

      <form className="p-3" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
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
              <option key={w.workout_type_id} value={w.workout_type_id}>{w.workout_type_name}</option>
            ))}
          </select>
          <label htmlFor="workoutType">Workout Type</label>
        </div>

        <div className="form-floating mb-3">
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
              <option key={i.intensityid} value={i.intensityid}>{i.intensity_type}</option>
            ))}
          </select>
          <label htmlFor="intensity">Intensity Level</label>
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
          />
          <label htmlFor="duration">Duration (minutes)</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="caloriesBurn"
            name="calories_burn"
            placeholder="Calories Burned"
            value={formData.calories_burn}
            onChange={handleChange}
            required
          />
          <label htmlFor="caloriesBurn">Calories Burned</label>
        </div>

        <div className="d-grid col-6 text-center m-auto">
          <button type="submit" className="btn bg-black text-light"><FontAwesomeIcon icon={faPlus} className="me-2"></FontAwesomeIcon>Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddWorkoutCalories;
