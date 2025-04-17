import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";

function UpdateWorkoutCalories() {
  const { recordid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workout_type_id: "",
    intensityid: "",
    duration: "",
    calories_burn: ""
  });

  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [intensityLevels, setIntensityLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [workoutsRes, intensityRes, recordRes] = await Promise.all([
          axios.get("http://localhost:8080/admin/workout/view"),
          axios.get("http://localhost:8080/admin/intensity/view"),
          axios.get(`http://localhost:8080/admin/viewWorkoutCaloriesbyrecordid/${recordid}`)
        ]);

        setWorkoutTypes(workoutsRes.data);
        setIntensityLevels(intensityRes.data);

        const fetchedData = recordRes.data;

        const normalizedData = {
          workout_type_id: fetchedData.workout_type_id || "",
          intensityid: fetchedData.intensityid || "",
          duration: fetchedData.duration || "",
          calories_burn: fetchedData.calories_burn || ""
        };

        setFormData(normalizedData);
      } catch (err) {
        console.error("Failed to fetch workout data", err);
        alert("Could not fetch workout data.");
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [recordid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(
        `http://localhost:8080/admin/updateWorkoutCalories/${recordid}`,
        formData
      );
      alert("Workout updated successfully!");
      navigate("/account/admin/admin-dashboard/manage-workout-calories");
    } catch (error) {
      console.error("Error updating workout", error);
      alert("An error occurred while updating.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5 fw-bold">Loading workout data...</div>;
  }

  return (
    <div className="container cont">
      <div className="head d-flex justify-content-between w-100 text-dark fw-bolder position-relative">
        <h4 className="pt-2 ps-3 text-center">Update WorkOut Calories</h4>
        <IoMdCloseCircle
          size={28}
          className="position-absolute"
          style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
          onClick={() => navigate(-1)}
        />
      </div>

      <form className="p-3" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <select
            className="form-select"
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
          <label>Workout Type</label>
        </div>

        <div className="form-floating mb-3">
          <select
            className="form-select"
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
          <label>Intensity</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration"
            required
          />
          <label>Duration (minutes)</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="calories_burn"
            value={formData.calories_burn}
            onChange={handleChange}
            placeholder="Calories Burned"
            required
          />
          <label>Calories Burned</label>
        </div>

        <div className="d-grid col-6 text-center m-auto">
          <button type="submit" className="btn bg-black text-light" disabled={updating}>
            {updating ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateWorkoutCalories;