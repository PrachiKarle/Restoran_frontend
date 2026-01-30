import React from "react";
import './App.css';
const Heading = (props) => { 
  return (
    <>
      <div className="row m-0 p-0 abt" id="abt">
        <div className="col-12 m-0 p-5 abt1">
          <h1 className="display-4 fw-bold text-light text-center">{props.val}</h1>
          <h6 className="text-light text-center my-3 fw-normal">
            <b className="fw-normal" style={{ color: "#FEA116" }}>
              HOME / PAGES /{" "}
            </b>
            {props.val}
          </h6>
        </div>
      </div>
    </>
  );
};

export default Heading;
