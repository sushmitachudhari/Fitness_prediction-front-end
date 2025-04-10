import React, { useState } from "react";
import { Link, Outlet, useNavigate,useLocation } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild,faEyeSlash,faFire,faSignOut, faUserEdit } from '@fortawesome/free-solid-svg-icons';

const UserDashBoard = () => {

  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/users/login");
    localStorage.removeItem("userName");
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
  
          <div className="sidebar-section sc">
            <p><Link to="update-profile"><FontAwesomeIcon icon={faUserEdit} className="me-2"></FontAwesomeIcon>Update Profile</Link></p>
            <hr className="sidebar-divider" />
            <p><Link to="workout-plans"><FontAwesomeIcon icon={faEyeSlash} className="me-2"></FontAwesomeIcon>See Workout Plans</Link></p>
            <hr className="sidebar-divider" />
            <p><Link to="choose-workout"><FontAwesomeIcon icon={faChild} className="me-2"></FontAwesomeIcon>Choose Workout</Link></p>
            <hr className="sidebar-divider" />
            <p><Link to="calories-burn"><FontAwesomeIcon icon={faFire} className="me-2"></FontAwesomeIcon>Calories Burn</Link></p>
            
          </div>
          <hr className="sidebar-divider" />
          <div className="sidebar-category" onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} className="me-2"></FontAwesomeIcon>Logout</div>
        </div>

        <div className={`user-content ${sidebarOpen ? "shifted" : ""}`}>
          <div className="page-title text-end">
            {currentPage}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
