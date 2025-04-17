import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    axios.get("http://localhost:8080/admin/viewusers")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  // Handle suggest plan to user
  const suggestPlan = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/admin/suggest/${userId}`);
      alert(response.data); // Shows backend response message
    } catch (error) {
      console.error("Error suggesting plan:", error);
      const message = error.response?.data || "Failed to suggest a plan for the user";
      alert(message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">All Registered Users</h3>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Suggest Plan</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No users found.</td>
            </tr>
          ) : (
            users.map((user,index) => (
              <tr key={user.userid}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.height}</td>
                <td>{user.weight}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => suggestPlan(user.userid)}
                  >
                    Recommend Plan
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
