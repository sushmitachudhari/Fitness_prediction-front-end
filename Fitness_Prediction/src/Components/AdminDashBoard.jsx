import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faDumbbell,
  faPersonRunning,
  faUser,
  faPersonWalking,
  faSignOut,
  faPlus,
  faTasks,
  faFire,
  faHandsHelping,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';


const AdminDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [workoutMenuOpen, setWorkoutMenuOpen] = useState(false);
  const [WorkCalOpen,setWorkCalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session/token here if needed
    navigate("/account/admin");
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
    <div className="admin-container">
      {/* Top Navbar */}
      <div className="admin-navbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        <div className="admin-info d-flex">
          <img className="rounded-5" src="https://www.w3schools.com/howto/img_avatar.png" style={{ width: "40px", height: "40px" }}></img> <h5 className="sidebar-title justify-content-center align-items-center">Admin Panel</h5>
        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div className="admin-body">
        <div className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>

          {/* User Menu # */}
          <div className="sidebar-section">
            <div
              className="sidebar-category"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            ><FontAwesomeIcon icon={faUser} className="me-2" />
              User  {userMenuOpen ? "▾" : "▸"}
            </div>
            <ul className={`submenu ${userMenuOpen ? "open" : ""}`}>
              <li><Link to="manage-users"><FontAwesomeIcon icon={faUsers} className="me-2" />Manage Users</Link></li>

            </ul>
          </div>
          <hr className="sidebar-divider" />
          {/* Workout Menu */}
          <div className="sidebar-section">
            <div
              className="sidebar-category"
              onClick={() => setWorkoutMenuOpen(!workoutMenuOpen)}
            ><FontAwesomeIcon icon={faPersonWalking} className="me-2" />
              Workout  {workoutMenuOpen ? "▾" : "▸"}
            </div>
            <ul className={`submenu ${workoutMenuOpen ? "open" : ""}`}>
              <li><Link to="add-workout"><FontAwesomeIcon icon={faDumbbell} className="me-2"></FontAwesomeIcon>Add Workout</Link></li>
              <li><Link to="view-workouts"><FontAwesomeIcon icon={faPersonRunning} className="me-2" />View Workout</Link></li>
            </ul>
          </div>
          <hr className="sidebar-divider" />
          {/* WorkOut calories Menu */}
          <div className="sidebar-section">
            <div
              className="sidebar-category"
              onClick={() => setWorkCalOpen(!WorkCalOpen)}
            ><FontAwesomeIcon icon={faFire} className="me-2" />
              WorkOut Calories  {WorkCalOpen ? "▾" : "▸"}
            </div>
            <ul className={`submenu ${WorkCalOpen ? "open" : ""}`}>
              <li><Link to="add-workout-calories">   <FontAwesomeIcon icon={faPlus} className="me-2" />Add Workout Calories</Link></li>
              <li><Link to="manage-workout-calories"><FontAwesomeIcon icon={faTasks} className="me-2" />Manage Workout Calories</Link></li>
            </ul>
          </div>
          {/* <hr className="sidebar-divider" />
          <p className="sc"><Link to="suggest-plan-foruser"><FontAwesomeIcon icon={faClipboardList} className="me-2"></FontAwesomeIcon>Suggest Plan</Link></p> */}

          <hr className="sidebar-divider" />
          <div className="sidebar-category" onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} className="me-2"></FontAwesomeIcon>Logout</div>
        </div>

        {/* Main content */}
        <div className={`admin-content ${sidebarOpen ? "shifted" : ""}`}>
          <div className="page-title text-end">
            <p>{currentPage}</p>
          </div>
          <Outlet />

        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
