import React from "react";

const Card = (props) => {
  return (
    <>
    <div className="p-3 crd">
        <div className="h-50 w-100">
            <img src={props.cls} className="img-fluid h-75" style={{width:"40%"}} alt="" />
        </div>
        <div>
            <h5 className="fw-bold">{props.t}</h5>
            <h6 className="fw-normal">Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</h6>
        </div>
    </div>
    </>
  );
};

export default Card;
