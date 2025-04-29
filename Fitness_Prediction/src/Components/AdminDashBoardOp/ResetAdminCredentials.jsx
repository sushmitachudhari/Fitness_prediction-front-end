import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetAdminCredentials() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:8080/admin/reset', credentials, {
        headers: { "Content-Type": "application/json" }
      });
      console.log(res.data);
      alert("Admin credentials updated successfully!");
      setMsg("Credentials updated successfully.");

      setCredentials({ username: '', password: '' });

      setTimeout(() => {
        navigate("/account/admin");
      }, 1000);

    } catch (error) {
      console.error("Error resetting admin credentials:", error);
      alert("Failed to update credentials.");
    }
  };

  return (
    <div style={{
      minHeight: "85vh", // 🧡 Leaves space for footer
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f7fa",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "500px",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "600",
          color: "#333"
        }}>
          Reset Admin Credentials
        </h2>

        {/* Username Input */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Enter new username"
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px"
            }}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter new password"
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px"
            }}
          />
        </div>

        {/* Success Message */}
        {msg && (
          <div style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
            textAlign: "center",
            fontWeight: "500"
          }}>
            {msg}
          </div>
        )}

        {/* Update Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#333",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
        >
          Update Credentials
        </button>

        {/* Go Back Link */}
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <Link to="/account/admin" style={{ textDecoration: "none", color: "#007bff", fontWeight: "500" }}>
            Go back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetAdminCredentials;
