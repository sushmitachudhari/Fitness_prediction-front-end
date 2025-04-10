import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css"; // Optional: Add styling if needed

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    axios.get("http://localhost:8080/admin/viewusers")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  // Handle delete user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/admin/deleteuser/${userId}`);
      setUsers(users.filter(user => user.userid !== userId));
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No users found.</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.userid}>
                <td>{user.userid}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.height}</td>
                <td>{user.weight}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.userid)}
                  >
                    Delete
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
