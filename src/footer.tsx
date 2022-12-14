import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
    return (
        <footer>
            <div className="grid-container5">
                <div className="grid-item">
                    <p className="footer-header">Company</p>
                    <ul>
                        <li><a>Elem 1</a></li>
                        <li><a>Elem 2</a></li>
                        <li><a>Elem 3</a></li>
                        <li><a>Elem 4</a></li>
                    </ul>
                </div>
                <div className="grid-item">
                    <p className="footer-header">Help</p>
                    <ul>
                        <li><a>Elem 1</a></li>
                        <li><a>Elem 2</a></li>
                        <li><a>Elem 3</a></li>
                        <li><a>Elem 4</a></li>
                    </ul>
                </div>
                <div className="grid-item">
                    <p className="footer-header">Goodies</p>
                    <ul>
                        <li><a>Elem 1</a></li>
                        <li><a>Elem 2</a></li>
                        <li><a>Elem 3</a></li>
                        <li><a>Elem 4</a></li>
                    </ul>
                </div>
                <div className="grid-item">
                    <p className="footer-header">Account</p>
                    <ul>
                        <li><a>Elem 1</a></li>
                        <li><a>Elem 2</a></li>
                        <li><a>Elem 3</a></li>
                        <li><a>Elem 4</a></li>
                    </ul>
                </div>
                <div className="grid-item">
                    <p className="footer-header">Follow Us</p>
                    <ul>
                        <li><a>Elem 1</a></li>
                        <li><a>Elem 2</a></li>
                        <li><a>Elem 3</a></li>
                        <li><a>Elem 4</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Navbar;