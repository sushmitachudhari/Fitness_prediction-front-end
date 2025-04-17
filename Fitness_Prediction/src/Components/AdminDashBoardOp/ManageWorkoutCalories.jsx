import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,Link  } from "react-router-dom";

function ManageWorkoutCalories() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchWorkoutCalories();
  }, []);

  const navigate = useNavigate();


  const fetchWorkoutCalories = () => {
    axios.get("http://localhost:8080/admin/viewWorkoutCalories")
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching workout data", err));
  };

  const handleUpdate = (recordid) => {
    navigate(`/account/admin/admin-dashboard/manage-workout-calories/updateWorkoutCalories/${recordid}`);
  };
 
  const handleDelete = (recordid) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios.delete(`http://localhost:8080/admin/deleteWorkoutCalories/${recordid}`)
        .then(() => {
          alert("Deleted successfully");
          fetchWorkoutCalories(); // Refresh table
        })
        .catch(err => alert("Delete failed"));
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Manage Workout Calories</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Record_Id</th>
              <th>Workout Type ID</th>
              <th>Intensity ID</th>
              <th>Duration (min)</th>
              <th>Calories Burned</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.recordid}>
                  <td>{index + 1}</td>
                  <td>{item.workout_type_id}</td>
                  <td>{item.intensityid}</td>
                  <td>{item.duration}</td>
                  <td>{item.calories_burn}</td>
                  <td>
                  <Link to={`/account/admin/admin-dashboard/manage-workout-calories/updateWorkoutCalories/${item.recordid}`}>
                  <button className="btn btn-warning btn-sm" onClick={() => handleUpdate(item.recordid)}>
                      Update
                    </button>
</Link>
                    
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.recordid)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageWorkoutCalories;
