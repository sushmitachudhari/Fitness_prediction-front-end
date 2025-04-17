import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewWorkout = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/workout/view")
      .then(response => {
        console.log("Workout data:", response.data); // Debug log
        setWorkouts(response.data);
      })
      .catch(error => {
        console.error("Error fetching workouts:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">All Registered Workouts</h3>

      {workouts.length === 0 ? (
        <p className="text-center">No workouts available.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Workout ID</th>
              <th>Workout Name</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout,index) => (
              <tr key={workout.workout_type_id} className="text-black">
                <td>{index+1}</td>
                <td>{workout.workout_type_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewWorkout;
