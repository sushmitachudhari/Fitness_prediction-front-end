import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


function Slider() {
    return(
        <>
        <div id="carouselExampleControls" style={{width:"100%",height:"600px"}} className="carousel slide sld" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active ">
            <img src="\src\assets\headph_wem.jpg" style={{backgroundColor:"red",width:"200px", height:"500px"}} className="d-block w-100" alt="jhjsfd"/>
          </div>
          <div className="carousel-item ">
            <img src="\src\assets\pushup.jpg" style={{backgroundColor:"green",width:"200px", height:"500px"}} className="d-block w-100" alt="ihuiui"/>
          </div>
          <div className="carousel-item ">
            <img src="\src\assets\woman-helping-man-gym.jpg" style={{backgroundColor:"blue",width:"200px", height:"500px"}} className="d-block w-100" alt="kjhdj"/>
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
        </>
      );

}

export default Slider;
