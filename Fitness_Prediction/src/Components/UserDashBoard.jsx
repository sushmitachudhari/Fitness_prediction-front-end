import React, { useState,useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild, faEyeSlash, faFire, faHistory, faHome, faSignOut, faUser, faUserEdit } from '@fortawesome/free-solid-svg-icons';

const UserDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("userEmail");
      if (email) {
        try {
          const res = await axios.get(`http://localhost:8080/user/getuser/${email}`);
          setUserName(res.data.name); // Update name from API
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };
    fetchUser();
  }, []);
   // Fetch user name


useEffect(()=>{
  const email=localStorage.getItem('userEmail');
  if(!email){
    navigate("/users/login",{replace:true});
  }
},[navigate])

  const handleLogout = () => {
    
     localStorage.clear();
    navigate("/users/login",{replace:true});
    

  };

  const getPageTitle = (pathname) => {
    const parts = pathname.split("/").filter((part) => part !== "");
    const adminIndex = parts.findIndex(part => part.toLowerCase().includes("dashboard"));
    const relevantParts = adminIndex >= 0 ? parts.slice(adminIndex) : parts;
    const capitalizeWords = (str) => str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return relevantParts.map(capitalizeWords).join(" / ");
  };

  const currentPage = getPageTitle(location.pathname);

  return (
    <div className="user-container">
      {/* Top Navbar */}
      <div className="user-navbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        <div className="user-info d-flex">
        <FontAwesomeIcon icon={faUser} className="pb-2 justify-content-center align-items-center"></FontAwesomeIcon>
          <a href="viewprofile" className="text-decoration-none">
          <h5 className="sidebar-title text-light  justify-content-center align-items-center" >
            {userName}
          </h5>
          </a>
          

        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div className="user-body ">
        <div className={`user-sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <div className="sidebar-section sc">
          <p><Link to="/users/login/user-dashboard/"><FontAwesomeIcon icon={faHome} className="me-2" />Home</Link></p>
          <hr className="sidebar-divider" />
            <p><Link to="fill-workout-form"><FontAwesomeIcon icon={faChild} className="me-2" />Fill Workout Form</Link></p>
            <hr className="sidebar-divider" />
            <p><Link to="workout-plans"><FontAwesomeIcon icon={faEyeSlash} className="me-2" />Recommend Plan</Link></p>
            <hr className="sidebar-divider" />
            <p><Link to="calories-burn"><FontAwesomeIcon icon={faFire} className="me-2" />See Calories Burn</Link></p>
            <hr className="sidebar-divider" />
            <p><Link to="user-history"><FontAwesomeIcon icon={faHistory} className="me-2" />Workout History</Link></p>
         
          </div>
          <hr className="sidebar-divider" />
          <div className="sidebar-category" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} className="me-2" />Logout
          </div>
        </div>

        <div className={`user-content ${sidebarOpen ? "shifted" : ""}`}>
          <div className="page-title text-end">
            {currentPage}
          </div>
         {location.pathname ==="/users/login/user-dashboard/"?(
          <div className="home-content">
            <center><h2>Welcome to dashBoard {userName} !</h2></center>
             <center><p>This is Your Personal Fitness space.Get started by filling your workout form or exploring suggested plans.</p></center>
          </div>
         ):(
          <Outlet />)}
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
