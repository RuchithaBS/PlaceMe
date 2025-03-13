import React from "react";
import "./About.css"


function About() {
  return (
    <div className="about-section">
      <h1>About Our Placement Management Project</h1>
      <p>
        Our project aims to streamline the placement process for students and employers by leveraging <br/>the power of Spring, Java, and React. We provide a user-friendly platform that facilitates efficient job <br/>matching, application tracking, and interview scheduling.
      </p>

      <div className="details">
        <div className="features">
            <h2>Key Features</h2>
            <ul>
                <li>Student Details and Profile Management</li>
                <li>Employer Onboarding and Job Posting</li>
                <li>College and Student Placement Records</li>
                <li>Application Tracking and placement Status</li>
            </ul>
        </div>

        <div className="benefits">
            <h2>Benefits</h2>
            <ul>
                <li>Easily accessable</li>
                <li>Enhanced User Experience</li>
                <li>Easy Connections Between Students and Employers</li>
            </ul>
        </div>

        <div className="team">
            <h2>Our Team</h2>
            <ul>
                <li>Akash NS - Lead Developer, College Module</li>
                <li>Shubangini - Certificate Module </li>
                <li>Karthik - User Module</li>
                <li>Ruchitha - College Module</li>
                <li>Rakshitha - Student Module</li>
                <li>Madhuri - Certificate Module</li>
                <li>Shruthi hs - Placement Module</li>
            </ul>
        </div>
      </div>
    <div className="plans">
        <h2>Future Plans</h2>
        <p>
            We are committed to continuously improving our platform and expanding its features to better serve the needs of students and employers.
        </p>
    </div>
      
    </div>
  );
}

export default About;