import React  from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <nav className="navbar flex justify-around items-center p-4 bg-gray-100 shadow-md">
    <div className="logo h-1">Property</div>
    <div className="buttons">
      <ul className="nav-links flex justify-around gap-5">
        <Link to="">Home</Link>
        <Link to="">About</Link>
        <Link to="/estimated">Estimated</Link>
        <Link to="/aiimage">3D Visiulize</Link>
      </ul>
      
    </div>
    <div className="login">
        <button>Login</button>
      </div>
  </nav>
  )
  
}