import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./style.css"; // Import additional styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook,faInstagram,faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (<>
   <footer className="myfooter">
        <div className="container-fluid bg-dark text-light py-5">
          {/* Top Line */}
          <h5 className="text-center mb-3">Stay fit. Stay focused. Stay strong.</h5>
          <hr style={{ width: "300px", borderTop: "2px solid #f8f9fa", margin: "auto" }} />

          {/* Project Logo & Name */}
          <div className="text-center my-3">
            {/* <img src={logo} alt="Logo" className="me-2 logoimg" /> */}
            <span className="fs-4 fw-bold">Personalized Fitness Prediction System</span>
          </div>

         
          {/* Social Media Icons */}
          <div className="d-flex justify-content-center mb-4 ">
              <FontAwesomeIcon className="text-light mx-3" icon={faFacebook}></FontAwesomeIcon>
              <FontAwesomeIcon className="text-light mx-3" icon={faInstagram}></FontAwesomeIcon>
              <FontAwesomeIcon className="text-light mx-3" icon={faTwitter}></FontAwesomeIcon>
              <FontAwesomeIcon className="text-light mx-3" icon={faLinkedin}></FontAwesomeIcon>
          </div>

          {/* Footer Bottom */}
          <p className="text-center mb-0">&copy; 2025 Personalized Fitness Prediction System. All Rights Reserved.</p>
        </div>
      </footer>
  

  </>);
}
export default Footer;