import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="nav_bar">
            <div className="topnav">
                <div className="topnav-centered">
                    <a href="/home" className="active">LAST.FM</a>
                </div>
                <div className="topnav-right">
                    <a href="/home">Home</a>
                    <a href="/search">Search</a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;