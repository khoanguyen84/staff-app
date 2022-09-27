import React from "react";
import { Link } from 'react-router-dom';
function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container">
                <Link to={"/staff-app"} className="navbar-brand mb-0 h1 aligns-items-center">
                    <i className="fa-solid fa-people-roof text-warning display-6"/>   
                     <span className="text-warning"> Staff </span>Manager App
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;