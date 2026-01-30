import React from "react";

const Card1 = (props) => {
  return (
    <>
      <div
        className="col-lg-3 col-md-6 col-12 p-3"
        id="crd2" 
        style={{ backgroundColor: "white", border: "10px solid #F5F5F5" }}
      >
        <div className="m-auto" style={{ borderRadius: "50%", height: "70%" }}>
          <img
            src={`http://localhost:5000/uploads/${props.img}`}
            className="img-fluid h-100 w-100"
            style={{ borderRadius: "50%" }}
            alt=""
          />
        </div>
        <div className="p-3 mt-3 text-center">
          <h5 className="fw-bold">{props.nm}</h5>
          <b
            className="fw-normal"
            style={{
              fontFamily: "Heebo, sans-serif",
              fontSize: "15px",
            }}
          >
            {props.designation}
          </b>
        </div>
      </div>
    </>
  );
};
export default Card1;
