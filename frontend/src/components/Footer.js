import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Footer.css"

function Footer() {
  return (
    <div className="footer-dark" style={{"verticalAlign" : ""}}>
      <footer>
        <div className="container">
          <div className="row">
            
            <div className="col-sm-6  item">
              <h3>About</h3>
              <h4>Online Medicine Delivery System - 2023</h4>
              <p>User can see all the products and add to cart and payment</p>
            </div>
            <div className="col-md-6 item text">
              <h3>Team Members:</h3>
              <p>Harsh Godkar - CE043</p>
              <p>Abhishek Jamkar - CE053</p>
            </div>

          </div>
          <p className="copyright">We are Students of Computer Engineering from 5th Semester at Dharmsinh Desai University, Nadiad. </p>
        </div>
      </footer>
    </div>
  );
} 

export default Footer;
