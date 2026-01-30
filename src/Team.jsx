import React, { useEffect, useState } from "react";

import axios from "axios";

const Team = () => {
  const [team, setTeam] = useState([]);
  const fetchdata = async () => {
    try {
      let d = await axios.get("http://localhost:5000/api/team");
      setTeam(d.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      <div className="row m-0 p-5" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="col-12 m-0 p-0 text-center">
          <b className="cur_text">Team Members</b>
          <h1 className="fw-bold">Our Master Chefs</h1>
        </div>
        <div className="col-12 m-0 p-5">
          <div className="row m-0 p-0">
            {team.map((val) => {
              return (
                <div
                  className="col-lg-3 col-md-6 col-12 p-3"
                  id="crd2" key={val.id}
                  style={{
                    backgroundColor: "white",
                    border: "10px solid #F5F5F5",
                  }}
                >
                  <div
                    className="m-auto"
                    style={{ borderRadius: "50%", height: "70%" }}
                  >
                    <img
                      src={`http://localhost:5000/uploads/${val.image}`}
                      className="img-fluid h-100 w-100"
                      style={{ borderRadius: "50%" }}
                      alt=""
                    />
                  </div>
                  <div className="p-3 mt-3 text-center">
                    <h5 className="fw-bold">{val.name}</h5>
                    <b
                      className="fw-normal"
                      style={{
                        fontFamily: "Heebo, sans-serif",
                        fontSize: "15px",
                      }}
                    >
                      {val.role}
                    </b>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
