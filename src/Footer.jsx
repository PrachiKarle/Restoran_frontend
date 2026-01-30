import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="row m-0 p-5 pe-3" style={{ backgroundColor: "#0F172B" }}>
        <div className="col-12">
          <div className="row m-0 p-0">
            {/* Company */}
            <div className="col-lg-3 col-md-6 col-12">
              <ul className="my-2 text-light" style={{ listStyleType: "none" }}>
                <li className="cur_text fw-bold h5">Company</li>
                <li>
                  {" "}
                  <i className="bi bi-chevron-right"></i> About Us
                </li>
                <li>
                  {" "}
                  <i className="bi bi-chevron-right"></i> Contact Us
                </li>
                <li>
                  {" "}
                  <i className="bi bi-chevron-right"></i> Reservation
                </li>
                <li>
                  {" "}
                  <i className="bi bi-chevron-right"></i> Privacy Policy
                </li>
                <li>
                  {" "}
                  <i className="bi bi-chevron-right"></i> Terms & Condition
                </li>
              </ul>
            </div>

            {/* contact */}
            <div className="col-lg-3 col-md-6 col-12">
              <ul className="my-2 text-light" style={{ listStyleType: "none" }}>
                <li className="cur_text fw-bold h5">Contact</li>
                <li>
                <i className="bi bi-geo-alt fw-bold me-2"></i> 123 Street, New York, USA
                </li>
                <li>
                  {" "}
                  <i className="bi bi-telephone-fill fw-bold me-2"></i> +012 345 67890
                </li>
                <li>
                  {" "}
                  <i className="bi bi-envelope fw-bold me-2"></i> info@restaron.in
                </li>
              </ul>
            </div>

            {/* opening */}
            <div className="col-lg-3 col-md-6 col-12">
              <ul className="my-2 text-light" style={{ listStyleType: "none" }}>
                <li className="cur_text fw-bold h5">Opening</li>
                <li className="h6 fw-bold">Monday - Saturday</li>
                <li className="h6 fw-normal">09AM - 09PM</li>
                <li className="h6 fw-bold">Sunday</li>
                <li className="h6 fw-normal">10AM - 08PM</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-lg-3 col-md-6 col-12">
              <b className="cur_text fw-bold h5">Newsletter</b> <br />
              <b className="text-light fw-bold">
                Dolor amet sit justo amet elitr clita ipsum elitr est.
              </b>
              <form action="" className="d-flex mt-3">
                <input type="email" placeholder="Your Mail" required />
                <button type="submit" className="btn btn_1 text-light">
                  Sign up
                </button>
              </form>
            </div>
          </div>
   
          <div className="row m-0 mt-5 p-0 text-center">
           
            <h6 className="text-light">
              © Copyright Restoran, All Right Reserved
            </h6>
            <h6 className="text-light fw-bold">
              Designed by <i style={{ color: "#FEA116" }}>Prachi Karle</i>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
