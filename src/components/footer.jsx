// src/components/Footer.jsx
import React, { useState, useEffect } from "react";
import dark_logo from "../Assets/Images/TG-Dark.png";

const Footer = () => {
  const [countryCode, setCountryCode] = useState("+91"); // default India

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            // Use BigDataCloud Reverse Geocoding API (no 403 issue)
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            const data = await res.json();

            const country = data.countryName || "";

            console.log(`You are at: ${data.principalSubdivision}, ${country}`);

            // Auto-select country code
            if (country.toLowerCase().includes("india")) {
              setCountryCode("+91");
            } else if (country.toLowerCase().includes("united states")) {
              setCountryCode("+1");
            } else if (country.toLowerCase().includes("singapore")) {
              setCountryCode("+65");
            }
          } catch (error) {
            console.log("Could not fetch place name", error);
          }
        },
        (error) => {
          console.log("Location access denied or failed", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  }, []);

  return (
    <>
      <footer className="py-5">
        <div className="container">
          <div className="row align-items-start">
            {/* Left: Logo */}
            <div className="col-md-4 text-center text-md-start mb-4 mb-md-0">
              <img src={dark_logo} alt="Logo" className="footer-logo mb-2" />
            </div>

            {/* Center: Contact Form */}
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <h5 className="fw-bold mb-3">GET IN TOUCH</h5>
              <div className="footer-contact-group d-flex justify-content-center align-items-center">
                <select
                  className="form-select footer-select option-select"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+91">IN +91</option>
                  <option value="+1">US +1</option>
                  <option value="+65">SG +65</option>
                </select>

                <input
                  type="text"
                  className="form-control footer-input"
                  placeholder="Enter Phone Number"
                />

                <button className="footer-button">Submit</button>
              </div>
            </div>

            {/* Right: Social Icons */}
            <div className="col-md-4 text-center text-md-end">
              <p className="text-muted">Connect with social</p>
              <div className="d-flex justify-content-center justify-content-md-end gap-3 fs-5 footer-socials">
                <a href="https://www.facebook.com/Technology.Garage.Trichy/" target="_blank" rel="noreferrer">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://www.instagram.com/technology.garagetrichy/" target="_blank" rel="noreferrer">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="mb-0 text-muted copyright">
          © Copyright 2025{" "}
          <strong>
            <u>Technology Garage</u>
          </strong>
        </p>
      </footer>

      {/* Footer Styles */}
      <style>{`
        .footer-logo {
          height: 80px;
        }

        .footer-contact-group {
          max-width: 100%;
          width: 100%;
          margin: 0 auto;
          display: flex;
          border-radius: 0px;
        }

        .footer-select {
          width: 25% !important;
          min-width: 100px;
          border: none;
          border-right: 1px solid #ccc;
          border-radius: 0;
          height: 48px;
          background-color: #fff;
        }

        .footer-input {
          flex: 1;
          min-width: 100px;
          border: none;
          height: 48px;
          background-color: #fff;
          border-radius: 0;
          width: 50% !important;
        }

        .footer-button {
          height: 48px;
          padding: 0 1.5rem !important;
          border: none;
          border-left: 1px solid #ccc;
          background-color: #000;
          color: #fff;
          font-weight: bold;
          transition: background-color 0.3s ease;
          width: auto !important;
        }

        .footer-button:hover {
          background-color: #333;
          color: #fff;
        }

        .footer-socials a {
          color: #444;
          transition: color 0.2s ease;
        }

        .footer-socials a:hover {
          color: #000;
        }

        footer .copyright {
          text-align: center;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

export default Footer;
