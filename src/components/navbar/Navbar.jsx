import React from "react";
import {Link} from "react-router-dom"
import "./Navbar.css"

function Navbar(){
    return(
        <div className="container-navbar">
            <h1 className="logo">Logo</h1>
            <ul className="links-nav">
                <li className="link-nav"><Link to="/">Accueil</Link></li>
                <li className="link-nav"><Link to="/admin">Admin</Link></li>
            </ul>
        </div>
    )
}

export default Navbar