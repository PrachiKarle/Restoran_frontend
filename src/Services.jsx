import React from "react";
import Heading from "./Heading";
import Service from './Service';

const Services = () => {
  return (
    <>
      <Heading val="Service" />

      <div className="row m-0 p-4 bg-light">
        <div className="col-12 text-center">
          <i className="h5" style={{ color: "#FEA116",fontVariant:"small-caps" }}>Our Services</i>
          <h2 className="fw-bold my-3">Explore Our Services</h2>
        </div>
      </div>

      <Service/>
    </>
  );
};

export default Services;
