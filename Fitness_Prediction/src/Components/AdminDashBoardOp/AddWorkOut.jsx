import React, { useState } from "react";
import "./AdminPanel.css";
import { IoMdCloseCircle } from "react-icons/io";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AddWorkOut() {
    const [formData, setFormData] = useState({ workout_type_name: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [status, setStatus] = useState({ message: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post("http://localhost:8080/admin/workout/add", formData);
            //alert(response.data); // "Workout added" or "workout not added"
           // navigate(-1); // go back to previous page
           setStatus({message:response.data,type:"success"});
           setFormData({
            workout_type_name:" "
           })
          
        } catch (error) {
            console.error("Error adding workout:", error);
            setStatus({message:"An error occurred while adding the workout."});
        }
        setTimeout(() =>setStatus({message:"",type:""}),2000);
    };

    return (
        <div className="cont" style={{width:"60%"}}>
            <div className="hd position-relative">
                <h4 className="pt-3 ps-3 text-left">Add Workout</h4>
                <IoMdCloseCircle
                    size={28}
                    className="position-absolute"
                    style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
                    onClick={() => navigate(-1)}
                />
            </div>

           {/* Dialog Box */}
           {status.message && (<div className={`alert ${status.type === 'success' ? 'alert-success': 'alert-danger'} text-center m-3`}>
            {status.message}
            </div>)}

            <form onSubmit={handleSubmit} className="p-4">
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="workout_type_name"
                        value={formData.workout_type_name}
                        onChange={handleChange}
                        className="form-control"
                        id="workout_type_name"
                        placeholder="Enter WorkOut Type"
                        required
                    />
                    <label htmlFor="workout_type_name">WorkOut Type</label>
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn bg-black text-light">Add</button>
                </div>
            </form>
        </div>
    );
}

export default AddWorkOut;
