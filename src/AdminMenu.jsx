import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const AdminMeals = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState("");
  const [mealDesc, setMealDesc] = useState("");
  const [price, setPrice] = useState("");
  const [mealType, setMealType] = useState("");
  const [mealImg, setMealImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);

  // 🔹 Fetch meals
  const fetchMeals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meals");
      setMeals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  // 🔹 Submit meal
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mealName.trim() || !mealDesc.trim() || !price || !mealType) {
      alert("All fields are required");
      return;
    }

    if (!mealImg) {
      alert("Please select an image");
      return;
    }

    if (!mealImg.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", mealName);
      formData.append("description", mealDesc);
      formData.append("price", price);
      formData.append("meal_type", mealType);
      formData.append("image", mealImg);

      await axios.post(
        "http://localhost:5000/admin/add-meal",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Meal added successfully");
      fetchMeals();

      // reset form
      setMealName("");
      setMealDesc("");
      setPrice("");
      setMealType("");
      setMealImg(null);
      fileRef.current.value = "";

    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };


  //delete meal
  const deleteMeal=async(id)=>{
    var d=axios.delete(`http://localhost:5000/admin/delete-meal/${id}`);
    alert(d.data.message);
    fetchMeals();
  }

  return (
    <div className="row m-0 p-5" style={{ borderLeft: "10px solid white" }}>
      <div className="col-lg-10 offset-lg-2 col-md-9">

        {/* ADD BUTTON */}
        <button
          className="btn btn-warning text-light"
          data-bs-toggle="collapse"
          data-bs-target="#addMeal"
        >
          Add Meals
        </button>

        {/* FORM */}
        <div className="collapse my-3" id="addMeal">
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <div className="form-group my-3 text-light">
              <label>Meal Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Meal Name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                required
              />
            </div>

            <div className="form-group my-3 text-light">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Meal Description"
                value={mealDesc}
                onChange={(e) => setMealDesc(e.target.value)}
                required
              />
            </div>

            <div className="form-group my-3 text-light">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-group my-3 text-light">
              <label>Meal Type</label>
              <select
                className="form-control"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                required
              >
                <option value="">Select Meal Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>

            <div className="form-group my-3 text-light">
              <label>Meal Image</label>
              <input
                type="file"
                className="form-control"
                ref={fileRef}
                accept="image/*"
                onChange={(e) => setMealImg(e.target.files[0])}
                required
              />
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-warning text-light" disabled={loading}>
                {loading ? "Saving..." : "Save Meal"}
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
              <th>Price</th>
              <th>Type</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {meals.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No Records</td>
              </tr>
            ) : (
              meals.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.name}</td>
                  <td>₹{m.price}</td>
                  <td>{m.type}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/uploads/${m.image}`}
                      height="60"
                      alt="meal"
                      onError={(e) => (e.target.src = "/no-image.png")}
                    />
                  </td>
                  <td className="text-center">
                    <button className="btn btn-link text-danger">
                      <i className="bi bi-trash fw-bold" onClick={()=>deleteMeal(m.id)}></i>
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

export default AdminMeals;
