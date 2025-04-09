import React from "react";
import "./Adminpanel.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        alert("User Updated SuccessFully");
        navigate("/users/login/user-dashboard");
    };

    return (
        <div className="cont position-relative ">
            <div className="head d-flex justify-content-between w-100  text-dark fw-bolder">
                <h4 className="pt-3 ps-3 text-center">Update Profile</h4>
                <IoMdCloseCircle
                    size={28}
                    className="position-absolute"
                    style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
                    onClick={() => navigate(-1)} />
            </div>
            <form onSubmit={handleSubmit} className="p-5 col-12 ">
                <div class="form-floating mb-3">
                    <input type="name" class="form-control" placeholder="Enter Name Here" id="floatingInput"></input>
                    <label for="floatingInput">Name</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label for="floatingInput">Email address</label>
                </div>
                <div className=" form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Enter your password"/>
                    <label for="password">Password</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="floatingInput" placeholder="Enter your height"/>
                        <label for="floatingInput">Height (cm)</label>
                </div>
               
                <div className=" form-floating mb-3">
                    <input type="number" className="form-control" id="floatingInput" placeholder="Enter your weight"/>
                    <label for="floatingInput" >Weight (kg)</label>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn bg-black text-light">Update</button>
                </div>
            </form>
        </div>
    );
}
export default UpdateProfile;

// function UserLogin() {
//   const [user, setUser] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (user.username === "" || user.password === "") {
//       setError("Both fields are required!");
//       return;
//     }

//     if (user.username !== "user" || user.password !== "user123") {
//       setError("Invalid username or password!");
//       return;
//     }

//     setError("");
//     alert("Login Successful! Redirecting to User Dashboard");
//     navigate("/users/login/user-dashboard");
//   };

//   return (
//     <div className="user-login-page mt-lg-5">
//       <div className="login-container">
//         <div className="login-form-section">
//           <div className="login-card">
//             <h2 className="text-center mb-4">User Login</h2>

//             {error && (
//               <div className="alert alert-danger text-center">{error}</div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Username</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="username"
//                   value={user.username}
//                   onChange={handleChange}
//                   placeholder="Enter user username"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="form-label">Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   name="password"
//                   value={user.password}
//                   onChange={handleChange}
//                   placeholder="Enter user password"
//                 />
//               </div>

//               <button type="submit" className="btn bg-black text-light w-100 fw-bold" >
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className="login-image-section">
//           <img src="/src/assets/two.png" alt="Workout" />
//         </div>
//       </div>
//     </div>
//   );
// }

