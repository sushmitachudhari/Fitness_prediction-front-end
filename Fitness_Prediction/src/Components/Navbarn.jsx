import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/project_logo.png';


const Navbarn = ({ userRole }) => {
  
  return (<>
    
  <div>
  <nav className="navbar navb navbar-expand-lg bg-black position-fixed px-3 ">
      <div className="container-fluid">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold text-light" to="/">
          <img src={logo} style={{width:"4rem", height:"4rem"}}></img>Fitness Tracker
        </NavLink>

        {/* Toggle Button for Mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon " style={{ filter: "invert(1)"}}></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Home */}
            <li className="nav-item " >
              <NavLink className="nav-link text-light" to="/">Home</NavLink>
            </li>

         

            {/* History (Only for User) */}
           
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/viewWorkouts">View Workouts</NavLink>
              </li>
          

          
<li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      Account
    </a>
    <ul className="dropdown-menu bg-dark">
      <li><NavLink className="dropdown-item text-light tn" to="/account/admin">Admin</NavLink></li>
     
      <li><hr className="dropdown-divider"/></li>
      <li className="nav-item dropdown-center ">
        <a className="nav-link dropdown-toggle ps-3 text-light"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
          User
        </a>
        <ul className="dropdown-menu bg-dark ">
          <li><NavLink className="dropdown-item tn text-light  " to="/users/login">Login</NavLink></li>
          <li><hr className="dropdown-divider "/></li>
          <li><NavLink className="dropdown-item tn text-light" to="/users/register">Register</NavLink></li>
        </ul>
      </li>
    </ul>
</li>
            {/* Admin Specific Options */}
            {userRole === "admin" && (
              <>
                <li className="nav-item ">
                 <NavLink className="nav-link  text-light" to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/user-history">User History</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  </div>
  </>
  );
};
 
export default Navbarn;