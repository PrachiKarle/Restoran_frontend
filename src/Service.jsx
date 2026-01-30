import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const Service = () => {
  const [data, setData] = useState([]);
  const fetchdata = async () => {
    try {
      var d = await axios.get("http://localhost:5000/api/service");
      setData(d.data);
      // console.log(d.data);
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
    <div className="container-fluid p-5 bg-light">
      <div className="row m-0 p-5">
        {data.map((val) => {
          return (
            <div className="col-lg-3 col-md-6 col-12 my-lg-0 my-4" key={val.id}>
              <div className="p-3 crd">
                <div className="h-50 w-100">
                  <img
                    src={`http://localhost:5000/uploads/${val.image}`}
                    style={{ width: "40%", height: "20vh" }}
                    alt=""
                  />
                </div>
                <div>
                  <h5 className="fw-bold">{val.name}</h5>
                  <h6 className="fw-normal">{val.description}</h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
};

export default Service;
