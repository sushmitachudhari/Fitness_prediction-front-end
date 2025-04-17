import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbarn from "./Components/Navbarn";
import Home from "./Components/Home";
import AdminLogin from "./Components/AdminLogin";
import UserLogin from "./Components/UserLogin";
import UserRegister from "./Components/UserRegister";
import AdminDashBoard from "./Components/AdminDashBoard";
import UserDashBoard from "./Components/UserDashBoard";
import UpdateProfile from "./Components/UserDashboard/UpdateProfile";
import ManageUser from "./Components/AdminDashBoardOp/ManageUser";
import AddWorkOut from "./Components/AdminDashBoardOp/AddWorkOut";
import ViewWorkout from "./Components/AdminDashBoardOp/ViewWorkout"
import AddWorkoutCalories from "./Components/AdminDashBoardOp/AddWorkoutCalories";
import ManageWorkoutCalories from "./Components/AdminDashBoardOp/ManageWorkoutCalories";
import UpdateWorkoutCalories from "./Components/AdminDashBoardOp/UpdateWorkoutCalories";
import FillWorkoutForm from "./Components/UserDashboard/FillWorkoutForm";
import ViewProfile  from "./Components/UserDashboard/ViewProfile";

function AppContent() {
  const location = useLocation();
  const [userRole, setUserRole] = useState("user"); // or "admin"

  // Routes where you want to hide the navbar
  const hideNavbarRoutes = ["/", "/history ","/viewWorkouts","/account/admin","/users/register","/users/login","/users/login/"];
  
  hideNavbarRoutes.sty
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
  
      {shouldHideNavbar && <Navbarn userRole={userRole} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewWorkouts" element={<><br /><br /><br /><h3>History<br></br> View Workout</h3></>} />
        <Route path="/account/admin" element={<AdminLogin />} />
        <Route path="/account/admin/admin-dashboard" element={<AdminDashBoard />}>
   <Route path="manage-users" element={<ManageUser/>} />
  <Route path="add-workout" element={<AddWorkOut/>} />
  <Route path="view-workouts" element={<ViewWorkout/>} />
  <Route path="add-workout-calories" element={<AddWorkoutCalories/>} />
  <Route path="manage-workout-calories" element={<ManageWorkoutCalories/>} />
  <Route path="manage-workout-calories/updateWorkoutCalories/:recordid" element={<UpdateWorkoutCalories />} />
  <Route path="suggest-plan-foruser" element={<h3>SuggestPlan for User</h3>}/>
 
</Route>
          <Route path="/users/login/user-dashboard" element={<UserDashBoard/>} >
           <Route path="update-profile" element={<UpdateProfile/>}/>
           <Route path="viewprofile" element={<ViewProfile/>}/>
           <Route path="workout-plans" element={<h3>See WorkOut Plans</h3>} />
           <Route path="fill-workout-form" element={<FillWorkoutForm/>} />
           <Route path="calories-burn" element={<h3>Calories Burn</h3>}/>
          </Route>

        <Route path="/users/register" element={<UserRegister />} />
        <Route path="/users/login" element={<UserLogin />} />
        <Route path="/user-history" element={<h1>User History</h1>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
