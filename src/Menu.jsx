import React, { useEffect, useState } from "react";
import axios from "axios";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchMeals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meals");
      setMeals(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const filteredMeals =
    filter === "all"
      ? meals
      : meals.filter((m) => m.type === filter);

  if (loading) {
    return <h4 className="text-center mt-5">Loading meals...</h4>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Meals</h2>

      {/* FILTER BUTTONS */}
      <div className="text-center mb-4">
        {["all", "breakfast", "lunch", "dinner"].map((t) => (
          <button
            key={t}
            className={`btn mx-2 ${
              filter === t ? "btn-warning" : "btn-outline-warning"
            }`}
            onClick={() => setFilter(t)}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* MEALS GRID */}
      <div className="row">
        {filteredMeals.length === 0 ? (
          <p className="text-center">No meals found</p>
        ) : (
          filteredMeals.map((meal) => (
            <div className="col-md-4 mb-4" key={meal.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost:5000/uploads/${meal.image}`}
                  className="card-img-top"
                  height="200"
                  style={{ objectFit: "cover" }}
                  alt={meal.name}
                  onError={(e) => (e.target.src = "/no-image.png")}
                />
                <div className="card-body">
                  <h5 className="card-title">{meal.name}</h5>
                  <p className="card-text text-muted">
                    {meal.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">₹{meal.price}</span>
                    <span className="badge bg-warning text-dark">
                      {meal.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Meals;
