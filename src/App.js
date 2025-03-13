import './App.css';
import { BrowserRouter, Routes, Route } from'react-router-dom';
import Sidebar from './compenents/menu/Sidebar';
import User from './compenents/functionalities/user/User';
import Certificate from './compenents/functionalities/certificate/Certificate';
import College from './compenents/functionalities/college/College';
import Placement from './compenents/functionalities/placement/Placement';
import Student from './compenents/functionalities/student/Student';
import Main from './compenents/Main';
import Navbar from './compenents/navbar/Navbar';


function App() {
    return (
        <div className="App">
            <BrowserRouter>
            
            <Navbar/>
            <Sidebar/>
            
            <Routes>
              <Route path="/" element={<Main/>} />
              
              <Route path="/user" element={<User/>} />
              
              <Route path="/certificate" element={<Certificate />} />
              
              <Route path="/college" element={<College/>} />

              <Route path="/placement" element={<Placement/>} />

              <Route path="/student" element={<Student/>} />
              
            </Routes>
            
            </BrowserRouter>
            
        </div>
    );
}


export default App;
