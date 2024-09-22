import "./Footer.css";
import { Link } from "react-router-dom";
import React from "react";

function Footer() {
  return (
    <>
      <footer>
        <div className="content">
          <div className="top">
            <div className="logo-details">
              <i className="fab fa-slack"></i>
              <span className="logo_name">Mr Buddy</span>
            </div>
            <div className="media-icons">
              <Link to="#">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-github"></i>
              </Link>
            </div>
          </div>
          <div className="link-boxes">
            <ul className="box">
              <li className="link_name">Company</li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/ContactUs">Contact us</Link>
              </li>
              <li>
                <Link to="#">About us</Link>
              </li>
              <li>
                <Link to="#">Get started</Link>
              </li>
            </ul>
            <ul className="box">
              <li className="link_name">Services</li>
              <li>
                <Link to="/car-service">AC Services</Link>
              </li>
              <li>
                <Link to="/car-service">Scheduled Services</Link>
              </li>
              <li>
                <Link to="/car-service">Denting Painting</Link>
              </li>
              <li>
                <Link to="/car-service">Lights & Fitments</Link>
              </li>
            </ul>
            <ul className="box">
              <li className="link_name">Account</li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/order-history">Order History</Link>
              </li>
              <li>
                <Link to="/my-cars">My Cars Collection</Link>
              </li>
              <li>
                <Link to="/ManageAddress">Manage Address</Link>
              </li>
            </ul>
            <ul className="box input-box">
              <li className="link_name">Subscribe</li>
              <li>
                <input type="text" placeholder="Enter your email" />
              </li>
              <li>
                <input type="button" value="Subscribe" />
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom-details">
          <div className="bottom_text">
            <span className="copyright_text">
              Copyright © 2024 <Link to="#">Mr Buddy </Link>All rights reserved
            </span>
            <span className="policy_terms">
              <Link to="#">Privacy policy</Link>
              <Link to="#">Terms & condition</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
