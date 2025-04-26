import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./style.css"; // Import additional styles
import WorkoutSlider from "./WorkoutSlider";
import HomeContent from "./HomeContent";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate=useNavigate();
  return (<>
    <div >
  <div id="carouselExampleControls" className="carousel slide sld " data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active position-relative i1">
        <img
          src="\src\assets\headph_wem.jpg"
          className="d-block w-100"
          alt="Slide 1"
          style={{ height: "600px", objectFit: "cover" }}
        />

        <div className="gradient-overlay"></div>
        <div className="ig1 ">
      <h2>The <big><b>Best Fitness System</b></big><br/>in Market</h2>
      <p>This System includes various activities system gives suggestion as per your requirement.To Know More information register or Login here </p>
      
     </div>
      </div>
     
     
 
      <div className="carousel-item  position-relative i1 ">
        <img
          src="\src\assets\pushup.jpg"
          className="d-block w-100"
          alt="Slide 2"
          style={{ width:"100%", height: "600px", objectFit: "cover" }}
        />
        <div className="gradient-overlay"></div>
        <div className="ig1 ">
      <h2 >The <big><b>Best Fitness System</b></big><br/>in Market</h2>
      <p>This System includes various activities system gives suggestion as per your requirement.To Know More information register or Login here </p>
       {/* <button type="button" onClick={handleClick}  className="bt btn btn-danger" > Know More</button> */}
     </div>
      </div>

      <div className="carousel-item position-relative i1">
        <img
          src="\src\assets\woman-helping-man-gym.jpg"
          className="d-block w-100"
          alt="Slide 3"
          style={{ height: "600px", objectFit: "cover" }}
        />
        <div className="gradient-overlay"></div>
        <div className="ig1 ">
      <h2>The <big><b>Best Fitness System</b></big><br/>in Market</h2>
      <p>This System includes various activities system gives suggestion as per your requirement.To Know More information register or Login here </p>
       {/* <button type="button" onClick={handleClick}   className=" bt btn btn-danger"> Know More</button> */}
     </div>
      </div>
    </div>

    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</div>
<HomeContent/>
      <WorkoutSlider/>
  </>
  );
}

export default Home;