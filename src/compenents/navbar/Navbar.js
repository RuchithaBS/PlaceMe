import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import Main from "../Main";

const Navbar = () => {
  const location = useLocation(); // Get the current path
  const navigate = useNavigate();

  // Hide the navbar if the current path is "/"
  if (location.pathname === '/') {
    return null;
  }

  const handleNavClick = (path) => {
    if (location.pathname !== '') {
      navigate('/Main'); // This will navigate to Main page when you click 'Home'
      console.log('yes');
    }
  };

  return (
    <div className="navbar">
      <div className="top-logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="link">
        <Link to="/" onClick={() => handleNavClick()}>Home</Link>
        <Link to="/#about">About</Link>
        <Link to="/#contact">Contact</Link>
      </div>
    </div>
  );
};

export default Navbar;
