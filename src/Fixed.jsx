import React, { useEffect, useState } from "react";
import "./App.css";

const Fixed = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  });
  return (
    <>
      {show ? (
        <div className="d-flex justify-content-center align-items-center fixed_div p-3">
          <a href="#nav">
            <i className="bi bi-arrow-up text-light"></i>
          </a>
        </div>
      ) : null}
    </>
  );
};

export default Fixed;
