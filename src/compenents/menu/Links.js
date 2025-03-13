import React from "react";
import { Link } from "react-router-dom";
import "./links.css"

const Links = () =>  {

  return (
      <div className="functionalities">
        <Link to="/user" >Users</Link>
        <Link to="/student">Student</Link>
        <Link to="/college">College</Link>
        <Link to="/placement">Placement</Link>
        <Link to="/certificate">Certificate</Link>
      </div>
  );
};  

export default Links