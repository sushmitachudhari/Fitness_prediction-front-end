import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./style.css"; // Import additional styles

function Footer() {
  return (<>
  
    <footer>
      {/* <div className="container">
        <div className="row text-start">

          // {/* Column 1 - About 
          <div className="col-md-3 mb-4 coll">
            <h5 className="text-uppercase fw-bold ">Fitness Tracker</h5>
            <p className="small">
              Our Stamin is a Fitness and Gym WordPress Theme designed exclusively for Gyms, Trainers, and fitness professionals that work on any number of screen sizes. Get Stamin today!
            </p>
            <div className="d-flex gap-3">
              <i className="fab fa-facebook-f text-white"></i>
              <i className="fab fa-x-twitter text-white"></i>
              <i className="fab fa-instagram text-white"></i>
              <i className="fab fa-pinterest-p text-white"></i>
              <i className="fab fa-tumblr text-white"></i>
            </div>
          </div>

          {/* Column 2 - Latest Posts 
          <div className="col-md-3 mb-4 coll">
            <h6 className=" text-uppercase  pb-1 ">Latest Posts</h6>
            <div className="d-flex mb-2">
              <img src="\src\assets\fst.jpg" style={{width:"50px",height:"50px"}} className="rounded-circle me-2" alt="post" />
              <div>
                <p className="mb-1 small">Fitness Helps You Think And Feel Better</p>
                <small className="text-muted tm">April 19, 2019</small>
              </div>
            </div>
            <div className="d-flex">
              <img src="\src\assets\sec.jpg" style={{width:"50px",height:"50px"}} className="rounded-circle me-2" alt="post" />
              <div>
                <p className="mb-1 small">How To Prepare Meals Fast And Easy</p>
                <small className="text-muted tm">April 19, 2019</small>
              </div>
            </div>
          </div>

          {/* Column 3 - Classes 
          <div className="col-md-3 mb-4 coll">
            <h6 className="text-uppercase   pb-1">Our Activity</h6>
            <ul className="list-unstyled small">
              <li> Self Defense</li>
              <li> Advance Gym</li>
              <li> Fitness Training</li>
              <li> Cardio Training</li>
              <li> Strength Training</li>
              <li> Psycho Training</li>
            </ul>
          </div>

          {/* Column 4 - Newsletter 
          <div className="col-md-3 mb-4 coll">
            <h6 className="text-uppercase   pb-1">Newsletter</h6>
            <p className="small">Subscribe to keep up with latest news and updates.</p>
            <div className="input-group">
              <input type="email" id="feid" className="form-control" placeholder="Email Address" />
              <button className="btn btn-danger">Sign Up</button>
            </div>
          </div>
        </div>

        
      </div> */}
          <p style={{color:"lightgrey"}}>This Website is maintain by &copy; Fitness System 2025 </p>
    </footer>
  </>);
}
export default Footer;