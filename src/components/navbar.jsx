// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import dark_logo from '../Assets/Images/TG-Dark.png';

const Header = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white px-4 py-1 shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={dark_logo}
              alt="Logo"
              width="200"
              className="me-2"
            />
          </Link>

          {/* Hamburger for mobile */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Desktop Menu */}
          <div className="d-none d-lg-flex">
            <ul className="navbar-nav flex-row gap-4">
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/learn-ai">
                  Learn AI
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/courses">
                  Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Offcanvas Side Nav */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileMenu">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/learn-ai">
                Learn AI
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;