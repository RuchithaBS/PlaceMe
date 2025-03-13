import React from "react";
import Home from './home/Home';
import About from './about/About';
import Contact from './contact/Contact';

const Main = () => {
    return (
        <div>
            <section id="home">
                <Home />
            </section>
            
            <section id="about">
                <About />
            </section>

            <section id="contact">
                <Contact /> 
            </section> 
        </div>
    )
}

export default Main;
