import React from "react";

const Menus = (props) => {
  return (
    <>
      <div className="col-lg-6 col-12 m-0 p-3">
        <div className="row m-0 p-0 my-4" style={{ height: "80px" }}>
          <div className="col-3 h-100">
            <img src={props.img} className="img-fluid h-100 w-100" alt="" />
          </div>
          <div className="col-9">
            <div className="d-flex justify-content-between" style={{borderBottom:"1px solid gray"}}>
              <h4 className="fw-bold">{props.name}</h4>
              <h4 className="text-warning fw-bold">{props.price}</h4>
            </div>
            <i className="fw-normal">
              Ipsum ipsum clita erat amet dolor justo diam
            </i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menus;
