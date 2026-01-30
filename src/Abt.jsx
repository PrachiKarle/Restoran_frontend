import React from "react";
import "./App.css";
import "./index.css";
import { NavLink } from "react-router-dom";

const Abt = () => {
  return (
    <>
      <div className="row m-0 p-5">
        <div className="col-md-6 col-12 h-100">
          <div className="row">
            <div className="col-6">
              <img src="images/about-1.jpg" className="img-fluid" alt="" />
            </div>
            <div className="col-6">
              <img
                src="images/about-2.jpg"
                style={{
                  height: "80%",
                  width: "80%",
                  position: "relative",
                  top: "20%",
                }}
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-6">
              <img
                src="images/about-3.jpg"
                style={{
                  height: "80%",
                  width: "80%",
                  position: "relative",
                  left: "20%",
                }}
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-6">
              <img src="images/about-4.jpg" className="img-fluid" alt="" />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12 p-5">
          <p className="cur_text fw-bold">About Us</p>
          <h1 className="fw-bold display-5">Welcome to Restoran</h1>
          <p>
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem
            sit.
          </p>
          <p>
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
            lorem sit clita duo justo magna dolore erat amet
          </p>
          <div className="row m-0 p-0">
            <div className="col-lg-6 col-12 div d-flex p-1">
              <h1 className="display-4 fw-bold">15</h1>
              <div className="mx-3 py-2">
                <h6 className="fw-normal">Years of</h6>
                <h6>EXPERIENCE</h6>
              </div>
            </div>
            <div className="col-lg-6 col-12 div d-flex p-1">
              <h1 className="display-4 fw-bold">50</h1>
              <div className="mx-3 py-2">
                <h6 className="fw-normal">Popular</h6>
                <h6>MASTER CHEFS</h6>
              </div>
            </div>
          </div>

          <button className="btn btn_1 px-4 py-2 mt-5">
            <NavLink
              to="/sign"
              className="fw-bold text-decoration-none text-light"
            >
              Sign in
            </NavLink>
          </button>
        </div>
      </div>
    </>
  );
};

export default Abt;
