import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { SiAnaconda } from "react-icons/si";
import Button from "../UI/Button/Button";
import "../UI/Button/Button.css";
import "./Navbar.css";
import { useIsAuthenticated } from "@azure/msal-react";

const Navbar = () => 
{
    const isAuthenticated = useIsAuthenticated();
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
         return (
        <nav className="navbar container">
            <div className="logo">
                <SiAnaconda color="#fff" size={33} />
                <p className="logo-text">
                    Home Automation
                </p>
            </div>
           
            <menu>
                <ul
                    className="nav-links"
                    id={showMenu ? "nav-links-mobile" : "nav-links-mobile-hide"}
                >
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>    
                        <a href="#features" smooth={true} duration ={2000}>Features</a>
                    </li>
                    <li>
                        <a href="#download">Contact</a>
                    </li>
                    <li>
                        <a href="#subscribe">Services</a>
                    </li>

                    <li>
                        <a href="#DeviceCategories">About</a>
                    </li>
                    <li>
                        <a href="#DeviceCategories">Device Registration</a>
                    </li>

                    {/* <li>
            <a href="#" className="btn btn-dark">
              Get Started
            </a>
          </li> */}
                    <li className="nav-btn">
                        <Button text={"Learn More"} btnClass={"btn-dark"} href={"#faq"} />
                    </li>
                </ul>
            </menu>
            <div className="menu-icons" onClick={toggleMenu}>
                {showMenu ? (
                    <RiCloseLine color="#fff" size={30} />
                ) : (
                    <AiOutlineBars color="#fff" size={27} />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
