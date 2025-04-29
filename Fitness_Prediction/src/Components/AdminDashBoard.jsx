import React, { useState,useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUsers, faDumbbell,faPersonRunning,faUser,faPersonWalking,faSignOut,faPlus,faTasks,faFire,faHome,  faArrowAltCircleRight, faHourglassHalf, faCompass, faCheckCircle, faTimesCircle, faCodePullRequest, faEye
} from '@fortawesome/free-solid-svg-icons';


const AdminDashBoard = () => {
  const [userStatusCount, setUserStatusCount] = useState({
    approve: 0,
    reject: 0,
    pending: 0
  });  
  const [users, setUsers] = useState([]);
  const [workout,setWorkout]=useState([]);
  const [plansgt,setplansgt]=useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [workoutMenuOpen, setWorkoutMenuOpen] = useState(false);
  const [WorkCalOpen,setWorkCalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/admin/viewusers")
      .then(response => {
        const allUsers = response.data;
        setUsers(allUsers);
  
        // Count statuses
        const statusCounts = {
          approve: 0,
          reject: 0,
          pending: 0
        };
  
        allUsers.forEach(user => {
          const status = user.status?.toLowerCase(); // ensure lowercase comparison
          if (statusCounts.hasOwnProperty(status)) {
            statusCounts[status]++;
          }
        });
  
        setUserStatusCount(statusCounts);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, []);
  

  useEffect(()=>{
    axios.get("http://localhost:8080/admin/workout/view")
    .then(res=>setWorkout(res.data))
    .catch(error=>console.error("Error fetching users:",error));
  },[]);
  
  useEffect(()=>{
    axios.get("http://localhost:8080/admin/SuggestedPlan")
    .then(res=>setplansgt(res.data)).catch(error=>console.error("Error Fetching Count Of Suggested Plan ",error));
  },[]);

  //for clearing sessionStorage 
  // useEffect(() => {
  //   if (!sessionStorage.getItem('your-session-token')) {
  //     navigate("/account/admin", { replace: true });
  //   }
  // }, []);
  
  
  const handleLogout = () => {
    // Clear session/token here if needed
    sessionStorage.clear();
    navigate("/account/admin",{replace:true});
    // window.location.replace("/account/admin");
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
          <img className="rounded-5" src="https://www.w3schools.com/howto/img_avatar.png" style={{ width: "40px", height: "40px" }}></img> <h5 className="sidebar-title justify-content-center align-items-center"> <center><h3>Welcome Admin</h3></center></h5>
        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div className="admin-body">
        <div className={`admin-sidebar  ${sidebarOpen ? "open" : "closed"}`}>

          {/* User Menu # */}
          <div className="sidebar-section">
            <div className="sidebar-category sc"><Link to="/account/admin/admin-dashboard/"><FontAwesomeIcon icon={faHome} className="me-2"></FontAwesomeIcon>Home</Link></div>
            <hr className="sidebar-divider" />
            <div className="sidebar-category sc"><Link to="view-request"><FontAwesomeIcon icon={faEye} className="me-2"></FontAwesomeIcon>View Request</Link></div>
            <hr className="sidebar-divider" />
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
        <div className={`admin-content  ${sidebarOpen ? "shifted" : ""}`}>
          <div className="page-title text-end">
            <p>{currentPage}</p>
          </div>
           {location.pathname ==="/account/admin/admin-dashboard/"?(
                    <div className="home-content ">
                     
                      <div className="card-div d-flex mt-2 gap-4 align-content-around justify-content-center flex-wrap">

{/* Total Users Card */}
<div className="card col-2 " style={{width:"20%"}}>
  <div className="card-body pt-5 bg-gradient text-success text-center ">
    <FontAwesomeIcon icon={faUsers} className="p-3 rounded-5 bg-success text-light" />
      
      <p className="mb-0">Total Users</p>
      <h3 >{users.length}</h3>
  </div>
  <div className="card-footer bg-success text-light text-center">
    <Link to="manage-users" className="text-decoration-none text-light">
      Know more <FontAwesomeIcon icon={faArrowAltCircleRight} className="ms-2" />
    </Link>
  </div>
</div>

{/* Total Workouts Card */}
<div className="card col-2" style={{width:"20%"}}>
  <div className="card-body pt-5  bg-gradient text-info text-center ">
    <FontAwesomeIcon icon={faDumbbell} className="p-3 rounded-5 bg-info text-light" />
     
      <p className="mb-0">Total Workouts</p>
      <h3>{workout.length}</h3>
    
  </div>
  <div className="card-footer bg-info text-center">
    <Link to="view-workouts" className="text-decoration-none text-light">
      Know more <FontAwesomeIcon icon={faArrowAltCircleRight} className="ms-2" />
    </Link>
  </div>
</div>

{/* Total Suggestions Card */}
<div className="card col-2" style={{width:"20%"}}>
  <div className="card-body pt-5  bg-gradient text-danger text-center ">
    <FontAwesomeIcon icon={faCompass} className="p-3 rounded-5 bg-danger text-light" />
   
      <p className="mb-0">Total Suggest</p>
      <h3>{plansgt}</h3>
   
  </div>
  <div className="card-footer bg-danger text-center">
    <Link to="manage-users" className="text-decoration-none text-light">
      Know more <FontAwesomeIcon icon={faArrowAltCircleRight} className="ms-2" />
    </Link>
  </div>
</div>

{/* Status Summary Card */}
<div className="card col-2" style={{width:"20%"}}>
  <div className="card-body  text-warning text-center ">
    <h5>User Status</h5>
    <div className="mt-3">
      <p><FontAwesomeIcon icon={faCheckCircle} className="me-2" />Approved: <strong>{userStatusCount.approve}</strong></p>
      <p><FontAwesomeIcon icon={faTimesCircle} className="me-2" />Rejected: <strong>{userStatusCount.reject}</strong></p>
      <p><FontAwesomeIcon icon={faHourglassHalf} className="me-2" />Pending: <strong>{userStatusCount.pending}</strong></p>
    </div>
  </div>
  <div className="card-footer bg-warning text-center">
    <Link to="manage-users" className="text-decoration-none text-light">
      Know more <FontAwesomeIcon icon={faArrowAltCircleRight} className="ms-2" />
    </Link>
  </div>
</div>

</div>
                  </div>
                   ):(
                    <Outlet />)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
