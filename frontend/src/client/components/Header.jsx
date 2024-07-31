import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import "./Header.css";
import logo from "../images/Synergy_logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AnimatedSection animationType="slideInFromLeft">
      <header className="header-client">
        <div className="header-left">
          <img src={logo} alt="Logo" className="logo-header-client" />
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <NavLink
            exact
            to="/"
            activeclassname="active"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            activeclassname="active"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            activeclassname="active"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/projects"
            activeclassname="active"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink
            to="/blog"
            activeclassname="active"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </NavLink>
          <NavLink
            to="/contact"
            activeclassname="active"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
          <button className="quote-button"><span>Request a Quote</span></button>
        </nav>
      </header>
    </AnimatedSection>
  );
};

export default Header;
