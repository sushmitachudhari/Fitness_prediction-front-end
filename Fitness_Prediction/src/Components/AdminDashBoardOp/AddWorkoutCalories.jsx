import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";
import { IoMdCloseCircle } from "react-icons/io";
import {useNavigate} from 'react-router-dom';

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

  useEffect(() => {
    // Fetch workout types
    axios.get('http://localhost:8080/admin/workout/view')
      .then(res => setWorkoutTypes(res.data))
      .catch(err => console.error("Failed to load workout types", err));

   // Fetch intensities
    axios.get('http://localhost:8080/admin/intensity/view')
      .then(res => setIntensityLevels(res.data))
      .catch(err => console.error("Failed to load intensity levels", err));
   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const response = await axios.post("http://localhost:8080/admin/addWorkoutCalories", formData)
     alert(response.data)}
    catch(error){
        console.error("Error submitting data",error);
        alert("An error occurred while adding the WorkOut.");
    }
   
  };

  return (
    <div className="container cont">
      <div className="head d-flex justify-content-between w-100 text-dark fw-bolder position-relative">
        <h4 className="pt-2 ps-3 text-center">Add WorkOut Calories</h4>
        <IoMdCloseCircle
          size={28}
          className="position-absolute"
          style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
          onClick={() =>navigate(-1)} // Replace with navigation later
        />
      </div>

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
            step="0.01"
            placeholder="Calories Burned"
            value={formData.calories_burn}
            onChange={handleChange}
            required
          />
          <label htmlFor="caloriesBurn">Calories Burned</label>
        </div>

        <div className="d-grid col-6 text-center m-auto">
          <button type="submit" className="btn bg-black text-light">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddWorkoutCalories;
