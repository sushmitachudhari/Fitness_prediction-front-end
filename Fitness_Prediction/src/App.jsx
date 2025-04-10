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

function AppContent() {
  const location = useLocation();
  const [userRole, setUserRole] = useState("user"); // or "admin"

  // Routes where you want to hide the navbar
  const hideNavbarRoutes = ["/", "/history","/predictions/calories","/predictions/workout-plan","/history","/account/admin","/users/register","/users/login"];
  
  hideNavbarRoutes.sty
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
  
      {shouldHideNavbar && <Navbarn userRole={userRole} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predictions/calories" element={<h1>Calories Burned</h1>} />
        <Route path="/predictions/workout-plan" element={<h1>Workout Plan</h1>} />
        <Route path="/history" element={<><br /><br /><br /><h3>History</h3></>} />
        <Route path="/account/admin" element={<AdminLogin />} />
        <Route path="/account/admin/admin-dashboard" element={<AdminDashBoard />}>
   <Route path="manage-users" element={<ManageUser/>} />
  <Route path="add-workout" element={<h3>add-workout</h3>} />
  <Route path="view-workouts" element={<h3>view-workout</h3>} />
  <Route path="add-workout-calories" element={<h3>add-workout-calories</h3>} />
  <Route path="manage-workout-calories" element={<h3>manage-workout-calories</h3>} />
  <Route path="suggest-plan-foruser" element={<h3>SuggestPlan for User</h3>}/>
 
</Route>
         <Route path="/workout/running" element={<h2>WorkOutpage running</h2>}></Route>
           <Route path="/users/login/user-dashboard" element={<UserDashBoard/>} >
           <Route path="update-profile" element={<UpdateProfile/>}/>
           <Route path="workout-plans" element={<h3>See WorkOut Plans</h3>} />
           <Route path="choose-workout" element={<h3>choose workout here</h3>} />
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
