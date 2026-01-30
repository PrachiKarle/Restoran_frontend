import React, { useState } from "react";
import Heading from "./Heading";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Sign = () => {
  const [usernm, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  // Form validation
  const validateForm = () => {
    if (!usernm || !pass) {
      setError("All fields are required");
      return false;
    }

    if (pass.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  //sign in
  const SignIn = async (e) => {
    try {
      e.preventDefault();
      if (!validateForm) {
        return;
      }
      var res = await axios.post("http://localhost:5000/signin", {
       username: usernm,
        userpass:pass,
      });

      alert(res.data.message);
      // Save JWT
      localStorage.setItem("userToken", res.data.token);

      // Redirect
      nav("/");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <>
      <Heading val="Sign in" />

      <div className="row m-0 p-5">
        <div
          className="col-lg-6 col-md-8 col-12 m-auto px-md-5 py-md-4  p-3 text-light fw-bold"
          style={{ backgroundColor: "#fea116", borderRadius: "25px" }}
        >
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          <form action="" onSubmit={SignIn}>
            <div className="form-group">
              <label htmlFor="uname">Username</label>
              <br />
              <input
                type="text"
                className="form-control"
                value={usernm}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Enter your Username"
                required
              />
            </div>
            <div className="form-group mb-4 text-light position-relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter your Password"
              name="password"
              value={pass}
              onChange={(e)=>setPass(e.target.value)}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "30px",
                cursor: "pointer",
                color: "#121211",
              }}
            >
              {showPassword ? (
                <i className="bi bi-eye"></i>
              ) : (
                
                <i className="bi bi-eye-slash"></i>
              )}
            </span>
          </div>

            <b className="text-light text-center fw-normal">
              New Here ?{" "}
              <NavLink to="/Signup" className="text-light fw-bold">
                Sign up
              </NavLink>
            </b>
            <div className="form-group text-center mt-4">
              <button type="submit" className="btn btn-outline-light fw-bold">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Sign;
