import React,{useEffect, useState} from "react";
import { IoMdCloseCircle } from "react-icons/io";
import "./userpanel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurn } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CaloriesBurn()
{
const navigate=useNavigate();
const [userid,setUserId]=useState(null);
const [calories,setCalories]=useState(null);

useEffect(()=>{
    const fetchuser=async () =>{
    const email=localStorage.getItem("userEmail");
    if(email){
        try{
            const res= await axios.get(`http://localhost:8080/user/getuser/${email}`);
            setUserId(res.data.userid);
        }
        catch(error){
            console.error("Error fetching user data:",error);
        }
    }
    else{
        console.log("Email Not Found");
    }
    };
    fetchuser();
},[]);
useEffect(()=>{
    if(userid){
        axios.get(`http://localhost:8080/user/getcaloriesuptillnow/${userid}`)
        .then(res=>{
            setCalories(res.data);
        })
        .catch(err=>{
            console.error("error Fetching Calories",err);
            setCalories(0);
        });
    }
},[userid]);
 return(
    <div className="cont">
       <div className="head d-flex justify-content-between w-100 text-dark fw-bolder position-relative">
               <h4 className="pt-2 ps-3 text-center fw-bold">Total Calories Butn Till Now<FontAwesomeIcon icon={faBurn} className="ms-3"></FontAwesomeIcon></h4>
               <IoMdCloseCircle
                 size={28}
                 className="position-absolute"
                 style={{ top: "2%", right: "2%", cursor: "pointer", color: "#dc3545" }}
                 onClick={() => navigate(-1)} />
             </div>
             <div className="psg p-5">
              
               {calories!==null?(calories>0? (
                <p className="text-success fw-bolder">Keep It Up You are Doing Great .<br></br>
                You can Achieve Your Designed Goal<br></br>
                 You have Burn Calories Till <mark className="text-danger">{calories}</mark> </p>
               ):(
                <p className="text-warning fw-bolder">Keep Doing Workout To maintain Fitness <br></br>
                 You have not Burn Calories  <p className="text-danger">{calories}</p> </p>
               )
            ):(<p>Page is Loading</p>)}
             </div>
    </div>
 );
}
export default CaloriesBurn;