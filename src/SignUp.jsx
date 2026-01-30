import React, { useState } from "react";
import axios from "axios";
import Heading from "./Heading";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const nav = useNavigate();

  const [showPassword, setShow] = useState(false);
  const [showPassword1, setShow1] = useState(false);

  const [usernm, setUser] = useState("");
  const [unmerr, setUsererr] = useState("");

  const [mail, setMail] = useState("");
  const [mailerr, setMailErr] = useState("");

  const [pass, setPass] = useState("");
  const [passerr, setPasserr] = useState("");

  const [cpass, setCpass] = useState("");

  // 🔹 Signup Function
  const signIn = async (e) => {
    e.preventDefault();

    let valid = true;
    setUsererr("");
    setMailErr("");
    setPasserr("");

    // Username validation
    if (usernm.trim().length < 3) {
      setUsererr("Username must be at least 3 characters");
      valid = false;
    }

    // Email validation
    if (!mail.includes("@")) {
      setMailErr("Enter valid email");
      valid = false;
    }

    // Password validation
    if (pass.length < 6) {
      setPasserr("Password must be at least 6 characters");
      valid = false;
    }

    // Confirm password
    if (pass !== cpass) {
      setPasserr("Passwords do not match");
      valid = false;
    }

    if (!valid) return;

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username: usernm,
        email: mail,
        password: pass,
      });

      alert(res.data.message || "Signup successful");
      nav("/sign");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <Heading val="Sign Up" />

      <div className="row m-0 p-5">
        <div
          className="col-lg-6 col-md-8 col-12 m-auto px-5 py-4 text-light fw-bold"
          style={{ backgroundColor: "#fea116" }}
        >
          <form onSubmit={signIn}>
            {/* Username */}
            <div className="form-group mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                value={usernm}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              {unmerr && <small className="text-danger">{unmerr}</small>}
            </div>

            {/* Email */}
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
              {mailerr && <small className="text-danger">{mailerr}</small>}
            </div>

            {/* Password */}
            <div className="form-group mb-3 position-relative">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <span
                onClick={() => setShow(!showPassword)}
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
              {passerr && <small className="text-danger">{passerr}</small>}
            </div>

            {/* Confirm Password */}
            <div className="form-group mb-3 position-relative">
              <label>Confirm Password</label>
              <input
                type={showPassword1 ? "text" : "password"}
                className="form-control"
                placeholder="Re-enter password"
                value={cpass}
                onChange={(e) => setCpass(e.target.value)}
                required
              />
              <span
                onClick={() => setShow1(!showPassword1)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "30px",
                  cursor: "pointer",
                  color: "#121211",
                }}
              >
                {showPassword1 ? (
                  <i className="bi bi-eye"></i>
                ) : (
                  <i className="bi bi-eye-slash"></i>
                )}
              </span>
            </div>

            {/* Login link */}
            <p className="fw-normal">
              Already have an account?{" "}
              <NavLink to="/sign" className="text-light fw-bold">
                Sign In
              </NavLink>
            </p>

            {/* Submit */}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-outline-light fw-bold">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
