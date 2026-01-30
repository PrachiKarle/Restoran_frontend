import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const AdminTeam = () => {
  const [team, setTeam] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);

  // Fetch team
  const fetchTeam = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/team");
      setTeam(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Submit team member
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !desc.trim()) {
      alert("All fields required");
      return;
    }

    if (!image) {
      alert("Select image");
      return;
    }

    if (!image.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", desc);
      formData.append("image", image);

      await axios.post(
        "http://localhost:5000/admin/add-team",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Team member added");
      fetchTeam();

      setName("");
      setDesc("");
      setImage(null);
      fileRef.current.value = "";

    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };


  //delete 
  const deleteMember=async(id)=>{
    var d=await axios.delete(`/admin/delete-team/${id}`);
    alert(d.data.message);
    fetchTeam();
  }
  return (
    <div className="row m-0 p-5" style={{ borderLeft: "10px solid white" }}>
      <div className="col-lg-10 offset-lg-2 col-md-9">

        {/* ADD BUTTON */}
        <button
          className="btn btn-warning text-light"
          data-bs-toggle="collapse"
          data-bs-target="#addTeam"
        >
          Add Team
        </button>

        {/* FORM */}
        <div className="collapse my-3" id="addTeam">
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <div className="form-group my-3 text-light">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Member Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group my-3 text-light">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>

            <div className="form-group my-3 text-light">
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                ref={fileRef}
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-warning text-light" disabled={loading}>
                {loading ? "Saving..." : "Save Member"}
              </button>
            </div>

          </form>
        </div>

        {/* TABLE */}
        <table className="table table-bordered table-striped bg-light my-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {team.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No Records</td>
              </tr>
            ) : (
              team.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.name}</td>
                  <td>{t.role}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/uploads/${t.image}`}
                      height="60"
                      alt="team"
                      onError={(e) => (e.target.src = "/no-image.png")}
                    />
                  </td>
                  <td className="text-center">
                    <button className="btn btn-link text-danger">
                      <i className="bi bi-trash fw-bold" onClick={()=>deleteMember(t.id)}></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default AdminTeam;
