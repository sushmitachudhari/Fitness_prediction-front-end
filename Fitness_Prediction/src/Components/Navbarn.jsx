import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import logo from "../assets/project_logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faHome, faLock, faPerson, faPersonRunning, faUniversity, faUser, faUserLock, faUserPlus } from '@fortawesome/free-solid-svg-icons';


const Navbarn = ({ userRole }) => {
  const [workoutTypes, setWorkoutTypes] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const workoutRes = await axios.get("http://localhost:8080/admin/workout/view");
        setWorkoutTypes(workoutRes.data);
      } catch (err) {
        console.error("Failed to load dropdown data", err);
        alert("Failed to load workout types.");
      }
    };

    fetchInitialData();
  }, []);

  return (
    <>
      <nav className="navbar navb navbar-expand-lg bg-black position-fixed  w-100 pe-5">
        <div className="container-fluid">
          {/* Brand */}
          <NavLink className="navbar-brand fw-bold text-light" to="/">
            <img src={logo} alt="Logo" style={{ width: "3.3rem", height: "3.3rem" }} />
            Fitness Tracker
          </NavLink>

          {/* Toggle for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link text-light ni" to="/" ><FontAwesomeIcon icon={faHome} className="me-1"></FontAwesomeIcon>Home</NavLink>
              </li>

              {/* Wor  kout Types Dropdown */}
              <li className="nav-item dropdown">
  <a className="nav-link dropdown-toggle text-light ni" href="#" role="button" data-bs-toggle="dropdown">
  <FontAwesomeIcon icon={faDumbbell} className="me-1"></FontAwesomeIcon> Workouts
  </a>
  <ul className="dropdown-menu bg-dark scrollable-dropdown"style={{maxHeight:"300px",overflowY:"scroll",scrollBehavior:"smooth"  }}  >
    {workoutTypes.map((workout) => (
      <li key={workout.workout_type_id}>
        <a
          className="dropdown-item text-light "
          href={`https://www.google.com/search?q=${encodeURIComponent(workout.workout_type_name)}+exercise`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {workout.workout_type_name}
        </a>
      </li> 
    ))}
  </ul>
</li>


              {/* Account Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light ni"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ><FontAwesomeIcon icon={faLock} className="me-1 "></FontAwesomeIcon>
                  Account
                </a>
                <ul className="dropdown-menu bg-dark">
                  <li>
                    <NavLink className="dropdown-item text-light" to="/account/admin"><FontAwesomeIcon icon={faUniversity} className="me-2"></FontAwesomeIcon>Admin</NavLink>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle ps-3 text-light"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ><FontAwesomeIcon icon={faUser} className="me-2"></FontAwesomeIcon>
                      User
                    </a>
                    <ul className="dropdown-menu bg-dark">
                      <li><NavLink className="dropdown-item text-light" to="/users/login"><FontAwesomeIcon icon={faUserLock} className="me-2"></FontAwesomeIcon>Login</NavLink></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><NavLink className="dropdown-item text-light" to="/users/register"><FontAwesomeIcon icon={faUserPlus} className="me-2"></FontAwesomeIcon>Register</NavLink></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbarn;
