import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbarn from "./Components/Navbarn";
import Home from "./Components/Home"
import AdminLogin from "./Components/AdminLogin";
import UserLogin from "./Components/UserLogin";
import UserRegister from "./Components/UserRegister";
import Footer from "./Components/Footer";

function App() {
  const [userRole, setUserRole] = useState("user"); // "admin" or "user"

  return (
    <BrowserRouter>
      <Navbarn userRole={userRole} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/predictions/calories" element={<h1>Calories Burned</h1>} />
        <Route path="/predictions/workout-plan" element={<h1>Workout Plan</h1>} />
        <Route path="/history" element={<h3>History</h3>} />
        <Route path="/account/admin" element={<AdminLogin/>} />
        <Route path="/account/user" element={<h2>Hello</h2>} />
        <Route path="/users" element={<h1>Users</h1>} />
        <Route path="/users/register" element={<UserRegister/>} />
        <Route path="/users/login" element={<UserLogin/>} />
        <Route path="/user-history" element={<h1>User History</h1>} />
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;