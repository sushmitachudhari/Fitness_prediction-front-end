import React, { useState } from "react";
import { Link, Outlet, useNavigate,useLocation } from "react-router-dom";
import "./style.css";

const UserDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/users/login");
  };
const location = useLocation();
  const getPageTitle = (pathname) => {
    const parts = pathname.split("/").filter((part) => part !== "");
  
    // Find the index of "admin-dashboard"
    const adminIndex = parts.findIndex(part => part.toLowerCase().includes("dashboard"));
  
    // Get only parts after "admin-dashboard"
    const relevantParts = adminIndex >= 0 ? parts.slice(adminIndex) : parts;
    const capitalizeWords = (str) => {
      return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');  
      };
    const formattedParts = relevantParts.map(capitalizeWords); 
    return formattedParts.join(" / ");
  };
  const currentPage = getPageTitle(location.pathname);

    return (
    <div className="user-container">
      {/* Top Navbar */}
      <div className="user-navbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        <div className="user-info d-flex">
          <img
            className="rounded-5"
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="avatar"
            style={{ width: "40px", height: "40px" }}
          />
          <h5 className="sidebar-title justify-content-center align-items-center">User Panel</h5>
        </div>      
      </div>

      {/* Sidebar + Main Content */}
      <div className="user-body">
        <div className={`user-sidebar ${sidebarOpen ? "open" : "closed"}`}>
            <center><h5>User DashBoard</h5></center>
          <div className="sidebar-section">
            <p><Link to="update-profile">Update Profile</Link></p>
            <p><Link to="workout-plans">Workout Plans</Link></p>
            <p><Link to="feedback">Feedback</Link></p>
            <p onClick={handleLogout} style={{ cursor: "pointer", color: "#ff4d4d" }}>Logout</p>
          </div>
        </div>

        <div className={`user-content ${sidebarOpen ? "shifted" : ""}`}>
          <div className="page-title ">
            {currentPage}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
