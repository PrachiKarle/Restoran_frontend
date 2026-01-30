import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./App.css";
import Fixed from "./Fixed";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [id, setId] = useState("");
  useEffect(() => {
    var token = localStorage.getItem("userToken");
    if (token) {
      var decoded = jwtDecode(token);
      setId(decoded.id);
    }
  }, []);
  return (
    <>
      <nav>
        <div className="navbar navbar-expand-lg px-5 nav">
          <NavLink to="/" className="navbar-brand">
            <h1 className="fw-bold" style={{ color: "#FEA116" }}>
              Restoran
            </h1>
          </NavLink>
          <button
            className="navbar-toggler text-light bg-light"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-lg-auto ms-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  ABOUT
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/service" className="nav-link">
                  SERVICE
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/menu" className="nav-link">
                  MENU
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/book" className="nav-link">
                  BOOKING
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  CONTACT
                </NavLink>
              </li>
              <li className="nav-item">
                {id ? (
                  <NavLink className="nav-link" to={`/profile/${id}`}>
                    <i className="bi bi-person fw-bold text-warning"></i>
                  </NavLink>
                ) : (
                  <NavLink to="/sign" className="nav-link">
                    SIGN IN
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Fixed />
    </>
  );
};

export default Navbar;
