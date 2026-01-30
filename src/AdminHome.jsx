import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdminContacts from "./AdminContact";

const AdminHome = () => {
  const [services, setServices] = useState([]);
  const [servName, setServName] = useState("");
  const [servInfo, setServInfo] = useState("");
  const [servImg, setServImg] = useState(null);

  const fileRef = useRef(null);

  // Fetch services
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/service", {
        withCredentials: true,
      });
      setServices(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Submit service
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!servImg) {
        alert("Please select an image");
        return;
      }

      const formData = new FormData();
      formData.append("serv_name", servName);
      formData.append("serv_info", servInfo);
      formData.append("serv_img", servImg);

      await axios.post("http://localhost:5000/admin/saveservice", formData, {
        withCredentials: true,
      });

      fetchServices();
      setServName("");
      setServInfo("");
      setServImg("");
      alert("Service added successfully");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Unauthorized or upload failed");
    }
  };

  //delete service

  const deleteService = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/services/${id}`);

      setServices((prev) => prev.filter((s) => s.id !== id));

      alert("Service deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete service");
    }
  };

  return (
    <>
      <div className="row m-0 p-5" style={{ borderLeft: "10px solid white" }}>
        <div className="col-lg-10 offset-lg-2 col-md-9">
          <button
            className="btn btn-warning text-light"
            data-bs-toggle="collapse"
            data-bs-target="#addId"
          >
            Add Services
          </button>

          <div className="collapse my-3" id="addId">
            <form onSubmit={handleSubmit}>
              <div className="form-group my-3 text-light">
                <label>Service Name</label>
                <input
                  type="text"
                  value={servName}
                  placeholder="Service Name"
                  onChange={(e) => setServName(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group my-3 text-light">
                <label>Service Information</label>
                <input
                  type="text"
                  placeholder="Service Information"
                  value={servInfo}
                  onChange={(e) => setServInfo(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group my-3 text-light">
                <label>Service Image</label>
                <input
                  type="file"
                  ref={fileRef}
                  accept="image/*"
                  onChange={(e) => setServImg(e.target.files[0])}
                  className="form-control"
                  required
                />
              </div>

              <div className="text-center mt-4">
                <button className="btn btn-warning text-light">
                  Save Service
                </button>
              </div>
            </form>
          </div>

          {/* Table */}
          <table className="table table-bordered table-striped bg-light my-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Info</th>
                <th>Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Records
                  </td>
                </tr>
              ) : (
                services.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.description}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/uploads/${s.image}`}
                        height="60"
                        alt="service"
                      />
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-link text-danger"
                        onClick={() => deleteService(s.id)}
                      >
                        <i className="bi bi-trash fw-bold"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminContacts />
    </>
  );
};

export default AdminHome;
