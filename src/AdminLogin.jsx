import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form validation
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:5000/admin/login", {
        admin_email: formData.email,
        admin_pass: formData.password,
      });

      // Save JWT
      localStorage.setItem("adminToken", res.data.token);

      window.location.href="/admin";
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div
      className="row m-0 p-0"
      style={{ minHeight: "100vh" }}
    >
        <div className="col-md-4 col-12"></div>
      <div
        className="col-lg-6 col-md-8 col-12 p-5"
        style={{ backgroundColor: "#191928",height:"60vh",marginTop:"10%" }}
      >
        <h2 className="text-warning fw-bold text-center mb-4">Admin Login</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group mb-4 text-light">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="form-group mb-4 text-light position-relative">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
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

          {/* Button */}
          <div className="text-center">
            <button className="btn btn-warning text-light w-100">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
