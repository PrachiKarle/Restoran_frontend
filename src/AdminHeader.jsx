import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminHeader = () => {
  const Logout=()=>{
    localStorage.removeItem("adminToken");
    window.location.href="/";
  }
  return (
    <>
      <div
        className="col-lg-2 col-md-3 col-12 p-4 min-vh-100"
        style={{ backgroundColor: "#0f0f1a",position:"fixed", left:"0px",top:"0px" }}
      >
        <ul
          className="nav flex-column text-center text-md-start"
          style={{ backgroundColor: "#0f0f1a" }}
        >
          <li className="nav-item mb-3">
            <NavLink to="/admin" className="nav-link fw-bold text-warning">
              Dashboard 
            </NavLink>
          </li>

          <li className="nav-item mb-3">
            <NavLink to="/admin/menu" className="nav-link fw-bold text-light">
              Menu
            </NavLink>
          </li>

          <li className="nav-item mb-3">
            <NavLink to="/admin/book" className="nav-link fw-bold text-light">
              Bookings
            </NavLink>
          </li>

          <li className="nav-item mb-3">
            <NavLink to="/admin/user" className="nav-link fw-bold text-light">
              Users
            </NavLink>
          </li>

          <li className="nav-item mb-3">
            <NavLink to="/admin/team" className="nav-link fw-bold text-light">
              Team
            </NavLink>
          </li>

          <li className="nav-item mt-4">
            <NavLink
              to="/admin/logout" onClick={Logout}
              className="nav-link fw-bold text-danger"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet></Outlet>
    </>
  );
};

export default AdminHeader;
