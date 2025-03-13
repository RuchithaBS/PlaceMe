import React from "react";
import "./Home.css"
import logo from "./logo.png"


const Home = () => {
    return (
        <div className="home">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            
            <div className="links">
                
                <a href="#home">Home</a>
                <a href="#about">About</a> 
                <a href="#contact">Contact</a>
                
                
            </div> 

            <div className="welcome">
                <h1>Welcome to Placeme.</h1>
                <p>The bridge between talent and opportunity!</p>
            </div>

        </div>
        
    )
}

export default Home;
