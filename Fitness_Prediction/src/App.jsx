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
import ViewSuggestedPlan from "./Components/UserDashboard/ViewSuggestedPlan";
import UserHistory from "./Components/UserDashboard/UserHistory";
import CaloriesBurn from "./Components/UserDashboard/CaloriesBurn";
import Footer from"./Components/Footer";
import ViewRequest from "./Components/AdminDashBoardOp/ViewRequest";
import ResetAdminCredentials from "./Components/AdminDashBoardOp/ResetAdminCredentials"

function AppContent() {
  const location = useLocation();
  const [userRole, setUserRole] = useState("user"); // or "admin"

  // Routes where you want to show the navbar
  const hideNavbarRoutes = ["/","/viewWorkouts","/account/admin","/users/register","/users/login"];
  
  hideNavbarRoutes.sty
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
  
      {shouldHideNavbar && <Navbarn userRole={userRole} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewWorkouts" element={<><br /><br /><br /><h3>History<br></br> View Workout</h3></>} />
        <Route path="/account/admin" element={<AdminLogin />} />
        <Route path="/account/admin/reset" element={<ResetAdminCredentials />} />

        <Route path="/account/admin/admin-dashboard/" element={<AdminDashBoard />}>
        <Route path="view-request" element={<ViewRequest/>} />
   <Route path="manage-users" element={<ManageUser/>} />
  <Route path="add-workout" element={<AddWorkOut/>} />
  <Route path="view-workouts" element={<ViewWorkout/>} />
  <Route path="add-workout-calories" element={<AddWorkoutCalories/>} />
  <Route path="manage-workout-calories" element={<ManageWorkoutCalories/>} />
  <Route path="manage-workout-calories/updateWorkoutCalories/:recordid" element={<UpdateWorkoutCalories />} />
 
</Route>
          <Route path="/users/login/user-dashboard/" element={<UserDashBoard/>} >
           <Route path="update-profile" element={<UpdateProfile/>}/>
           <Route path="viewprofile" element={<ViewProfile/>}/>
           <Route path="workout-plans" element={<ViewSuggestedPlan/>} />
           <Route path="fill-workout-form" element={<FillWorkoutForm/>} />
           <Route path="calories-burn" element={<CaloriesBurn/>}/>
           <Route path="user-history" element={<UserHistory/>} />
          </Route>

        <Route path="/users/register" element={<UserRegister />} />
        <Route path="/users/login" element={<UserLogin />} />
      </Routes>
      <Footer/>
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
